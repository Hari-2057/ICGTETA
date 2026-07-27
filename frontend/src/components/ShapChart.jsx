import React from 'react';
import { ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';

export const ShapChart = ({ shapExplanation }) => {
  if (!shapExplanation) return null;

  const { top_risk_increasing_biomarkers, top_risk_reducing_biomarkers } = shapExplanation;

  const maxShap = Math.max(
    ...(top_risk_increasing_biomarkers || []).map((item) => Math.abs(item.shap_value)),
    ...(top_risk_reducing_biomarkers || []).map((item) => Math.abs(item.shap_value)),
    0.01
  );

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            SHAP Biomarker Contribution Breakdown
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            TreeExplainer feature attribution: Positive SHAP pushes towards diabetes risk, negative pushes towards healthy status.
          </p>
        </div>
        <div className="p-1.5 rounded-lg bg-slate-800 text-cyan-400">
          <Info className="w-4 h-4" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Risk-Increasing Biomarkers (Positive SHAP) */}
        <div className="space-y-3 bg-slate-950/60 p-3.5 rounded-xl border border-rose-950/60">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider">
            <ArrowUpRight className="w-4 h-4" />
            <span>Top Risk-Increasing Biomarkers</span>
          </div>

          {top_risk_increasing_biomarkers?.length > 0 ? (
            top_risk_increasing_biomarkers.map((item, idx) => {
              const pct = (Math.abs(item.shap_value) / maxShap) * 100;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-200">{item.display_name}</span>
                    <span className="text-rose-400 font-mono font-bold">
                      +{item.shap_value.toFixed(3)}
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-rose-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Patient Lab Value: <span className="text-slate-300 font-semibold">{item.actual_value ?? 'N/A'}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-xs text-slate-500 italic">No positive risk drivers detected.</p>
          )}
        </div>

        {/* Risk-Reducing Biomarkers (Negative SHAP) */}
        <div className="space-y-3 bg-slate-950/60 p-3.5 rounded-xl border border-emerald-950/60">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <ArrowDownRight className="w-4 h-4" />
            <span>Top Protective / Risk-Reducing Biomarkers</span>
          </div>

          {top_risk_reducing_biomarkers?.length > 0 ? (
            top_risk_reducing_biomarkers.map((item, idx) => {
              const pct = (Math.abs(item.shap_value) / maxShap) * 100;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-200">{item.display_name}</span>
                    <span className="text-emerald-400 font-mono font-bold">
                      {item.shap_value.toFixed(3)}
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Patient Lab Value: <span className="text-slate-300 font-semibold">{item.actual_value ?? 'N/A'}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-xs text-slate-500 italic">No negative risk drivers detected.</p>
          )}
        </div>
      </div>
    </div>
  );
};
