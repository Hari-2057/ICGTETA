import React from 'react';
import { ShieldCheck, AlertCircle, AlertOctagon } from 'lucide-react';

export const RiskGauge = ({ prediction }) => {
  if (!prediction) return null;

  const { predicted_class, probabilities, confidence_score } = prediction;
  
  const getClassBadge = (cls) => {
    switch (cls) {
      case 'Healthy':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          icon: ShieldCheck,
          gradient: 'from-emerald-500 to-teal-400',
          textColor: 'text-emerald-400'
        };
      case 'Prediabetes':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          icon: AlertCircle,
          gradient: 'from-amber-500 to-yellow-400',
          textColor: 'text-amber-400'
        };
      default: // Type 2 Diabetes
        return {
          bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
          icon: AlertOctagon,
          gradient: 'from-rose-600 to-red-400',
          textColor: 'text-rose-400'
        };
    }
  };

  const badge = getClassBadge(predicted_class);
  const Icon = badge.icon;

  // Percentage probabilities
  const healthyProb = probabilities?.['Healthy'] || 0;
  const prediabetesProb = probabilities?.['Prediabetes'] || 0;
  const t2dProb = probabilities?.['Type 2 Diabetes'] || 0;

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Diagnostic Classification
        </h3>
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center space-x-1 ${badge.bg}`}>
          <Icon className="w-3.5 h-3.5" />
          <span>{predicted_class}</span>
        </span>
      </div>

      {/* Main Gauge Visual */}
      <div className="my-4 text-center">
        <div className="relative inline-flex items-center justify-center">
          <svg className="w-44 h-44 transform -rotate-90">
            <circle
              cx="88"
              cy="88"
              r="72"
              stroke="currentColor"
              strokeWidth="14"
              className="text-slate-800"
              fill="transparent"
            />
            <circle
              cx="88"
              cy="88"
              r="72"
              stroke="url(#riskGradient)"
              strokeWidth="14"
              strokeDasharray={452}
              strokeDashoffset={452 - (452 * confidence_score) / 100}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              fill="transparent"
            />
            <defs>
              <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#48CAE4" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className={`text-3xl font-extrabold ${badge.textColor}`}>
              {confidence_score}%
            </span>
            <span className="text-[11px] font-medium text-slate-400 mt-0.5">
              Calibrated Probability
            </span>
          </div>
        </div>
      </div>

      {/* Multi-Class Probability Bars */}
      <div className="space-y-2.5 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
        <div>
          <div className="flex justify-between text-xs font-medium mb-1">
            <span className="text-emerald-400">Healthy Profile</span>
            <span className="text-slate-300 font-bold">{healthyProb}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${healthyProb}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-medium mb-1">
            <span className="text-amber-400">Prediabetes Risk</span>
            <span className="text-slate-300 font-bold">{prediabetesProb}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${prediabetesProb}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-medium mb-1">
            <span className="text-rose-400">Type 2 Diabetes</span>
            <span className="text-slate-300 font-bold">{t2dProb}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-rose-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${t2dProb}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
