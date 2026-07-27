import os
import sys

# Ensure workspace root is in sys.path
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

import json
import joblib
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from src.dataset_loader import load_dataset
from src.feature_engineering import compute_engineered_features
from src.preprocessing import ClinicalDataPreprocessor
from src.optimize import optimize_hyperparameters
from src.training import ClinicalModelTrainer
from src.confidence import ConformalConfidenceCalibrator
from src.explainability import ShapExplainabilityEngine

def run_master_pipeline(models_dir: str = "models", artifacts_dir: str = "artifacts") -> dict:
    """
    Master orchestration script:
    1. Ingest routine lab dataset
    2. Compute medical engineered features
    3. Fit Preprocessor (imputation, IQR clipping, scaling)
    4. Tune XGBoost parameters with Optuna
    5. Train Classifier & Severity Regressor
    6. Calibrate Conformal Probabilities
    7. Fit SHAP TreeExplainer
    8. Generate & export evaluation charts and model metadata
    """
    print("=" * 60)
    print("      STARTING CDSS DIABETES PIPELINE TRAINING      ")
    print("=" * 60)
    
    os.makedirs(models_dir, exist_ok=True)
    os.makedirs(artifacts_dir, exist_ok=True)
    
    # 1. Dataset Ingestion
    df_raw = load_dataset()
    
    # 2. Feature Engineering
    df_feat = compute_engineered_features(df_raw)
    print(f"[Pipeline] Feature Engineering complete. Total features: {len(df_feat.columns)}")
    
    # 3. Preprocessing
    preprocessor = ClinicalDataPreprocessor()
    preprocessor.fit(df_feat)
    X, y = preprocessor.transform(df_feat)
    preprocessor.save(models_dir)
    
    # 4. Optuna Hyperparameter Optimization
    best_params = optimize_hyperparameters(X, y, n_trials=20)
    
    # 5. Model Training & Evaluation
    trainer = ClinicalModelTrainer(classifier_params=best_params)
    metrics = trainer.train(X, y, df_raw)
    trainer.save(models_dir)
    
    # 6. Conformal Confidence Calibration
    calibrator = ConformalConfidenceCalibrator(method="sigmoid")
    calibrator.fit(trainer.classifier, X, y)
    calibrator.save(models_dir)
    
    # 7. SHAP Explainability Engine
    shap_engine = ShapExplainabilityEngine(trainer.classifier, preprocessor.feature_columns)
    shap_engine.save(models_dir)
    
    # 8. Save Metadata & Evaluation Visualizations
    metadata = {
        "dataset_records": len(df_raw),
        "total_features": len(preprocessor.feature_columns),
        "feature_list": preprocessor.feature_columns,
        "best_hyperparameters": best_params,
        "metrics": metrics
    }
    
    metadata_path = os.path.join(models_dir, "model_metadata.json")
    with open(metadata_path, "w") as f:
        json.dump(metadata, f, indent=4)
    print(f"[Pipeline] Saved model metadata to {metadata_path}")
    
    # Generate Confusion Matrix Heatmap Artifact
    cm = np.array(metrics["classification"]["confusion_matrix"])
    plt.figure(figsize=(6, 5))
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues", 
                xticklabels=["Healthy", "Prediabetes", "T2D"],
                yticklabels=["Healthy", "Prediabetes", "T2D"])
    plt.title("CDSS Diabetes Classifier Confusion Matrix")
    plt.xlabel("Predicted Class")
    plt.ylabel("True Class")
    plt.tight_layout()
    cm_plot_path = os.path.join(artifacts_dir, "confusion_matrix.png")
    plt.savefig(cm_plot_path)
    plt.close()
    print(f"[Pipeline] Saved confusion matrix artifact to {cm_plot_path}")
    
    print("=" * 60)
    print("   CDSS DIABETES PIPELINE TRAINING COMPLETED SUCCESSFULLY   ")
    print("=" * 60)
    
    return metadata

if __name__ == "__main__":
    run_master_pipeline()
