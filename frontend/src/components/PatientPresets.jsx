import React from 'react';
import { UserCheck, AlertTriangle, ShieldAlert, HelpCircle, Sparkles } from 'lucide-react';

export const PatientPresets = ({ presets, activePresetId, onSelectPreset }) => {
  const getPresetIcon = (id) => {
    switch (id) {
      case 'healthy_patient':
        return <UserCheck className="w-5 h-5 text-emerald-400" />;
      case 'prediabetes_risk':
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'severe_t2d':
        return <ShieldAlert className="w-5 h-5 text-rose-400" />;
      case 'uncertain_edge_case':
        return <HelpCircle className="w-5 h-5 text-purple-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getBorderColor = (id, isActive) => {
    if (isActive) return 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/10';
    switch (id) {
      case 'healthy_patient':
        return 'hover:border-emerald-500/50 bg-slate-900/60';
      case 'prediabetes_risk':
        return 'hover:border-amber-500/50 bg-slate-900/60';
      case 'severe_t2d':
        return 'hover:border-rose-500/50 bg-slate-900/60';
      case 'uncertain_edge_case':
        return 'hover:border-purple-500/50 bg-slate-900/60';
      default:
        return 'hover:border-slate-700 bg-slate-900/60';
    }
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 mb-6 shadow-xl">
      <div className="flex items-center space-x-2 mb-3">
        <Sparkles className="w-4 h-4 text-cyan-400" />
        <h3 className="text-sm font-semibold tracking-wide text-slate-300 uppercase">
          Quick Patient Profiles (1-Click Presets)
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {presets.map((preset) => {
          const isActive = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`p-3.5 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between ${getBorderColor(
                preset.id,
                isActive
              )}`}
            >
              <div>
                <div className="flex items-center space-x-2.5 mb-1.5">
                  <div className="p-1.5 rounded-lg bg-slate-800">{getPresetIcon(preset.id)}</div>
                  <h4 className="font-semibold text-sm text-slate-100">{preset.name}</h4>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{preset.description}</p>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-cyan-400 font-medium">
                <span>Load Profile</span>
                <span>→</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
