import os
import uuid
from typing import Dict, Any
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from backend.app.config import REPORTS_DIR

def generate_pdf_report(prediction_data: Dict[str, Any], patient_data: Dict[str, Any]) -> str:
    """
    Generates a structured clinical decision report as a PDF artifact.
    Returns absolute filepath of the generated PDF.
    """
    filename = f"CDSS_Diabetes_Report_{uuid.uuid4().hex[:8]}.pdf"
    filepath = os.path.join(REPORTS_DIR, filename)

    doc = SimpleDocTemplate(filepath, pagesize=letter, rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36)
    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#0F172A'),
        fontName='Helvetica-Bold'
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#475569'),
        fontName='Helvetica'
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontSize=13,
        leading=16,
        textColor=colors.HexColor('#1E293B'),
        fontName='Helvetica-Bold',
        spaceBefore=10,
        spaceAfter=6
    )

    body_style = ParagraphStyle(
        'BodyText',
        parent=styles['Normal'],
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#334155')
    )

    story = []

    # Title & Header
    story.append(Paragraph("Clinical Decision Support System (CDSS)", title_style))
    story.append(Paragraph("Diabetes Risk Assessment & Conformal Explainability Report", subtitle_style))
    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#2563EB'), spaceAfter=15))

    # Patient Demographic & Key Vitals Table
    story.append(Paragraph("Patient Overview & Mandatory Biomarkers", section_heading))
    patient_table_data = [
        ["Age / Gender:", f"{patient_data.get('age', 'N/A')} yrs / {patient_data.get('gender', 'N/A')}", "BMI:", f"{patient_data.get('bmi', 'N/A')} kg/m²"],
        ["HbA1c Level:", f"{patient_data.get('hba1c', 'N/A')} %", "Fasting Glucose:", f"{patient_data.get('fasting_glucose', 'N/A')} mg/dL"],
        ["Random Glucose:", f"{patient_data.get('random_glucose', 'N/A')} mg/dL", "Blood Pressure:", f"{patient_data.get('systolic_bp', 120)}/{patient_data.get('diastolic_bp', 80)} mmHg"]
    ]
    t_patient = Table(patient_table_data, colWidths=[110, 150, 110, 150])
    t_patient.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8FAFC')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
        ('FONTNAME', (0,0), (-1,-1), 'Helvetica'),
        ('FONTSIZE', (0,0), (-1,-1), 9),
        ('TEXTCOLOR', (0,0), (-1,-1), colors.HexColor('#1E293B')),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_patient)
    story.append(Spacer(1, 12))

    # Prediction Summary Box
    story.append(Paragraph("Model Diagnostic Classification & Conformal Calibration", section_heading))
    pred_class = prediction_data.get("predicted_class", "N/A")
    conf_score = prediction_data.get("confidence_score", 0.0)
    conf_cat = prediction_data.get("confidence_category", "N/A")
    sev_index = prediction_data.get("severity_index", 0.0)

    bg_color = colors.HexColor('#DCFCE7') if pred_class == "Healthy" else (colors.HexColor('#FEF3C7') if pred_class == "Prediabetes" else colors.HexColor('#FEE2E2'))

    diag_summary = [
        ["Diagnostic Assessment:", pred_class.upper()],
        ["Conformal Confidence:", f"{conf_score}% ({conf_cat})"],
        ["Disease Severity Index:", f"{sev_index} / 100 continuous score"],
        ["Prediction Uncertainty:", prediction_data.get("uncertainty_alert", "None")]
    ]
    t_diag = Table(diag_summary, colWidths=[160, 360])
    t_diag.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), bg_color),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('FONTNAME', (0,0), (0,-1), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 9.5),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_diag)
    story.append(Spacer(1, 12))

    # SHAP Explanations
    story.append(Paragraph("Top Biomarker Feature Drivers (SHAP Analysis)", section_heading))
    shap_data = [["Biomarker Feature", "Actual Value", "SHAP Impact", "Direction"]]
    shap_info = prediction_data.get("shap_explanation", {})
    
    for item in shap_info.get("top_risk_increasing_biomarkers", [])[:3]:
        shap_data.append([
            item.get("display_name", item["feature"]),
            str(item.get("actual_value", "N/A")),
            f"+{item['shap_value']:.4f}",
            "Risk Increasing"
        ])
    for item in shap_info.get("top_risk_reducing_biomarkers", [])[:3]:
        shap_data.append([
            item.get("display_name", item["feature"]),
            str(item.get("actual_value", "N/A")),
            f"{item['shap_value']:.4f}",
            "Risk Decreasing"
        ])
        
    t_shap = Table(shap_data, colWidths=[180, 110, 110, 120])
    t_shap.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#F1F5F9')),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
        ('FONTSIZE', (0,0), (-1,-1), 8.5),
        ('PADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_shap)
    story.append(Spacer(1, 12))

    # Clinical Recommendations
    story.append(Paragraph("Actionable CDSS Clinical Recommendations", section_heading))
    recs = prediction_data.get("cdss_recommendations", [])
    for rec in recs:
        title_p = Paragraph(f"<b>[{rec.get('priority', 'Medium').upper()}] {rec.get('title')}</b> ({rec.get('category')})", body_style)
        action_p = Paragraph(rec.get('action', ''), body_style)
        story.append(title_p)
        story.append(action_p)
        story.append(Spacer(1, 6))

    # Footer Disclaimer
    story.append(Spacer(1, 15))
    disclaimer = Paragraph(
        "<i>Disclaimer: This report is generated by an AI-assisted Decision Support System (CDSS) for investigational and clinical workflow support. Final diagnosis must be confirmed by a licensed medical provider.</i>",
        subtitle_style
    )
    story.append(disclaimer)

    doc.build(story)
    return filepath
