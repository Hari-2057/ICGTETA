import React from 'react';
import { ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

export const ConfidenceMeter = ({ prediction }) => {
  const { confidence_score, confidence_category, uncertainty_alert, conformal_prediction_set } = prediction;

  const isReliable = confidence_category === 'Reliable';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-cyan-600" />
          <span>Conformal Confidence Calibration</span>
        </h3>
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
          isReliable 
            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-sm' 
            : 'bg-amber-50 text-amber-800 border-amber-300 shadow-sm'
        }`}>
          {confidence_category}
        </span>
      </div>

      <div className="space-y-3">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <span>Conformal Prediction Set (α = 0.05)</span>
          </div>
          <div className="flex items-center space-x-1">
            {conformal_prediction_set?.map((cls, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded text-[11px] font-extrabold bg-cyan-50 text-cyan-800 border border-cyan-200">
                {cls}
              </span>
            ))}
          </div>
        </div>

        {/* Uncertainty Alert Box */}
        <div className={`p-3.5 rounded-xl border text-xs font-medium flex items-start space-x-2.5 ${
          isReliable
            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
            : 'bg-amber-50/70 border-amber-200 text-amber-900'
        }`}>
          {isReliable ? (
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          )}
          <p className="leading-relaxed font-semibold">{uncertainty_alert}</p>
        </div>
      </div>
    </div>
  );
};
