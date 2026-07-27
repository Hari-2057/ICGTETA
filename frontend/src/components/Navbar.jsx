import React from 'react';
import { Stethoscope, Activity, Cpu, BookOpen, FileText, Sun, Moon } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, isHealthy, theme, toggleTheme }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/90 dark:border-slate-800/90 backdrop-blur-md shadow-sm transition-colors duration-300">
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
                <span className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Diabetes <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400">CDSS</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 shadow-sm">
                  Conformal AI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                Clinical Decision Support System
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-1.5 bg-slate-100/80 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                activeTab === 'dashboard'
                  ? 'bg-white dark:bg-slate-900 text-cyan-700 dark:text-cyan-300 border border-cyan-200/90 dark:border-cyan-800/90 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60'
              }`}
            >
              <Activity className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Workspace</span>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                activeTab === 'reports'
                  ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300 border border-blue-200/90 dark:border-blue-800/90 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60'
              }`}
            >
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Patient Reports</span>
            </button>

            <button
              onClick={() => setActiveTab('performance')}
              className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                activeTab === 'performance'
                  ? 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-300 border border-amber-200/90 dark:border-amber-800/90 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60'
              }`}
            >
              <Cpu className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Model Performance</span>
            </button>

            <button
              onClick={() => setActiveTab('methodology')}
              className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                activeTab === 'methodology'
                  ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 border border-purple-200/90 dark:border-purple-800/90 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60'
              }`}
            >
              <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Standards</span>
            </button>
          </nav>

          {/* Theme Toggle & Engine Status */}
          <div className="flex items-center space-x-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition flex items-center space-x-1.5 text-xs font-extrabold shadow-sm"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                  <span className="hidden md:inline">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span className="hidden md:inline">Dark Mode</span>
                </>
              )}
            </button>

            {/* Live Status Indicator */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs shadow-sm">
              <span className={`w-2.5 h-2.5 rounded-full ${isHealthy ? 'bg-emerald-500 animate-pulse shadow-sm' : 'bg-amber-500'}`}></span>
              <span className="font-bold text-emerald-800 dark:text-emerald-300 text-[11px]">
                {isHealthy ? 'CDSS Active' : 'Offline'}
              </span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
