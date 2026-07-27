import React, { useState, useEffect } from 'react';
import { api, FALLBACK_PRESETS, computeFallbackPrediction } from '../services/api';
import { PatientPresets } from '../components/PatientPresets';
import { LabInputForm } from '../components/LabInputForm';
import { RiskGauge } from '../components/RiskGauge';
import { ConfidenceMeter } from '../components/ConfidenceMeter';
import { SeverityCard } from '../components/SeverityCard';
import { ShapChart } from '../components/ShapChart';
import { RecommendationsCard } from '../components/RecommendationsCard';

const DEFAULT_LAB_DATA = {
  hba1c: 5.8, fasting_glucose: 105.0, random_glucose: 140.0,
  age: 50, gender: 'Female', bmi: 27.5, weight: 70.0, height: 162.0,
  systolic_bp: 125.0, diastolic_bp: 80.0, waist_circ: 85.0,
  smoking_status: 'Never', alcohol_consumption: 'None', physical_activity: 'Moderate', family_history: 'No',
  hemoglobin: 13.8, rbc_count: 4.7, wbc_count: 7.2, platelet_count: 240.0, hematocrit: 41.0, mcv: 88.0, mch: 29.5, mchc: 33.5,
  total_cholesterol: 190.0, hdl: 48.0, ldl: 115.0, vldl: 27.0, triglycerides: 135.0,
  creatinine: 0.9, bun: 14.0, uric_acid: 5.2, alt: 24.0, ast: 22.0, alp: 65.0, bilirubin: 0.7,
  sodium: 140.0, potassium: 4.2, chloride: 101.0
};

export const Dashboard = ({ onOpenMetricsModal }) => {
  const [presets, setPresets] = useState(FALLBACK_PRESETS);
  const [activePresetId, setActivePresetId] = useState(null);
  const [labData, setLabData] = useState(DEFAULT_LAB_DATA);
  const [prediction, setPrediction] = useState(() => computeFallbackPrediction(DEFAULT_LAB_DATA));
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    fetchPresets();
    handlePredict(DEFAULT_LAB_DATA);
  }, []);

  const fetchPresets = async () => {
    try {
      const data = await api.getPresets();
      if (Array.isArray(data) && data.length > 0) {
        setPresets(data);
      }
    } catch {
      setPresets(FALLBACK_PRESETS);
    }
  };

  const handleSelectPreset = (preset) => {
    setActivePresetId(preset.id);
    setLabData(preset.data);
    handlePredict(preset.data);
  };

  const handlePredict = async (dataToPredict = labData) => {
    setIsLoading(true);
    try {
      const res = await api.predict(dataToPredict);
      setPrediction(res);
    } catch (err) {
      console.warn('Using client fallback calculation:', err);
      setPrediction(computeFallbackPrediction(dataToPredict));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePredict(labData);
  };

  const handleReset = () => {
    setActivePresetId(null);
    setLabData(DEFAULT_LAB_DATA);
    handlePredict(DEFAULT_LAB_DATA);
  };

  const handleDownloadReport = async () => {
    setIsDownloading(true);
    try {
      await api.generateReport(labData);
    } catch (err) {
      console.error('PDF report error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Patient Preset Bar */}
      <PatientPresets
        presets={presets}
        activePresetId={activePresetId}
        onSelectPreset={handleSelectPreset}
      />

      {/* Main Workspace Grid - Fully Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 39 Lab Inputs */}
        <div className="lg:col-span-7">
          <LabInputForm
            labData={labData}
            onChange={setLabData}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            onReset={handleReset}
          />
        </div>

        {/* Right Column: Risk Gauge, Conformal Confidence & Severity */}
        <div className="lg:col-span-5 space-y-6">
          <RiskGauge prediction={prediction} />
          <ConfidenceMeter prediction={prediction} />
          <SeverityCard prediction={prediction} />
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
