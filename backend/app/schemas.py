from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class PatientLabInput(BaseModel):
    # Mandatory Glycemic Biomarkers
    hba1c: float = Field(..., description="HbA1c level (%)", example=5.8)
    fasting_glucose: float = Field(..., description="Fasting Plasma Glucose (mg/dL)", example=105.0)
    random_glucose: float = Field(..., description="Random Plasma Glucose (mg/dL)", example=140.0)
    
    # Demographics & Vitals
    age: int = Field(50, example=52)
    gender: str = Field("Female", example="Female")
    bmi: float = Field(27.5, example=28.4)
    weight: float = Field(70.0, example=72.5)
    height: float = Field(162.0, example=160.0)
    systolic_bp: float = Field(125.0, example=130.0)
    diastolic_bp: float = Field(80.0, example=82.0)
    waist_circ: float = Field(85.0, example=88.0)
    smoking_status: str = Field("Never", example="Never")
    alcohol_consumption: str = Field("None", example="None")
    physical_activity: str = Field("Moderate", example="Moderate")
    family_history: str = Field("No", example="Yes")

    # CBC Panel
    hemoglobin: float = Field(13.8, example=13.5)
    rbc_count: float = Field(4.7, example=4.6)
    wbc_count: float = Field(7.2, example=7.8)
    platelet_count: float = Field(240.0, example=230.0)
    hematocrit: float = Field(41.0, example=40.5)
    mcv: float = Field(88.0, example=89.0)
    mch: float = Field(29.5, example=30.0)
    mchc: float = Field(33.5, example=33.8)

    # Lipid Panel
    total_cholesterol: float = Field(190.0, example=210.0)
    hdl: float = Field(48.0, example=42.0)
    ldl: float = Field(115.0, example=135.0)
    vldl: float = Field(27.0, example=33.0)
    triglycerides: float = Field(135.0, example=165.0)

    # Renal Panel
    creatinine: float = Field(0.9, example=1.0)
    bun: float = Field(14.0, example=16.0)
    uric_acid: float = Field(5.2, example=5.8)

    # Hepatic Panel
    alt: float = Field(24.0, example=32.0)
    ast: float = Field(22.0, example=28.0)
    alp: float = Field(65.0, example=72.0)
    bilirubin: float = Field(0.7, example=0.8)

    # Electrolyte Panel
    sodium: float = Field(140.0, example=141.0)
    potassium: float = Field(4.2, example=4.3)
    chloride: float = Field(101.0, example=102.0)


class PredictionResponse(BaseModel):
    predicted_class: str
    predicted_class_index: int
    confidence_score: float
    confidence_category: str
    uncertainty_alert: str
    probabilities: Dict[str, float]
    conformal_prediction_set: List[str]
    severity_index: float
    estimated_hba1c: float
    tyg_index: float
    metabolic_risk_score: float
    shap_explanation: Dict[str, Any]
    cdss_recommendations: List[Dict[str, str]]
    patient_summary: Dict[str, Any]


class PresetProfile(BaseModel):
    id: str
    name: str
    description: str
    data: PatientLabInput
