import React from 'react';
import { Heart, Activity, Dna, ShieldCheck, Zap, Sparkles, Cpu, CheckCircle2 } from 'lucide-react';

export const HologramHuman = () => {
  return (
    <div className="relative w-full max-w-sm lg:max-w-md mx-auto h-[480px] sm:h-[520px] flex items-center justify-center overflow-visible pointer-events-none select-none my-2">
      
      {/* 1. SEAMLESS BACKGROUND CYAN-BLUE GLOW BEAM (100% Merged with website) */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl pointer-events-none opacity-80"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.35) 0%, rgba(14, 165, 233, 0.2) 45%, transparent 75%)'
        }}
      />

      {/* Vertical Upward Light Projection Rays */}
      <div 
        className="absolute bottom-12 w-48 h-[380px] pointer-events-none opacity-60"
        style={{
          background: 'linear-gradient(to top, rgba(56, 189, 248, 0.4) 0%, rgba(6, 182, 212, 0.15) 60%, transparent 100%)',
          clipPath: 'polygon(15% 100%, 85% 100%, 100% 0%, 0% 0%)'
        }}
      />

      {/* 2. MULTI-TIERED 3D CIRCULAR HOLOGRAM PEDESTAL STAGE (Matching Reference Image Base) */}
      <div className="absolute bottom-2 w-72 h-32 flex items-center justify-center preserve-3d">
        {/* Tier 3: Bottom Base Disc */}
        <div 
          className="absolute w-64 h-24 rounded-full border-2 border-cyan-400/60 shadow-[0_0_30px_rgba(6,182,212,0.5)]"
          style={{
            transform: 'rotateX(70deg) translateZ(-20px)',
            background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.3) 0%, rgba(2, 132, 199, 0.15) 70%, transparent 100%)'
          }}
        />

        {/* Tier 2: Middle Disc */}
        <div 
          className="absolute w-52 h-20 rounded-full border-2 border-cyan-300/80 shadow-[0_0_25px_rgba(56,189,248,0.6)]"
          style={{
            transform: 'rotateX(70deg) translateZ(-5px)',
            background: 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.4) 0%, rgba(13, 148, 136, 0.2) 70%, transparent 100%)'
          }}
        />

        {/* Tier 1: Top Concentric Emitter Ring Base */}
        <div 
          className="absolute w-40 h-16 rounded-full border-2 border-white shadow-[0_0_20px_#ffffff]"
          style={{
            transform: 'rotateX(70deg) translateZ(10px)',
            background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.6) 0%, rgba(6, 182, 212, 0.5) 80%, transparent 100%)'
          }}
        />

        {/* Rotating Outer Energy Rings */}
        <div className="absolute w-68 h-68 rounded-full border border-dashed border-cyan-300/70 animate-platform-rotate"></div>
      </div>

      {/* 3. TRANSLUCENT SEAMLESS 3D HOLOGRAPHIC HUMAN FIGURE (SVG + Screen Blend) */}
      <div 
        className="relative z-10 w-full h-[430px] flex flex-col items-center justify-center animate-hologram-breath"
        style={{
          mixBlendMode: 'screen'
        }}
      >
        
        {/* Anatomical Human Vector Hologram */}
        <div className="relative w-52 h-[380px] flex flex-col items-center justify-center">
          
          {/* Head & Cranium */}
          <div className="relative w-16 h-20 rounded-full border-2 border-cyan-300 bg-cyan-400/30 shadow-[0_0_20px_#38bdf8] flex items-center justify-center mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></div>
            <div className="absolute top-2 left-3 w-1.5 h-1.5 rounded-full bg-cyan-200 animate-pulse"></div>
            <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-teal-200 animate-pulse"></div>
          </div>

          {/* Neck */}
          <div className="w-5 h-5 bg-cyan-300/40 border-x-2 border-cyan-300 mb-1"></div>

          {/* Torso & Chest with Pulsing Heart & ECG Line */}
          <div className="relative w-40 h-44 rounded-3xl border-2 border-cyan-300 bg-gradient-to-b from-cyan-400/40 via-sky-400/30 to-teal-400/30 backdrop-blur-sm shadow-[0_0_40px_rgba(6,182,212,0.6)] flex flex-col items-center justify-center overflow-hidden">
            
            {/* Vascular Network Lines */}
            <div className="absolute inset-y-0 left-1/2 w-0.5 bg-cyan-200 shadow-[0_0_10px_#ffffff]"></div>
            <div className="absolute inset-x-0 top-0 h-full border-r border-l border-dashed border-cyan-200/50"></div>

            {/* Glowing Heart Center (Pulsing Red/Pink Glow matching reference) */}
            <div className="absolute top-6 left-11 p-3.5 rounded-full bg-rose-500/50 border-2 border-rose-300 shadow-[0_0_30px_#f43f5e] animate-ping"></div>
            <div className="absolute top-6 left-11 p-3 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-[0_0_20px_#f43f5e] z-20 animate-pulse">
              <Heart className="w-4 h-4 fill-white text-white stroke-[2.5]" />
            </div>

            {/* ECG Wave Line */}
            <div className="absolute inset-x-0 top-14 h-8 overflow-hidden flex items-center justify-center z-10">
              <svg className="w-full h-7" viewBox="0 0 200 40">
                <path
                  d="M 0 20 L 50 20 L 60 5 L 70 35 L 80 10 L 90 25 L 100 20 L 200 20"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className="animate-dash-draw"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Lung Cavities */}
            <div className="absolute top-5 right-7 w-10 h-14 rounded-full border border-cyan-200/60 bg-cyan-300/20"></div>
            <div className="absolute top-5 left-6 w-10 h-14 rounded-full border border-cyan-200/60 bg-cyan-300/20"></div>

            {/* Organ Core */}
            <div className="absolute bottom-4 p-1.5 rounded-full bg-cyan-300/60 text-white shadow-[0_0_10px_#ffffff]">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
            </div>

          </div>

          {/* Legs & Lower Body */}
          <div className="relative w-36 h-28 flex justify-between px-3 mt-1">
            <div className="w-10 h-full rounded-b-2xl border-2 border-cyan-300 bg-gradient-to-b from-cyan-400/30 to-teal-400/20"></div>
            <div className="w-10 h-full rounded-b-2xl border-2 border-cyan-300 bg-gradient-to-b from-cyan-400/30 to-teal-400/20"></div>
          </div>

          {/* Head-to-Toe Holographic Scan Laser Line */}
          <div className="absolute inset-x-0 w-full h-2.5 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_25px_#ffffff] animate-laser-scan z-30 pointer-events-none"></div>

        </div>

      </div>

      {/* 4. FLOATING HUD CARDS (100% Matching Reference Image) */}
      
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
