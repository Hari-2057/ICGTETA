import os
import io
import json
import uuid
from fastapi import FastAPI, HTTPException, UploadFile, File, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response

from backend.app.config import MODELS_DIR, ARTIFACTS_DIR, DATA_DIR
from backend.app.schemas import PatientLabInput, PredictionResponse
from backend.app.services.inference_service import inference_service
from backend.app.services.pdf_service import generate_pdf_report_bytes
from src.pdf_parser import parse_patient_pdf_bytes
from data.export_powerbi_dataset import generate_powerbi_csv

app = FastAPI(
    title="Confidence-Aware CDSS Diabetes Prediction API",
    description="Production-Grade Clinical Decision Support System with Conformal Prediction & SHAP Explainability",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Strict anti-caching middleware
@app.middleware("http")
async def add_no_cache_headers(request, call_next):
    response = await call_next(request)
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0, private"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response


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


@app.post("/upload-report-pdf")
async def upload_patient_pdf(file: UploadFile = File(...)):
    """
    Parses an uploaded patient blood test PDF report and returns extracted biomarkers.
    """
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF report files are supported.")
    
    contents = await file.read()
    extracted_biomarkers = parse_patient_pdf_bytes(contents)
    
    return {
        "filename": file.filename,
        "extracted_count": len(extracted_biomarkers),
        "biomarkers": extracted_biomarkers
    }


@app.get("/sample-lab-pdf")
def download_sample_lab_pdf():
    """Generates and returns in-memory sample patient lab PDF report."""
    sample_patient = {
        "age": 52, "gender": "Female", "bmi": 29.4, "systolic_bp": 134, "diastolic_bp": 86,
        "hba1c": 6.2, "fasting_glucose": 118, "random_glucose": 155,
        "total_cholesterol": 210, "hdl": 42, "ldl": 138, "triglycerides": 180,
        "creatinine": 1.0, "bun": 16, "alt": 34, "ast": 28
    }
    sample_prediction = inference_service.predict(sample_patient)
    pdf_bytes = generate_pdf_report_bytes(sample_prediction, sample_patient)
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=Sample_Patient_Blood_Lab_Report.pdf"}
    )


@app.get("/powerbi-dataset")
def download_powerbi_dataset():
    """Returns Power BI optimized model performance CSV dataset in-memory."""
    csv_path = generate_powerbi_csv(MODELS_DIR, DATA_DIR)
    with open(csv_path, "r") as f:
        csv_content = f.read()
    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=model_performance_powerbi_dataset.csv"}
    )


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
        pdf_bytes = generate_pdf_report_bytes(prediction, lab_dict)
        filename = f"Clinical_CDSS_Diabetes_Report_{uuid.uuid4().hex[:6]}.pdf"
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF generation error: {str(e)}")
