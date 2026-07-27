from typing import Dict, Any, List

def generate_clinical_recommendations(
    predicted_class: str,
    confidence_category: str,
    confidence_score: float,
    lab_data: Dict[str, Any]
) -> List[Dict[str, str]]:
    """
    Generates actionable, ADA-aligned clinical decision support system (CDSS) advice cards.
    """
    recommendations = []
    
    hba1c = float(lab_data.get("hba1c", 5.0))
    fpg = float(lab_data.get("fasting_glucose", 90.0))
    rpg = float(lab_data.get("random_glucose", 110.0))
    tg = float(lab_data.get("triglycerides", 120.0))
    hdl = float(lab_data.get("hdl", 50.0))
    creatinine = float(lab_data.get("creatinine", 0.9))
    bun = float(lab_data.get("bun", 14.0))
    alt = float(lab_data.get("alt", 25.0))
    bmi = float(lab_data.get("bmi", 24.0))
    gender = str(lab_data.get("gender", "Female")).lower()
    
    # 1. Glycemic Recommendation
    if predicted_class == "Type 2 Diabetes" or hba1c >= 6.5 or fpg >= 126.0 or rpg >= 200.0:
        recommendations.append({
            "category": "Glycemic Management",
            "priority": "High",
            "title": "Urgent Endocrinologist Consultation & Glycemic Control",
            "action": "Initiate comprehensive glycemic management plan per ADA standards. Schedule urgent endocrinologist evaluation, evaluate Metformin or oral hypoglycemic therapy, and conduct self-monitoring of blood glucose (SMBG)."
        })
    elif predicted_class == "Prediabetes" or (5.7 <= hba1c <= 6.4) or (100.0 <= fpg <= 125.0):
        recommendations.append({
            "category": "Glycemic Management",
            "priority": "Medium",
            "title": "Diabetes Prevention Program (DPP) & Lifestyle Intervention",
            "action": "Target 5-7% weight loss through dietary caloric restriction and 150+ minutes/week of moderate physical activity. Order 2-hour Oral Glucose Tolerance Test (OGTT) and schedule 3-month follow-up lab review."
        })
    else:
        recommendations.append({
            "category": "Glycemic Management",
            "priority": "Low",
            "title": "Routine Annual Glycemic Screening",
            "action": "Patient currently exhibits healthy glycemic parameters. Recommend maintaining balanced nutrition and annual routine fasting blood glucose check."
        })

    # 2. Cardiovascular & Lipid Management
    hdl_cutoff = 40.0 if gender == "male" else 50.0
    if tg > 150.0 or hdl < hdl_cutoff:
        recommendations.append({
            "category": "Dyslipidemia & Cardiovascular Risk",
            "priority": "Medium",
            "title": "Atherogenic Lipid Profile Mitigation",
            "action": f"Hypertriglyceridemia (TG = {tg} mg/dL) or low HDL ({hdl} mg/dL) detected. Evaluate 10-year ASCVD risk score, recommend low-saturated fat diet, and consider statin therapy evaluation."
        })

    # 3. Renal Health Assessment
    if creatinine > 1.2 or bun > 20.0:
        recommendations.append({
            "category": "Renal Function",
            "priority": "High",
            "title": "Diabetic Kidney Disease (DKD) Screening",
            "action": f"Elevated renal markers detected (Serum Creatinine: {creatinine} mg/dL, BUN: {bun} mg/dL). Order urine albumin-to-creatinine ratio (uACR) test and evaluate eGFR."
        })

    # 4. Hepatic Health Assessment
    if alt > 45.0 or float(lab_data.get("ast", 25.0)) > 45.0:
        recommendations.append({
            "category": "Hepatic Health",
            "priority": "Medium",
            "title": "Metabolic Dysfunction-Associated Steatotic Liver Disease (MASLD) Evaluation",
            "action": f"Elevated transaminases (ALT = {alt} U/L). Perform liver ultrasound assessment and screen for insulin resistance-associated hepatic steatosis."
        })

    # 5. Model Uncertainty Alert
    if confidence_category == "Uncertain" or confidence_score < 70.0:
        recommendations.append({
            "category": "Diagnostic Uncertainty Alert",
            "priority": "High",
            "title": "Secondary Diagnostic Testing Required",
            "action": f"Prediction confidence is low ({confidence_score}%). Do not rely solely on automated classification. Perform confirmatory 75g Oral Glucose Tolerance Test (OGTT), Fructosamine assay, or repeat fasting venous blood draw."
        })

    return recommendations
