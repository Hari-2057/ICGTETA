import React from 'react';
import { Droplet, Scale, HeartPulse, TestTube, Send, RefreshCw, AlertCircle } from 'lucide-react';

export const LabInputForm = ({ labData, onChange, onSubmit, isLoading, onReset, validationError }) => {

  const handleInputChange = (field, rawVal) => {
    // Keep empty string if user cleared field, or convert to number if valid
    const val = rawVal === '' ? '' : rawVal;
    onChange({ ...labData, [field]: val });
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
        <div>
          <h2 className="text-lg font-extrabold text-slate-100 flex items-center space-x-2">
            <span>Patient Laboratory Biomarkers</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/80 font-semibold">
              Enter Lab Values
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Fill in patient blood test parameters or choose a preset profile above.
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Clear Form</span>
        </button>
      </div>

      {/* Validation Error Banner */}
      {validationError && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 flex items-center space-x-2.5 text-xs font-semibold">
          <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Section 1: Mandatory Glycemic Biomarkers */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-slate-950 to-slate-950 border border-cyan-800/50">
          <div className="flex items-center space-x-2 mb-3">
            <Droplet className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-extrabold text-cyan-300 uppercase tracking-wider">
              1. Glycemic Biomarkers (Mandatory)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">
                HbA1c Level <span className="text-cyan-400 font-mono">(%) *</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="3.0"
                max="16.0"
                placeholder="e.g. 5.8"
                value={labData.hba1c ?? ''}
                onChange={(e) => handleInputChange('hba1c', e.target.value)}
                className="w-full bg-slate-950 border border-cyan-500/60 rounded-xl px-3.5 py-2.5 text-sm text-cyan-300 font-bold placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Normal: &lt;5.7% | T2D: ≥6.5%</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">
                Fasting Glucose <span className="text-cyan-400 font-mono">(mg/dL) *</span>
              </label>
              <input
                type="number"
                step="1"
                min="40"
                max="450"
                placeholder="e.g. 105"
                value={labData.fasting_glucose ?? ''}
                onChange={(e) => handleInputChange('fasting_glucose', e.target.value)}
                className="w-full bg-slate-950 border border-cyan-500/60 rounded-xl px-3.5 py-2.5 text-sm text-cyan-300 font-bold placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Normal: 70–99 mg/dL</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">
                Random Glucose <span className="text-cyan-400 font-mono">(mg/dL) *</span>
              </label>
              <input
                type="number"
                step="1"
                min="40"
                max="500"
                placeholder="e.g. 140"
                value={labData.random_glucose ?? ''}
                onChange={(e) => handleInputChange('random_glucose', e.target.value)}
                className="w-full bg-slate-950 border border-cyan-500/60 rounded-xl px-3.5 py-2.5 text-sm text-cyan-300 font-bold placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Normal: &lt;140 mg/dL</span>
            </div>
          </div>
        </div>

        {/* Section 2: Demographics & Vitals */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center space-x-2 mb-3">
            <Scale className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
              2. Patient Demographics & Vitals
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Age (years)</label>
              <input
                type="number"
                placeholder="e.g. 45"
                value={labData.age ?? ''}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Gender</label>
              <select
                value={labData.gender ?? 'Female'}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">BMI (kg/m²)</label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 27.5"
                value={labData.bmi ?? ''}
                onChange={(e) => handleInputChange('bmi', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Systolic BP (mmHg)</label>
              <input
                type="number"
                placeholder="e.g. 120"
                value={labData.systolic_bp ?? ''}
                onChange={(e) => handleInputChange('systolic_bp', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Diastolic BP (mmHg)</label>
              <input
                type="number"
                placeholder="e.g. 80"
                value={labData.diastolic_bp ?? ''}
                onChange={(e) => handleInputChange('diastolic_bp', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Family History</label>
              <select
                value={labData.family_history ?? 'No'}
                onChange={(e) => handleInputChange('family_history', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Lipid Panel */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center space-x-2 mb-3">
            <HeartPulse className="w-4 h-4 text-rose-400" />
            <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
              3. Lipid & Cardiovascular Panel
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Total Chol. (mg/dL)</label>
              <input
                type="number"
                placeholder="e.g. 190"
                value={labData.total_cholesterol ?? ''}
                onChange={(e) => handleInputChange('total_cholesterol', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">HDL (mg/dL)</label>
              <input
                type="number"
                placeholder="e.g. 50"
                value={labData.hdl ?? ''}
                onChange={(e) => handleInputChange('hdl', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">LDL (mg/dL)</label>
              <input
                type="number"
                placeholder="e.g. 115"
                value={labData.ldl ?? ''}
                onChange={(e) => handleInputChange('ldl', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Triglycerides (mg/dL)</label>
              <input
                type="number"
                placeholder="e.g. 135"
                value={labData.triglycerides ?? ''}
                onChange={(e) => handleInputChange('triglycerides', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-600"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Organ Function (Renal & Liver) */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center space-x-2 mb-3">
            <TestTube className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
              4. Renal & Hepatic Panel
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Creatinine (mg/dL)</label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 0.9"
                value={labData.creatinine ?? ''}
                onChange={(e) => handleInputChange('creatinine', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">BUN (mg/dL)</label>
              <input
                type="number"
                placeholder="e.g. 14"
                value={labData.bun ?? ''}
                onChange={(e) => handleInputChange('bun', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">ALT (U/L)</label>
              <input
                type="number"
                placeholder="e.g. 24"
                value={labData.alt ?? ''}
                onChange={(e) => handleInputChange('alt', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">AST (U/L)</label>
              <input
                type="number"
                placeholder="e.g. 22"
                value={labData.ast ?? ''}
                onChange={(e) => handleInputChange('ast', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-600"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/20 transition flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <span className="flex items-center space-x-2">
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                <span>Calculating Diagnostic Risk & SHAP Attributions...</span>
              </span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Run CDSS Risk Assessment & SHAP Analysis</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
