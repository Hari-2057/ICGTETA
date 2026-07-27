import React from 'react';
import { X, CheckCircle, Cpu, BarChart2 } from 'lucide-react';

export const ModelMetricsModal = ({ isOpen, onClose, modelInfo }) => {
  if (!isOpen || !modelInfo) return null;

  const { metrics, dataset_records, total_features, best_hyperparameters } = modelInfo;
  const clf = metrics?.classification || {};
  const reg = metrics?.regression || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">
              Machine Learning Benchmarks & Metrics
            </h3>
            <p className="text-xs text-slate-400">
              Evaluated on {dataset_records} patient records with {total_features} engineered biomarkers.
            </p>
          </div>
        </div>

        {/* Classification Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Accuracy</span>
            <span className="text-xl font-extrabold text-emerald-400">
              {((clf.accuracy || 0) * 100).toFixed(1)}%
            </span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Weighted F1</span>
            <span className="text-xl font-extrabold text-cyan-400">
              {((clf.f1_score || 0) * 100).toFixed(1)}%
            </span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">ROC-AUC</span>
            <span className="text-xl font-extrabold text-blue-400">
              {(clf.roc_auc || 0).toFixed(3)}
            </span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Severity R²</span>
            <span className="text-xl font-extrabold text-purple-400">
              {(reg.r2_score || 0).toFixed(3)}
            </span>
          </div>
        </div>

        {/* Confusion Matrix Table */}
        <div className="mb-5">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Multi-Class Confusion Matrix
          </h4>
          <div className="overflow-x-auto bg-slate-950 p-3 rounded-xl border border-slate-800">
            <table className="w-full text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="p-2 text-left">True \ Predicted</th>
                  <th className="p-2 text-center text-emerald-400">Healthy</th>
                  <th className="p-2 text-center text-amber-400">Prediabetes</th>
                  <th className="p-2 text-center text-rose-400">Type 2 Diabetes</th>
                </tr>
              </thead>
              <tbody>
                {clf.confusion_matrix?.map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-800/50">
                    <td className="p-2 font-bold text-slate-200">
                      {['Healthy', 'Prediabetes', 'Type 2 Diabetes'][idx]}
                    </td>
                    {row.map((val, colIdx) => (
                      <td
                        key={colIdx}
                        className={`p-2 text-center font-mono font-bold ${
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

        {/* Hyperparameters */}
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Optuna Tuned Hyperparameters
          </h4>
          <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-cyan-300 font-mono overflow-x-auto">
            {JSON.stringify(best_hyperparameters, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};
