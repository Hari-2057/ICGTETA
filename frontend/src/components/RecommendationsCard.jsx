import React from 'react';
import { Stethoscope, Download } from 'lucide-react';

export const RecommendationsCard = ({ recommendations, onDownloadReport, isDownloading }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-5 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 gap-3">
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center space-x-2">
            <Stethoscope className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Actionable Clinical Decision Support (CDSS Action Cards)</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Standardized ADA & WHO clinical recommendations tailored to patient blood test findings.
          </p>
        </div>

        <button
          onClick={onDownloadReport}
          disabled={isDownloading}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-extrabold text-xs tracking-wide shadow-md shadow-cyan-600/20 transition self-start sm:self-auto"
        >
          {isDownloading ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-white" />
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
              className={`p-4 rounded-xl border transition shadow-sm ${
                isHigh 
                  ? 'border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200' 
                  : isMed 
                  ? 'border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200' 
                  : 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">{rec.category}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${
                    isHigh
                      ? 'bg-rose-100 dark:bg-rose-900/80 text-rose-800 dark:text-rose-200 border-rose-300 dark:border-rose-700'
                      : isMed
                      ? 'bg-amber-100 dark:bg-amber-900/80 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700'
                      : 'bg-emerald-100 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700'
                  }`}
                >
                  {rec.priority} Priority
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1.5">{rec.title}</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{rec.action}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
