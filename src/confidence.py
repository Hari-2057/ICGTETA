import os
import joblib
import numpy as np
from typing import Dict, Any, Tuple, List
from sklearn.calibration import CalibratedClassifierCV

class ConformalConfidenceCalibrator:
    def __init__(self, method: str = "sigmoid", confidence_threshold: float = 0.80):
        self.method = method
        self.confidence_threshold = confidence_threshold
        self.calibrated_clf = None
        self.is_fitted = False

    def fit(self, base_classifier: Any, X_val: np.ndarray, y_val: np.ndarray):
        """Fits probability calibration wrapper over base classifier."""
        # Use 5-fold cross-validation calibration in modern scikit-learn
        self.calibrated_clf = CalibratedClassifierCV(estimator=base_classifier, method=self.method, cv=5)
        self.calibrated_clf.fit(X_val, y_val)
        self.is_fitted = True
        print(f"[Confidence Calibrator] Fitted {self.method} probability calibration.")

    def predict_with_confidence(self, X: np.ndarray) -> Dict[str, Any]:
        """
        Calculates calibrated probabilities, predicted class, confidence percentage,
        conformal category ('Reliable', 'Moderate', 'Uncertain'), and secondary testing alerts.
        """
        if not self.is_fitted:
            raise ValueError("Calibrator is not fitted.")

        probabilities = self.calibrated_clf.predict_proba(X)[0] # 3-class array
        pred_class_idx = int(np.argmax(probabilities))
        max_confidence = float(np.max(probabilities)) * 100.0
        
        # Conformal prediction prediction set
        sorted_indices = np.argsort(probabilities)[::-1]
        cumulative_prob = 0.0
        prediction_set_indices = []
        for idx in sorted_indices:
            prediction_set_indices.append(int(idx))
            cumulative_prob += probabilities[idx]
            if cumulative_prob >= self.confidence_threshold:
                break
                
        if max_confidence >= 85.0:
            category = "Reliable"
            alert = "Model confidence is high. Clinical prediction is reliable."
        elif max_confidence >= 70.0:
            category = "Moderate"
            alert = "Moderate model confidence. Review patient clinical context."
        else:
            category = "Uncertain"
            alert = "High prediction uncertainty! Recommend secondary diagnostic testing: Oral Glucose Tolerance Test (OGTT), Fructosamine test, or repeat blood sampling."

        class_names = ["Healthy", "Prediabetes", "Type 2 Diabetes"]
        prediction_set_labels = [class_names[i] for i in prediction_set_indices]

        return {
            "predicted_class_index": pred_class_idx,
            "predicted_class_label": class_names[pred_class_idx],
            "confidence_score": round(max_confidence, 2),
            "confidence_category": category,
            "uncertainty_alert": alert,
            "probabilities": {
                "Healthy": round(float(probabilities[0]) * 100, 2),
                "Prediabetes": round(float(probabilities[1]) * 100, 2),
                "Type 2 Diabetes": round(float(probabilities[2]) * 100, 2)
            },
            "conformal_prediction_set": prediction_set_labels
        }

    def save(self, models_dir: str = "models"):
        os.makedirs(models_dir, exist_ok=True)
        path = os.path.join(models_dir, "confidence_calibrator.joblib")
        joblib.dump(self, path)
        print(f"[Calibrator] Saved to {path}")

    @staticmethod
    def load(models_dir: str = "models") -> "ConformalConfidenceCalibrator":
        path = os.path.join(models_dir, "confidence_calibrator.joblib")
        if not os.path.exists(path):
            raise FileNotFoundError(f"Calibrator artifact not found at {path}")
        return joblib.load(path)
