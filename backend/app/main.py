import os
import json
from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from backend.app.config import MODELS_DIR, ARTIFACTS_DIR
from backend.app.schemas import PatientLabInput, PredictionResponse
from backend.app.services.inference_service import inference_service
from backend.app.services.pdf_service import generate_pdf_report

app = FastAPI(
    title="Confidence-Aware CDSS Diabetes Prediction API",
    description="Production-Grade Clinical Decision Support System with Conformal Prediction & SHAP Explainability",
    version="1.0.0"
)

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    print("[FastAPI Server] Initializing model inference service...")
    inference_service.load_artifacts()


@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "CDSS Diabetes Risk System", "model_loaded": inference_service.loaded}


@app.get("/model-info")
def get_model_info():
    metadata_path = os.path.join(MODELS_DIR, "model_metadata.json")
    if not os.path.exists(metadata_path):
        raise HTTPException(status_code=404, detail="Model metadata not found.")
    with open(metadata_path, "r") as f:
        data = json.load(f)
    return data


@app.get("/presets")
def get_patient_presets():
    presets = [
        {
            "id": "healthy_patient",
            "name": "Healthy Patient Profile",
            "description": "Normal HbA1c (5.1%), Fasting Glucose (85 mg/dL), normal lipid & renal panels.",
            "data": {
                "hba1c": 5.1, "fasting_glucose": 85.0, "random_glucose": 110.0,
                "age": 35, "gender": "Female", "bmi": 22.4, "weight": 60.0, "height": 163.0,
                "systolic_bp": 115.0, "diastolic_bp": 75.0, "waist_circ": 78.0,
                "smoking_status": "Never", "alcohol_consumption": "None", "physical_activity": "High", "family_history": "No",
                "hemoglobin": 14.1, "rbc_count": 4.8, "wbc_count": 6.5, "platelet_count": 250.0, "hematocrit": 42.0, "mcv": 88.0, "mch": 29.5, "mchc": 33.5,
                "total_cholesterol": 175.0, "hdl": 58.0, "ldl": 95.0, "vldl": 22.0, "triglycerides": 110.0,
                "creatinine": 0.8, "bun": 12.0, "uric_acid": 4.5, "alt": 20.0, "ast": 18.0, "alp": 55.0, "bilirubin": 0.6,
                "sodium": 140.0, "potassium": 4.2, "chloride": 101.0
            }
        },
        {
            "id": "prediabetes_risk",
            "name": "Prediabetes Risk Profile",
            "description": "Impaired Fasting Glucose (115 mg/dL), HbA1c 6.0%, Overweight (BMI 28.5), Elevated Triglycerides.",
            "data": {
                "hba1c": 6.0, "fasting_glucose": 115.0, "random_glucose": 148.0,
                "age": 48, "gender": "Male", "bmi": 28.5, "weight": 86.0, "height": 173.0,
                "systolic_bp": 132.0, "diastolic_bp": 84.0, "waist_circ": 94.0,
                "smoking_status": "Former", "alcohol_consumption": "Moderate", "physical_activity": "Low", "family_history": "Yes",
                "hemoglobin": 15.2, "rbc_count": 5.1, "wbc_count": 7.9, "platelet_count": 260.0, "hematocrit": 45.0, "mcv": 90.0, "mch": 30.2, "mchc": 33.8,
                "total_cholesterol": 215.0, "hdl": 38.0, "ldl": 142.0, "vldl": 35.0, "triglycerides": 175.0,
                "creatinine": 1.0, "bun": 16.0, "uric_acid": 6.2, "alt": 35.0, "ast": 28.0, "alp": 78.0, "bilirubin": 0.8,
                "sodium": 139.0, "potassium": 4.4, "chloride": 102.0
            }
        },
        {
            "id": "severe_t2d",
            "name": "Severe Type 2 Diabetes",
            "description": "High HbA1c (9.2%), Fasting Glucose (195 mg/dL), Obese (BMI 34.2), High Blood Pressure & Dyslipidemia.",
            "data": {
                "hba1c": 9.2, "fasting_glucose": 195.0, "random_glucose": 265.0,
                "age": 58, "gender": "Female", "bmi": 34.2, "weight": 92.0, "height": 164.0,
                "systolic_bp": 145.0, "diastolic_bp": 92.0, "waist_circ": 104.0,
                "smoking_status": "Current", "alcohol_consumption": "None", "physical_activity": "Low", "family_history": "Yes",
                "hemoglobin": 13.0, "rbc_count": 4.4, "wbc_count": 9.2, "platelet_count": 285.0, "hematocrit": 39.5, "mcv": 91.0, "mch": 30.5, "mchc": 33.2,
                "total_cholesterol": 245.0, "hdl": 34.0, "ldl": 165.0, "vldl": 46.0, "triglycerides": 230.0,
                "creatinine": 1.4, "bun": 22.0, "uric_acid": 7.5, "alt": 52.0, "ast": 44.0, "alp": 92.0, "bilirubin": 1.1,
                "sodium": 138.0, "potassium": 4.6, "chloride": 100.0
            }
        },
        {
            "id": "uncertain_edge_case",
            "name": "Uncertain / Edge Case Patient",
            "description": "Borderline HbA1c (6.4%) with conflicting normal fasting glucose (92 mg/dL) and high triglycerides. Triggers conformal prediction uncertainty alert (<70%).",
            "data": {
                "hba1c": 6.4, "fasting_glucose": 92.0, "random_glucose": 125.0,
                "age": 42, "gender": "Male", "bmi": 26.0, "weight": 76.0, "height": 171.0,
                "systolic_bp": 122.0, "diastolic_bp": 78.0, "waist_circ": 89.0,
                "smoking_status": "Never", "alcohol_consumption": "Heavy", "physical_activity": "Moderate", "family_history": "No",
                "hemoglobin": 14.5, "rbc_count": 4.9, "wbc_count": 7.1, "platelet_count": 240.0, "hematocrit": 43.0, "mcv": 87.5, "mch": 29.8, "mchc": 34.0,
                "total_cholesterol": 210.0, "hdl": 42.0, "ldl": 130.0, "vldl": 38.0, "triglycerides": 190.0,
                "creatinine": 1.1, "bun": 17.0, "uric_acid": 6.0, "alt": 38.0, "ast": 32.0, "alp": 70.0, "bilirubin": 0.8,
                "sodium": 141.0, "potassium": 4.1, "chloride": 103.0
            }
        }
    ]
    return presets


@app.post("/predict", response_model=PredictionResponse)
def predict_diabetes_risk(payload: PatientLabInput):
    try:
        lab_dict = payload.dict()
        result = inference_service.predict(lab_dict)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")


@app.post("/generate-report")
def download_clinical_report(payload: PatientLabInput):
    try:
        lab_dict = payload.dict()
        prediction = inference_service.predict(lab_dict)
        pdf_path = generate_pdf_report(prediction, lab_dict)
        filename = os.path.basename(pdf_path)
        return FileResponse(pdf_path, media_type="application/pdf", filename=filename)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF generation error: {str(e)}")
