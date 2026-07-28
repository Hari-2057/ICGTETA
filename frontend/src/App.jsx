import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AmbientBackground } from './components/AmbientBackground';
import { LandingPage } from './pages/LandingPage';
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
  const [activeTab, setActiveTab] = useState('home');
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
    const body = document.body;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      body.classList.add('dark');
      body.classList.remove('light');
      body.style.backgroundColor = '#030712';
      body.style.color = '#f8fafc';
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      body.classList.add('light');
      body.classList.remove('dark');
      body.style.backgroundColor = '#f8fafc';
      body.style.color = '#0f172a';
    }
    
    // Update theme-color meta tag for mobile browser webviews
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = theme === 'dark' ? '#030712' : '#f8fafc';

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans relative transition-colors duration-400">
      {/* Ambient Particle Canvas Field & Parallax Grid */}
      <AmbientBackground theme={theme} />

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isHealthy={isHealthy}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        {activeTab === 'home' && (
          <LandingPage
            onLaunchWorkspace={() => setActiveTab('dashboard')}
            onGoToPerformance={() => setActiveTab('performance')}
          />
        )}
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
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 py-8 text-center text-xs text-slate-600 dark:text-slate-400 relative z-10 backdrop-blur-md transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6 text-left pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div className="space-y-2">
            <span className="text-sm font-extrabold text-slate-900 dark:text-white">Diabetes CDSS</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Precision Care Elevated • Conformal-aware clinical decision support system for precision glycemic risk assessment.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">Clinical Platform</span>
            <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <li className="hover:text-teal-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Clinical Workspace</li>
              <li className="hover:text-teal-600 cursor-pointer" onClick={() => setActiveTab('reports')}>Patient Reports History</li>
              <li className="hover:text-teal-600 cursor-pointer" onClick={() => setActiveTab('performance')}>Power BI Dashboard</li>
            </ul>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">Standards & AI</span>
            <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <li className="hover:text-teal-600 cursor-pointer" onClick={() => setActiveTab('methodology')}>ADA & WHO Guidelines</li>
              <li>MAPIE Conformal Calibration</li>
              <li>SHAP TreeExplainer</li>
            </ul>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">Database & Cloud</span>
            <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <li>Supabase PostgreSQL</li>
              <li>Supabase PDF Storage</li>
              <li>Vercel Serverless API</li>
            </ul>
          </div>
        </div>

        <p className="font-medium">
          Precision Care Elevated • Clinical Decision Support System (CDSS) for Diabetes Risk Assessment & Conformal Explainability.
        </p>
        <p className="mt-1 text-slate-500 dark:text-slate-500 font-mono text-[11px]">
          Engineered with XGBoost, SHAP TreeExplainer, MAPIE Conformal Calibration, FastAPI, Supabase & React.
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
