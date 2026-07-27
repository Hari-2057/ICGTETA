import React from 'react';
import { Stethoscope, Download } from 'lucide-react';

export const RecommendationsCard = ({ recommendations, onDownloadReport, isDownloading }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 flex items-center space-x-2">
            <Stethoscope className="w-4 h-4 text-cyan-600" />
            <span>Actionable Clinical Decision Support (CDSS Action Cards)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
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
                  ? 'border-rose-200 bg-rose-50/60 text-rose-950' 
                  : isMed 
                  ? 'border-amber-200 bg-amber-50/60 text-amber-950' 
                  : 'border-emerald-200 bg-emerald-50/60 text-emerald-950'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-slate-800">{rec.category}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${
                    isHigh
                      ? 'bg-rose-100 text-rose-800 border-rose-300'
                      : isMed
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  }`}
                >
                  {rec.priority} Priority
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 mb-1.5">{rec.title}</h4>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">{rec.action}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
