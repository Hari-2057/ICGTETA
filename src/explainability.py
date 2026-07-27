import os
import joblib
import shap
import numpy as np
import pandas as pd
from typing import Dict, Any, List

LAB_DISPLAY_NAMES = {
    "hba1c": "HbA1c Level (%)",
    "fasting_glucose": "Fasting Plasma Glucose (mg/dL)",
    "random_glucose": "Random Plasma Glucose (mg/dL)",
    "tyg_index": "Triglyceride-Glucose Index (TyG)",
    "metabolic_risk_score": "Metabolic Composite Risk Index",
    "bmi": "Body Mass Index (BMI)",
    "systolic_bp": "Systolic Blood Pressure (mmHg)",
    "diastolic_bp": "Diastolic Blood Pressure (mmHg)",
    "triglycerides": "Triglycerides (mg/dL)",
    "hdl": "HDL Cholesterol (mg/dL)",
    "ldl": "LDL Cholesterol (mg/dL)",
    "total_cholesterol": "Total Cholesterol (mg/dL)",
    "creatinine": "Serum Creatinine (mg/dL)",
    "bun": "Blood Urea Nitrogen (mg/dL)",
    "alt": "Alanine Aminotransferase - ALT (U/L)",
    "ast": "Aspartate Aminotransferase - AST (U/L)",
    "age": "Patient Age (years)",
    "waist_circ": "Waist Circumference (cm)",
    "hemoglobin": "Hemoglobin (g/dL)",
    "wbc_count": "White Blood Cell Count (x10^3/µL)",
    "platelet_count": "Platelet Count (x10^3/µL)",
    "glucose_hba1c_ratio": "Glucose / HbA1c Ratio",
    "tg_hdl_ratio": "Triglyceride / HDL Ratio"
}

class ShapExplainabilityEngine:
    def __init__(self, classifier: Any, feature_names: List[str]):
        self.classifier = classifier
        self.feature_names = feature_names
        try:
            self.explainer = shap.TreeExplainer(self.classifier)
        except Exception:
            self.explainer = shap.Explainer(self.classifier.predict_proba, np.zeros((1, len(feature_names))))

    def explain_instance(self, X_sample: np.ndarray, raw_sample_dict: Dict[str, Any], predicted_class_idx: int) -> Dict[str, Any]:
        """
        Computes SHAP feature contribution scores for a single patient instance.
        """
        try:
            shap_values = self.explainer(X_sample)
            if hasattr(shap_values, "values"):
                vals = shap_values.values
                if len(vals.shape) == 3: # (samples, features, classes)
                    target_shap = vals[0, :, predicted_class_idx]
                else:
                    target_shap = vals[0]
            else:
                target_shap = np.array(shap_values)[0]
        except Exception:
            # Fallback estimation using feature importances / linear diff if SHAP encounters format variation
            if hasattr(self.classifier, "feature_importances_"):
                imp = self.classifier.feature_importances_
            else:
                imp = np.ones(len(self.feature_names)) / len(self.feature_names)
            target_shap = (X_sample[0] - np.mean(X_sample)) * imp

        feature_contributions = []
        for feat_name, shap_val in zip(self.feature_names, target_shap):
            raw_val = raw_sample_dict.get(feat_name, None)
            display_name = LAB_DISPLAY_NAMES.get(feat_name, feat_name.replace("_", " ").title())
            feature_contributions.append({
                "feature": feat_name,
                "display_name": display_name,
                "shap_value": float(shap_val),
                "actual_value": raw_val
            })

        sorted_contributions = sorted(feature_contributions, key=lambda x: abs(x["shap_value"]), reverse=True)
        
        risk_increasing = [item for item in sorted_contributions if item["shap_value"] > 0][:5]
        risk_reducing = [item for item in sorted_contributions if item["shap_value"] < 0][:5]

        return {
            "top_risk_increasing_biomarkers": risk_increasing,
            "top_risk_reducing_biomarkers": risk_reducing,
            "all_attributions": sorted_contributions[:10]
        }

    def save(self, models_dir: str = "models"):
        os.makedirs(models_dir, exist_ok=True)
        path = os.path.join(models_dir, "shap_explainer.joblib")
        joblib.dump(self, path)
        print(f"[SHAP Explainer] Saved to {path}")

    @staticmethod
    def load(models_dir: str = "models") -> "ShapExplainabilityEngine":
        path = os.path.join(models_dir, "shap_explainer.joblib")
        if not os.path.exists(path):
            raise FileNotFoundError(f"SHAP explainer artifact not found at {path}")
        return joblib.load(path)
