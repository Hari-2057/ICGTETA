import React from 'react';
import { TrendingUp, TrendingDown, HelpCircle, Layers } from 'lucide-react';

export const ShapChart = ({ shapExplanation }) => {
  if (!shapExplanation) return null;

  const { top_risk_increasing_biomarkers = [], top_risk_reducing_biomarkers = [] } = shapExplanation;

  return (
    <div className="glass-panel rounded-2xl p-6 shadow-2xl space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-100 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>SHAP TreeExplainer Feature Attributions</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Quantifies the exact positive & protective contribution of each patient biomarker to the final decision.
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-cyan-950/80 text-cyan-300 border border-cyan-800/80">
          SHAP Model Explainability
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Risk-Increasing Biomarkers (Positive SHAP Values) */}
        <div className="p-4 rounded-xl glass-card border-rose-500/20">
          <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider mb-3 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-rose-400" />
            <span>Risk-Increasing Drivers (+ SHAP)</span>
          </h4>

          <div className="space-y-3">
            {top_risk_increasing_biomarkers.length > 0 ? (
              top_risk_increasing_biomarkers.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-200">{item.display_name || item.feature}</span>
                    <span className="text-rose-400 font-mono font-bold">+{item.shap_value.toFixed(3)}</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-rose-600 to-rose-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.abs(item.shap_value) * 60)}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-slate-500">Patient Value: {item.actual_value ?? 'N/A'}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic py-2">No significant positive risk drivers.</p>
            )}
          </div>
        </div>

        {/* Risk-Reducing Biomarkers (Protective SHAP Values) */}
        <div className="p-4 rounded-xl glass-card border-emerald-500/20">
          <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-3 flex items-center space-x-2">
            <TrendingDown className="w-4 h-4 text-emerald-400" />
            <span>Protective Factors (- SHAP)</span>
          </h4>

          <div className="space-y-3">
            {top_risk_reducing_biomarkers.length > 0 ? (
              top_risk_reducing_biomarkers.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-200">{item.display_name || item.feature}</span>
                    <span className="text-emerald-400 font-mono font-bold">{item.shap_value.toFixed(3)}</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.abs(item.shap_value) * 60)}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-slate-500">Patient Value: {item.actual_value ?? 'N/A'}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic py-2">No protective drivers detected.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
