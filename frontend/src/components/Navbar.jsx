import React, { useState } from 'react';
import { Activity, Cpu, BookOpen, Menu, X, CheckCircle } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, isHealthy }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => handleNavClick('dashboard')}>
            <div className="p-2 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-xl text-white shadow-lg shadow-cyan-500/20">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-400">
                Diabetes CDSS
              </span>
              <span className="self-start sm:self-auto px-2 py-0.5 text-[10px] font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800/60 rounded-full">
                Conformal AI
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Workspace</span>
            </button>

            <button
              onClick={() => handleNavClick('performance')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'performance'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Model Performance</span>
            </button>

            <button
              onClick={() => handleNavClick('methodology')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'methodology'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Methodology & Standards</span>
            </button>
          </nav>

          {/* System Status Badge & Mobile Hamburger Toggle */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-slate-950/90 px-3 py-1.5 rounded-full border border-slate-800">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-semibold text-emerald-400">
                {isHealthy ? 'CDSS Engine Active' : 'Online'}
              </span>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold ${
              activeTab === 'dashboard' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-300'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Workspace</span>
          </button>
          <button
            onClick={() => handleNavClick('performance')}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold ${
              activeTab === 'performance' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-300'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Model Performance</span>
          </button>
          <button
            onClick={() => handleNavClick('methodology')}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold ${
              activeTab === 'methodology' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-300'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Methodology & Standards</span>
          </button>
        </div>
      )}
    </header>
  );
};
