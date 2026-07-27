import React, { useState } from 'react';
import { Droplet, HeartPulse, Activity, TestTube, Scale, Send, FileCheck } from 'lucide-react';

export const LabInputForm = ({ labData, onChange, onSubmit, isLoading, onReset }) => {
  const [activeCategory, setActiveCategory] = useState('glycemic');

  const handleInputChange = (field, value) => {
    onChange({ ...labData, [field]: value });
  };

  const categories = [
    { id: 'glycemic', label: 'Glycemic & Vitals', icon: Droplet },
    { id: 'lipids', label: 'Lipid Panel', icon: HeartPulse },
    { id: 'organ', label: 'Renal & Hepatic', icon: TestTube },
    { id: 'cbc', label: 'CBC & Electrolytes', icon: Activity },
    { id: 'demographics', label: 'Demographics & Lifestyle', icon: Scale },
  ];

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
            <span>Patient Laboratory Biomarkers</span>
            <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
              39 Biomarkers
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Input routine blood panel metrics or load a preset profile.
          </p>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-slate-200 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition"
        >
          Reset Fields
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 mb-5 overflow-x-auto">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Fields */}
      <form onSubmit={onSubmit} className="space-y-4">
        {/* 1. Glycemic & Vitals */}
        {activeCategory === 'glycemic' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 col-span-full">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">
                ★ Mandatory Diagnostic Biomarkers
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">HbA1c Level (%) *</label>
                  <input
                    type="number"
                    step="0.1"
                    min="3.0"
                    max="16.0"
                    value={labData.hba1c}
                    onChange={(e) => handleInputChange('hba1c', parseFloat(e.target.value))}
                    className="w-full bg-slate-950 border border-cyan-500/50 rounded-lg px-3 py-2 text-sm text-cyan-300 font-bold focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Fasting Glucose (mg/dL) *</label>
                  <input
                    type="number"
                    step="1"
                    min="40"
                    max="450"
                    value={labData.fasting_glucose}
                    onChange={(e) => handleInputChange('fasting_glucose', parseFloat(e.target.value))}
                    className="w-full bg-slate-950 border border-cyan-500/50 rounded-lg px-3 py-2 text-sm text-cyan-300 font-bold focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Random Glucose (mg/dL) *</label>
                  <input
                    type="number"
                    step="1"
                    min="40"
                    max="500"
                    value={labData.random_glucose}
                    onChange={(e) => handleInputChange('random_glucose', parseFloat(e.target.value))}
                    className="w-full bg-slate-950 border border-cyan-500/50 rounded-lg px-3 py-2 text-sm text-cyan-300 font-bold focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Systolic Blood Pressure (mmHg)</label>
              <input
                type="number"
                value={labData.systolic_bp}
                onChange={(e) => handleInputChange('systolic_bp', parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Diastolic Blood Pressure (mmHg)</label>
              <input
                type="number"
                value={labData.diastolic_bp}
                onChange={(e) => handleInputChange('diastolic_bp', parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Body Mass Index - BMI (kg/m²)</label>
              <input
                type="number"
                step="0.1"
                value={labData.bmi}
                onChange={(e) => handleInputChange('bmi', parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Waist Circumference (cm)</label>
              <input
                type="number"
                step="0.1"
                value={labData.waist_circ}
                onChange={(e) => handleInputChange('waist_circ', parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
          </div>
        )}

        {/* 2. Lipid Panel */}
        {activeCategory === 'lipids' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Total Cholesterol (mg/dL)</label>
              <input
                type="number"
                value={labData.total_cholesterol}
                onChange={(e) => handleInputChange('total_cholesterol', parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">HDL Cholesterol (mg/dL)</label>
              <input
                type="number"
                value={labData.hdl}
                onChange={(e) => handleInputChange('hdl', parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">LDL Cholesterol (mg/dL)</label>
              <input
                type="number"
                value={labData.ldl}
                onChange={(e) => handleInputChange('ldl', parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Triglycerides (mg/dL)</label>
              <input
                type="number"
                value={labData.triglycerides}
                onChange={(e) => handleInputChange('triglycerides', parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">VLDL Cholesterol (mg/dL)</label>
              <input
                type="number"
                value={labData.vldl}
                onChange={(e) => handleInputChange('vldl', parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
          </div>
        )}

        {/* 3. Renal & Hepatic */}
        {activeCategory === 'organ' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Serum Creatinine (mg/dL)</label>
              <input
                type="number"
                step="0.01"
                value={labData.creatinine}
                onChange={(e) => handleInputChange('creatinine', parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Blood Urea Nitrogen - BUN (mg/dL)</label>
              <input
                type="number"
                step="0.1"
                value={labData.bun}
                onChange={(e) => handleInputChange('bun', parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Serum Uric Acid (mg/dL)</label>
              <input
                type="number"
                step="0.1"
                value={labData.uric_acid}
                onChange={(e) => handleInputChange('uric_acid', parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Alanine Aminotransferase - ALT (U/L)</label>
              <input
                type="number"
                value={labData.alt}
                onChange={(e) => handleInputChange('alt', parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Aspartate Aminotransferase - AST (U/L)</label>
              <input
                type="number"
                value={labData.ast}
                onChange={(e) => handleInputChange('ast', parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Alkaline Phosphatase - ALP (U/L)</label>
              <input
                type="number"
                value={labData.alp}
                onChange={(e) => handleInputChange('alp', parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
          </div>
        )}

        {/* 4. CBC & Electrolytes */}
        {activeCategory === 'cbc' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Hemoglobin (g/dL)</label>
              <input
                type="number"
                step="0.1"
                value={labData.hemoglobin}
                onChange={(e) => handleInputChange('hemoglobin', parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">WBC Count (x10^3/µL)</label>
              <input
                type="number"
                step="0.1"
                value={labData.wbc_count}
                onChange={(e) => handleInputChange('wbc_count', parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Platelets (x10^3/µL)</label>
              <input
                type="number"
                value={labData.platelet_count}
                onChange={(e) => handleInputChange('platelet_count', parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Serum Sodium (mEq/L)</label>
              <input
                type="number"
                step="0.1"
                value={labData.sodium}
                onChange={(e) => handleInputChange('sodium', parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Serum Potassium (mEq/L)</label>
              <input
                type="number"
                step="0.1"
                value={labData.potassium}
                onChange={(e) => handleInputChange('potassium', parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Serum Chloride (mEq/L)</label>
              <input
                type="number"
                step="0.1"
                value={labData.chloride}
                onChange={(e) => handleInputChange('chloride', parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
          </div>
        )}

        {/* 5. Demographics */}
        {activeCategory === 'demographics' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Age (years)</label>
              <input
                type="number"
                value={labData.age}
                onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Gender</label>
              <select
                value={labData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Smoking History</label>
              <select
                value={labData.smoking_status}
                onChange={(e) => handleInputChange('smoking_status', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              >
                <option value="Never">Never</option>
                <option value="Former">Former</option>
                <option value="Current">Current</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Family History of Diabetes</label>
              <select
                value={labData.family_history}
                onChange={(e) => handleInputChange('family_history', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/25 transition flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <span className="flex items-center space-x-2">
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                <span>Evaluating CDSS Machine Learning Engine...</span>
              </span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Run CDSS Diabetes Risk Assessment & SHAP Analysis</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
