import React from 'react';
import { ShieldCheck, AlertTriangle, HelpCircle, FilePlus2 } from 'lucide-react';

export const ConfidenceMeter = ({ prediction }) => {
  if (!prediction) return null;

  const { confidence_score, confidence_category, uncertainty_alert, conformal_prediction_set } = prediction;

  const isUncertain = confidence_category === 'Uncertain' || confidence_score < 70.0;

  const getStyle = () => {
    switch (confidence_category) {
      case 'Reliable':
        return {
          badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          icon: ShieldCheck,
          label: 'High Confidence (Reliable)'
        };
      case 'Moderate':
        return {
          badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          icon: AlertTriangle,
          label: 'Moderate Confidence'
        };
      default:
        return {
          badgeBg: 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse',
          icon: HelpCircle,
          label: 'High Diagnostic Uncertainty (<70%)'
        };
    }
  };

  const style = getStyle();
  const Icon = style.icon;

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Conformal Prediction & Uncertainty
        </h3>
        <div className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center space-x-1.5 ${style.badgeBg}`}>
          <Icon className="w-3.5 h-3.5" />
          <span>{style.label}</span>
        </div>
      </div>

      {/* Prediction Set */}
      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 mb-3 flex items-center justify-between">
        <span className="text-xs text-slate-400 font-medium">Conformal Prediction Set (Coverage Threshold):</span>
        <div className="flex space-x-1.5">
          {conformal_prediction_set?.map((cls, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60 text-xs font-bold">
              {cls}
            </span>
          ))}
        </div>
      </div>

      {/* Uncertainty Alert Callout Banner */}
      {isUncertain ? (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0 animate-bounce" />
            <div>
              <h4 className="font-bold text-sm text-rose-200">High Prediction Uncertainty Callout!</h4>
              <p className="text-xs leading-relaxed mt-1 text-rose-300/90">{uncertainty_alert}</p>
              <div className="mt-2 flex items-center space-x-2 text-xs font-bold text-rose-400 bg-rose-900/40 px-2.5 py-1 rounded border border-rose-800/40">
                <FilePlus2 className="w-3.5 h-3.5" />
                <span>Recommended: Order 75g OGTT / Fructosamine Test & Repeat Blood Draw</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <span className="font-semibold text-emerald-400">Calibrated & Reliable: </span>
          {uncertainty_alert}
        </div>
      )}
    </div>
  );
};
