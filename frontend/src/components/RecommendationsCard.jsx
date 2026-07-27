import React from 'react';
import { Stethoscope, CheckCircle2, AlertOctagon, Download, ShieldAlert } from 'lucide-react';

export const RecommendationsCard = ({ recommendations, onDownloadReport, isDownloading }) => {
  if (!recommendations || recommendations.length === 0) return null;

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 mb-4 gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">
              Clinical Decision Support (CDSS Action Cards)
            </h3>
            <p className="text-xs text-slate-400">
              ADA & WHO guideline recommendations tailored to patient laboratory findings.
            </p>
          </div>
        </div>

        <button
          onClick={onDownloadReport}
          disabled={isDownloading}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition self-start sm:self-auto"
        >
          {isDownloading ? (
            <span className="flex items-center space-x-1.5">
              <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
              <span>Generating PDF...</span>
            </span>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Download PDF Clinical Report</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-300 flex items-center space-x-2">
                <span className="text-cyan-400 font-mono">[{rec.category}]</span>
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${getPriorityBadge(
                  rec.priority
                )}`}
              >
                {rec.priority} Priority
              </span>
            </div>
            <h4 className="font-bold text-sm text-slate-100 mb-1">{rec.title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{rec.action}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
