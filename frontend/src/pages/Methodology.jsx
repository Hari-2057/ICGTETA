import React from 'react';
import { BookOpen, ShieldCheck, Activity, Brain, HelpCircle } from 'lucide-react';

export const Methodology = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/30">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-100">
              Clinical Guidelines & Explainability Methodology
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Diagnostic thresholds, SHAP Game-Theoretic Feature Attribution, and Conformal Confidence Calibration.
            </p>
          </div>
        </div>
      </div>

      {/* ADA Diagnostic Guidelines */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          <span>American Diabetes Association (ADA) Diagnostic Standards</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/40">
            <h4 className="font-bold text-sm text-emerald-400 mb-2">Normal Glycemic Status</h4>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>HbA1c &lt; 5.7%</li>
              <li>Fasting Glucose &lt; 100 mg/dL</li>
              <li>Random Glucose &lt; 140 mg/dL</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-amber-900/40">
            <h4 className="font-bold text-sm text-amber-400 mb-2">Prediabetes Risk</h4>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>HbA1c: 5.7% – 6.4%</li>
              <li>Fasting Glucose: 100 – 125 mg/dL</li>
              <li>Random Glucose: 140 – 199 mg/dL</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/40">
            <h4 className="font-bold text-sm text-rose-400 mb-2">Type 2 Diabetes (T2D)</h4>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>HbA1c ≥ 6.5%</li>
              <li>Fasting Glucose ≥ 126 mg/dL</li>
              <li>Random Glucose ≥ 200 mg/dL</li>
            </ul>
          </div>
        </div>
      </div>

      {/* SHAP Explainability Engine */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-3">
        <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
          <Brain className="w-5 h-5 text-cyan-400" />
          <span>SHAP (SHapley Additive exPlanations) TreeExplainer</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          SHAP utilizes cooperative game theory (Shapley values) to compute fair, mathematically sound feature attributions for individual patient lab predictions. Positive SHAP values indicate biomarker contributions that push the diagnostic prediction towards prediabetes/diabetes risk, while negative SHAP values indicate protective or healthy factors.
        </p>
      </div>

      {/* Conformal Prediction & Calibration */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-3">
        <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <span>Conformal Prediction & Calibrated Confidence Guarantees</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Standard machine learning classifiers often output uncalibrated probabilities that lead to false overconfidence. Our system applies probability calibration (Sigmoid / Isotonic) combined with conformal prediction bounds to output rigorous confidence categories:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="font-bold text-emerald-400 block mb-1">Reliable (≥85%)</span>
            <span className="text-slate-400">High prediction certainty. Recommendation can be confidently reviewed.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="font-bold text-amber-400 block mb-1">Moderate (70% - 84%)</span>
            <span className="text-slate-400">Moderate certainty. Secondary review of patient history recommended.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="font-bold text-rose-400 block mb-1">Uncertain (&lt;70%)</span>
            <span className="text-slate-400">Triggers high uncertainty alert: Order OGTT or repeat blood draw.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
