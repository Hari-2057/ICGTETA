import React from 'react';
import { Stethoscope, Download, CheckCircle2, FileText } from 'lucide-react';

export const RecommendationsCard = ({ recommendations, onDownloadReport, isDownloading }) => {
  return (
    <div className="glass-panel rounded-2xl p-6 shadow-2xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 pb-4 gap-3">
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-100 flex items-center space-x-2">
            <Stethoscope className="w-4 h-4 text-cyan-400" />
            <span>Actionable Clinical Decision Support (CDSS Action Cards)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Standardized ADA & WHO clinical recommendations tailored to patient blood test findings.
          </p>
        </div>

        <button
          onClick={onDownloadReport}
          disabled={isDownloading}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl liquid-btn-primary text-slate-950 font-extrabold text-xs tracking-wide transition self-start sm:self-auto"
        >
          {isDownloading ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-slate-950" />
              <span>Download PDF Clinical Report</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations?.map((rec, idx) => {
          const isHigh = rec.priority === 'High';
          const isMed = rec.priority === 'Medium';
          return (
            <div
              key={idx}
              className={`p-4 rounded-xl glass-card border transition ${
                isHigh 
                  ? 'border-rose-500/30 bg-rose-950/20' 
                  : isMed 
                  ? 'border-amber-500/30 bg-amber-950/20' 
                  : 'border-emerald-500/30 bg-emerald-950/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-200">{rec.category}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${
                    isHigh
                      ? 'bg-rose-950 text-rose-300 border-rose-800'
                      : isMed
                      ? 'bg-amber-950 text-amber-300 border-amber-800'
                      : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  }`}
                >
                  {rec.priority} Priority
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-100 mb-1.5">{rec.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{rec.action}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
