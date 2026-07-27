import os
import numpy as np
import pandas as pd
from typing import Dict, Any

from backend.app.config import MODELS_DIR
from src.preprocessing import ClinicalDataPreprocessor
from src.training import ClinicalModelTrainer
from src.confidence import ConformalConfidenceCalibrator
from src.explainability import ShapExplainabilityEngine
from src.feature_engineering import compute_single_sample_features
from src.cdss import generate_clinical_recommendations
from src.pipeline import run_master_pipeline

class CDSSInferenceService:
    def __init__(self):
        self.preprocessor = None
        self.classifier = None
        self.regressor = None
        self.calibrator = None
        self.shap_engine = None
        self.loaded = False

    def load_artifacts(self):
        """Loads fitted model artifacts or runs training pipeline if absent."""
        clf_path = os.path.join(MODELS_DIR, "classifier.joblib")
        if not os.path.exists(clf_path):
            print("[Inference Service] Models not found. Triggering automated pipeline training...")
            run_master_pipeline(MODELS_DIR)

        self.preprocessor = ClinicalDataPreprocessor.load(MODELS_DIR)
        self.classifier, self.regressor = ClinicalModelTrainer.load(MODELS_DIR)
        self.calibrator = ConformalConfidenceCalibrator.load(MODELS_DIR)
        self.shap_engine = ShapExplainabilityEngine.load(MODELS_DIR)
        self.loaded = True
        print("[Inference Service] All CDSS artifacts loaded successfully.")

    def predict(self, raw_lab_input: Dict[str, Any]) -> Dict[str, Any]:
        """Performs full CDSS pipeline evaluation for a patient lab record."""
        if not self.loaded:
            self.load_artifacts()

        # 1. Feature Engineering
        feat_dict = compute_single_sample_features(raw_lab_input)

        # 2. Preprocessing & Scaling
        X_scaled = self.preprocessor.transform_single(feat_dict)

        # 3. Calibrated Classification & Conformal Prediction
        conf_result = self.calibrator.predict_with_confidence(X_scaled)
        pred_class = conf_result["predicted_class_label"]
        pred_idx = conf_result["predicted_class_index"]
        conf_score = conf_result["confidence_score"]
        conf_cat = conf_result["confidence_category"]

        # 4. Severity Index Regression
        severity_score = float(np.clip(self.regressor.predict(X_scaled)[0], 0.0, 100.0))

        # 5. SHAP Explainability
        shap_result = self.shap_engine.explain_instance(X_scaled, feat_dict, pred_idx)

        # 6. Rule-Based CDSS Action Recommendations
        cdss_advice = generate_clinical_recommendations(pred_class, conf_cat, conf_score, feat_dict)

        # 7. Package Response
        response = {
            "predicted_class": pred_class,
            "predicted_class_index": pred_idx,
            "confidence_score": conf_score,
            "confidence_category": conf_cat,
            "uncertainty_alert": conf_result["uncertainty_alert"],
            "probabilities": conf_result["probabilities"],
            "conformal_prediction_set": conf_result["conformal_prediction_set"],
            "severity_index": round(severity_score, 1),
            "estimated_hba1c": round(float(raw_lab_input.get("hba1c", 5.0)), 2),
            "tyg_index": round(float(feat_dict.get("tyg_index", 0.0)), 2),
            "metabolic_risk_score": round(float(feat_dict.get("metabolic_risk_score", 0.0)), 1),
            "shap_explanation": shap_result,
            "cdss_recommendations": cdss_advice,
            "patient_summary": {
                "age": raw_lab_input.get("age"),
                "gender": raw_lab_input.get("gender"),
                "bmi": raw_lab_input.get("bmi"),
                "hba1c": raw_lab_input.get("hba1c"),
                "fasting_glucose": raw_lab_input.get("fasting_glucose"),
                "random_glucose": raw_lab_input.get("random_glucose")
            }
        }
        return response

inference_service = CDSSInferenceService()
