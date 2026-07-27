import os
import json
import time
from typing import List, Dict, Any

DEFAULT_SUPABASE_KEY = "sb_publishable_LkPBGMkAOATPB2qUxBz0cA_2egzKInV"
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", DEFAULT_SUPABASE_KEY)

def is_supabase_configured() -> bool:
    return bool(SUPABASE_URL and SUPABASE_KEY)

def save_report_to_supabase(
    patient_data: Dict[str, Any],
    prediction: Dict[str, Any],
    generated_pdf_bytes: bytes = None,
    uploaded_pdf_bytes: bytes = None,
    patient_session_id: str = "session_default"
) -> Dict[str, Any]:
    """
    Saves report metadata, raw uploaded PDF, and generated clinical PDF to Supabase Database & Storage.
    """
    report_id = f"CDSS_Report_{int(time.time())}"
    report_entry = {
        "id": report_id,
        "patient_session_id": patient_session_id,
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "patient_age": patient_data.get("age", 45),
        "patient_gender": patient_data.get("gender", "Female"),
        "hba1c": patient_data.get("hba1c", 5.8),
        "fasting_glucose": patient_data.get("fasting_glucose", 105.0),
        "random_glucose": patient_data.get("random_glucose", 140.0),
        "predicted_class": prediction.get("predicted_class", "Healthy"),
        "confidence_score": prediction.get("confidence_score", 95.0),
        "severity_index": prediction.get("severity_index", 15.0),
        "uploaded_pdf_url": None,
        "generated_pdf_url": None,
        "storage_provider": "Supabase Storage & PostgreSQL" if is_supabase_configured() else "Local Isolation Storage"
    }

    if is_supabase_configured():
        try:
            from supabase import create_client
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

            # Upload generated clinical PDF report if available
            if generated_pdf_bytes:
                gen_path = f"generated/{report_id}.pdf"
                supabase.storage.from_("clinical-reports").upload(gen_path, generated_pdf_bytes, {"content-type": "application/pdf"})
                report_entry["generated_pdf_url"] = supabase.storage.from_("clinical-reports").get_public_url(gen_path)

            # Upload raw patient blood test PDF report if available
            if uploaded_pdf_bytes:
                up_path = f"uploaded/{report_id}_raw.pdf"
                supabase.storage.from_("uploaded-patient-pdfs").upload(up_path, uploaded_pdf_bytes, {"content-type": "application/pdf"})
                report_entry["uploaded_pdf_url"] = supabase.storage.from_("uploaded-patient-pdfs").get_public_url(up_path)

            # Insert metadata into 'patient_reports' table
            supabase.table("patient_reports").insert(report_entry).execute()
            print(f"[Supabase] Successfully saved report {report_id} for session {patient_session_id}")

        except Exception as e:
            print(f"[Supabase Sync Error]: {e}")

    return report_entry

def fetch_reports_from_supabase(patient_session_id: str = None) -> List[Dict[str, Any]]:
    """Fetches patient reports filtered by patient_session_id for patient isolation."""
    if is_supabase_configured():
        try:
            from supabase import create_client
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
            query = supabase.table("patient_reports").select("*").order("created_at", desc=True)
            if patient_session_id and patient_session_id != "ALL":
                query = query.eq("patient_session_id", patient_session_id)
            response = query.execute()
            if response.data:
                return response.data
        except Exception as e:
            print(f"[Supabase Query Error]: {e}")
            
    return []
