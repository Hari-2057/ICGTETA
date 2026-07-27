import React, { useState } from 'react';
import { FileUp, CheckCircle, AlertCircle, FileText, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export const PdfReportUploader = ({ onBiomarkersExtracted }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // { type: 'success'|'error', message: '' }
  const [dragActive, setDragActive] = useState(false);

  const processFile = async (file) => {
    if (!file) return;

    if (!file.name.endsWith('.pdf')) {
      setUploadStatus({
        type: 'error',
        message: 'Invalid file format. Please upload a PDF patient blood laboratory report.'
      });
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const result = await api.uploadReportPdf(file);

      if (result && result.biomarkers && Object.keys(result.biomarkers).length > 0) {
        onBiomarkersExtracted(result.biomarkers);
        setUploadStatus({
          type: 'success',
          message: `Successfully extracted ${result.extracted_count} clinical laboratory biomarkers from "${file.name}". Click "Run CDSS Risk Assessment" below.`
        });
      } else {
        setUploadStatus({
          type: 'error',
          message: 'Could not extract clinical biomarkers from this PDF file. Please enter values manually.'
        });
      }
    } catch (err) {
      console.error('PDF parsing error:', err);
      setUploadStatus({
        type: 'error',
        message: 'Failed to process blood report PDF. Please try again or enter values manually.'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-md transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4 gap-2">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800">
            <FileUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
              Automated PDF Blood Lab Report Importer
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Upload patient blood test PDF report to auto-fill input filds (Does NOT auto-run assessment).
            </p>
          </div>
        </div>

        <span className="self-start sm:self-auto px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-cyan-50 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 shadow-sm flex items-center space-x-1">
          <Sparkles className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
          <span>Biomarker OCR Parser</span>
        </span>
      </div>

      {/* Upload Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 relative ${
          dragActive
            ? 'border-cyan-500 bg-cyan-50/70 dark:bg-cyan-950/50 scale-[1.01]'
            : 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/70 dark:hover:bg-slate-800/80 hover:border-cyan-400'
        }`}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          {isUploading ? (
            <>
              <div className="p-3 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 animate-spin">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Extracting Laboratory Biomarkers from PDF...
              </span>
            </>
          ) : (
            <>
              <div className="p-3 rounded-full bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800 shadow-sm">
                <FileUp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                  Drag & Drop Patient Lab Report PDF here, or <span className="text-cyan-700 dark:text-cyan-400 underline">Browse File</span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                  Supports HbA1c, Fasting Glucose, Lipid Profile, BP & Renal Panels
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Upload Status Notification */}
      {uploadStatus && (
        <div
          className={`mt-3 p-3.5 rounded-xl border text-xs font-semibold flex items-start space-x-2.5 shadow-sm ${
            uploadStatus.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              : 'bg-rose-50 dark:bg-rose-950/80 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
          }`}
        >
          {uploadStatus.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
          )}
          <span className="leading-relaxed">{uploadStatus.message}</span>
        </div>
      )}
    </div>
  );
};
