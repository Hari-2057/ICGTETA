import React from 'react';
import { Droplet, Scale, HeartPulse, TestTube, Send, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';

export const LabInputForm = ({ labData, onChange, onSubmit, isLoading, onReset, validationError }) => {

  const handleInputChange = (field, rawVal) => {
    const val = rawVal === '' ? '' : rawVal;
    onChange({ ...labData, [field]: val });
  };

  return (
    <div className="glass-panel rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      {/* Hydro Liquid Background Accent */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-5 relative z-10">
        <div>
          <h2 className="text-lg font-extrabold text-slate-100 flex items-center space-x-2.5">
            <span>Patient Laboratory Biomarkers</span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 font-bold shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              Clinical Panel
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Input patient laboratory parameters for diagnostic classification & conformal risk scoring.
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-900/80 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700/80 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Clear Form</span>
        </button>
      </div>

      {/* Validation Error Banner */}
      {validationError && (
        <div className="mb-5 p-4 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 flex items-center space-x-3 text-xs font-semibold backdrop-blur-md shadow-lg">
          <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-5 relative z-10">
        {/* Section 1: Mandatory Glycemic Biomarkers */}
        <div className="p-4 rounded-xl glass-card border border-cyan-500/30 shadow-lg">
          <div className="flex items-center space-x-2 mb-3.5">
            <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Droplet className="w-4 h-4" />
            </div>
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
                className="w-full liquid-input border-cyan-500/60 rounded-xl px-3.5 py-2.5 text-sm text-cyan-300 font-bold placeholder-slate-600 focus:outline-none"
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
                max="500"
                placeholder="e.g. 105"
                value={labData.fasting_glucose ?? ''}
                onChange={(e) => handleInputChange('fasting_glucose', e.target.value)}
                className="w-full liquid-input border-cyan-500/60 rounded-xl px-3.5 py-2.5 text-sm text-cyan-300 font-bold placeholder-slate-600 focus:outline-none"
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
                max="600"
                placeholder="e.g. 140"
                value={labData.random_glucose ?? ''}
                onChange={(e) => handleInputChange('random_glucose', e.target.value)}
                className="w-full liquid-input border-cyan-500/60 rounded-xl px-3.5 py-2.5 text-sm text-cyan-300 font-bold placeholder-slate-600 focus:outline-none"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Normal: &lt;140 mg/dL</span>
            </div>
          </div>
        </div>

        {/* Section 2: Patient Demographics & Vitals */}
        <div className="p-4 rounded-xl glass-card">
          <div className="flex items-center space-x-2 mb-3.5">
            <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Scale className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-extrabold text-blue-300 uppercase tracking-wider">
              2. Demographics & Vitals
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Age <span className="text-slate-500 font-normal">(yrs)</span>
              </label>
              <input
                type="number"
                min="18"
                max="100"
                placeholder="e.g. 52"
                value={labData.age ?? ''}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="w-full liquid-input rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Gender</label>
              <select
                value={labData.gender || 'Female'}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full liquid-input rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
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
                className="w-full liquid-input rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Systolic BP <span className="text-slate-500 font-normal">(mmHg)</span>
              </label>
              <input
                type="number"
                min="70"
                max="240"
                placeholder="e.g. 130"
                value={labData.systolic_bp ?? ''}
                onChange={(e) => handleInputChange('systolic_bp', e.target.value)}
                className="w-full liquid-input rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Lipid Panel */}
        <div className="p-4 rounded-xl glass-card">
          <div className="flex items-center space-x-2 mb-3.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <HeartPulse className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider">
              3. Lipid Panel (Optional)
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Cholesterol <span className="text-slate-500 font-normal">(mg/dL)</span>
              </label>
              <input
                type="number"
                min="80"
                max="500"
                placeholder="e.g. 195"
                value={labData.total_cholesterol ?? ''}
                onChange={(e) => handleInputChange('total_cholesterol', e.target.value)}
                className="w-full liquid-input rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                HDL <span className="text-slate-500 font-normal">(mg/dL)</span>
              </label>
              <input
                type="number"
                min="15"
                max="120"
                placeholder="e.g. 45"
                value={labData.hdl ?? ''}
                onChange={(e) => handleInputChange('hdl', e.target.value)}
                className="w-full liquid-input rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                LDL <span className="text-slate-500 font-normal">(mg/dL)</span>
              </label>
              <input
                type="number"
                min="30"
                max="300"
                placeholder="e.g. 120"
                value={labData.ldl ?? ''}
                onChange={(e) => handleInputChange('ldl', e.target.value)}
                className="w-full liquid-input rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Triglycerides <span className="text-slate-500 font-normal">(mg/dL)</span>
              </label>
              <input
                type="number"
                min="30"
                max="800"
                placeholder="e.g. 160"
                value={labData.triglycerides ?? ''}
                onChange={(e) => handleInputChange('triglycerides', e.target.value)}
                className="w-full liquid-input rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Renal & Hepatic */}
        <div className="p-4 rounded-xl glass-card">
          <div className="flex items-center space-x-2 mb-3.5">
            <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <TestTube className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-extrabold text-purple-300 uppercase tracking-wider">
              4. Renal & Hepatic Panel (Optional)
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
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
                className="w-full liquid-input rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                BUN <span className="text-slate-500 font-normal">(mg/dL)</span>
              </label>
              <input
                type="number"
                min="4"
                max="100"
                placeholder="e.g. 15"
                value={labData.bun ?? ''}
                onChange={(e) => handleInputChange('bun', e.target.value)}
                className="w-full liquid-input rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                ALT <span className="text-slate-500 font-normal">(U/L)</span>
              </label>
              <input
                type="number"
                min="5"
                max="300"
                placeholder="e.g. 28"
                value={labData.alt ?? ''}
                onChange={(e) => handleInputChange('alt', e.target.value)}
                className="w-full liquid-input rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                AST <span className="text-slate-500 font-normal">(U/L)</span>
              </label>
              <input
                type="number"
                min="5"
                max="300"
                placeholder="e.g. 24"
                value={labData.ast ?? ''}
                onChange={(e) => handleInputChange('ast', e.target.value)}
                className="w-full liquid-input rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-6 rounded-xl liquid-btn-primary text-slate-950 font-extrabold text-sm flex items-center justify-center space-x-2 tracking-wide disabled:opacity-50 transition"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
              <span>Running Conformal Inference Engine...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Run CDSS Risk Assessment & SHAP Analysis</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
