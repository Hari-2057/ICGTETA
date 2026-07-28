import React from 'react';

export const HeroConstellationBackground = () => {
  // 8 delicate, ambient dots matching site accent colors (teal, blue, purple)
  // Scattered along outer margins to maintain a pristine, uncluttered UI
  const stars = [
    { id: 1, cx: '5%', cy: '15%', r: 1.5, color: 'var(--star-color-teal)', duration: '3.5s', delay: '0s' },
    { id: 2, cx: '12%', cy: '35%', r: 1.3, color: 'var(--star-color-blue)', duration: '4.2s', delay: '0.8s' },
    { id: 3, cx: '88%', cy: '18%', r: 1.4, color: 'var(--star-color-blue)', duration: '4.0s', delay: '0.3s' },
    { id: 4, cx: '94%', cy: '38%', r: 1.2, color: 'var(--star-color-teal)', duration: '3.8s', delay: '1.2s' },
    { id: 5, cx: '6%', cy: '72%', r: 1.4, color: 'var(--star-color-blue)', duration: '4.5s', delay: '1.8s' },
    { id: 6, cx: '14%', cy: '85%', r: 1.5, color: 'var(--star-color-teal)', duration: '3.2s', delay: '0.5s' },
    { id: 7, cx: '86%', cy: '75%', r: 1.3, color: 'var(--star-color-teal)', duration: '4.1s', delay: '1.0s' },
    { id: 8, cx: '95%', cy: '88%', r: 1.4, color: 'var(--star-color-purple)', duration: '3.7s', delay: '1.5s' }
  ];

  return (
    <div className="constellation-canvas-container fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-60">
      
      {/* TWINKLING STARS + CONSTELLATION CLUSTERS (SVG) */}
      <svg className="w-full h-full absolute inset-0">
        {/* Ultra-thin Faint Constellation Lines (0.3px width, 0.15 opacity) */}
        <g stroke="var(--constellation-line)" strokeWidth="0.3" strokeOpacity="0.15">
          {/* Cluster 1 (Left Margin) */}
          <line x1="5%" y1="15%" x2="12%" y2="35%" />
          
          {/* Cluster 2 (Right Margin) */}
          <line x1="88%" y1="18%" x2="94%" y2="38%" />

          {/* Cluster 3 (Bottom Left Margin) */}
          <line x1="6%" y1="72%" x2="14%" y2="85%" />

          {/* Cluster 4 (Bottom Right Margin) */}
          <line x1="86%" y1="75%" x2="95%" y2="88%" />
        </g>

        {/* 8 Ambient Stars */}
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

      {/* DELICATE MOLECULE / ORBIT MOTIF (Bottom Right Corner) */}
      <div className="molecule-orbit-container absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-36 h-36 flex items-center justify-center opacity-30">
        {/* Outer Orbit Ring */}
        <div className="molecule-ring absolute w-28 h-28 rounded-full border border-[var(--orbit-ring)]" />
        
        {/* Inner Orbit Ring */}
        <div className="molecule-ring absolute w-20 h-20 rounded-full border border-[var(--orbit-ring)] border-dashed opacity-50" />

        {/* Central Pulsing Core Circle */}
        <div className="molecule-core w-3.5 h-3.5 rounded-full bg-[var(--molecule-core)]" />

        {/* Orbit Electron 1 (Clockwise, 12s) */}
        <div className="orbit-track orbit-track-1 absolute w-28 h-28 rounded-full">
          <div className="orbit-dot orbit-dot-1 w-2 h-2 rounded-full bg-[var(--orbit-dot-1)] absolute -top-1 left-1/2 -translate-x-1/2" />
        </div>

        {/* Orbit Electron 2 (Counter-Clockwise, 16s) */}
        <div className="orbit-track orbit-track-2 absolute w-20 h-20 rounded-full">
          <div className="orbit-dot orbit-dot-2 w-1.5 h-1.5 rounded-full bg-[var(--orbit-dot-2)] absolute -bottom-0.75 left-1/2 -translate-x-1/2" />
        </div>
      </div>

    </div>
  );
};
