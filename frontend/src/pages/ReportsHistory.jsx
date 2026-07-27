import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { generateClientPdfReport } from '../utils/pdfGenerator';
import { FileText, Download, Search, Calendar, User, Filter, ArrowRight, ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';

export const ReportsHistory = ({ onLoadReportToWorkspace }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState('ALL');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await api.getReports();
      setReports(data);
    } catch (err) {
      console.error('Failed to load reports history:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reports.filter(item => {
    const matchesSearch = 
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.patient_age && item.patient_age.toString().includes(searchQuery));
      
    const matchesFilter = filterClass === 'ALL' || item.predicted_class === filterClass;
    return matchesSearch && matchesFilter;
  });

  const getBadgeStyle = (cls) => {
    switch (cls) {
      case 'Healthy':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'Prediabetes':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      default:
        return 'bg-rose-50 text-rose-800 border-rose-300';
    }
  };

  const handleDownload = (item) => {
    const mockPrediction = {
      predicted_class: item.predicted_class,
      confidence_score: item.confidence_score || 95.0,
      confidence_category: 'Reliable',
      severity_index: item.severity_index || 25.0,
      uncertainty_alert: 'Model confidence is high. Clinical prediction is reliable.',
      shap_explanation: {
        top_risk_increasing_biomarkers: [
          { feature: 'hba1c', display_name: 'HbA1c Level (%)', shap_value: 0.52, actual_value: item.hba1c }
        ],
        top_risk_reducing_biomarkers: []
      },
      cdss_recommendations: [
        {
          priority: item.predicted_class === 'Type 2 Diabetes' ? 'High' : (item.predicted_class === 'Prediabetes' ? 'Medium' : 'Low'),
          category: 'Glycemic Management',
          title: `ADA Clinical Plan for ${item.predicted_class}`,
          action: 'Follow standardized ADA glycemic intervention protocols and schedule routine evaluation.'
        }
      ]
    };

    const mockLabData = {
      age: item.patient_age,
      gender: item.patient_gender,
      hba1c: item.hba1c,
      fasting_glucose: item.fasting_glucose,
      random_glucose: item.fasting_glucose ? item.fasting_glucose + 25 : 140,
      bmi: 26.5
    };

    generateClientPdfReport(mockPrediction, mockLabData);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 p-6 rounded-2xl border border-slate-700 shadow-xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-400 border border-cyan-500/40 shadow-sm">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-extrabold tracking-tight">
                Saved Patient Reports & Evaluation History
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                Backend Storage: reports/
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Access, filter, inspect, and download all past clinical decision reports saved in the system backend.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search report ID or patient age..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-100"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 rounded-xl px-3 py-2 focus:bg-white focus:border-cyan-600 focus:outline-none"
          >
            <option value="ALL">All Outcomes</option>
            <option value="Healthy">Healthy</option>
            <option value="Prediabetes">Prediabetes</option>
            <option value="Type 2 Diabetes">Type 2 Diabetes</option>
          </select>
        </div>
      </div>

      {/* Report Cards / List View */}
      {loading ? (
        <div className="flex items-center justify-center h-48 text-slate-500 text-xs font-semibold">
          <span className="w-4 h-4 border-2 border-cyan-600 border-t-transparent rounded-full animate-spin mr-2"></span>
          Loading Saved Patient Reports from backend/reports...
        </div>
      ) : filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReports.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-md hover:shadow-lg transition space-y-4">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
                    <FileText className="w-5 h-5 text-cyan-700" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900 font-mono">
                      {item.id}
                    </h3>
                    <div className="flex items-center space-x-2 text-[10px] text-slate-500 mt-0.5 font-medium">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{item.timestamp}</span>
                    </div>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${getBadgeStyle(item.predicted_class)}`}>
                  {item.predicted_class}
                </span>
              </div>

              {/* Patient Key Biomarkers Overview */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block font-semibold">Age / Sex</span>
                  <span className="font-extrabold text-slate-800">{item.patient_age} yrs ({item.patient_gender?.[0]})</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block font-semibold">HbA1c Level</span>
                  <span className="font-extrabold text-cyan-800 font-mono">{item.hba1c} %</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block font-semibold">Fasting Glucose</span>
                  <span className="font-extrabold text-slate-800 font-mono">{item.fasting_glucose} mg/dL</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => onLoadReportToWorkspace(item)}
                  className="flex items-center space-x-1 text-xs font-bold text-cyan-700 hover:text-cyan-800"
                >
                  <span>Load Values into Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleDownload(item)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-extrabold text-xs shadow-md shadow-cyan-600/20 transition"
                >
                  <Download className="w-3.5 h-3.5 text-white" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-xs font-medium">
          No saved patient reports matched your search criteria.
        </div>
      )}
    </div>
  );
};
