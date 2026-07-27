import numpy as np
import pandas as pd
from typing import Dict, Union

def calculate_tyg_index(triglycerides: float, fasting_glucose: float) -> float:
    """Calculates Triglyceride-Glucose (TyG) index."""
    if pd.isna(triglycerides) or pd.isna(fasting_glucose) or triglycerides <= 0 or fasting_glucose <= 0:
        return np.nan
    return float(np.log((triglycerides * fasting_glucose) / 2.0))


def compute_engineered_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Computes routine clinical laboratory engineered features on a pandas DataFrame or dict.
    Returns modified copy of DataFrame with new engineered columns.
    """
    data = df.copy()
    
    # 1. TyG Index
    if "triglycerides" in data.columns and "fasting_glucose" in data.columns:
        data["tyg_index"] = np.log(np.maximum(data["triglycerides"] * data["fasting_glucose"] / 2.0, 1e-5))
    
    # 2. Glucose to HbA1c Ratio
    if "fasting_glucose" in data.columns and "hba1c" in data.columns:
        data["glucose_hba1c_ratio"] = data["fasting_glucose"] / np.maximum(data["hba1c"], 1e-5)
    
    # 3. Glucose to Triglycerides Ratio
    if "fasting_glucose" in data.columns and "triglycerides" in data.columns:
        data["glucose_tg_ratio"] = data["fasting_glucose"] / np.maximum(data["triglycerides"], 1e-5)

    # 4. AST / ALT Ratio (De Ritis Ratio)
    if "ast" in data.columns and "alt" in data.columns:
        data["ast_alt_ratio"] = data["ast"] / np.maximum(data["alt"], 1e-5)

    # 5. BUN to Creatinine Ratio
    if "bun" in data.columns and "creatinine" in data.columns:
        data["bun_creatinine_ratio"] = data["bun"] / np.maximum(data["creatinine"], 1e-5)

    # 6. Total Cholesterol to HDL Ratio (Atherogenic Index)
    if "total_cholesterol" in data.columns and "hdl" in data.columns:
        data["tc_hdl_ratio"] = data["total_cholesterol"] / np.maximum(data["hdl"], 1e-5)

    # 7. Triglyceride to HDL Ratio
    if "triglycerides" in data.columns and "hdl" in data.columns:
        data["tg_hdl_ratio"] = data["triglycerides"] / np.maximum(data["hdl"], 1e-5)

    # 8. Mean Arterial Pressure (MAP)
    if "systolic_bp" in data.columns and "diastolic_bp" in data.columns:
        data["mean_arterial_pressure"] = data["diastolic_bp"] + (data["systolic_bp"] - data["diastolic_bp"]) / 3.0

    # 9. Composite Metabolic Risk Score
    # Combines normalized risk factors (BMI, Fasting Glucose, TyG, MAP, TG/HDL)
    if all(col in data.columns for col in ["bmi", "fasting_glucose", "systolic_bp", "triglycerides", "hdl"]):
        bmi_risk = (data["bmi"] > 25.0).astype(float) * 1.5 + (data["bmi"] > 30.0).astype(float) * 1.5
        fpg_risk = (data["fasting_glucose"] > 100.0).astype(float) * 2.0 + (data["fasting_glucose"] > 126.0).astype(float) * 3.0
        bp_risk = (data["systolic_bp"] > 130.0).astype(float) * 1.5
        lipid_risk = (data["tg_hdl_ratio"] > 3.0).astype(float) * 1.5
        data["metabolic_risk_score"] = bmi_risk + fpg_risk + bp_risk + lipid_risk

    return data


def compute_single_sample_features(sample: Dict[str, Union[float, str]]) -> Dict[str, Union[float, str]]:
    """Applies feature engineering to a single dictionary record (for real-time backend API)."""
    df_single = pd.DataFrame([sample])
    df_feat = compute_engineered_features(df_single)
    return df_feat.iloc[0].to_dict()


if __name__ == "__main__":
    from src.dataset_loader import load_dataset
    df = load_dataset()
    df_feat = compute_engineered_features(df)
    print("Engineered features added. Total columns:", len(df_feat.columns))
    print("Sample TyG index values:\n", df_feat[["fasting_glucose", "triglycerides", "tyg_index", "metabolic_risk_score"]].head())
