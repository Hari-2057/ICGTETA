import React, { useState } from 'react';
import { Stethoscope, Activity, Cpu, BookOpen, FileText, Sun, Moon, Home, Menu, X } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, isHealthy, theme, toggleTheme }) => {
  const isDark = theme === 'dark';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Overview', icon: <Home className="w-4 h-4 text-teal-600 dark:text-teal-400" /> },
    { id: 'dashboard', label: 'Workspace', icon: <Activity className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> },
    { id: 'reports', label: 'Patient Reports', icon: <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" /> },
    { id: 'performance', label: 'Model Performance', icon: <Cpu className="w-4 h-4 text-amber-600 dark:text-amber-400" /> },
    { id: 'methodology', label: 'Standards', icon: <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" /> }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 border-b border-slate-200/90 dark:border-slate-800/90 backdrop-blur-xl shadow-sm transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Clinical Emblem & Brand */}
          <div className="flex items-center space-x-2.5 cursor-pointer group" onClick={() => handleNavClick('home')}>
            <div className="relative p-2 rounded-xl bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white shadow-md shadow-teal-600/20 border border-teal-400/30 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white stroke-[2.5]" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Diabetes <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400">CDSS</span>
                </span>
                <span className="hidden xs:inline-block px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  Precision Care
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                Decision Support System
              </p>
            </div>
          </div>

          {/* DESKTOP Navigation Tabs (lg and above) */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-100/80 dark:bg-slate-900/80 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link-sweep ${activeTab === item.id ? 'active-sweep text-teal-700 dark:text-teal-300 font-extrabold' : 'text-slate-600 dark:text-slate-300'} flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Action Bar (Theme switch & Mobile menu button) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Live Status Indicator */}
            <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs shadow-sm">
              <span className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`}></span>
              <span className="font-extrabold text-emerald-800 dark:text-emerald-300 text-[10px]">
                {isHealthy ? 'CDSS Active' : 'Offline'}
              </span>
            </div>

            {/* Morphing Sun/Moon Pill Theme Switcher */}
            <button
              onClick={toggleTheme}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
              className="relative w-14 h-7.5 rounded-full p-1 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 theme-switch-btn flex items-center justify-between shadow-inner focus:outline-none cursor-pointer"
            >
              <Sun className={`w-3.5 h-3.5 text-amber-500 transition-all duration-400 ${isDark ? 'opacity-40 scale-75' : 'opacity-100 scale-100'}`} />
              <Moon className={`w-3.5 h-3.5 text-cyan-400 transition-all duration-400 ${isDark ? 'opacity-100 scale-100' : 'opacity-40 scale-75'}`} />
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white dark:bg-slate-900 shadow-md transform transition-transform duration-400 ease-out flex items-center justify-center border border-slate-200 dark:border-slate-700 ${
                  isDark ? 'translate-x-7' : 'translate-x-0'
                }`}
              >
                {isDark ? <Moon className="w-3 h-3 text-teal-400" /> : <Sun className="w-3 h-3 text-amber-500" />}
              </span>
            </button>

            {/* MOBILE Hamburger Menu Button (< lg) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-none"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-rose-500" /> : <Menu className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE Navigation Drawer Sheet (< lg) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-950/98 backdrop-blur-2xl px-4 pt-3 pb-5 space-y-2 animate-fade-rise shadow-2xl">
          <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-400">
            <span>Navigation Menu</span>
            <span className="flex items-center space-x-1 text-emerald-600 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>CDSS Active</span>
            </span>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-teal-500/15 via-cyan-500/10 to-transparent text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </button>
          ))}

          {/* Dedicated Mobile Theme Toggle Action Button */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => {
                toggleTheme();
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-extrabold border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center space-x-3">
                {isDark ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                <span>Theme: {isDark ? 'Enterprise Dark Mode' : 'Clinical Light Mode'}</span>
              </div>
              <span className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 text-[10px] text-teal-600 dark:text-teal-400 border border-slate-200 dark:border-slate-700">
                Switch
              </span>
            </button>
          </div>

        </div>
      )}
    </header>
  );
};
