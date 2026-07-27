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
        default_entries = [
            {
                "id": "CDSS_Diabetes_Report_947eb201",
                "filename": "CDSS_Diabetes_Report_947eb201.pdf",
                "timestamp": "2026-07-27 16:04:15",
                "patient_age": 52,
                "patient_gender": "Female",
                "hba1c": 6.2,
                "fasting_glucose": 118.0,
                "predicted_class": "Prediabetes",
                "confidence_score": 85.0,
                "severity_index": 38.5,
                "storage_provider": "Supabase PostgreSQL / Cloud Storage"
            },
            {
                "id": "CDSS_Diabetes_Report_1361c1c4",
                "filename": "CDSS_Diabetes_Report_1361c1c4.pdf",
                "timestamp": "2026-07-27 16:16:20",
                "patient_age": 61,
                "patient_gender": "Male",
                "hba1c": 9.1,
                "fasting_glucose": 195.0,
                "predicted_class": "Type 2 Diabetes",
                "confidence_score": 98.4,
                "severity_index": 76.2,
                "storage_provider": "Supabase PostgreSQL / Cloud Storage"
            }
        ]
        try:
            with open(INDEX_PATH, "w") as f:
                json.dump(default_entries, f, indent=2)
        except Exception:
            pass

def get_all_reports() -> List[Dict[str, Any]]:
    # If Supabase credentials exist, attempt to fetch live reports from Supabase
    if is_supabase_configured():
        supabase_reports = fetch_reports_from_supabase()
        if supabase_reports:
            return supabase_reports

    # Fallback to local index
    initialize_reports_directory()
    try:
        if os.path.exists(INDEX_PATH):
            with open(INDEX_PATH, "r") as f:
                return json.load(f)
    except Exception as e:
        print(f"[Report Manager] Error reading index: {e}")
    return []

def add_saved_report(patient_data: Dict[str, Any], prediction: Dict[str, Any], pdf_bytes: bytes = None) -> Dict[str, Any]:
    # Sync with Supabase if configured
    if is_supabase_configured():
        return save_report_to_supabase(patient_data, prediction, pdf_bytes)

    # Local index fallback
    initialize_reports_directory()
    reports = get_all_reports()
    
    report_id = f"CDSS_Report_{int(time.time())}"
    entry = {
        "id": report_id,
        "filename": f"{report_id}.pdf",
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "patient_age": patient_data.get("age", 45),
        "patient_gender": patient_data.get("gender", "Female"),
        "hba1c": patient_data.get("hba1c", 5.8),
        "fasting_glucose": patient_data.get("fasting_glucose", 105.0),
        "predicted_class": prediction.get("predicted_class", "Healthy"),
        "confidence_score": prediction.get("confidence_score", 95.0),
        "severity_index": prediction.get("severity_index", 15.0),
        "storage_provider": "Supabase Ready (Local Fallback)"
    }
    
    reports.insert(0, entry)
    try:
        with open(INDEX_PATH, "w") as f:
            json.dump(reports, f, indent=2)
    except Exception as e:
        print(f"[Report Manager] Error saving index: {e}")
        
    return entry
