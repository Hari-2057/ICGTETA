import React from 'react';
import { TrendingUp, TrendingDown, Layers } from 'lucide-react';

export const ShapChart = ({ shapExplanation }) => {
  if (!shapExplanation) return null;

  const { top_risk_increasing_biomarkers = [], top_risk_reducing_biomarkers = [] } = shapExplanation;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-cyan-600" />
            <span>SHAP TreeExplainer Feature Attributions</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Quantifies the exact positive & protective contribution of each patient biomarker to the final decision.
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-sm">
          SHAP Model Explainability
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Risk-Increasing Biomarkers (Positive SHAP Values) */}
        <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 shadow-sm">
          <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-3 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-rose-600" />
            <span>Risk-Increasing Drivers (+ SHAP)</span>
          </h4>

          <div className="space-y-3">
            {top_risk_increasing_biomarkers.length > 0 ? (
              top_risk_increasing_biomarkers.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-800">{item.display_name || item.feature}</span>
                    <span className="text-rose-700 font-mono font-extrabold">+{item.shap_value.toFixed(3)}</span>
                  </div>
                  <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden border border-slate-300">
                    <div
                      className="bg-gradient-to-r from-rose-500 to-rose-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.abs(item.shap_value) * 60)}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">Patient Value: {item.actual_value ?? 'N/A'}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic py-2">No significant positive risk drivers.</p>
            )}
          </div>
        </div>

        {/* Risk-Reducing Biomarkers (Protective SHAP Values) */}
        <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 shadow-sm">
          <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-3 flex items-center space-x-2">
            <TrendingDown className="w-4 h-4 text-emerald-600" />
            <span>Protective Factors (- SHAP)</span>
          </h4>

          <div className="space-y-3">
            {top_risk_reducing_biomarkers.length > 0 ? (
              top_risk_reducing_biomarkers.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-800">{item.display_name || item.feature}</span>
                    <span className="text-emerald-700 font-mono font-extrabold">{item.shap_value.toFixed(3)}</span>
                  </div>
                  <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden border border-slate-300">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.abs(item.shap_value) * 60)}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">Patient Value: {item.actual_value ?? 'N/A'}</span>
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
