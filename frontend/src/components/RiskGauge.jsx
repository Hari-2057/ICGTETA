import React from 'react';
import { Activity, ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';

export const RiskGauge = ({ prediction }) => {
  const { predicted_class, confidence_score, probabilities } = prediction;

  const getStatusBadge = () => {
    switch (predicted_class) {
      case 'Healthy':
        return {
          bg: 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]',
          label: 'Healthy Glycemic Profile',
          icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
        };
      case 'Prediabetes':
        return {
          bg: 'bg-amber-950/70 border-amber-500/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]',
          label: 'Prediabetes Risk Detected',
          icon: <AlertTriangle className="w-5 h-5 text-amber-400" />
        };
      default:
        return {
          bg: 'bg-rose-950/70 border-rose-500/40 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]',
          label: 'Type 2 Diabetes High Risk',
          icon: <AlertOctagon className="w-5 h-5 text-rose-400" />
        };
    }
  };

  const status = getStatusBadge();

  return (
    <div className="glass-panel rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3.5 mb-5">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>Diagnostic Risk Classification</span>
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-extrabold border flex items-center space-x-1.5 backdrop-blur-md ${status.bg}`}>
          {status.icon}
          <span>{predicted_class}</span>
        </span>
      </div>

      {/* Main Gauge Visual */}
      <div className="flex flex-col items-center justify-center py-2">
        <div className="relative w-44 h-44 flex items-center justify-center">
          {/* Radial Hydro Glow Background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 animate-pulse filter blur-xl"></div>

          {/* SVG Circular Progress Ring */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              className="text-slate-900"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              className="text-cyan-400 transition-all duration-1000 ease-out"
              strokeWidth="10"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 - (251.2 * confidence_score) / 100}
              strokeLinecap="round"
              stroke="url(#hydroGradient)"
              fill="transparent"
            />
            <defs>
              <linearGradient id="hydroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Glass Score Display */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-slate-100 tracking-tight">
              {confidence_score}%
            </span>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mt-0.5">
              Calibrated Prob
            </span>
          </div>
        </div>

        {/* Class Probability Distribution Bars */}
        <div className="w-full mt-6 space-y-2.5">
          {Object.entries(probabilities || {}).map(([clsName, probVal]) => (
            <div key={clsName} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">{clsName}</span>
                <span className="text-cyan-400 font-mono">{probVal}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${probVal}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
