import os
import json
import time
from typing import List, Dict, Any
from src.supabase_client import is_supabase_configured, save_report_to_supabase, fetch_reports_from_supabase

REPORTS_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "reports")
INDEX_PATH = os.path.join(REPORTS_DIR, "reports_index.json")

def initialize_reports_directory():
    os.makedirs(REPORTS_DIR, exist_ok=True)
    if not os.path.exists(INDEX_PATH):
        try:
            with open(INDEX_PATH, "w") as f:
                json.dump([], f, indent=2)
        except Exception:
            pass

def get_all_reports(patient_session_id: str = None) -> List[Dict[str, Any]]:
    # If Supabase credentials exist, fetch filtered reports from Supabase
    if is_supabase_configured():
        supabase_reports = fetch_reports_from_supabase(patient_session_id)
        if supabase_reports:
            return supabase_reports

    # Fallback to local index filtered by patient_session_id
    initialize_reports_directory()
    try:
        if os.path.exists(INDEX_PATH):
            with open(INDEX_PATH, "r") as f:
                all_entries = json.load(f)
                if not patient_session_id or patient_session_id == "ALL":
                    return all_entries
                return [entry for entry in all_entries if entry.get("patient_session_id") == patient_session_id]
    except Exception as e:
        print(f"[Report Manager] Error reading index: {e}")
    return []

def add_saved_report(
    patient_data: Dict[str, Any],
    prediction: Dict[str, Any],
    generated_pdf_bytes: bytes = None,
    uploaded_pdf_bytes: bytes = None,
    patient_session_id: str = "session_default"
) -> Dict[str, Any]:
    
    # Sync with Supabase if configured
    if is_supabase_configured():
        return save_report_to_supabase(patient_data, prediction, generated_pdf_bytes, uploaded_pdf_bytes, patient_session_id)

    # Local index fallback with patient_session_id isolation
    initialize_reports_directory()
    reports = get_all_reports("ALL")
    
    report_id = f"CDSS_Report_{int(time.time())}"
    entry = {
        "id": report_id,
        "patient_session_id": patient_session_id,
        "filename": f"{report_id}.pdf",
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "patient_age": patient_data.get("age", 45),
        "patient_gender": patient_data.get("gender", "Female"),
        "hba1c": patient_data.get("hba1c", 5.8),
        "fasting_glucose": patient_data.get("fasting_glucose", 105.0),
        "random_glucose": patient_data.get("random_glucose", 140.0),
        "predicted_class": prediction.get("predicted_class", "Healthy"),
        "confidence_score": prediction.get("confidence_score", 95.0),
        "severity_index": prediction.get("severity_index", 15.0),
        "storage_provider": "Patient Isolated Storage"
    }
    
    reports.insert(0, entry)
    try:
        with open(INDEX_PATH, "w") as f:
            json.dump(reports, f, indent=2)
    except Exception as e:
        print(f"[Report Manager] Error saving index: {e}")
        
    return entry
