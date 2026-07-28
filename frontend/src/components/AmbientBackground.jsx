import React, { useEffect, useRef } from 'react';

export const AmbientBackground = ({ theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const isDark = theme === 'dark';

    // 1. Optimized 3D Red Blood Cells (NO ctx.filter, GPU pre-rendered gradients)
    const bloodCellCount = 14;
    const bloodCells = [];
    for (let i = 0; i < bloodCellCount; i++) {
      const zDepth = Math.random();
      bloodCells.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radiusX: (Math.random() * 14 + 10) * (0.7 + zDepth * 0.4),
        radiusY: (Math.random() * 7 + 5) * (0.7 + zDepth * 0.4),
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.2 - Math.random() * 0.25,
        opacity: isDark ? 0.35 + zDepth * 0.35 : 0.25 + zDepth * 0.3,
        zDepth
      });
    }

    // 2. Light Platelets
    const plateletCount = 18;
    const platelets = [];
    for (let i = 0; i < plateletCount; i++) {
      platelets.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 5 + 3,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: isDark ? 0.25 : 0.15
      });
    }

    // 3. DNA Helices
    const dnaCount = 4;
    const dnaHelices = [];
    for (let i = 0; i < dnaCount; i++) {
      dnaHelices.push({
        x: Math.random() * width,
        y: Math.random() * height,
        scale: Math.random() * 0.4 + 0.4,
        angle: Math.random() * Math.PI,
        rotSpeed: 0.006 + Math.random() * 0.006,
        vy: -0.12 - Math.random() * 0.15
      });
    }

    // 4. GPU-Fast Particles
    const particleCount = 28;
    const particles = [];
    const particleColors = isDark 
      ? ['rgba(20, 184, 166, 0.4)', 'rgba(6, 182, 212, 0.3)', 'rgba(59, 130, 246, 0.25)'] 
      : ['rgba(13, 148, 136, 0.25)', 'rgba(2, 132, 199, 0.2)', 'rgba(99, 102, 241, 0.15)'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        pulse: Math.random() * Math.PI,
        pulseSpeed: 0.02 + Math.random() * 0.015
      });
    }

    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let smoothMouseX = width / 2;
    let smoothMouseY = height / 2;

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.008;

      // Smooth Inertia (Spring physics)
      smoothMouseX += (targetMouseX - smoothMouseX) * 0.03;
      smoothMouseY += (targetMouseY - smoothMouseY) * 0.03;

      const parallaxX = (smoothMouseX - width / 2) * 0.015;
      const parallaxY = (smoothMouseY - height / 2) * 0.015;

      // --- LAYER 1: Soft Apple Vision Pro Light Aura ---
      const grad1X = width * 0.3 + Math.sin(time * 0.5) * 100 + parallaxX;
      const grad1Y = height * 0.25 + Math.cos(time * 0.4) * 70 + parallaxY;
      const aurora1 = ctx.createRadialGradient(grad1X, grad1Y, 10, grad1X, grad1Y, 480);
      aurora1.addColorStop(0, isDark ? 'rgba(20, 184, 166, 0.07)' : 'rgba(224, 242, 254, 0.35)');
      aurora1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = aurora1;
      ctx.fillRect(0, 0, width, height);

      // --- LAYER 2: Faint Medical Grid ---
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(2, 132, 199, 0.03)';
      ctx.lineWidth = 1;

      const gridSize = 70;
      const offsetX = (parallaxX * 0.4) % gridSize;
      const offsetY = (parallaxY * 0.4) % gridSize;

      for (let x = offsetX; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = offsetY; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // --- LAYER 3: 3D Red Blood Cells (Biconcave Discs - NO CPU BLUR FILTER) ---
      bloodCells.forEach((bc) => {
        bc.x += bc.vx + parallaxX * 0.08;
        bc.y += bc.vy + parallaxY * 0.08;
        bc.rotation += bc.rotSpeed;

        if (bc.y < -35) bc.y = height + 35;
        if (bc.x < -35) bc.x = width + 35;
        if (bc.x > width + 35) bc.x = -35;

        ctx.save();
        ctx.translate(bc.x, bc.y);
        ctx.rotate(bc.rotation);

        const gradient = ctx.createRadialGradient(0, 0, 1, 0, 0, bc.radiusX);
        gradient.addColorStop(0, 'rgba(244, 63, 94, 0.85)');
        gradient.addColorStop(0.7, 'rgba(225, 29, 72, 0.75)');
        gradient.addColorStop(1, 'rgba(159, 18, 57, 0.4)');

        ctx.beginPath();
        ctx.ellipse(0, 0, bc.radiusX, bc.radiusY, 0, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = bc.opacity;
        ctx.fill();

        // Inner Indented Biconcave Center
        ctx.beginPath();
        ctx.ellipse(0, 0, bc.radiusX * 0.4, bc.radiusY * 0.4, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(159, 18, 57, 0.35)';
        ctx.fill();

        ctx.restore();
      });

      // --- LAYER 4: Rotating Platelets ---
      platelets.forEach((p) => {
        p.x += p.vx + parallaxX * 0.1;
        p.y += p.vy + parallaxY * 0.1;
        p.rotation += p.rotSpeed;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        ctx.fillStyle = isDark ? `rgba(56, 189, 248, ${p.opacity})` : `rgba(2, 132, 199, ${p.opacity})`;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);

        ctx.restore();
      });

      // --- LAYER 5: DNA Helices ---
      dnaHelices.forEach((dna) => {
        dna.y += dna.vy + parallaxY * 0.08;
        dna.angle += dna.rotSpeed;

        if (dna.y < -80) dna.y = height + 80;

        ctx.save();
        ctx.translate(dna.x + parallaxX * 0.15, dna.y);
        ctx.scale(dna.scale, dna.scale);

        const nodes = 6;
        for (let k = 0; k < nodes; k++) {
          const yPos = k * 14;
          const nodeAngle = dna.angle + k * 0.6;
          const x1 = Math.sin(nodeAngle) * 20;
          const x2 = -x1;

          ctx.strokeStyle = isDark ? 'rgba(20, 184, 166, 0.18)' : 'rgba(13, 148, 136, 0.12)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(x1, yPos);
          ctx.lineTo(x2, yPos);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(x1, yPos, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? '#14b8a6' : '#0d9488';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x2, yPos, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? '#38bdf8' : '#0284c7';
          ctx.fill();
        }

        ctx.restore();
      });

      // --- LAYER 6: Particles ---
      particles.forEach((p) => {
        p.x += p.vx + parallaxX * 0.15;
        p.y += p.vy + parallaxY * 0.15;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.pulse += p.pulseSpeed;
        const currentRadius = p.radius + Math.sin(p.pulse) * 0.6;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      style={{ opacity: 0.9, willChange: 'transform' }}
    />
  );
};
