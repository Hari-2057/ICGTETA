import React from 'react';
import { Activity } from 'lucide-react';

export const SeverityCard = ({ prediction }) => {
  const { severity_index, tyg_index } = prediction;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center space-x-2">
          <Activity className="w-4 h-4 text-purple-600" />
          <span>Disease Severity & TyG Metabolic Index</span>
        </h3>
        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200">
          Continuous Regressor
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        {/* Severity Index Box */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50/60 to-white border border-purple-200 shadow-sm">
          <span className="text-[11px] font-bold text-purple-900 block mb-1">
            Severity Index
          </span>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-extrabold text-slate-900 font-mono">
              {severity_index}
            </span>
            <span className="text-xs text-slate-500 font-semibold">/ 100</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block font-medium">Continuous risk gradient</span>
        </div>

        {/* TyG Index Box */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-50/60 to-white border border-cyan-200 shadow-sm">
          <span className="text-[11px] font-bold text-cyan-900 block mb-1">
            TyG Index
          </span>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-extrabold text-slate-900 font-mono">
              {tyg_index}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block font-medium">ln(FPG × TG / 2) insulin proxy</span>
        </div>
      </div>
    </div>
  );
};
