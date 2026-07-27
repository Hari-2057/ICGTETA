import os
import joblib
import numpy as np
import pandas as pd
from typing import Tuple, Dict, List, Any
from sklearn.preprocessing import StandardScaler, LabelEncoder

CATEGORICAL_COLS = ["gender", "smoking_status", "alcohol_consumption", "physical_activity", "family_history"]
TARGET_COL = "diabetes_status"
TARGET_MAPPING = {"Healthy": 0, "Prediabetes": 1, "Type 2 Diabetes": 2}
REVERSE_TARGET_MAPPING = {0: "Healthy", 1: "Prediabetes", 2: "Type 2 Diabetes"}


class ClinicalDataPreprocessor:
    def __init__(self):
        self.scaler = StandardScaler()
        self.label_encoders: Dict[str, LabelEncoder] = {}
        self.target_encoder = LabelEncoder()
        self.numeric_medians: Dict[str, float] = {}
        self.categorical_modes: Dict[str, str] = {}
        self.iqr_bounds: Dict[str, Tuple[float, float]] = {}
        self.feature_columns: List[str] = []
        self.numeric_cols: List[str] = []
        self.is_fitted = False

    def fit(self, df: pd.DataFrame) -> "ClinicalDataPreprocessor":
        """Fits imputers, IQR bounds, categorical encoders, and scaler."""
        data = df.copy()
        
        # Determine feature columns
        feature_df = data.drop(columns=[TARGET_COL]) if TARGET_COL in data.columns else data
        self.feature_columns = list(feature_df.columns)
        
        # Categorical vs Numeric breakdown
        self.numeric_cols = [c for c in self.feature_columns if c not in CATEGORICAL_COLS]
        
        # 1. Compute Medians and Modes for Imputation
        for col in self.numeric_cols:
            self.numeric_medians[col] = float(data[col].median())
            
        for col in CATEGORICAL_COLS:
            if col in data.columns:
                mode_val = data[col].mode()
                self.categorical_modes[col] = mode_val.iloc[0] if not mode_val.empty else "Unknown"
        
        # 2. Compute IQR bounds for Outlier Clipping
        for col in self.numeric_cols:
            q1 = data[col].quantile(0.25)
            q3 = data[col].quantile(0.75)
            iqr = q3 - q1
            lower_bound = q1 - 2.5 * iqr
            upper_bound = q3 + 2.5 * iqr
            self.iqr_bounds[col] = (lower_bound, upper_bound)
            
        # Impute and Clip before fitting scalers/encoders
        processed = self._impute_and_clip(data)
        
        # 3. Fit Categorical Encoders
        for col in CATEGORICAL_COLS:
            if col in processed.columns:
                le = LabelEncoder()
                # Handle potential unseen values by casting to string
                vals = processed[col].astype(str)
                le.fit(vals)
                self.label_encoders[col] = le

        # 4. Fit Target Encoder
        if TARGET_COL in data.columns:
            self.target_encoder.fit(list(TARGET_MAPPING.keys()))

        # Encode categorical columns before scaling
        encoded_df = processed.copy()
        for col in CATEGORICAL_COLS:
            if col in encoded_df.columns:
                encoded_df[col] = self.label_encoders[col].transform(encoded_df[col].astype(str))

        # 5. Fit StandardScaler
        self.scaler.fit(encoded_df[self.feature_columns])
        self.is_fitted = True
        return self

    def _impute_and_clip(self, df: pd.DataFrame) -> pd.DataFrame:
        """Internal helper to apply median/mode imputation and IQR bounds."""
        data = df.copy()
        
        # Impute missing values
        for col in self.numeric_cols:
            if col in data.columns:
                data[col] = data[col].fillna(self.numeric_medians.get(col, 0.0))
                # Clip outliers
                if col in self.iqr_bounds:
                    lb, ub = self.iqr_bounds[col]
                    data[col] = data[col].clip(lower=lb, upper=ub)
                    
        for col in CATEGORICAL_COLS:
            if col in data.columns:
                data[col] = data[col].fillna(self.categorical_modes.get(col, "Unknown"))
                
        return data

    def transform(self, df: pd.DataFrame) -> Tuple[np.ndarray, np.ndarray]:
        """
        Transforms input DataFrame into scaled feature matrix X and target vector y (if present).
        """
        if not self.is_fitted:
            raise ValueError("Preprocessor has not been fitted yet.")
            
        data = df.copy()
        processed = self._impute_and_clip(data)
        
        # Encode Categorical
        for col in CATEGORICAL_COLS:
            if col in processed.columns:
                le = self.label_encoders[col]
                # Map unknown values to closest or first category safely
                classes = set(le.classes_)
                processed[col] = processed[col].astype(str).apply(
                    lambda x: x if x in classes else le.classes_[0]
                )
                processed[col] = le.transform(processed[col])

        # Scale features
        X_df = processed[self.feature_columns]
        X_scaled = self.scaler.transform(X_df)
        
        y_encoded = None
        if TARGET_COL in data.columns:
            y_encoded = data[TARGET_COL].map(TARGET_MAPPING).values

        return X_scaled, y_encoded

    def transform_single(self, sample_dict: Dict[str, Any]) -> np.ndarray:
        """Transforms a single dictionary sample into scaled 2D array for API prediction."""
        df_single = pd.DataFrame([sample_dict])
        X_scaled, _ = self.transform(df_single)
        return X_scaled

    def save(self, models_dir: str = "models"):
        """Saves preprocessor artifact to disk."""
        os.makedirs(models_dir, exist_ok=True)
        path = os.path.join(models_dir, "preprocessor.joblib")
        joblib.dump(self, path)
        print(f"[Preprocessor] Saved to {path}")

    @staticmethod
    def load(models_dir: str = "models") -> "ClinicalDataPreprocessor":
        """Loads preprocessor artifact from disk."""
        path = os.path.join(models_dir, "preprocessor.joblib")
        if not os.path.exists(path):
            raise FileNotFoundError(f"Preprocessor artifact not found at {path}")
        return joblib.load(path)


if __name__ == "__main__":
    from src.dataset_loader import load_dataset
    from src.feature_engineering import compute_engineered_features

    df = load_dataset()
    df_feat = compute_engineered_features(df)
    
    preprocessor = ClinicalDataPreprocessor()
    preprocessor.fit(df_feat)
    X, y = preprocessor.transform(df_feat)
    print("X shape:", X.shape, "y shape:", y.shape)
    preprocessor.save()
