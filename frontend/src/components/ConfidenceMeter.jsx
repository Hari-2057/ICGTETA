import React from 'react';
import { ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

export const ConfidenceMeter = ({ prediction }) => {
  const { confidence_score, confidence_category, uncertainty_alert, conformal_prediction_set } = prediction;

  const isReliable = confidence_category === 'Reliable';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-4 transition-colors duration-300">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>Conformal Confidence Calibration</span>
        </h3>
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
          isReliable 
            ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 shadow-sm' 
            : 'bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800 shadow-sm'
        }`}>
          {confidence_category}
        </span>
      </div>

      <div className="space-y-3">
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Conformal Prediction Set (α = 0.05)</span>
          </div>
          <div className="flex items-center space-x-1">
            {conformal_prediction_set?.map((cls, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded text-[11px] font-extrabold bg-cyan-50 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                {cls}
              </span>
            ))}
          </div>
        </div>

        {/* Uncertainty Alert Box */}
        <div className={`p-3.5 rounded-xl border text-xs font-medium flex items-start space-x-2.5 ${
          isReliable
            ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
            : 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
        }`}>
          {isReliable ? (
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          )}
          <p className="leading-relaxed font-semibold">{uncertainty_alert}</p>
        </div>
      </div>
    </div>
  );
};
