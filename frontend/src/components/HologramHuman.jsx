import React from 'react';
import { Heart, Activity, Dna, ShieldCheck, Zap, Sparkles, Cpu, CheckCircle2 } from 'lucide-react';

export const HologramHuman = () => {
  return (
    <div className="relative w-full max-w-sm lg:max-w-md mx-auto h-[490px] sm:h-[540px] flex items-center justify-center overflow-visible pointer-events-none select-none my-2">
      
      {/* 1. SEAMLESS AMBIENT CYAN-BLUE VOLUMETRIC LIGHT GLOW */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/35 via-blue-400/25 to-transparent dark:from-teal-400/40 dark:via-cyan-400/30 dark:to-transparent rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute w-[360px] h-[360px] bg-cyan-300/30 dark:bg-cyan-400/30 rounded-full blur-2xl animate-hologram-breath"></div>

      {/* 2. ORBITING DNA HELICES & BIOMOLECULES */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-76 h-76 rounded-full border border-cyan-300/40 dark:border-cyan-600/40 animate-spin-slow">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 p-2 rounded-full bg-white dark:bg-slate-900 border border-cyan-400 shadow-lg text-cyan-500">
            <Dna className="w-4 h-4 animate-spin-slow" />
          </div>
        </div>
        <div className="absolute w-92 h-92 rounded-full border border-teal-300/30 dark:border-teal-600/30 animate-platform-rotate">
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 p-2 rounded-full bg-white dark:bg-slate-900 border border-teal-400 shadow-lg text-teal-500">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
        </div>
      </div>

      {/* 3. USER-PROVIDED 3D HOLOGRAPHIC HUMAN & PEDESTAL PLATFORM (100% Merged with background) */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center animate-hologram-breath">
        
        {/* Hologram Human Body Image provided by User */}
        <div className="relative w-full h-[480px] flex items-center justify-center">
          <img
            src="/user_hologram_exact.png"
            alt="3D Holographic Human Body"
            className="w-full h-full object-contain filter drop-shadow-[0_0_35px_rgba(6,182,212,0.8)]"
            style={{
              mixBlendMode: 'multiply'
            }}
          />

          {/* BLUE HOLOGRAPHIC SCANNING LASER LINE (Head to toe loop) */}
          <div className="absolute inset-x-8 w-4/5 h-2.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_25px_#38bdf8] animate-laser-scan z-30 pointer-events-none"></div>
        </div>

      </div>

      {/* 4. FLOATING HUD CARDS (Matching Reference Image) */}
      
      {/* Heart Rate HUD Card (Top Right) */}
      <div className="absolute top-8 -right-4 p-2.5 sm:p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-cyan-200/90 dark:border-cyan-800/90 shadow-xl backdrop-blur-md text-[11px] font-mono text-cyan-800 dark:text-cyan-300 space-y-1 animate-float-slow z-20">
        <div className="flex items-center space-x-1.5">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
          <span className="font-extrabold text-xs">Heart Rate</span>
        </div>
        <div className="flex items-baseline space-x-1">
          <span className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">72</span>
          <span className="text-[10px] text-slate-500 font-bold">BPM</span>
        </div>
        {/* Mini ECG Graph */}
        <div className="w-20 h-4 border-t border-dashed border-cyan-300/80 pt-0.5">
          <svg className="w-full h-full" viewBox="0 0 100 20">
            <path d="M 0 10 L 25 10 L 30 2 L 35 18 L 40 5 L 45 12 L 50 10 L 100 10" fill="none" stroke="#0284c7" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Confidence HUD Card (Middle Right) */}
      <div className="absolute top-44 -right-6 p-2.5 sm:p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-teal-200/90 dark:border-teal-800/90 shadow-xl backdrop-blur-md text-[11px] font-mono text-teal-800 dark:text-teal-300 space-y-1 animate-float-reverse z-20">
        <div className="flex items-center space-x-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span className="font-extrabold text-xs">Confidence</span>
        </div>
        <div className="flex items-baseline space-x-1">
          <span className="text-xl font-extrabold font-mono text-teal-700 dark:text-teal-400">95%</span>
          <span className="text-[10px] text-emerald-600 font-extrabold">High</span>
        </div>
      </div>

      {/* AI Analysis HUD Card (Bottom Right) */}
      <div className="absolute bottom-14 -right-4 p-2.5 sm:p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-purple-200/90 dark:border-purple-800/90 shadow-xl backdrop-blur-md text-[11px] font-mono text-purple-800 dark:text-purple-300 space-y-1 animate-float-slow z-20">
        <div className="flex items-center space-x-1.5">
          <Cpu className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 animate-spin-slow" />
          <span className="font-extrabold text-xs">AI Analysis</span>
        </div>
        <div className="flex items-center space-x-1 text-emerald-600 font-extrabold text-xs">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Active</span>
        </div>
      </div>

    </div>
  );
};
