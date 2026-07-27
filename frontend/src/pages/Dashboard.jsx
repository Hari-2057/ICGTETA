import React, { useState } from 'react';
import { api } from '../services/api';
import { generateClientPdfReport } from '../utils/pdfGenerator';
import { PdfReportUploader } from '../components/PdfReportUploader';
import { LabInputForm } from '../components/LabInputForm';
import { RiskGauge } from '../components/RiskGauge';
import { ConfidenceMeter } from '../components/ConfidenceMeter';
import { SeverityCard } from '../components/SeverityCard';
import { ShapChart } from '../components/ShapChart';
import { RecommendationsCard } from '../components/RecommendationsCard';
import { Stethoscope, Sparkles } from 'lucide-react';

const EMPTY_LAB_DATA = {
  hba1c: '', fasting_glucose: '', random_glucose: '',
  age: '', gender: 'Female', bmi: '', weight: '', height: '',
  systolic_bp: '', diastolic_bp: '', waist_circ: '',
  smoking_status: 'Never', alcohol_consumption: 'None', physical_activity: 'Moderate', family_history: 'No',
  hemoglobin: '', rbc_count: '', wbc_count: '', platelet_count: '', hematocrit: '', mcv: '', mch: '', mchc: '',
  total_cholesterol: '', hdl: '', ldl: '', vldl: '', triglycerides: '',
  creatinine: '', bun: '', uric_acid: '', alt: '', ast: '', alp: '', bilirubin: '',
  sodium: '', potassium: '', chloride: ''
};

export const Dashboard = ({ onPredictionEvaluated }) => {
  const [labData, setLabData] = useState(EMPTY_LAB_DATA);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleBiomarkersExtracted = (extractedBiomarkers) => {
    const updatedData = { ...labData, ...extractedBiomarkers };
    setLabData(updatedData);
    setValidationError('');
    if (updatedData.hba1c && updatedData.fasting_glucose && updatedData.random_glucose) {
      handlePredict(updatedData);
    }
  };

  const handlePredict = async (dataToPredict = labData) => {
    const hba1c = Number(dataToPredict.hba1c);
    const fpg = Number(dataToPredict.fasting_glucose);
    const rpg = Number(dataToPredict.random_glucose);

    if (!dataToPredict.hba1c || !dataToPredict.fasting_glucose || !dataToPredict.random_glucose || isNaN(hba1c) || isNaN(fpg) || isNaN(rpg)) {
      setValidationError('Please enter mandatory laboratory biomarkers: HbA1c (%), Fasting Glucose (mg/dL), and Random Glucose (mg/dL).');
      return;
    }

    setValidationError('');
    setIsLoading(true);

    const filledPayload = {
      hba1c: hba1c,
      fasting_glucose: fpg,
      random_glucose: rpg,
      age: Number(dataToPredict.age) || 45,
      gender: dataToPredict.gender || 'Female',
      bmi: Number(dataToPredict.bmi) || 25.0,
      weight: Number(dataToPredict.weight) || 70.0,
      height: Number(dataToPredict.height) || 165.0,
      systolic_bp: Number(dataToPredict.systolic_bp) || 120.0,
      diastolic_bp: Number(dataToPredict.diastolic_bp) || 80.0,
      waist_circ: Number(dataToPredict.waist_circ) || 85.0,
      smoking_status: dataToPredict.smoking_status || 'Never',
      alcohol_consumption: dataToPredict.alcohol_consumption || 'None',
      physical_activity: dataToPredict.physical_activity || 'Moderate',
      family_history: dataToPredict.family_history || 'No',
      hemoglobin: Number(dataToPredict.hemoglobin) || 13.8,
      rbc_count: Number(dataToPredict.rbc_count) || 4.7,
      wbc_count: Number(dataToPredict.wbc_count) || 7.2,
      platelet_count: Number(dataToPredict.platelet_count) || 240.0,
      hematocrit: Number(dataToPredict.hematocrit) || 41.0,
      mcv: Number(dataToPredict.mcv) || 88.0,
      mch: Number(dataToPredict.mch) || 29.5,
      mchc: Number(dataToPredict.mchc) || 33.5,
      total_cholesterol: Number(dataToPredict.total_cholesterol) || 190.0,
      hdl: Number(dataToPredict.hdl) || 48.0,
      ldl: Number(dataToPredict.ldl) || 115.0,
      vldl: Number(dataToPredict.vldl) || 27.0,
      triglycerides: Number(dataToPredict.triglycerides) || 135.0,
      creatinine: Number(dataToPredict.creatinine) || 0.9,
      bun: Number(dataToPredict.bun) || 14.0,
      uric_acid: Number(dataToPredict.uric_acid) || 5.2,
      alt: Number(dataToPredict.alt) || 24.0,
      ast: Number(dataToPredict.ast) || 22.0,
      alp: Number(dataToPredict.alp) || 65.0,
      bilirubin: Number(dataToPredict.bilirubin) || 0.7,
      sodium: Number(dataToPredict.sodium) || 140.0,
      potassium: Number(dataToPredict.potassium) || 4.2,
      chloride: Number(dataToPredict.chloride) || 101.0
    };

    try {
      const res = await api.predict(filledPayload);
      setPrediction(res);
      if (onPredictionEvaluated) {
        onPredictionEvaluated(res);
      }
    } catch (err) {
      console.error('Inference error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePredict(labData);
  };

  const handleReset = () => {
    setValidationError('');
    setLabData(EMPTY_LAB_DATA);
    setPrediction(null);
  };

  const handleDownloadReport = async () => {
    if (!prediction) return;
    setIsDownloading(true);
    try {
      const success = await api.generateReport(labData);
      if (!success) {
        generateClientPdfReport(prediction, labData);
      }
    } catch {
      generateClientPdfReport(prediction, labData);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* PDF Lab Report Automated Importer */}
      <PdfReportUploader onBiomarkersExtracted={handleBiomarkersExtracted} />

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-7">
          <LabInputForm
            labData={labData}
            onChange={setLabData}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            onReset={handleReset}
            validationError={validationError}
          />
        </div>

        {/* Right Column: Prediction Results or Welcome Initial State */}
        <div className="lg:col-span-5 space-y-6">
          {prediction ? (
            <>
              <RiskGauge prediction={prediction} />
              <ConfidenceMeter prediction={prediction} />
              <SeverityCard prediction={prediction} />
            </>
          ) : (
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-8 shadow-xl text-center flex flex-col items-center justify-center min-h-[420px] space-y-4">
              <div className="p-4 rounded-2xl bg-cyan-950/60 text-cyan-400 border border-cyan-800/60 shadow-lg">
                <Stethoscope className="w-10 h-10 animate-bounce" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-100">
                  Ready for Patient Risk Assessment
                </h3>
                <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                  Upload a patient blood test PDF report above or enter mandatory laboratory biomarkers (<span className="text-cyan-400 font-semibold">HbA1c, Fasting Glucose, Random Glucose</span>) to run CDSS risk analysis.
                </p>
              </div>
              <div className="pt-2 flex items-center space-x-2 text-[11px] font-semibold text-cyan-400 bg-cyan-950/40 px-3 py-1.5 rounded-full border border-cyan-800/40">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ADA & WHO Diagnostic Standards Engine</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full-Width Section: SHAP Explanations & CDSS Clinical Action Cards */}
      {prediction && (
        <div className="space-y-6">
          <ShapChart shapExplanation={prediction.shap_explanation} />
          <RecommendationsCard
            recommendations={prediction.cdss_recommendations}
            onDownloadReport={handleDownloadReport}
            isDownloading={isDownloading}
          />
        </div>
      )}
    </div>
  );
};
