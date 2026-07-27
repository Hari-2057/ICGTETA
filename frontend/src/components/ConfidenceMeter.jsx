import React from 'react';
import { ShieldCheck, AlertCircle, Sparkles, HelpCircle } from 'lucide-react';

export const ConfidenceMeter = ({ prediction }) => {
  const { confidence_score, confidence_category, uncertainty_alert, conformal_prediction_set } = prediction;

  const isReliable = confidence_category === 'Reliable';

  return (
    <div className="glass-panel rounded-2xl p-6 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Conformal Confidence Calibration</span>
        </h3>
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
          isReliable 
            ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]' 
            : 'bg-amber-950/70 text-amber-300 border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
        }`}>
          {confidence_category}
        </span>
      </div>

      <div className="space-y-3">
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Conformal Prediction Set (α = 0.05)</span>
          </div>
          <div className="flex items-center space-x-1">
            {conformal_prediction_set?.map((cls, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                {cls}
              </span>
            ))}
          </div>
        </div>

        {/* Uncertainty Alert Box */}
        <div className={`p-3.5 rounded-xl border text-xs font-medium flex items-start space-x-2.5 backdrop-blur-md ${
          isReliable
            ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300'
            : 'bg-amber-950/30 border-amber-800/60 text-amber-300'
        }`}>
          {isReliable ? (
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          )}
          <p className="leading-relaxed">{uncertainty_alert}</p>
        </div>
      </div>
    </div>
  );
};
