import React from 'react';
import { Heart, Activity, Dna, ShieldCheck, Zap, Sparkles, Cpu, CheckCircle2 } from 'lucide-react';

export const HologramHuman = () => {
  return (
    <div className="relative w-full max-w-sm lg:max-w-md mx-auto h-[460px] sm:h-[500px] flex items-center justify-center overflow-visible pointer-events-none select-none my-2">
      
      {/* 1. APPLE VISION PRO VOLUMETRIC AURA GLOW */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/25 via-blue-400/20 to-transparent dark:from-teal-400/30 dark:via-cyan-400/20 dark:to-transparent rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute w-[320px] h-[320px] bg-cyan-300/20 dark:bg-cyan-400/20 rounded-full blur-2xl animate-hologram-breath"></div>

      {/* 2. ROTATING MULTI-TIERED HOLOGRAM PLATFORM BASE */}
      <div className="absolute bottom-4 w-72 h-24 flex items-center justify-center preserve-3d">
        {/* Tier 3: Outer Rotating Hologram Ring */}
        <div className="absolute w-64 h-64 rounded-full border-2 border-dashed border-cyan-400/60 dark:border-cyan-300/80 animate-platform-rotate shadow-[0_0_25px_rgba(6,182,212,0.5)]"></div>
        {/* Tier 2: Inner Counter-Rotating Ring */}
        <div className="absolute w-48 h-48 rounded-full border border-teal-400/70 dark:border-teal-300/90 animate-spin-slow shadow-[0_0_20px_rgba(20,184,166,0.4)]"></div>
        {/* Tier 1: Neon Platform Glow Base */}
        <div className="absolute w-36 h-10 bg-gradient-to-r from-teal-400/50 via-cyan-400/60 to-blue-500/50 rounded-full blur-md animate-pulse"></div>
      </div>

      {/* 3. ORBITING DNA HELICES & BIOMOLECULES */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-64 h-64 rounded-full border border-cyan-300/30 dark:border-cyan-600/30 animate-spin-slow">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 p-2 rounded-full bg-white dark:bg-slate-900 border border-cyan-400 shadow-lg text-cyan-500">
            <Dna className="w-4 h-4 animate-spin-slow" />
          </div>
        </div>
        <div className="absolute w-80 h-80 rounded-full border border-teal-300/20 dark:border-teal-600/20 animate-platform-rotate">
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 p-2 rounded-full bg-white dark:bg-slate-900 border border-teal-400 shadow-lg text-teal-500">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
        </div>
      </div>

      {/* 4. LIVING 3D HOLOGRAPHIC HUMAN BODY SILHOUETTE */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center animate-hologram-breath">
        
        {/* Holographic Body Container with Blue Laser Scan Line */}
        <div className="relative w-56 h-[390px] flex flex-col items-center justify-center">
          
          {/* HEAD & CRANIUM */}
          <div className="relative w-14 h-16 rounded-full border-2 border-cyan-400/90 dark:border-cyan-300/90 bg-gradient-to-b from-cyan-400/35 via-teal-400/25 to-transparent backdrop-blur-sm shadow-[0_0_18px_rgba(6,182,212,0.5)] flex items-center justify-center mb-1">
            {/* Brain Neural Nodes */}
            <div className="w-2 h-2 rounded-full bg-cyan-300 animate-ping"></div>
            <div className="absolute top-2 left-2.5 w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse"></div>
            <div className="absolute top-3 right-2.5 w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse"></div>
          </div>

          {/* NECK */}
          <div className="w-4 h-4 bg-gradient-to-b from-cyan-400/50 to-teal-400/50 border-x border-cyan-400/70 mb-1"></div>

          {/* CHEST & TORSO WITH PULSING HEART & ECG */}
          <div className="relative w-36 h-44 rounded-3xl border-2 border-teal-400/80 dark:border-teal-300/90 bg-gradient-to-b from-teal-500/30 via-cyan-500/25 to-blue-500/25 backdrop-blur-md shadow-[0_0_35px_rgba(20,184,166,0.4)] flex flex-col items-center justify-center overflow-hidden">
            
            {/* VASCULAR & SPINE NERVE NETWORK */}
            <div className="absolute inset-x-0 top-0 h-full border-r border-l border-dashed border-cyan-400/40"></div>
            <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gradient-to-b from-cyan-400 via-teal-400 to-blue-400 opacity-75"></div>

            {/* PULSING HEART (Beats every 2s - matching reference image) */}
            <div className="absolute top-6 left-10 p-3 rounded-full bg-rose-500/40 dark:bg-rose-500/50 border border-rose-400/90 shadow-[0_0_25px_rgba(244,63,94,0.9)] animate-ping"></div>
            <div className="absolute top-6 left-10 p-2.5 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-xl z-20 animate-pulse">
              <Heart className="w-4 h-4 fill-rose-100 text-white stroke-[2.5]" />
            </div>

            {/* ECG HEARTBEAT WAVE ANIMATION */}
            <div className="absolute inset-x-0 top-14 h-8 overflow-hidden flex items-center justify-center opacity-90 z-10">
              <svg className="w-full h-7" viewBox="0 0 200 40">
                <path
                  d="M 0 20 L 50 20 L 60 5 L 70 35 L 80 10 L 90 25 L 100 20 L 200 20"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  className="animate-dash-draw"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* LUNGS NETWORK */}
            <div className="absolute top-5 right-6 w-9 h-14 rounded-full border border-teal-300/50 bg-teal-400/15"></div>
            <div className="absolute top-5 left-5 w-9 h-14 rounded-full border border-teal-300/50 bg-teal-400/15"></div>

            {/* ORGAN METABOLIC NODE */}
            <div className="absolute bottom-5 p-1.5 rounded-full bg-cyan-400/50 border border-cyan-300 text-cyan-100">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
            </div>

          </div>

          {/* HIPS & LEGS */}
          <div className="relative w-32 h-24 flex justify-between px-3 mt-1">
            {/* Left Leg */}
            <div className="w-9 h-full rounded-b-2xl border-2 border-teal-400/70 bg-gradient-to-b from-teal-400/25 to-cyan-400/15"></div>
            {/* Right Leg */}
            <div className="w-9 h-full rounded-b-2xl border-2 border-teal-400/70 bg-gradient-to-b from-teal-400/25 to-cyan-400/15"></div>
          </div>

          {/* BLUE HOLOGRAPHIC SCANNING LASER LINE (Head to toe loop) */}
          <div className="absolute inset-x-0 w-full h-2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_18px_#38bdf8] animate-laser-scan z-30 pointer-events-none"></div>

        </div>

      </div>

      {/* 5. FLOATING HUD CARDS (Matching Reference Image) */}
      
      {/* Heart Rate HUD Card (Top Right) */}
      <div className="absolute top-10 -right-4 p-2.5 sm:p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-cyan-200/90 dark:border-cyan-800/90 shadow-xl backdrop-blur-md text-[11px] font-mono text-cyan-800 dark:text-cyan-300 space-y-1 animate-float-slow z-20">
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
      <div className="absolute bottom-16 -right-4 p-2.5 sm:p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-purple-200/90 dark:border-purple-800/90 shadow-xl backdrop-blur-md text-[11px] font-mono text-purple-800 dark:text-purple-300 space-y-1 animate-float-slow z-20">
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
