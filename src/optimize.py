import optuna
import numpy as np
from typing import Dict, Any
from sklearn.model_selection import cross_val_score, StratifiedKFold
from sklearn.ensemble import HistGradientBoostingClassifier

optuna.logging.set_verbosity(optuna.logging.WARNING)

USE_XGBOOST = False
try:
    import xgboost as xgb
    _dummy = xgb.XGBClassifier()
    USE_XGBOOST = True
except Exception:
    pass


def optimize_hyperparameters(X: np.ndarray, y: np.ndarray, n_trials: int = 20) -> Dict[str, Any]:
    """
    Optuna hyperparameter optimization framework for gradient boosted tree classifiers.
    """
    def objective(trial):
        if USE_XGBOOST:
            params = {
                "n_estimators": trial.suggest_int("n_estimators", 50, 250),
                "max_depth": trial.suggest_int("max_depth", 3, 8),
                "learning_rate": trial.suggest_float("learning_rate", 0.01, 0.2, log=True),
                "subsample": trial.suggest_float("subsample", 0.6, 1.0),
                "colsample_bytree": trial.suggest_float("colsample_bytree", 0.6, 1.0),
                "random_state": 42,
                "eval_metric": "mlogloss",
                "n_jobs": -1
            }
            clf = xgb.XGBClassifier(**params)
        else:
            params = {
                "max_iter": trial.suggest_int("max_iter", 50, 250),
                "max_depth": trial.suggest_int("max_depth", 3, 8),
                "learning_rate": trial.suggest_float("learning_rate", 0.01, 0.2, log=True),
                "random_state": 42
            }
            clf = HistGradientBoostingClassifier(**params)
            
        cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
        scores = cross_val_score(clf, X, y, cv=cv, scoring="f1_weighted")
        return scores.mean()

    print(f"[Optuna Optimizer] Starting {n_trials} trials of hyperparameter optimization...")
    study = optuna.create_study(direction="maximize")
    study.optimize(objective, n_trials=n_trials)
    
    best_params = study.best_params
    best_params["random_state"] = 42
    print(f"[Optuna Optimizer] Best F1 Score: {study.best_value:.4f}")
    
    return best_params
