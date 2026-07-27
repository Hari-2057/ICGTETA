import re
import io
from typing import Dict, Any

def extract_lab_data_from_pdf_text(text: str) -> Dict[str, Any]:
    """
    Parses raw text extracted from a patient laboratory blood report PDF
    and returns a structured dictionary of clinical biomarkers.
    """
    extracted = {}
    
    # 1. Glycemic Biomarkers
    hba1c_match = re.search(r'(?:hba1c|glycated\s*hemoglobin|a1c)[^\d]*(\d+\.?\d*)', text, re.IGNORECASE)
    if hba1c_match:
        try:
            val = float(hba1c_match.group(1))
            if 3.0 <= val <= 18.0:
                extracted['hba1c'] = val
        except ValueError:
            pass

    fpg_match = re.search(r'(?:fasting\s*glucose|fasting\s*blood\s*sugar|fpg|fasting\s*plasma)[^\d]*(\d+\.?\d*)', text, re.IGNORECASE)
    if fpg_match:
        try:
            val = float(fpg_match.group(1))
            if 40.0 <= val <= 500.0:
                extracted['fasting_glucose'] = val
        except ValueError:
            pass

    rpg_match = re.search(r'(?:random\s*glucose|random\s*blood\s*sugar|rpg|postprandial)[^\d]*(\d+\.?\d*)', text, re.IGNORECASE)
    if rpg_match:
        try:
            val = float(rpg_match.group(1))
            if 40.0 <= val <= 600.0:
                extracted['random_glucose'] = val
        except ValueError:
            pass

    # 2. Vitals & Demographics
    bp_match = re.search(r'(?:blood\s*pressure|bp)[^\d]*(\d{2,3})\s*[\/\\]\s*(\d{2,3})', text, re.IGNORECASE)
    if bp_match:
        try:
            extracted['systolic_bp'] = float(bp_match.group(1))
            extracted['diastolic_bp'] = float(bp_match.group(2))
        except ValueError:
            pass

    bmi_match = re.search(r'(?:bmi|body\s*mass\s*index)[^\d]*(\d+\.?\d*)', text, re.IGNORECASE)
    if bmi_match:
        try:
            extracted['bmi'] = float(bmi_match.group(1))
        except ValueError:
            pass

    age_match = re.search(r'(?:age|years|yrs)[^\d]*(\d{1,3})', text, re.IGNORECASE)
    if age_match:
        try:
            extracted['age'] = int(age_match.group(1))
        except ValueError:
            pass

    gender_match = re.search(r'(?:gender|sex)[^\w]*(female|male)', text, re.IGNORECASE)
    if gender_match:
        extracted['gender'] = gender_match.group(1).capitalize()

    # 3. Lipid Panel
    tc_match = re.search(r'(?:total\s*cholesterol|cholesterol)[^\d]*(\d+\.?\d*)', text, re.IGNORECASE)
    if tc_match:
        try:
            extracted['total_cholesterol'] = float(tc_match.group(1))
        except ValueError:
            pass

    hdl_match = re.search(r'(?:hdl|high\s*density)[^\d]*(\d+\.?\d*)', text, re.IGNORECASE)
    if hdl_match:
        try:
            extracted['hdl'] = float(hdl_match.group(1))
        except ValueError:
            pass

    ldl_match = re.search(r'(?:ldl|low\s*density)[^\d]*(\d+\.?\d*)', text, re.IGNORECASE)
    if ldl_match:
        try:
            extracted['ldl'] = float(ldl_match.group(1))
        except ValueError:
            pass

    tg_match = re.search(r'(?:triglycerides|tg)[^\d]*(\d+\.?\d*)', text, re.IGNORECASE)
    if tg_match:
        try:
            extracted['triglycerides'] = float(tg_match.group(1))
        except ValueError:
            pass

    # 4. Renal & Liver
    creat_match = re.search(r'(?:creatinine|serum\s*creatinine)[^\d]*(\d+\.?\d*)', text, re.IGNORECASE)
    if creat_match:
        try:
            extracted['creatinine'] = float(creat_match.group(1))
        except ValueError:
            pass

    bun_match = re.search(r'(?:bun|blood\s*urea\s*nitrogen)[^\d]*(\d+\.?\d*)', text, re.IGNORECASE)
    if bun_match:
        try:
            extracted['bun'] = float(bun_match.group(1))
        except ValueError:
            pass

    alt_match = re.search(r'(?:alt|sgpt|alanine)[^\d]*(\d+\.?\d*)', text, re.IGNORECASE)
    if alt_match:
        try:
            extracted['alt'] = float(alt_match.group(1))
        except ValueError:
            pass

    ast_match = re.search(r'(?:ast|sgot|aspartate)[^\d]*(\d+\.?\d*)', text, re.IGNORECASE)
    if ast_match:
        try:
            extracted['ast'] = float(ast_match.group(1))
        except ValueError:
            pass

    return extracted


def parse_patient_pdf_bytes(pdf_bytes: bytes) -> Dict[str, Any]:
    """Extracts text from PDF bytes and returns parsed biomarkers."""
    text = ""
    try:
        from pypdf import PdfReader
        reader = PdfReader(io.BytesIO(pdf_bytes))
        for page in reader.pages:
            text += page.extract_text() or ""
    except Exception:
        try:
            import pdfplumber
            with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
                for page in pdf.pages:
                    text += page.extract_text() or ""
        except Exception as e:
            print(f"[PDF Parser] Error reading PDF: {e}")

    parsed = extract_lab_data_from_pdf_text(text)
    return parsed
