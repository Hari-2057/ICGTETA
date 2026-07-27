import React from 'react';
import { Activity, Flame, ShieldAlert, HeartPulse } from 'lucide-react';

export const SeverityCard = ({ prediction }) => {
  if (!prediction) return null;

  const { severity_index, estimated_hba1c, tyg_index, metabolic_risk_score } = prediction;

  const getSeverityColor = (score) => {
    if (score < 25) return 'text-emerald-400';
    if (score < 60) return 'text-amber-400';
    return 'text-rose-400';
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Disease Severity & Metabolic Indices
        </h3>
        <Activity className="w-4 h-4 text-cyan-400" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Continuous Severity Index */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 mb-1">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Severity Score</span>
          </div>
          <div className={`text-2xl font-extrabold ${getSeverityColor(severity_index)}`}>
            {severity_index} <span className="text-xs text-slate-500 font-normal">/ 100</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                severity_index < 25 ? 'bg-emerald-500' : severity_index < 60 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${severity_index}%` }}
            ></div>
          </div>
        </div>

        {/* Estimated HbA1c */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 mb-1">
            <HeartPulse className="w-3.5 h-3.5 text-cyan-400" />
            <span>HbA1c Biomarker</span>
          </div>
          <div className="text-2xl font-extrabold text-cyan-400">
            {estimated_hba1c}%
          </div>
          <span className="text-[11px] text-slate-400 mt-1">
            {estimated_hba1c >= 6.5 ? 'Diabetic Range (≥6.5%)' : estimated_hba1c >= 5.7 ? 'Prediabetic Range (5.7-6.4%)' : 'Normal Range (<5.7%)'}
          </span>
        </div>

        {/* TyG Index */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
          <div className="text-xs text-slate-400 mb-1">TyG Index (Insulin Resistance)</div>
          <div className="text-xl font-bold text-slate-200">{tyg_index}</div>
          <span className="text-[10px] text-slate-500 mt-0.5">ln(Triglycerides × FPG / 2)</span>
        </div>

        {/* Metabolic Risk Index */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
          <div className="text-xs text-slate-400 mb-1">Metabolic Risk Index</div>
          <div className="text-xl font-bold text-slate-200">{metabolic_risk_score}</div>
          <span className="text-[10px] text-slate-500 mt-0.5">Composite BP/BMI/Lipids</span>
        </div>
      </div>
    </div>
  );
};
