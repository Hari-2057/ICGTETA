import React from 'react';
import { Activity, ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';

export const RiskGauge = ({ prediction }) => {
  const { predicted_class, confidence_score, probabilities } = prediction;

  const getStatusBadge = () => {
    switch (predicted_class) {
      case 'Healthy':
        return {
          bg: 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm',
          label: 'Healthy Glycemic Profile',
          icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />
        };
      case 'Prediabetes':
        return {
          bg: 'bg-amber-50 border-amber-300 text-amber-800 shadow-sm',
          label: 'Prediabetes Risk Detected',
          icon: <AlertTriangle className="w-5 h-5 text-amber-600" />
        };
      default:
        return {
          bg: 'bg-rose-50 border-rose-300 text-rose-800 shadow-sm',
          label: 'Type 2 Diabetes High Risk',
          icon: <AlertOctagon className="w-5 h-5 text-rose-600" />
        };
    }
  };

  const status = getStatusBadge();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-5">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center space-x-2">
          <Activity className="w-4 h-4 text-cyan-600" />
          <span>Diagnostic Risk Classification</span>
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-extrabold border flex items-center space-x-1.5 ${status.bg}`}>
          {status.icon}
          <span>{predicted_class}</span>
        </span>
      </div>

      {/* Main Gauge Visual */}
      <div className="flex flex-col items-center justify-center py-2">
        <div className="relative w-44 h-44 flex items-center justify-center">
          {/* SVG Circular Progress Ring */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              className="text-slate-100"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              className="text-cyan-600 transition-all duration-1000 ease-out"
              strokeWidth="10"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 - (251.2 * confidence_score) / 100}
              strokeLinecap="round"
              stroke="url(#lightHydroGradient)"
              fill="transparent"
            />
            <defs>
              <linearGradient id="lightHydroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Display */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {confidence_score}%
            </span>
            <span className="text-[10px] font-bold text-cyan-700 uppercase tracking-wider mt-0.5">
              Calibrated Prob
            </span>
          </div>
        </div>

        {/* Class Probability Distribution Bars */}
        <div className="w-full mt-6 space-y-2.5">
          {Object.entries(probabilities || {}).map(([clsName, probVal]) => (
            <div key={clsName} className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700">{clsName}</span>
                <span className="text-cyan-700 font-mono">{probVal}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 h-full rounded-full transition-all duration-700"
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
