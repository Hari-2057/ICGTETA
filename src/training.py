import os
import joblib
import numpy as np
import pandas as pd
from typing import Dict, Any, Tuple
from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score, precision_recall_fscore_support, roc_auc_score,
    confusion_matrix, mean_absolute_error, mean_squared_error, r2_score
)
from sklearn.ensemble import HistGradientBoostingClassifier, HistGradientBoostingRegressor

# Try importing XGBoost, fallback to HistGradientBoosting if OpenMP is missing
USE_XGBOOST = False
try:
    import xgboost as xgb
    # Test instantiating an XGBClassifier to verify libomp availability
    _dummy = xgb.XGBClassifier()
    USE_XGBOOST = True
    print("[Trainer] Using XGBoost Engine.")
except Exception as e:
    print(f"[Trainer] XGBoost native library unavailable ({e}). Using Scikit-Learn HistGradientBoosting Engine.")


class ClinicalModelTrainer:
    def __init__(self, classifier_params: Dict[str, Any] = None, regressor_params: Dict[str, Any] = None):
        self.classifier_params = classifier_params or {}
        self.regressor_params = regressor_params or {}
        
        if USE_XGBOOST:
            clf_defaults = {
                "n_estimators": 150, "max_depth": 5, "learning_rate": 0.05,
                "subsample": 0.8, "colsample_bytree": 0.8, "random_state": 42, "eval_metric": "mlogloss"
            }
            clf_defaults.update(self.classifier_params)
            self.classifier = xgb.XGBClassifier(**clf_defaults)

            reg_defaults = {
                "n_estimators": 150, "max_depth": 4, "learning_rate": 0.05,
                "subsample": 0.8, "colsample_bytree": 0.8, "random_state": 42
            }
            reg_defaults.update(self.regressor_params)
            self.severity_regressor = xgb.XGBRegressor(**reg_defaults)
        else:
            clf_defaults = {
                "max_iter": 150, "max_depth": 5, "learning_rate": 0.05, "random_state": 42
            }
            reg_defaults = {
                "max_iter": 150, "max_depth": 4, "learning_rate": 0.05, "random_state": 42
            }
            self.classifier = HistGradientBoostingClassifier(**clf_defaults)
            self.severity_regressor = HistGradientBoostingRegressor(**reg_defaults)

    def compute_severity_target(self, df: pd.DataFrame) -> np.ndarray:
        """
        Computes continuous clinical disease severity index (0 - 100).
        """
        hba1c = df["hba1c"].values
        fpg = df["fasting_glucose"].values
        rpg = df["random_glucose"].values
        
        hba1c_severity = np.clip((hba1c - 4.0) / 10.0 * 60.0, 0, 60)
        fpg_severity = np.clip((fpg - 70.0) / 250.0 * 25.0, 0, 25)
        rpg_severity = np.clip((rpg - 80.0) / 300.0 * 15.0, 0, 15)
        
        severity_index = hba1c_severity + fpg_severity + rpg_severity
        return np.clip(severity_index, 0.0, 100.0)

    def train(self, X: np.ndarray, y: np.ndarray, df_raw: pd.DataFrame) -> Dict[str, Any]:
        """
        Trains both classifier and regressor, returning comprehensive evaluation metrics.
        """
        y_severity = self.compute_severity_target(df_raw)
        
        X_train, X_test, y_train, y_test, y_sev_train, y_sev_test = train_test_split(
            X, y, y_severity, test_size=0.2, random_state=42, stratify=y
        )
        
        # 1. Fit Classifier
        self.classifier.fit(X_train, y_train)
        y_pred = self.classifier.predict(X_test)
        y_proba = self.classifier.predict_proba(X_test)
        
        acc = accuracy_score(y_test, y_pred)
        prec, rec, f1, _ = precision_recall_fscore_support(y_test, y_pred, average="weighted")
        auc = roc_auc_score(y_test, y_proba, multi_class="ovr")
        cm = confusion_matrix(y_test, y_pred).tolist()
        
        # 2. Fit Severity Regressor
        self.severity_regressor.fit(X_train, y_sev_train)
        y_sev_pred = self.severity_regressor.predict(X_test)
        
        mae = mean_absolute_error(y_sev_test, y_sev_pred)
        rmse = float(np.sqrt(mean_squared_error(y_sev_test, y_sev_pred)))
        r2 = r2_score(y_sev_test, y_sev_pred)
        
        metrics = {
            "classification": {
                "accuracy": float(acc),
                "precision": float(prec),
                "recall": float(rec),
                "f1_score": float(f1),
                "roc_auc": float(auc),
                "confusion_matrix": cm,
                "classes": ["Healthy", "Prediabetes", "Type 2 Diabetes"]
            },
            "regression": {
                "mae": float(mae),
                "rmse": float(rmse),
                "r2_score": float(r2)
            }
        }
        
        print(f"[Training Complete] Classification Accuracy: {acc:.4f} | F1: {f1:.4f} | ROC-AUC: {auc:.4f}")
        print(f"[Training Complete] Regression MAE: {mae:.4f} | R²: {r2:.4f}")
        
        return metrics

    def save(self, models_dir: str = "models"):
        os.makedirs(models_dir, exist_ok=True)
        joblib.dump(self.classifier, os.path.join(models_dir, "classifier.joblib"))
        joblib.dump(self.severity_regressor, os.path.join(models_dir, "regressor.joblib"))
        print(f"[Trainer] Saved models to {models_dir}")

    @staticmethod
    def load(models_dir: str = "models") -> Tuple[Any, Any]:
        clf_path = os.path.join(models_dir, "classifier.joblib")
        reg_path = os.path.join(models_dir, "regressor.joblib")
        if not os.path.exists(clf_path) or not os.path.exists(reg_path):
            raise FileNotFoundError("Model artifacts not found.")
        classifier = joblib.load(clf_path)
        regressor = joblib.load(reg_path)
        return classifier, regressor
