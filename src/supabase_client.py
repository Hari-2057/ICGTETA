import os
import json
import time
from typing import List, Dict, Any

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")

def is_supabase_configured() -> bool:
    return bool(SUPABASE_URL and SUPABASE_KEY)

def save_report_to_supabase(patient_data: Dict[str, Any], prediction: Dict[str, Any], pdf_bytes: bytes = None) -> Dict[str, Any]:
    """
    Saves patient report metadata and PDF file to Supabase Database & Storage.
    Falls back gracefully if Supabase credentials are not set.
    """
    report_entry = {
        "id": f"CDSS_Report_{int(time.time())}",
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "patient_age": patient_data.get("age", 45),
        "patient_gender": patient_data.get("gender", "Female"),
        "hba1c": patient_data.get("hba1c", 5.8),
        "fasting_glucose": patient_data.get("fasting_glucose", 105.0),
        "predicted_class": prediction.get("predicted_class", "Healthy"),
        "confidence_score": prediction.get("confidence_score", 95.0),
        "severity_index": prediction.get("severity_index", 15.0),
        "storage_provider": "Supabase PostgreSQL & Storage" if is_supabase_configured() else "Backend In-Memory Index"
    }

    if is_supabase_configured():
        try:
            from supabase import create_client
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
            
            # Insert metadata record into 'patient_reports' table
            res = supabase.table("patient_reports").insert(report_entry).execute()
            print("[Supabase] Successfully saved report to Supabase PostgreSQL table 'patient_reports'")
            
            # If PDF bytes provided, upload to Supabase Storage bucket 'patient-reports'
            if pdf_bytes:
                bucket_name = "patient-reports"
                file_path = f"{report_entry['id']}.pdf"
                supabase.storage.from_(bucket_name).upload(file_path, pdf_bytes, {"content-type": "application/pdf"})
                public_url = supabase.storage.from_(bucket_name).get_public_url(file_path)
                report_entry["pdf_url"] = public_url
                print(f"[Supabase] Uploaded PDF to Supabase Storage: {public_url}")

        except Exception as e:
            print(f"[Supabase Sync Error]: {e}")

    return report_entry

def fetch_reports_from_supabase() -> List[Dict[str, Any]]:
    """Fetches saved patient reports from Supabase if configured."""
    if is_supabase_configured():
        try:
            from supabase import create_client
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
            response = supabase.table("patient_reports").select("*").order("created_at", desc=True).execute()
            if response.data:
                return response.data
        except Exception as e:
            print(f"[Supabase Query Error]: {e}")
            
    return []
