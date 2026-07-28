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

    // Particle field initialization
    const particleCount = Math.min(60, Math.floor(width / 25));
    const particles = [];

    const particleColors = isDark 
      ? ['rgba(20, 184, 166, 0.45)', 'rgba(6, 182, 212, 0.35)', 'rgba(59, 130, 246, 0.3)', 'rgba(168, 85, 247, 0.25)'] 
      : ['rgba(13, 148, 136, 0.35)', 'rgba(2, 132, 199, 0.25)', 'rgba(99, 102, 241, 0.2)', 'rgba(147, 51, 234, 0.15)'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3.5 + 1.2,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        pulse: Math.random() * Math.PI,
        pulseSpeed: 0.025 + Math.random() * 0.02
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.005;

      // 1. Draw Slow-Drifting Aurora Gradient Waves in Background
      const grad1X = width * 0.3 + Math.sin(time) * 120;
      const grad1Y = height * 0.25 + Math.cos(time * 0.8) * 80;
      const auroraGrad1 = ctx.createRadialGradient(grad1X, grad1Y, 10, grad1X, grad1Y, 450);
      auroraGrad1.addColorStop(0, isDark ? 'rgba(20, 184, 166, 0.07)' : 'rgba(13, 148, 136, 0.04)');
      auroraGrad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = auroraGrad1;
      ctx.fillRect(0, 0, width, height);

      const grad2X = width * 0.75 + Math.cos(time * 0.9) * 100;
      const grad2Y = height * 0.65 + Math.sin(time * 1.1) * 90;
      const auroraGrad2 = ctx.createRadialGradient(grad2X, grad2Y, 10, grad2X, grad2Y, 500);
      auroraGrad2.addColorStop(0, isDark ? 'rgba(6, 182, 212, 0.06)' : 'rgba(2, 132, 199, 0.03)');
      auroraGrad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = auroraGrad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Faint Parallax Grid
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.025)' : 'rgba(15, 23, 42, 0.035)';
      ctx.lineWidth = 1;

      const gridSize = 65;
      const offsetX = (mouseX - width / 2) * 0.018;
      const offsetY = (mouseY - height / 2) * 0.018;

      for (let x = (offsetX % gridSize); x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = (offsetY % gridSize); y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 3. Draw Connecting Constellation Lines Between Nearby Particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * (isDark ? 0.15 : 0.1);
            ctx.strokeStyle = isDark ? `rgba(20, 184, 166, ${alpha})` : `rgba(13, 148, 136, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // 4. Update and Draw Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.pulse += p.pulseSpeed;
        const currentRadius = p.radius + Math.sin(p.pulse) * 1.0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, currentRadius), 0, Math.PI * 2);
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
      style={{ opacity: 0.9 }}
    />
  );
};
