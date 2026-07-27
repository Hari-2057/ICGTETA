import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { ModelPerformance } from './pages/ModelPerformance';
import { Methodology } from './pages/Methodology';
import { ModelMetricsModal } from './components/ModelMetricsModal';
import { api } from './services/api';

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isHealthy, setIsHealthy] = useState(false);
  const [isMetricsModalOpen, setIsMetricsModalOpen] = useState(false);
  const [modelInfo, setModelInfo] = useState(null);

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isHealthy={isHealthy}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <Dashboard onOpenMetricsModal={handleOpenMetricsModal} />
        )}
        {activeTab === 'performance' && <ModelPerformance />}
        {activeTab === 'methodology' && <Methodology />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-400">
        <p>
          Clinical Decision Support System (CDSS) for Diabetes Risk Assessment & Conformal Explainability.
        </p>
        <p className="mt-1 text-slate-400 font-mono">
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
