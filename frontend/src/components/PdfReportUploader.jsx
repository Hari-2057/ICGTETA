import React, { useState, useRef } from 'react';
import { FileText, Upload, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export const PdfReportUploader = ({ onBiomarkersExtracted }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [extractedInfo, setExtractedInfo] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processPdfFile(file);
  };

  const processPdfFile = async (file) => {
    if (!file.name.endsWith('.pdf')) {
      setErrorMsg('Please select a valid PDF blood report file (.pdf).');
      return;
    }

    setErrorMsg('');
    setIsUploading(true);
    try {
      const data = await api.uploadReportPdf(file);
      setExtractedInfo(data);
      if (data.biomarkers && Object.keys(data.biomarkers).length > 0) {
        onBiomarkersExtracted(data.biomarkers);
      } else {
        setErrorMsg('Could not detect standard biomarkers in PDF text. Please verify PDF format or enter values manually.');
      }
    } catch (err) {
      console.error('PDF parsing error:', err);
      setErrorMsg('Failed to process PDF report. Please verify PDF structure or input values manually.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUseSamplePdf = async () => {
    setIsUploading(true);
    setErrorMsg('');
    try {
      const sampleBiomarkers = {
        hba1c: 6.2,
        fasting_glucose: 118.0,
        random_glucose: 155.0,
        age: 52,
        gender: "Female",
        bmi: 29.4,
        systolic_bp: 134.0,
        diastolic_bp: 86.0,
        total_cholesterol: 210.0,
        hdl: 42.0,
        ldl: 138.0,
        triglycerides: 180.0,
        creatinine: 1.0,
        bun: 16.0,
        alt: 34.0,
        ast: 28.0
      };
      setExtractedInfo({
        filename: "Sample_Patient_Blood_Lab_Report.pdf",
        extracted_count: Object.keys(sampleBiomarkers).length,
        biomarkers: sampleBiomarkers
      });
      onBiomarkersExtracted(sampleBiomarkers);
    } catch {
      setErrorMsg('Sample PDF load error.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 mb-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 mb-4 gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-100 flex items-center space-x-2">
              <span>Automated Patient Lab PDF Report Importer</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                PDF Extractor
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Upload a patient laboratory blood test PDF report to auto-fill form fields. (Click "Run CDSS Risk Assessment" to evaluate).
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleUseSamplePdf}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs border border-slate-700 transition self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Load Sample Patient Lab PDF</span>
        </button>
      </div>

      {/* Upload Drag & Drop Dropzone */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf"
        className="hidden"
      />

      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-slate-800 hover:border-cyan-500/60 bg-slate-950/60 hover:bg-slate-950 p-6 rounded-xl text-center cursor-pointer transition flex flex-col items-center justify-center space-y-2 group"
      >
        {isUploading ? (
          <div className="flex flex-col items-center space-y-2 py-2">
            <span className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></span>
            <span className="text-xs font-semibold text-cyan-300">Extracting biomarkers into form fields...</span>
          </div>
        ) : (
          <>
            <div className="p-3 rounded-full bg-slate-900 text-slate-400 group-hover:text-cyan-400 group-hover:bg-cyan-950 transition">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition">
                Click to browse or drop patient PDF blood report here
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Parses HbA1c, Fasting Glucose, Lipid panel, Renal & Liver biomarkers into form fields
              </span>
            </div>
          </>
        )}
      </div>

      {/* Success Notification */}
      {extractedInfo && (
        <div className="mt-3.5 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              Extracted <b>{extractedInfo.extracted_count}</b> biomarkers into form fields! Click <b>Run CDSS Risk Assessment</b> below to analyze.
            </span>
          </div>
          <span className="text-[10px] text-emerald-400/80 font-normal">Form Auto-Filled</span>
        </div>
      )}

      {/* Error Notification */}
      {errorMsg && (
        <div className="mt-3.5 p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 flex items-center space-x-2 text-xs font-semibold">
          <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
