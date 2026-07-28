import React from 'react';

export const HeroConstellationBackground = () => {
  // 10 scattered stars with individual positions & animation parameters
  const stars = [
    { id: 1, cx: '12%', cy: '18%', r: 1.5, color: 'var(--star-color-1)', duration: '3.2s', delay: '0s' },
    { id: 2, cx: '24%', cy: '32%', r: 1.3, color: 'var(--star-color-2)', duration: '4.1s', delay: '0.8s' },
    { id: 3, cx: '38%', cy: '15%', r: 1.6, color: 'var(--star-color-1)', duration: '3.6s', delay: '1.4s' },
    { id: 4, cx: '65%', cy: '22%', r: 1.4, color: 'var(--star-color-2)', duration: '4.5s', delay: '0.3s' },
    { id: 5, cx: '78%', cy: '35%', r: 1.5, color: 'var(--star-color-1)', duration: '3.0s', delay: '1.9s' },
    { id: 6, cx: '88%', cy: '16%', r: 1.3, color: 'var(--star-color-2)', duration: '4.2s', delay: '0.6s' },
    { id: 7, cx: '18%', cy: '68%', r: 1.4, color: 'var(--star-color-1)', duration: '3.8s', delay: '2.1s' },
    { id: 8, cx: '32%', cy: '75%', r: 1.6, color: 'var(--star-color-2)', duration: '3.4s', delay: '1.1s' },
    { id: 9, cx: '70%', cy: '72%', r: 1.3, color: 'var(--star-color-1)', duration: '4.0s', delay: '0.5s' },
    { id: 10, cx: '84%', cy: '80%', r: 1.5, color: 'var(--star-color-2)', duration: '3.7s', delay: '1.7s' },
  ];

  return (
    <div className="constellation-canvas-container absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* LAYER 1: TWINKLING STARS + CONSTELLATION CLUSTERS (SVG) */}
      <svg className="w-full h-full absolute inset-0">
        {/* Constellation Cluster Lines (0.4px width, 0.3 opacity) */}
        <g stroke="var(--constellation-line)" strokeWidth="0.4" strokeOpacity="0.3">
          {/* Cluster 1 (Top Left) */}
          <line x1="12%" y1="18%" x2="24%" y2="32%" />
          <line x1="24%" y1="32%" x2="38%" y2="15%" />
          
          {/* Cluster 2 (Top Right) */}
          <line x1="65%" y1="22%" x2="78%" y2="35%" />
          <line x1="78%" y1="35%" x2="88%" y2="16%" />

          {/* Cluster 3 (Bottom Left) */}
          <line x1="18%" y1="68%" x2="32%" y2="75%" />

          {/* Cluster 4 (Bottom Right) */}
          <line x1="70%" y1="72%" x2="84%" y2="80%" />
        </g>

        {/* 10 Scattered Twinkling Stars */}
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
            }}
          />
        ))}
      </svg>

      {/* LAYER 2: COMET STREAKS (2 Traveling Glowing Dashes) */}
      <div className="comet-streak comet-streak-1" />
      <div className="comet-streak comet-streak-2" />

      {/* LAYER 3: MOLECULE / ORBIT MOTIF (Bottom Right Corner) */}
      <div className="molecule-orbit-container absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-36 h-36 flex items-center justify-center">
        {/* Outer Orbit Ring */}
        <div className="molecule-ring absolute w-28 h-28 rounded-full border border-[var(--orbit-ring)]" />
        
        {/* Inner Orbit Ring */}
        <div className="molecule-ring absolute w-20 h-20 rounded-full border border-[var(--orbit-ring)] border-dashed opacity-60" />

        {/* Central Pulsing Core Circle */}
        <div className="molecule-core w-4 h-4 rounded-full bg-[var(--molecule-core)] shadow-md shadow-[var(--molecule-core)]" />

        {/* Orbit Electron 1 (Clockwise, 12s, Larger Radius) */}
        <div className="orbit-track orbit-track-1 absolute w-28 h-28 rounded-full">
          <div className="orbit-dot orbit-dot-1 w-2.5 h-2.5 rounded-full bg-[var(--orbit-dot-1)] absolute -top-1.25 left-1/2 -translate-x-1/2 shadow-sm shadow-[var(--orbit-dot-1)]" />
        </div>

        {/* Orbit Electron 2 (Counter-Clockwise, 16s, Smaller Radius) */}
        <div className="orbit-track orbit-track-2 absolute w-20 h-20 rounded-full">
          <div className="orbit-dot orbit-dot-2 w-2 h-2 rounded-full bg-[var(--orbit-dot-2)] absolute -bottom-1 left-1/2 -translate-x-1/2 shadow-sm shadow-[var(--orbit-dot-2)]" />
        </div>
      </div>

    </div>
  );
};
