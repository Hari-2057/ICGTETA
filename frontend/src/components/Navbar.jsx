import React from 'react';
import { Stethoscope, Activity, Cpu, BookOpen } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, isHealthy }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 border-b border-slate-200/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Clinical Emblem & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/20 border border-cyan-400/30 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white stroke-[2.5]" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-extrabold text-slate-900 tracking-tight">
                  Diabetes <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">CDSS</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-cyan-50 text-cyan-700 border border-cyan-200 shadow-sm">
                  Conformal AI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                Clinical Decision Support System
              </p>
            </div>
          </div>

          {/* Pristine Light Navigation Tabs */}
          <nav className="flex items-center space-x-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                activeTab === 'dashboard'
                  ? 'bg-white text-cyan-700 border border-cyan-200/90 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Activity className="w-4 h-4 text-cyan-600" />
              <span>Workspace</span>
            </button>

            <button
              onClick={() => setActiveTab('performance')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                activeTab === 'performance'
                  ? 'bg-white text-amber-700 border border-amber-200/90 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Cpu className="w-4 h-4 text-amber-600" />
              <span>Model Performance</span>
            </button>

            <button
              onClick={() => setActiveTab('methodology')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                activeTab === 'methodology'
                  ? 'bg-white text-purple-700 border border-purple-200/90 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>Standards</span>
            </button>
          </nav>

          {/* Live Status Indicator */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs shadow-sm">
            <span className={`w-2.5 h-2.5 rounded-full ${isHealthy ? 'bg-emerald-500 animate-pulse shadow-sm' : 'bg-amber-500'}`}></span>
            <span className="font-bold text-emerald-800 text-[11px]">
              {isHealthy ? 'CDSS Engine Active' : 'Offline Mode'}
            </span>
          </div>

        </div>
      </div>
    </header>
  );
};
