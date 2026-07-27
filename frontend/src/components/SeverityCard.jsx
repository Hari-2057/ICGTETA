import React from 'react';
import { Activity, Zap, Info } from 'lucide-react';

export const SeverityCard = ({ prediction }) => {
  const { severity_index, tyg_index, metabolic_risk_score } = prediction;

  return (
    <div className="glass-panel rounded-2xl p-6 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
          <Activity className="w-4 h-4 text-purple-400" />
          <span>Disease Severity & TyG Metabolic Index</span>
        </h3>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
          Continuous Regressor
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        {/* Severity Index Box */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-950 to-purple-950/40 border border-purple-800/50 shadow-inner">
          <span className="text-[11px] font-semibold text-purple-300 block mb-1">
            Severity Index
          </span>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-extrabold text-slate-100 font-mono">
              {severity_index}
            </span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Continuous risk gradient</span>
        </div>

        {/* TyG Index Box */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-950 to-cyan-950/40 border border-cyan-800/50 shadow-inner">
          <span className="text-[11px] font-semibold text-cyan-300 block mb-1">
            TyG Index
          </span>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-extrabold text-slate-100 font-mono">
              {tyg_index}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">ln(FPG × TG / 2) insulin proxy</span>
        </div>
      </div>
    </div>
  );
};
