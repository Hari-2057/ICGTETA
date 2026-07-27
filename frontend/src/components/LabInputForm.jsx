import React from 'react';
import { Droplet, Scale, HeartPulse, TestTube, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';

export const LabInputForm = ({ labData, onChange, onSubmit, isLoading, onReset, validationError }) => {

  const handleInputChange = (field, rawVal) => {
    const val = rawVal === '' ? '' : rawVal;
    onChange({ ...labData, [field]: val });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5 relative z-10">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2.5">
            <span>Patient Laboratory Biomarkers</span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 font-extrabold shadow-sm">
              Clinical Panel
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Input patient laboratory parameters for diagnostic classification & conformal risk scoring.
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-xl border border-slate-200 transition shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Clear Form</span>
        </button>
      </div>

      {/* Validation Error Banner */}
      {validationError && (
        <div className="mb-5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center space-x-3 text-xs font-bold shadow-sm">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-5 relative z-10">
        {/* Section 1: Mandatory Glycemic Biomarkers */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-50/70 via-white to-white border border-cyan-200/90 shadow-sm">
          <div className="flex items-center space-x-2 mb-3.5">
            <div className="p-1.5 rounded-lg bg-cyan-100 text-cyan-700 border border-cyan-200">
              <Droplet className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-extrabold text-cyan-900 uppercase tracking-wider">
              1. Glycemic Biomarkers (Mandatory)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                HbA1c Level <span className="text-cyan-700 font-mono">(%) *</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="3.0"
                max="16.0"
                placeholder="e.g. 5.8"
                value={labData.hba1c ?? ''}
                onChange={(e) => handleInputChange('hba1c', e.target.value)}
                className="w-full liquid-input bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-cyan-900 font-bold placeholder-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Normal: &lt;5.7% | T2D: ≥6.5%</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Fasting Glucose <span className="text-cyan-700 font-mono">(mg/dL) *</span>
              </label>
              <input
                type="number"
                step="1"
                min="40"
                max="500"
                placeholder="e.g. 105"
                value={labData.fasting_glucose ?? ''}
                onChange={(e) => handleInputChange('fasting_glucose', e.target.value)}
                className="w-full liquid-input bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-cyan-900 font-bold placeholder-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Normal: 70–99 mg/dL</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Random Glucose <span className="text-cyan-700 font-mono">(mg/dL) *</span>
              </label>
              <input
                type="number"
                step="1"
                min="40"
                max="600"
                placeholder="e.g. 140"
                value={labData.random_glucose ?? ''}
                onChange={(e) => handleInputChange('random_glucose', e.target.value)}
                className="w-full liquid-input bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-cyan-900 font-bold placeholder-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Normal: &lt;140 mg/dL</span>
            </div>
          </div>
        </div>

        {/* Section 2: Patient Demographics & Vitals */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50/80 via-white to-white border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-2 mb-3.5">
            <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700 border border-blue-200">
              <Scale className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-extrabold text-blue-900 uppercase tracking-wider">
              2. Demographics & Vitals
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Age <span className="text-slate-500 font-normal">(yrs)</span>
              </label>
              <input
                type="number"
                min="18"
                max="100"
                placeholder="e.g. 52"
                value={labData.age ?? ''}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="w-full liquid-input bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
              <select
                value={labData.gender || 'Female'}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full liquid-input bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                BMI <span className="text-slate-500 font-normal">(kg/m²)</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="12.0"
                max="60.0"
                placeholder="e.g. 28.5"
                value={labData.bmi ?? ''}
                onChange={(e) => handleInputChange('bmi', e.target.value)}
                className="w-full liquid-input bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Systolic BP <span className="text-slate-500 font-normal">(mmHg)</span>
              </label>
              <input
                type="number"
                min="70"
                max="240"
                placeholder="e.g. 130"
                value={labData.systolic_bp ?? ''}
                onChange={(e) => handleInputChange('systolic_bp', e.target.value)}
                className="w-full liquid-input bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Lipid Panel */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50/50 via-white to-white border border-emerald-200/90 shadow-sm">
          <div className="flex items-center space-x-2 mb-3.5">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-200">
              <HeartPulse className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider">
              3. Lipid Panel (Optional)
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Cholesterol <span className="text-slate-500 font-normal">(mg/dL)</span>
              </label>
              <input
                type="number"
                min="80"
                max="500"
                placeholder="e.g. 195"
                value={labData.total_cholesterol ?? ''}
                onChange={(e) => handleInputChange('total_cholesterol', e.target.value)}
                className="w-full liquid-input bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                HDL <span className="text-slate-500 font-normal">(mg/dL)</span>
              </label>
              <input
                type="number"
                min="15"
                max="120"
                placeholder="e.g. 45"
                value={labData.hdl ?? ''}
                onChange={(e) => handleInputChange('hdl', e.target.value)}
                className="w-full liquid-input bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                LDL <span className="text-slate-500 font-normal">(mg/dL)</span>
              </label>
              <input
                type="number"
                min="30"
                max="300"
                placeholder="e.g. 120"
                value={labData.ldl ?? ''}
                onChange={(e) => handleInputChange('ldl', e.target.value)}
                className="w-full liquid-input bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Triglycerides <span className="text-slate-500 font-normal">(mg/dL)</span>
              </label>
              <input
                type="number"
                min="30"
                max="800"
                placeholder="e.g. 160"
                value={labData.triglycerides ?? ''}
                onChange={(e) => handleInputChange('triglycerides', e.target.value)}
                className="w-full liquid-input bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Renal & Hepatic Panel */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50/50 via-white to-white border border-purple-200/90 shadow-sm">
          <div className="flex items-center space-x-2 mb-3.5">
            <div className="p-1.5 rounded-lg bg-purple-100 text-purple-700 border border-purple-200">
              <TestTube className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-extrabold text-purple-900 uppercase tracking-wider">
              4. Renal & Hepatic Panel (Optional)
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Creatinine <span className="text-slate-500 font-normal">(mg/dL)</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="0.3"
                max="10.0"
                placeholder="e.g. 0.9"
                value={labData.creatinine ?? ''}
                onChange={(e) => handleInputChange('creatinine', e.target.value)}
                className="w-full liquid-input bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                BUN <span className="text-slate-500 font-normal">(mg/dL)</span>
              </label>
              <input
                type="number"
                min="4"
                max="100"
                placeholder="e.g. 15"
                value={labData.bun ?? ''}
                onChange={(e) => handleInputChange('bun', e.target.value)}
                className="w-full liquid-input bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ALT <span className="text-slate-500 font-normal">(U/L)</span>
              </label>
              <input
                type="number"
                min="5"
                max="300"
                placeholder="e.g. 28"
                value={labData.alt ?? ''}
                onChange={(e) => handleInputChange('alt', e.target.value)}
                className="w-full liquid-input bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                AST <span className="text-slate-500 font-normal">(U/L)</span>
              </label>
              <input
                type="number"
                min="5"
                max="300"
                placeholder="e.g. 24"
                value={labData.ast ?? ''}
                onChange={(e) => handleInputChange('ast', e.target.value)}
                className="w-full liquid-input bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-extrabold text-sm flex items-center justify-center space-x-2 tracking-wide shadow-lg shadow-cyan-600/25 disabled:opacity-50 transition"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Running Conformal Inference Engine...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-white" />
              <span>Run CDSS Risk Assessment & SHAP Analysis</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
