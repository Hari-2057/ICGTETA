import React from 'react';
import { Stethoscope, Activity, Cpu, BookOpen, FileText, Sun, Moon, Home } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, isHealthy, theme, toggleTheme }) => {
  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 border-b border-slate-200/90 dark:border-slate-800/90 backdrop-blur-xl shadow-sm transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Clinical Emblem & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
            <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white shadow-md shadow-teal-600/20 border border-teal-400/30 flex items-center justify-center icon-nudge">
              <Stethoscope className="w-5 h-5 text-white stroke-[2.5]" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Diabetes <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400">CDSS</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 shadow-sm animate-pulse-glow">
                  Precision Care
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                Clinical Decision Support System
              </p>
            </div>
          </div>

          {/* Navigation Tabs with Underline Sweep */}
          <nav className="flex items-center space-x-1 sm:space-x-1.5 bg-slate-100/80 dark:bg-slate-900/80 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('home')}
              className={`nav-link-sweep ${activeTab === 'home' ? 'active-sweep text-teal-700 dark:text-teal-300 font-extrabold' : 'text-slate-600 dark:text-slate-300'} flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200`}
            >
              <Home className="w-4 h-4 text-teal-600 dark:text-teal-400 icon-nudge" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`nav-link-sweep ${activeTab === 'dashboard' ? 'active-sweep text-cyan-700 dark:text-cyan-300 font-extrabold' : 'text-slate-600 dark:text-slate-300'} flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200`}
            >
              <Activity className="w-4 h-4 text-cyan-600 dark:text-cyan-400 icon-nudge" />
              <span>Workspace</span>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`nav-link-sweep ${activeTab === 'reports' ? 'active-sweep text-blue-700 dark:text-blue-300 font-extrabold' : 'text-slate-600 dark:text-slate-300'} flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200`}
            >
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 icon-nudge" />
              <span>Patient Reports</span>
            </button>

            <button
              onClick={() => setActiveTab('performance')}
              className={`nav-link-sweep ${activeTab === 'performance' ? 'active-sweep text-amber-700 dark:text-amber-300 font-extrabold' : 'text-slate-600 dark:text-slate-300'} flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200`}
            >
              <Cpu className="w-4 h-4 text-amber-600 dark:text-amber-400 icon-nudge" />
              <span>Model Performance</span>
            </button>

            <button
              onClick={() => setActiveTab('methodology')}
              className={`nav-link-sweep ${activeTab === 'methodology' ? 'active-sweep text-purple-700 dark:text-purple-300 font-extrabold' : 'text-slate-600 dark:text-slate-300'} flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200`}
            >
              <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400 icon-nudge" />
              <span>Standards</span>
            </button>
          </nav>

          {/* Morphing Sun/Moon Pill Theme Switcher */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
              className="relative w-16 h-8 rounded-full p-1 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 theme-switch-btn flex items-center justify-between shadow-inner focus:outline-none cursor-pointer"
            >
              <span className="sr-only">Toggle Theme</span>
              {/* Sun Icon */}
              <Sun className={`w-4 h-4 text-amber-500 transition-all duration-400 ${isDark ? 'opacity-40 scale-75' : 'opacity-100 scale-100'}`} />
              {/* Moon Icon */}
              <Moon className={`w-4 h-4 text-cyan-400 transition-all duration-400 ${isDark ? 'opacity-100 scale-100' : 'opacity-40 scale-75'}`} />
              
              {/* Sliding Morph Pill Thumb */}
              <span
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white dark:bg-slate-900 shadow-md transform transition-transform duration-400 ease-out flex items-center justify-center border border-slate-200 dark:border-slate-700 ${
                  isDark ? 'translate-x-8' : 'translate-x-0'
                }`}
              >
                {isDark ? (
                  <Moon className="w-3.5 h-3.5 text-teal-400" />
                ) : (
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                )}
              </span>
            </button>

            {/* Live Status Indicator */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs shadow-sm">
              <span className={`w-2.5 h-2.5 rounded-full ${isHealthy ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`}></span>
              <span className="font-extrabold text-emerald-800 dark:text-emerald-300 text-[11px]">
                {isHealthy ? 'CDSS Active' : 'Offline'}
              </span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
