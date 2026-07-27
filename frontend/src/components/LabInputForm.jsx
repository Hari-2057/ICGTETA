import React, { useState } from 'react';
import { Activity, Heart, Droplet, Zap, RotateCcw, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const LabInputForm = ({
  labData,
  onChange,
  onSubmit,
  isLoading,
  onReset,
  validationError
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (field, value) => {
    onChange(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Validation Error Alert */}
      {validationError && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-xs font-semibold flex items-start space-x-3 shadow-md animate-shake">
          <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">{validationError}</div>
        </div>
      )}

      {/* SECTION 1: MANDATORY GLYCEMIC BIOMARKERS */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-md transition-colors duration-300">
        <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
              Primary Glycemic Biomarkers <span className="text-rose-600 dark:text-rose-400">* Required</span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Essential blood test biomarkers for ADA diagnostic classification.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              HbA1c Level (%) <span className="text-rose-600 dark:text-rose-400">*</span>
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="e.g. 6.2"
              value={labData.hba1c}
              onChange={(e) => handleInputChange('hba1c', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold liquid-input"
            />
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">Healthy: &lt;5.7%</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Fasting Glucose (mg/dL) <span className="text-rose-600 dark:text-rose-400">*</span>
            </label>
            <input
              type="number"
              step="1"
              placeholder="e.g. 118"
              value={labData.fasting_glucose}
              onChange={(e) => handleInputChange('fasting_glucose', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold liquid-input"
            />
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">Healthy: &lt;100 mg/dL</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Random Glucose (mg/dL) <span className="text-rose-600 dark:text-rose-400">*</span>
            </label>
            <input
              type="number"
              step="1"
              placeholder="e.g. 155"
              value={labData.random_glucose}
              onChange={(e) => handleInputChange('random_glucose', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold liquid-input"
            />
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">Healthy: &lt;140 mg/dL</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: DEMOGRAPHICS & VITALS */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-md transition-colors duration-300">
        <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
            <Heart className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
              Patient Demographics & Clinical Vitals
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Physical measurements and cardiovascular indicators.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Age (Years)</label>
            <input
              type="number"
              placeholder="45"
              value={labData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold liquid-input"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Gender</label>
            <select
              value={labData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold liquid-input"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">BMI (kg/m²)</label>
            <input
              type="number"
              step="0.1"
              placeholder="25.0"
              value={labData.bmi}
              onChange={(e) => handleInputChange('bmi', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold liquid-input"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Systolic BP (mmHg)</label>
            <input
              type="number"
              placeholder="120"
              value={labData.systolic_bp}
              onChange={(e) => handleInputChange('systolic_bp', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold liquid-input"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: LIPID PANEL & METABOLIC INDEX */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-md transition-colors duration-300">
        <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <Droplet className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
              Lipid Profile & Insulin Resistance Proxy
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Triglycerides & Cholesterol for TyG index calculation.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Total Chol (mg/dL)</label>
            <input
              type="number"
              placeholder="190"
              value={labData.total_cholesterol}
              onChange={(e) => handleInputChange('total_cholesterol', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold liquid-input"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">HDL Chol (mg/dL)</label>
            <input
              type="number"
              placeholder="48"
              value={labData.hdl}
              onChange={(e) => handleInputChange('hdl', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold liquid-input"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">LDL Chol (mg/dL)</label>
            <input
              type="number"
              placeholder="115"
              value={labData.ldl}
              onChange={(e) => handleInputChange('ldl', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold liquid-input"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Triglycerides (mg/dL)</label>
            <input
              type="number"
              placeholder="135"
              value={labData.triglycerides}
              onChange={(e) => handleInputChange('triglycerides', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold liquid-input"
            />
          </div>
        </div>
      </div>

      {/* TOGGLE ADVANCED PANELS */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center space-x-2 text-xs font-extrabold text-cyan-700 dark:text-cyan-400 hover:underline pt-1"
      >
        {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        <span>{showAdvanced ? 'Hide Additional Clinical Biomarkers' : 'Show Advanced Renal & Electrolyte Biomarkers (Optional)'}</span>
      </button>

      {/* ADVANCED PANELS */}
      {showAdvanced && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-md space-y-4 transition-colors duration-300">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Renal & Electrolyte Biomarkers
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Serum Creatinine</label>
              <input
                type="number"
                step="0.1"
                placeholder="0.9"
                value={labData.creatinine}
                onChange={(e) => handleInputChange('creatinine', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold liquid-input"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">BUN (mg/dL)</label>
              <input
                type="number"
                placeholder="14"
                value={labData.bun}
                onChange={(e) => handleInputChange('bun', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold liquid-input"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">ALT (U/L)</label>
              <input
                type="number"
                placeholder="24"
                value={labData.alt}
                onChange={(e) => handleInputChange('alt', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold liquid-input"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">AST (U/L)</label>
              <input
                type="number"
                placeholder="22"
                value={labData.ast}
                onChange={(e) => handleInputChange('ast', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold liquid-input"
              />
            </div>
          </div>
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="flex items-center space-x-3 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-600/25 transition duration-200 flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Running Conformal Assessment...</span>
            </>
          ) : (
            <>
              <Activity className="w-4 h-4 text-white" />
              <span>Run CDSS Risk Assessment</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onReset}
          className="py-3.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-extrabold text-xs transition border border-slate-200 dark:border-slate-700 flex items-center space-x-1.5"
        >
          <RotateCcw className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <span>Clear Form</span>
        </button>
      </div>
    </form>
  );
};
