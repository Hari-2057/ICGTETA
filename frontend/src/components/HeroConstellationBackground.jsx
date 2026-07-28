import React from 'react';

export const HeroConstellationBackground = () => {
  // 12 scattered stars matching site accent colors (teal, blue, orange, purple)
  // Positioned mostly around outer margins to prevent text clutter
  const stars = [
    { id: 1, cx: '6%', cy: '14%', r: 2.4, color: 'var(--star-color-teal)', duration: '3.2s', delay: '0s' },
    { id: 2, cx: '15%', cy: '28%', r: 2.1, color: 'var(--star-color-blue)', duration: '4.1s', delay: '0.8s' },
    { id: 3, cx: '48%', cy: '12%', r: 1.8, color: 'var(--star-color-teal)', duration: '3.6s', delay: '1.4s', opacityMod: 0.4 }, // center sparse star
    { id: 4, cx: '82%', cy: '18%', r: 2.5, color: 'var(--star-color-blue)', duration: '4.5s', delay: '0.3s' },
    { id: 5, cx: '92%', cy: '32%', r: 2.2, color: 'var(--star-color-orange)', duration: '3.0s', delay: '1.9s' }, // orange accent
    { id: 6, cx: '95%', cy: '12%', r: 2.0, color: 'var(--star-color-purple)', duration: '4.2s', delay: '0.6s' }, // purple accent
    { id: 7, cx: '8%', cy: '62%', r: 2.3, color: 'var(--star-color-blue)', duration: '3.8s', delay: '2.1s' },
    { id: 8, cx: '16%', cy: '78%', r: 2.5, color: 'var(--star-color-teal)', duration: '3.4s', delay: '1.1s' },
    { id: 9, cx: '85%', cy: '65%', r: 2.2, color: 'var(--star-color-teal)', duration: '4.0s', delay: '0.5s' },
    { id: 10, cx: '94%', cy: '82%', r: 2.4, color: 'var(--star-color-blue)', duration: '3.7s', delay: '1.7s' },
    { id: 11, cx: '32%', cy: '92%', r: 2.1, color: 'var(--star-color-blue)', duration: '3.9s', delay: '1.0s' },
    { id: 12, cx: '68%', cy: '94%', r: 2.3, color: 'var(--star-color-teal)', duration: '3.5s', delay: '0.4s' }
  ];

  return (
    <div className="constellation-canvas-container fixed inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* LAYER 1: TWINKLING STARS + CONSTELLATION CLUSTERS (SVG) */}
      <svg className="w-full h-full absolute inset-0">
        {/* Constellation Cluster Lines (0.6px width, 0.4 opacity) */}
        <g stroke="var(--constellation-line)" strokeWidth="0.6" strokeOpacity="0.4">
          {/* Cluster 1 (Top Left Margin) */}
          <line x1="6%" y1="14%" x2="15%" y2="28%" />
          <line x1="15%" y1="28%" x2="8%" y2="62%" />
          
          {/* Cluster 2 (Top Right Margin) */}
          <line x1="82%" y1="18%" x2="92%" y2="32%" />
          <line x1="92%" y1="32%" x2="95%" y2="12%" />

          {/* Cluster 3 (Bottom Left Margin) */}
          <line x1="8%" y1="62%" x2="16%" y2="78%" />

          {/* Cluster 4 (Bottom Right Margin) */}
          <line x1="85%" y1="65%" x2="94%" y2="82%" />
        </g>

        {/* 12 Scattered Twinkling Stars */}
        {stars.map((s) => (
          <circle
            key={s.id}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill={s.color}
            className="constellation-star"
            style={{
              animationDuration: s.duration,
              animationDelay: s.delay,
              opacity: s.opacityMod ? s.opacityMod : undefined
            }}
          />
        ))}
      </svg>

      {/* LAYER 2: WIDER COMET STREAKS WITH STRONGER GLOW */}
      <div className="comet-streak comet-streak-1" />
      <div className="comet-streak comet-streak-2" />

      {/* LAYER 3: MOLECULE / ORBIT MOTIF (Scaled Up ~30%) */}
      <div className="molecule-orbit-container absolute bottom-6 right-6 sm:bottom-12 sm:right-12 w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
        {/* Outer Orbit Ring */}
        <div className="molecule-ring absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-[var(--orbit-ring)] opacity-40" />
        
        {/* Inner Orbit Ring */}
        <div className="molecule-ring absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-[var(--orbit-ring)] border-dashed opacity-60" />

        {/* Central Pulsing Core Circle */}
        <div className="molecule-core w-5 h-5 rounded-full bg-[var(--molecule-core)] shadow-lg shadow-[var(--molecule-core)]" />

        {/* Orbit Electron 1 (Clockwise, 12s, Outer Track) */}
        <div className="orbit-track orbit-track-1 absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full">
          <div className="orbit-dot orbit-dot-1 w-3 h-3 rounded-full bg-[var(--orbit-dot-1)] absolute -top-1.5 left-1/2 -translate-x-1/2 shadow-md shadow-[var(--orbit-dot-1)]" />
        </div>

        {/* Orbit Electron 2 (Counter-Clockwise, 16s, Inner Track) */}
        <div className="orbit-track orbit-track-2 absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full">
          <div className="orbit-dot orbit-dot-2 w-2.5 h-2.5 rounded-full bg-[var(--orbit-dot-2)] absolute -bottom-1.25 left-1/2 -translate-x-1/2 shadow-md shadow-[var(--orbit-dot-2)]" />
        </div>
      </div>

    </div>
  );
};
