import React from 'react';
import { Heart, Activity, Dna, Shield, Zap, Sparkles } from 'lucide-react';

export const HologramHuman = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto h-[480px] sm:h-[540px] flex items-center justify-center overflow-visible pointer-events-none select-none my-4">
      
      {/* 1. DYNAMIC BACKGROUND LIGHT RAYS & GLOW AURA */}
      <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 via-cyan-500/15 to-blue-500/10 dark:from-teal-400/25 dark:via-cyan-400/20 dark:to-transparent rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute w-[360px] h-[360px] bg-cyan-400/10 dark:bg-cyan-400/20 rounded-full blur-2xl animate-hologram-breath"></div>

      {/* 2. ROTATING HOLOGRAM BASE PLATFORM & CONCENTRIC ENERGY RINGS */}
      <div className="absolute bottom-6 w-80 h-28 flex items-center justify-center preserve-3d">
        {/* Outer Rotating Energy Ring */}
        <div className="absolute w-72 h-72 rounded-full border-2 border-dashed border-teal-400/50 dark:border-teal-400/70 animate-platform-rotate shadow-[0_0_25px_rgba(20,184,166,0.4)]"></div>
        {/* Inner Counter-Rotating Ring */}
        <div className="absolute w-56 h-56 rounded-full border border-cyan-400/60 dark:border-cyan-300/80 animate-spin-slow shadow-[0_0_20px_rgba(6,182,212,0.3)]"></div>
        {/* Neon Platform Glow Base */}
        <div className="absolute w-44 h-12 bg-gradient-to-r from-teal-500/40 via-cyan-400/50 to-blue-500/40 rounded-full blur-md animate-pulse"></div>
      </div>

      {/* 3. ORBITING DNA & BIOMOLECULES (3D Orbit Paths) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-72 h-72 rounded-full border border-teal-300/30 dark:border-teal-600/30 animate-spin-slow">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 p-2 rounded-full bg-white dark:bg-slate-900 border border-teal-400 shadow-lg text-teal-500">
            <Dna className="w-4 h-4 animate-spin-slow" />
          </div>
        </div>
        <div className="absolute w-96 h-96 rounded-full border border-cyan-300/20 dark:border-cyan-600/20 animate-platform-rotate">
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 p-2 rounded-full bg-white dark:bg-slate-900 border border-cyan-400 shadow-lg text-cyan-500">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
        </div>
      </div>

      {/* 4. LIVING HOLOGRAPHIC HUMAN BODY SILHOUETTE */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center animate-hologram-breath">
        
        {/* Holographic Body Container with Blue Laser Scan Line */}
        <div className="relative w-64 h-[420px] flex flex-col items-center justify-center">
          
          {/* HEAD & CRANIUM */}
          <div className="relative w-16 h-20 rounded-full border-2 border-cyan-400/80 dark:border-cyan-300/90 bg-gradient-to-b from-cyan-400/30 via-teal-400/20 to-transparent backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center mb-1">
            {/* Brain Neural Nodes */}
            <div className="w-2 h-2 rounded-full bg-cyan-300 animate-ping"></div>
            <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse"></div>
            <div className="absolute top-4 right-3 w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse"></div>
          </div>

          {/* NECK */}
          <div className="w-5 h-5 bg-gradient-to-b from-cyan-400/40 to-teal-400/40 border-x border-cyan-400/60 mb-1"></div>

          {/* CHEST & TORSO WITH PULSING HEART & ECG */}
          <div className="relative w-44 h-48 rounded-3xl border-2 border-teal-400/70 dark:border-teal-300/80 bg-gradient-to-b from-teal-500/25 via-cyan-500/20 to-blue-500/20 backdrop-blur-md shadow-[0_0_30px_rgba(20,184,166,0.3)] flex flex-col items-center justify-center overflow-hidden">
            
            {/* VASCULAR & SPINE NERVE NETWORK */}
            <div className="absolute inset-x-0 top-0 h-full border-r border-l border-dashed border-cyan-400/30"></div>
            <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gradient-to-b from-cyan-400 via-teal-400 to-blue-400 opacity-60"></div>

            {/* PULSING HEART (Beats every 2s) */}
            <div className="absolute top-8 left-12 p-3 rounded-full bg-rose-500/30 dark:bg-rose-500/40 border border-rose-400/80 shadow-[0_0_20px_rgba(244,63,94,0.8)] animate-ping"></div>
            <div className="absolute top-8 left-12 p-2.5 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-xl z-20 animate-pulse">
              <Heart className="w-5 h-5 fill-rose-100 text-white stroke-[2.5]" />
            </div>

            {/* ECG HEARTBEAT WAVE ANIMATION */}
            <div className="absolute inset-x-0 top-16 h-10 overflow-hidden flex items-center justify-center opacity-85 z-10">
              <svg className="w-full h-8" viewBox="0 0 200 40">
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

            {/* LUNGS & BREATHING NETWORK */}
            <div className="absolute top-6 right-8 w-10 h-16 rounded-full border border-teal-300/40 bg-teal-400/10"></div>
            <div className="absolute top-6 left-6 w-10 h-16 rounded-full border border-teal-300/40 bg-teal-400/10"></div>

            {/* ORGAN METABOLIC NODE */}
            <div className="absolute bottom-6 p-1.5 rounded-full bg-cyan-400/40 border border-cyan-300 text-cyan-200">
              <Activity className="w-4 h-4 animate-pulse" />
            </div>

          </div>

          {/* HIPS & LEGS */}
          <div className="relative w-36 h-28 flex justify-between px-4 mt-1">
            {/* Left Leg */}
            <div className="w-10 h-full rounded-b-2xl border-2 border-teal-400/60 bg-gradient-to-b from-teal-400/20 to-cyan-400/10"></div>
            {/* Right Leg */}
            <div className="w-10 h-full rounded-b-2xl border-2 border-teal-400/60 bg-gradient-to-b from-teal-400/20 to-cyan-400/10"></div>
          </div>

          {/* BLUE HOLOGRAPHIC SCANNING LASER LINE (Head to toe loop) */}
          <div className="absolute inset-x-0 w-full h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#38bdf8] animate-laser-scan z-30 pointer-events-none"></div>

        </div>

      </div>

      {/* 5. FLOATING HUD MEDICAL METRICS */}
      <div className="absolute top-12 left-4 p-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-teal-300/80 dark:border-teal-700/80 shadow-xl backdrop-blur-md text-[11px] font-mono text-teal-700 dark:text-teal-300 flex items-center space-x-2 animate-float-slow">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
        <span>ECG: 72 BPM • Sync Normal</span>
      </div>

      <div className="absolute bottom-16 right-4 p-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-cyan-300/80 dark:border-cyan-700/80 shadow-xl backdrop-blur-md text-[11px] font-mono text-cyan-700 dark:text-cyan-300 flex items-center space-x-2 animate-float-reverse">
        <Zap className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
        <span>HbA1c Target &lt; 5.7%</span>
      </div>

    </div>
  );
};
