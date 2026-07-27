import { jsPDF } from 'jspdf';

export function generateClientPdfReport(prediction, labData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter'
  });

  const pw = doc.internal.pageSize.getWidth();
  let y = 40;

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pw, 70, 'F');

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("Clinical Decision Support System (CDSS)", 40, y);

  y += 20;
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text("Diabetes Risk Assessment & Conformal Explainability Report", 40, y);

  y = 90;

  // Section 1: Patient Overview
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59); // slate-800
  doc.text("1. Patient Laboratory Overview", 40, y);

  y += 12;
  doc.setLineWidth(1);
  doc.setDrawColor(226, 232, 240);
  doc.line(40, y, pw - 40, y);

  y += 18;
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);

  const col1 = 40;
  const col2 = 180;
  const col3 = 320;
  const col4 = 460;

  doc.text(`Age: ${labData.age || 'N/A'} yrs`, col1, y);
  doc.text(`Gender: ${labData.gender || 'N/A'}`, col2, y);
  doc.text(`BMI: ${labData.bmi || 'N/A'} kg/m²`, col3, y);
  doc.text(`Blood Pressure: ${labData.systolic_bp || 120}/${labData.diastolic_bp || 80} mmHg`, col4, y);

  y += 16;
  doc.setFont('Helvetica', 'bold');
  doc.text(`HbA1c Level: ${labData.hba1c || 'N/A'} %`, col1, y);
  doc.text(`Fasting Glucose: ${labData.fasting_glucose || 'N/A'} mg/dL`, col2, y);
  doc.text(`Random Glucose: ${labData.random_glucose || 'N/A'} mg/dL`, col3, y);
  doc.setFont('Helvetica', 'normal');

  y += 25;

  // Section 2: Diagnostic Assessment
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text("2. Diagnostic Classification & Conformal Calibration", 40, y);

  y += 12;
  doc.line(40, y, pw - 40, y);

  y += 15;
  const predClass = prediction.predicted_class || 'Healthy';
  const confScore = prediction.confidence_score || 95.0;
  const confCat = prediction.confidence_category || 'Reliable';
  const sevScore = prediction.severity_index || 0.0;

  let boxBg = [220, 252, 231]; // emerald-100
  if (predClass === 'Prediabetes') boxBg = [254, 243, 199]; // amber-100
  if (predClass === 'Type 2 Diabetes') boxBg = [254, 226, 226]; // rose-100

  doc.setFillColor(boxBg[0], boxBg[1], boxBg[2]);
  doc.roundedRect(40, y, pw - 80, 55, 6, 6, 'F');

  y += 20;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(`Diagnostic Assessment: ${predClass.toUpperCase()}`, 55, y);

  y += 16;
  doc.setFontSize(9);
  doc.text(`Calibrated Confidence: ${confScore}% (${confCat})  |  Disease Severity Index: ${sevScore} / 100`, 55, y);

  y += 35;

  // Section 3: SHAP Feature Attributions
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text("3. Top Biomarker Feature Drivers (SHAP Analysis)", 40, y);

  y += 12;
  doc.line(40, y, pw - 40, y);

  y += 18;
  doc.setFontSize(9);

  const shapInfo = prediction.shap_explanation || {};
  const riskIncreasing = shapInfo.top_risk_increasing_biomarkers || [];
  const riskReducing = shapInfo.top_risk_reducing_biomarkers || [];

  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(225, 29, 72); // rose-600
  doc.text("Top Risk-Increasing Biomarkers:", 40, y);

  y += 14;
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  if (riskIncreasing.length > 0) {
    riskIncreasing.slice(0, 3).forEach(item => {
      doc.text(`• ${item.display_name}: Value = ${item.actual_value ?? 'N/A'} (SHAP Impact: +${item.shap_value.toFixed(3)})`, 55, y);
      y += 14;
    });
  } else {
    doc.text("• No positive risk drivers detected.", 55, y);
    y += 14;
  }

  y += 4;
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(16, 185, 129); // emerald-500
  doc.text("Top Protective / Risk-Reducing Biomarkers:", 40, y);

  y += 14;
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  if (riskReducing.length > 0) {
    riskReducing.slice(0, 3).forEach(item => {
      doc.text(`• ${item.display_name}: Value = ${item.actual_value ?? 'N/A'} (SHAP Impact: ${item.shap_value.toFixed(3)})`, 55, y);
      y += 14;
    });
  } else {
    doc.text("• No negative risk drivers detected.", 55, y);
    y += 14;
  }

  y += 15;

  // Section 4: CDSS Recommendations
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text("4. Actionable CDSS Clinical Recommendations", 40, y);

  y += 12;
  doc.line(40, y, pw - 40, y);

  y += 18;
  const recs = prediction.cdss_recommendations || [];
  doc.setFontSize(8.5);

  recs.forEach(rec => {
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`[${(rec.priority || 'Medium').toUpperCase()}] ${rec.title || ''}`, 40, y);
    
    y += 12;
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const splitAction = doc.splitTextToSize(rec.action || '', pw - 80);
    doc.text(splitAction, 40, y);
    y += splitAction.length * 11 + 6;
  });

  // Footer Disclaimer
  y = Math.max(y + 15, 720);
  doc.setLineWidth(0.5);
  doc.setDrawColor(203, 213, 225);
  doc.line(40, y, pw - 40, y);

  y += 14;
  doc.setFont('Helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Disclaimer: Generated by AI-assisted Decision Support System (CDSS). Final diagnosis must be confirmed by a licensed medical provider.", 40, y);

  // Trigger browser download directly
  const filename = `Clinical_CDSS_Diabetes_Report_${Date.now()}.pdf`;
  doc.save(filename);
}
