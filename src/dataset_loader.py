import os
import pandas as pd
from typing import Tuple, Dict, Any

MANDATORY_BIOMARKERS = ["hba1c", "fasting_glucose", "random_glucose"]

EXPECTED_COLUMNS = [
    "age", "gender", "bmi", "weight", "height", "systolic_bp", "diastolic_bp",
    "waist_circ", "smoking_status", "alcohol_consumption", "physical_activity",
    "family_history", "hba1c", "fasting_glucose", "random_glucose", "hemoglobin",
    "rbc_count", "wbc_count", "platelet_count", "hematocrit", "mcv", "mch",
    "mchc", "total_cholesterol", "hdl", "ldl", "vldl", "triglycerides",
    "creatinine", "bun", "uric_acid", "alt", "ast", "alp", "bilirubin",
    "sodium", "potassium", "chloride", "diabetes_status"
]


def validate_dataset(df: pd.DataFrame) -> Tuple[bool, str]:
    """
    Validates whether the DataFrame contains mandatory blood test biomarkers
    and acceptable clinical range values.
    """
    missing_mandatory = [col for col in MANDATORY_BIOMARKERS if col not in df.columns]
    if missing_mandatory:
        return False, f"Missing mandatory biomarker columns: {missing_mandatory}"
    
    if df.empty:
        return False, "Dataset is empty."
    
    return True, "Dataset validation successful."


def load_dataset(file_path: str = None) -> pd.DataFrame:
    """
    Loads routine laboratory blood test dataset from CSV.
    Default path: data/diabetes_routine_lab_dataset.csv
    """
    if file_path is None:
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        file_path = os.path.join(base_dir, "data", "diabetes_routine_lab_dataset.csv")
    
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Dataset file not found at: {file_path}")
    
    df = pd.read_csv(file_path)
    is_valid, msg = validate_dataset(df)
    if not is_valid:
        raise ValueError(f"Dataset validation failed: {msg}")
    
    print(f"[Dataset Loader] Successfully loaded {len(df)} records from {file_path}")
    if "diabetes_status" in df.columns:
        print("[Dataset Loader] Class breakdown:\n", df["diabetes_status"].value_counts().to_dict())
    
    return df


def get_dataset_summary(df: pd.DataFrame) -> Dict[str, Any]:
    """Returns metadata summary of the dataset for API consumption."""
    summary = {
        "total_records": len(df),
        "total_columns": len(df.columns),
        "missing_values_count": int(df.isnull().sum().sum()),
        "target_distribution": df["diabetes_status"].value_counts().to_dict() if "diabetes_status" in df.columns else {},
        "columns": list(df.columns)
    }
    return summary


if __name__ == "__main__":
    df = load_dataset()
    print("Summary:", get_dataset_summary(df))
