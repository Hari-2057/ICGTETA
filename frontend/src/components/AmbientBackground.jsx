import React, { useEffect, useRef } from 'react';

export const AmbientBackground = ({ theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const isDark = theme === 'dark';

    // 1. Red Blood Cell Discs
    const bloodCellCount = 18;
    const bloodCells = [];
    for (let i = 0; i < bloodCellCount; i++) {
      bloodCells.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radiusX: Math.random() * 12 + 10,
        radiusY: Math.random() * 6 + 5,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.2 - Math.random() * 0.3, // Slow upward buoyancy float
        opacity: isDark ? 0.18 + Math.random() * 0.12 : 0.12 + Math.random() * 0.08,
        pulse: Math.random() * Math.PI
      });
    }

    // 2. Blood Platelets & Micro Fragments
    const plateletCount = 28;
    const platelets = [];
    for (let i = 0; i < plateletCount; i++) {
      platelets.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 5 + 3,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        opacity: isDark ? 0.25 : 0.15
      });
    }

    // 3. DNA Helix Strands
    const dnaStrandCount = 5;
    const dnaStrands = [];
    for (let i = 0; i < dnaStrandCount; i++) {
      dnaStrands.push({
        x: Math.random() * width,
        y: Math.random() * height,
        scale: Math.random() * 0.5 + 0.5,
        angle: Math.random() * Math.PI,
        rotSpeed: 0.008 + Math.random() * 0.008,
        vy: -0.15 - Math.random() * 0.2
      });
    }

    // 4. Interactive Physics Particles
    const particleCount = 45;
    const particles = [];
    const particleColors = isDark 
      ? ['rgba(20, 184, 166, 0.45)', 'rgba(6, 182, 212, 0.35)', 'rgba(59, 130, 246, 0.3)'] 
      : ['rgba(13, 148, 136, 0.3)', 'rgba(2, 132, 199, 0.22)', 'rgba(99, 102, 241, 0.18)'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        pulse: Math.random() * Math.PI,
        pulseSpeed: 0.02 + Math.random() * 0.02
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

    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      // Mouse Parallax Inertia (Spring physics)
      smoothMouseX += (targetMouseX - smoothMouseX) * 0.05;
      smoothMouseY += (targetMouseY - smoothMouseY) * 0.05;

      const parallaxX = (smoothMouseX - width / 2) * 0.02;
      const parallaxY = (smoothMouseY - height / 2) * 0.02;

      // --- LAYER 1: Deep Aurora Glow Waves ---
      const grad1X = width * 0.3 + Math.sin(time * 0.5) * 140 + parallaxX * 2;
      const grad1Y = height * 0.25 + Math.cos(time * 0.4) * 90 + parallaxY * 2;
      const aurora1 = ctx.createRadialGradient(grad1X, grad1Y, 20, grad1X, grad1Y, 500);
      aurora1.addColorStop(0, isDark ? 'rgba(20, 184, 166, 0.08)' : 'rgba(13, 148, 136, 0.05)');
      aurora1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = aurora1;
      ctx.fillRect(0, 0, width, height);

      // --- LAYER 2: Floating Red Blood Cells (Biconcave Discs) ---
      bloodCells.forEach((bc) => {
        bc.x += bc.vx + parallaxX * 0.1;
        bc.y += bc.vy + parallaxY * 0.1;
        bc.rotation += bc.rotSpeed;
        bc.pulse += 0.02;

        if (bc.y < -30) bc.y = height + 30;
        if (bc.x < -30) bc.x = width + 30;
        if (bc.x > width + 30) bc.x = -30;

        ctx.save();
        ctx.translate(bc.x, bc.y);
        ctx.rotate(bc.rotation);

        const fillStyle = isDark 
          ? `rgba(225, 29, 72, ${bc.opacity})` 
          : `rgba(244, 63, 94, ${bc.opacity * 0.8})`;

        // Draw Biconcave Ellipse Disc
        ctx.beginPath();
        ctx.ellipse(0, 0, bc.radiusX, bc.radiusY, 0, 0, Math.PI * 2);
        ctx.fillStyle = fillStyle;
        ctx.fill();

        // Inner indented center
        ctx.beginPath();
        ctx.ellipse(0, 0, bc.radiusX * 0.45, bc.radiusY * 0.45, 0, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.3)' : 'rgba(255, 255, 255, 0.4)';
        ctx.fill();

        ctx.restore();
      });

      // --- LAYER 3: Rotating Blood Platelets ---
      platelets.forEach((p) => {
        p.x += p.vx + parallaxX * 0.2;
        p.y += p.vy + parallaxY * 0.2;
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

      // --- LAYER 4: Rotating 3D DNA Helix Strands ---
      dnaStrands.forEach((dna) => {
        dna.y += dna.vy + parallaxY * 0.15;
        dna.angle += dna.rotSpeed;

        if (dna.y < -80) dna.y = height + 80;

        ctx.save();
        ctx.translate(dna.x + parallaxX * 0.3, dna.y);
        ctx.scale(dna.scale, dna.scale);

        // Draw 6 Helix Nodes
        const nodes = 7;
        for (let k = 0; k < nodes; k++) {
          const yPos = k * 14;
          const nodeAngle = dna.angle + k * 0.6;
          const x1 = Math.sin(nodeAngle) * 22;
          const x2 = -x1;

          // Connecting rungs
          ctx.strokeStyle = isDark ? 'rgba(20, 184, 166, 0.15)' : 'rgba(13, 148, 136, 0.12)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(x1, yPos);
          ctx.lineTo(x2, yPos);
          ctx.stroke();

          // Left node
          ctx.beginPath();
          ctx.arc(x1, yPos, 3, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? '#14b8a6' : '#0d9488';
          ctx.fill();

          // Right node
          ctx.beginPath();
          ctx.arc(x2, yPos, 3, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? '#38bdf8' : '#0284c7';
          ctx.fill();
        }

        ctx.restore();
      });

      // --- LAYER 5: Interactive Floating Physics Particles & Constellation Lines ---
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alpha = (1 - dist / 100) * (isDark ? 0.14 : 0.08);
            ctx.strokeStyle = isDark ? `rgba(20, 184, 166, ${alpha})` : `rgba(13, 148, 136, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x + parallaxX * 0.4, particles[i].y + parallaxY * 0.4);
            ctx.lineTo(particles[j].x + parallaxX * 0.4, particles[j].y + parallaxY * 0.4);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.x += p.vx + parallaxX * 0.25;
        p.y += p.vy + parallaxY * 0.25;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.pulse += p.pulseSpeed;
        const currentRadius = p.radius + Math.sin(p.pulse) * 0.8;

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
      style={{ opacity: 0.95 }}
    />
  );
};
