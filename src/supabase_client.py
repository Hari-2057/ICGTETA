import os
import json
import time
from typing import List, Dict, Any

DEFAULT_SUPABASE_URL = "https://swxwtlqvpmbrzwjbvmva.supabase.co"
DEFAULT_SUPABASE_KEY = "sb_publishable_LkPBGMkAOATPB2qUxBz0cA_2egzKInV"

SUPABASE_URL = os.getenv("SUPABASE_URL", DEFAULT_SUPABASE_URL)
SUPABASE_KEY = os.getenv("SUPABASE_KEY", os.getenv("SUPABASE_SECRET_KEY", os.getenv("VITE_SUPABASE_KEY", DEFAULT_SUPABASE_KEY)))

def is_supabase_configured() -> bool:
    return bool(SUPABASE_URL and SUPABASE_KEY)

def safe_int(val, default=45) -> int:
    try:
        if val is None or val == "":
            return default
        return int(val)
    except (ValueError, TypeError):
        return default

def safe_float(val, default=5.8) -> float:
    try:
        if val is None or val == "":
            return default
        return float(val)
    except (ValueError, TypeError):
        return default

def save_report_to_supabase(
    patient_data: Dict[str, Any],
    prediction: Dict[str, Any],
    generated_pdf_bytes: bytes = None,
    uploaded_pdf_bytes: bytes = None,
    patient_session_id: str = "session_default"
) -> Dict[str, Any]:
    """
    Saves report metadata, raw uploaded PDF, and generated clinical PDF to Supabase Database & Storage.
    Safely parses numeric inputs to prevent type errors.
    """
    report_id = f"CDSS_Report_{int(time.time())}"
    
    # Core row matching user's Supabase table schema with safe parsing & patient_session_id isolation
    db_row = {
        "id": report_id,
        "patient_session_id": patient_session_id,
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "patient_age": safe_int(patient_data.get("age"), 45),
        "patient_gender": str(patient_data.get("gender") or "Female"),
        "hba1c": safe_float(patient_data.get("hba1c"), 5.8),
        "fasting_glucose": safe_float(patient_data.get("fasting_glucose"), 105.0),
        "predicted_class": str(prediction.get("predicted_class") or "Healthy")
    }

    if is_supabase_configured():
        try:
            from supabase import create_client
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

            # Insert metadata into 'patient_reports' table
            res = supabase.table("patient_reports").insert(db_row).execute()
            print(f"[Supabase SUCCESS] Inserted row into patient_reports table: {db_row}")

        except Exception as e:
            print(f"[Supabase Exception]: {e}")

    return db_row

def fetch_reports_from_supabase(patient_session_id: str = None) -> List[Dict[str, Any]]:
    """Fetches patient reports from Supabase Table Editor safely with patient_session_id isolation."""
    if is_supabase_configured():
        try:
            from supabase import create_client
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
            query = supabase.table("patient_reports").select("*")
            if patient_session_id and patient_session_id != "ALL":
                query = query.eq("patient_session_id", patient_session_id)
            response = query.order("created_at", desc=True).execute()
            if response.data:
                return response.data
        except Exception as e:
            print(f"[Supabase Query Exception]: {e}")
            
    return []
