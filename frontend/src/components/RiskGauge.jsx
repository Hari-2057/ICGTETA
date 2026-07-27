import React from 'react';
import { AlertTriangle, CheckCircle, AlertOctagon, HelpCircle } from 'lucide-react';

export const RiskGauge = ({ prediction }) => {
  const { predicted_class, confidence_score, probabilities } = prediction;

  const getStatusBadge = (cls) => {
    switch (cls) {
      case 'Healthy':
        return {
          icon: <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
          title: 'Low Diagnostic Risk (Healthy)',
          bg: 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200',
          gaugeColor: '#10b981'
        };
      case 'Prediabetes':
        return {
          icon: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
          title: 'Moderate Risk (Prediabetes)',
          bg: 'bg-amber-50 dark:bg-amber-950/80 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200',
          gaugeColor: '#f59e0b'
        };
      default:
        return {
          icon: <AlertOctagon className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
          title: 'High Diagnostic Risk (Type 2 Diabetes)',
          bg: 'bg-rose-50 dark:bg-rose-950/80 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200',
          gaugeColor: '#f43f5e'
        };
    }
  };

  const currentBadge = getStatusBadge(predicted_class);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-5 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center space-x-2">
          <span>Diagnostic Risk Classification</span>
        </h3>
        <span className="text-[10px] font-extrabold text-cyan-800 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-200 dark:border-cyan-800">
          conformal_p_value = 0.05
        </span>
      </div>

      {/* Main Status Badge */}
      <div className={`p-4 rounded-xl border flex items-center space-x-3 shadow-sm ${currentBadge.bg}`}>
        {currentBadge.icon}
        <div>
          <span className="text-xs font-extrabold block">{currentBadge.title}</span>
          <span className="text-[11px] opacity-80 font-medium">
            Model Probability: <strong className="font-mono">{confidence_score}%</strong>
          </span>
        </div>
      </div>

      {/* Class Probabilities Bar */}
      <div className="space-y-3 pt-1">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Class Probability Distribution</span>
        
        {probabilities && Object.entries(probabilities).map(([cls, prob], idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>{cls}</span>
              <span className="font-mono text-cyan-700 dark:text-cyan-400">{prob}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  cls === 'Healthy' 
                    ? 'bg-emerald-500' 
                    : cls === 'Prediabetes' 
                    ? 'bg-amber-500' 
                    : 'bg-rose-500'
                }`}
                style={{ width: `${prob}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
