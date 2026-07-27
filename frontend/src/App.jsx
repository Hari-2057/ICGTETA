import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { ReportsHistory } from './pages/ReportsHistory';
import { ModelPerformance } from './pages/ModelPerformance';
import { Methodology } from './pages/Methodology';
import { ModelMetricsModal } from './components/ModelMetricsModal';
import { api } from './services/api';

const INITIAL_EMPTY_LAB_DATA = {
  hba1c: '', fasting_glucose: '', random_glucose: '',
  age: '', gender: 'Female', bmi: '', weight: '', height: '',
  systolic_bp: '', diastolic_bp: '', waist_circ: '',
  smoking_status: 'Never', alcohol_consumption: 'None', physical_activity: 'Moderate', family_history: 'No',
  hemoglobin: '', rbc_count: '', wbc_count: '', platelet_count: '', hematocrit: '', mcv: '', mch: '', mchc: '',
  total_cholesterol: '', hdl: '', ldl: '', vldl: '', triglycerides: '',
  creatinine: '', bun: '', uric_acid: '', alt: '', ast: '', alp: '', bilirubin: '',
  sodium: '', potassium: '', chloride: ''
};

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isHealthy, setIsHealthy] = useState(false);
  const [isMetricsModalOpen, setIsMetricsModalOpen] = useState(false);
  const [modelInfo, setModelInfo] = useState(null);
  
  // Theme state: defaults to 'light' at initial stage as requested
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cdss_theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('cdss_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };
  
  // Persistent state across tab switching (preserves form values & prediction)
  const [labData, setLabData] = useState(INITIAL_EMPTY_LAB_DATA);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      const res = await api.getHealth();
      setIsHealthy(res.status === 'healthy');
    } catch {
      setIsHealthy(false);
    }
  };

  const handleOpenMetricsModal = async () => {
    try {
      const info = await api.getModelInfo();
      setModelInfo(info);
      setIsMetricsModalOpen(true);
    } catch (err) {
      console.error('Failed to load model metrics:', err);
    }
  };

  const handleClearForm = () => {
    setLabData(INITIAL_EMPTY_LAB_DATA);
    setPrediction(null);
  };

  const handleLoadReportToWorkspace = (item) => {
    setLabData(prev => ({
      ...prev,
      age: item.patient_age || 50,
      gender: item.patient_gender || 'Female',
      hba1c: item.hba1c || 6.2,
      fasting_glucose: item.fasting_glucose || 118.0,
      random_glucose: item.random_glucose || (item.fasting_glucose ? item.fasting_glucose + 25 : 145.0),
      bmi: 27.5
    }));
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isHealthy={isHealthy}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <Dashboard
            labData={labData}
            setLabData={setLabData}
            prediction={prediction}
            setPrediction={setPrediction}
            onClearForm={handleClearForm}
            onOpenMetricsModal={handleOpenMetricsModal}
          />
        )}
        {activeTab === 'reports' && (
          <ReportsHistory
            onLoadReportToWorkspace={handleLoadReportToWorkspace}
          />
        )}
        {activeTab === 'performance' && (
          <ModelPerformance
            prediction={prediction}
            onGoToWorkspace={() => setActiveTab('dashboard')}
          />
        )}
        {activeTab === 'methodology' && <Methodology />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-600 dark:text-slate-400 transition-colors duration-300">
        <p className="font-medium">
          Clinical Decision Support System (CDSS) for Diabetes Risk Assessment & Conformal Explainability.
        </p>
        <p className="mt-1 text-slate-500 dark:text-slate-500 font-mono text-[11px]">
          Engineered with XGBoost, SHAP TreeExplainer, MAPIE Conformal Calibration, FastAPI & React.
        </p>
      </footer>

      {/* Model Metrics Modal */}
      <ModelMetricsModal
        isOpen={isMetricsModalOpen}
        onClose={() => setIsMetricsModalOpen(false)}
        modelInfo={modelInfo}
      />
    </div>
  );
}

export default App;
