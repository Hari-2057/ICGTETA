import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Cpu, BarChart2, ShieldCheck, CheckCircle2, Sliders } from 'lucide-react';

export const ModelPerformance = () => {
  const [modelInfo, setModelInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    try {
      const data = await api.getModelInfo();
      setModelInfo(data);
    } catch (err) {
      console.error('Failed to load model info:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400 text-sm">
        <span className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mr-2"></span>
        Loading Machine Learning Model Benchmarks...
      </div>
    );
  }

  if (!modelInfo) return null;

  const { metrics, dataset_records, total_features, best_hyperparameters } = modelInfo;
  const clf = metrics?.classification || {};
  const reg = metrics?.regression || {};

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/30">
            <Cpu className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-100">
              Machine Learning Model Benchmarks & Validation
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Gradient Boosted Tree Classifier & Regressor tuned via Optuna on {dataset_records} patient routine lab records.
            </p>
          </div>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Classification Accuracy
          </span>
          <span className="text-3xl font-extrabold text-emerald-400">
            {((clf.accuracy || 0) * 100).toFixed(1)}%
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">Stratified 5-Fold Evaluation</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Weighted F1 Score
          </span>
          <span className="text-3xl font-extrabold text-cyan-400">
            {((clf.f1_score || 0) * 100).toFixed(1)}%
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">Harmonic Precision-Recall Mean</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Multi-Class ROC-AUC
          </span>
          <span className="text-3xl font-extrabold text-blue-400">
            {(clf.roc_auc || 0).toFixed(3)}
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">One-vs-Rest Discrimination</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Severity Regressor R²
          </span>
          <span className="text-3xl font-extrabold text-purple-400">
            {(reg.r2_score || 0).toFixed(3)}
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">MAE: {reg.mae?.toFixed(2)} score pts</span>
        </div>
      </div>

      {/* Confusion Matrix & Hyperparameters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Confusion Matrix */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center space-x-2">
            <BarChart2 className="w-4 h-4 text-cyan-400" />
            <span>Multi-Class Confusion Matrix</span>
          </h3>
          <div className="overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
            <table className="w-full text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="p-2.5 text-left">Actual Target \ Predicted</th>
                  <th className="p-2.5 text-center text-emerald-400">Healthy</th>
                  <th className="p-2.5 text-center text-amber-400">Prediabetes</th>
                  <th className="p-2.5 text-center text-rose-400">T2D</th>
                </tr>
              </thead>
              <tbody>
                {clf.confusion_matrix?.map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-800/50">
                    <td className="p-2.5 font-bold text-slate-200">
                      {['Healthy', 'Prediabetes', 'Type 2 Diabetes'][idx]}
                    </td>
                    {row.map((val, colIdx) => (
                      <td
                        key={colIdx}
                        className={`p-2.5 text-center font-mono font-bold ${
                          idx === colIdx ? 'text-cyan-400 bg-cyan-950/40' : 'text-slate-500'
                        }`}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Optuna Tuned Hyperparameters */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Optuna Hyperparameter Configuration</span>
          </h3>
          <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-cyan-300 font-mono overflow-x-auto h-52">
            {JSON.stringify(best_hyperparameters, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};
