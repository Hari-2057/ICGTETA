import React from 'react';
import { Heart, Activity, Dna, ShieldCheck, Zap, Sparkles, Cpu, CheckCircle2 } from 'lucide-react';

export const HologramHuman = () => {
  return (
    <div className="relative w-full max-w-sm lg:max-w-md mx-auto h-[490px] sm:h-[540px] flex items-center justify-center overflow-visible pointer-events-none select-none my-2">
      
      {/* 1. SEAMLESS AMBIENT VOLUMETRIC CYAN-BLUE LIGHT BEAM */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl pointer-events-none opacity-80"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.3) 0%, rgba(56, 189, 248, 0.15) 50%, transparent 75%)'
        }}
      />

      {/* Upward Holographic Projection Rays */}
      <div 
        className="absolute bottom-10 w-52 h-[400px] pointer-events-none opacity-70"
        style={{
          background: 'linear-gradient(to top, rgba(56, 189, 248, 0.35) 0%, rgba(6, 182, 212, 0.12) 65%, transparent 100%)',
          clipPath: 'polygon(10% 100%, 90% 100%, 100% 0%, 0% 0%)'
        }}
      />

      {/* 2. MULTI-TIERED 3D CIRCULAR HOLOGRAM PEDESTAL STAGE (Matching Reference Image Base) */}
      <div className="absolute bottom-2 w-80 h-32 flex items-center justify-center preserve-3d">
        {/* Tier 3: Bottom Pedestal Disc */}
        <div 
          className="absolute w-72 h-24 rounded-full border-2 border-cyan-400/60 shadow-[0_0_30px_rgba(6,182,212,0.5)]"
          style={{
            transform: 'rotateX(68deg) translateZ(-20px)',
            background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.35) 0%, rgba(2, 132, 199, 0.15) 70%, transparent 100%)'
          }}
        />

        {/* Tier 2: Middle Pedestal Step */}
        <div 
          className="absolute w-56 h-20 rounded-full border-2 border-cyan-300/80 shadow-[0_0_25px_rgba(56,189,248,0.6)]"
          style={{
            transform: 'rotateX(68deg) translateZ(-5px)',
            background: 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.45) 0%, rgba(13, 148, 136, 0.2) 70%, transparent 100%)'
          }}
        />

        {/* Tier 1: Top Emitter Ring */}
        <div 
          className="absolute w-44 h-16 rounded-full border-2 border-white shadow-[0_0_20px_#ffffff]"
          style={{
            transform: 'rotateX(68deg) translateZ(10px)',
            background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.65) 0%, rgba(6, 182, 212, 0.5) 80%, transparent 100%)'
          }}
        />

        {/* Outer Rotating Energy Rings */}
        <div className="absolute w-76 h-76 rounded-full border border-dashed border-cyan-300/70 animate-platform-rotate"></div>
      </div>

      {/* 3. ORBITING DNA HELICES & BIOMOLECULES */}
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

      {/* 4. NATIVE 3D ANATOMICAL MALE HOLOGRAPHIC HUMAN SILHOUETTE (SVG Vector - 0% Image Box!) */}
      <div className="relative z-10 w-full h-[450px] flex flex-col items-center justify-center animate-hologram-breath">
        
        <div className="relative w-56 h-[400px] flex flex-col items-center justify-center">
          
          {/* Anatomical Human Vector Hologram */}
          <svg className="w-full h-full filter drop-shadow-[0_0_20px_rgba(56,189,248,0.85)]" viewBox="0 0 200 400" fill="none">
            
            {/* HEAD & CRANIUM */}
            <ellipse cx="100" cy="40" rx="16" ry="20" stroke="#38bdf8" strokeWidth="2.5" fill="url(#cyanGlowGrad)" />
            <circle cx="100" cy="40" r="3" fill="#ffffff" className="animate-ping" />
            <circle cx="94" cy="36" r="1.5" fill="#38bdf8" />
            <circle cx="106" cy="36" r="1.5" fill="#38bdf8" />

            {/* NECK */}
            <path d="M 95 58 L 95 68 L 105 68 L 105 58 Z" stroke="#38bdf8" strokeWidth="2" fill="rgba(6, 182, 212, 0.3)" />

            {/* SHOULDERS & CHEST TORSO */}
            <path 
              d="M 60 75 Q 100 70 140 75 Q 148 100 142 150 Q 100 160 58 150 Q 52 100 60 75 Z" 
              stroke="#38bdf8" 
              strokeWidth="2.5" 
              fill="url(#torsoGrad)" 
            />

            {/* MUSCULAR CONTOURS & VASCULAR NERVE PATHWAYS */}
            <path d="M 100 68 L 100 230" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
            <path d="M 75 90 Q 100 100 125 90" stroke="#38bdf8" strokeWidth="1.5" opacity="0.7" />
            <path d="M 78 120 Q 100 130 122 120" stroke="#38bdf8" strokeWidth="1.5" opacity="0.7" />
            
            {/* LUNG CAVITIES */}
            <ellipse cx="82" cy="105" rx="12" ry="20" stroke="#06b6d4" strokeWidth="1.5" fill="rgba(6, 182, 212, 0.15)" />
            <ellipse cx="118" cy="105" rx="12" ry="20" stroke="#06b6d4" strokeWidth="1.5" fill="rgba(6, 182, 212, 0.15)" />

            {/* PULSING HEART CENTER (Pink/Red Starburst Glow matching reference image) */}
            <circle cx="86" cy="100" r="14" fill="url(#heartGlowGrad)" className="animate-ping" opacity="0.8" />
            <circle cx="86" cy="100" r="8" fill="#f43f5e" />
            <circle cx="86" cy="100" r="4" fill="#ffffff" />

            {/* ECG WAVE THROUGH CHEST */}
            <path 
              d="M 50 110 L 70 110 L 76 95 L 82 120 L 88 100 L 94 112 L 100 110 L 150 110" 
              stroke="#ffffff" 
              strokeWidth="2" 
              strokeLinecap="round" 
              className="animate-dash-draw"
            />

            {/* ARMS */}
            {/* Left Arm */}
            <path d="M 60 75 Q 45 120 48 175 Q 52 180 56 175 Q 56 130 68 95" stroke="#38bdf8" strokeWidth="2" fill="rgba(6, 182, 212, 0.2)" />
            {/* Right Arm */}
            <path d="M 140 75 Q 155 120 152 175 Q 148 180 144 175 Q 144 130 132 95" stroke="#38bdf8" strokeWidth="2" fill="rgba(6, 182, 212, 0.2)" />

            {/* HIPS & ABDOMEN */}
            <path d="M 65 150 L 135 150 L 128 200 L 72 200 Z" stroke="#38bdf8" strokeWidth="2" fill="rgba(6, 182, 212, 0.25)" />

            {/* LEGS */}
            {/* Left Leg */}
            <path d="M 74 200 Q 72 280 76 345 L 90 345 Q 88 280 94 200 Z" stroke="#38bdf8" strokeWidth="2.5" fill="url(#legGrad)" />
            {/* Right Leg */}
            <path d="M 106 200 Q 112 280 110 345 L 124 345 Q 128 280 126 200 Z" stroke="#38bdf8" strokeWidth="2.5" fill="url(#legGrad)" />

            {/* SVG GRADIENT DEFINITIONS */}
            <defs>
              <radialGradient id="cyanGlowGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
              </radialGradient>
              <linearGradient id="torsoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(56, 189, 248, 0.45)" />
                <stop offset="50%" stopColor="rgba(6, 182, 212, 0.3)" />
                <stop offset="100%" stopColor="rgba(13, 148, 136, 0.2)" />
              </linearGradient>
              <linearGradient id="legGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0.35)" />
                <stop offset="100%" stopColor="rgba(56, 189, 248, 0.15)" />
              </linearGradient>
              <radialGradient id="heartGlowGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="1" />
                <stop offset="50%" stopColor="#fb7185" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>

          {/* BLUE HOLOGRAPHIC SCANNING LASER LINE (Head to toe loop) */}
          <div className="absolute inset-x-4 w-full h-2.5 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_25px_#ffffff] animate-laser-scan z-30 pointer-events-none"></div>
        </div>

      </div>

      {/* 5. FLOATING HUD CARDS (Matching Reference Image) */}
      
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
