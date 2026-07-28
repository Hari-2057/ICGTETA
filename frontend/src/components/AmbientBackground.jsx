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

    // 1. Realistic 3D Red Blood Cells (Biconcave Discs)
    const bloodCellCount = 22;
    const bloodCells = [];
    for (let i = 0; i < bloodCellCount; i++) {
      const zDepth = Math.random(); // 0 (far/blurred) to 1 (near/crisp)
      bloodCells.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radiusX: (Math.random() * 16 + 12) * (0.6 + zDepth * 0.5),
        radiusY: (Math.random() * 8 + 6) * (0.6 + zDepth * 0.5),
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.012,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.25 - Math.random() * 0.35, // Natural upward fluid drift
        blur: (1 - zDepth) * 3, // Depth-of-field blur
        opacity: isDark ? 0.3 + zDepth * 0.4 : 0.25 + zDepth * 0.35,
        zDepth
      });
    }

    // 2. White Blood Cells & Platelets
    const plateletCount = 30;
    const platelets = [];
    for (let i = 0; i < plateletCount; i++) {
      platelets.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 6 + 3,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.025,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        opacity: isDark ? 0.3 : 0.18
      });
    }

    // 3. DNA Helices
    const dnaCount = 6;
    const dnaHelices = [];
    for (let i = 0; i < dnaCount; i++) {
      dnaHelices.push({
        x: Math.random() * width,
        y: Math.random() * height,
        scale: Math.random() * 0.45 + 0.4,
        angle: Math.random() * Math.PI,
        rotSpeed: 0.008 + Math.random() * 0.008,
        vy: -0.15 - Math.random() * 0.2
      });
    }

    // 4. Glowing AI Neural Particles
    const particleCount = 45;
    const particles = [];
    const particleColors = isDark 
      ? ['rgba(20, 184, 166, 0.45)', 'rgba(6, 182, 212, 0.35)', 'rgba(59, 130, 246, 0.3)'] 
      : ['rgba(13, 148, 136, 0.3)', 'rgba(2, 132, 199, 0.25)', 'rgba(99, 102, 241, 0.2)'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3.5 + 1,
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
      smoothMouseX += (targetMouseX - smoothMouseX) * 0.04;
      smoothMouseY += (targetMouseY - smoothMouseY) * 0.04;

      const parallaxX = (smoothMouseX - width / 2) * 0.02;
      const parallaxY = (smoothMouseY - height / 2) * 0.02;

      // --- LAYER 1: Apple Vision Pro Inspired Volumetric Light Waves ---
      const grad1X = width * 0.3 + Math.sin(time * 0.5) * 140 + parallaxX * 2;
      const grad1Y = height * 0.25 + Math.cos(time * 0.4) * 90 + parallaxY * 2;
      const aurora1 = ctx.createRadialGradient(grad1X, grad1Y, 20, grad1X, grad1Y, 550);
      aurora1.addColorStop(0, isDark ? 'rgba(20, 184, 166, 0.08)' : 'rgba(224, 242, 254, 0.4)');
      aurora1.addColorStop(0.5, isDark ? 'rgba(6, 182, 212, 0.04)' : 'rgba(186, 230, 253, 0.2)');
      aurora1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = aurora1;
      ctx.fillRect(0, 0, width, height);

      // --- LAYER 2: Faint Medical Grid ---
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.025)' : 'rgba(2, 132, 199, 0.04)';
      ctx.lineWidth = 1;

      const gridSize = 65;
      const offsetX = (parallaxX * 0.5) % gridSize;
      const offsetY = (parallaxY * 0.5) % gridSize;

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

      // --- LAYER 3: 3D Red Blood Cells (Biconcave Discs with Depth of Field) ---
      bloodCells.forEach((bc) => {
        bc.x += bc.vx + parallaxX * (0.1 + bc.zDepth * 0.2);
        bc.y += bc.vy + parallaxY * (0.1 + bc.zDepth * 0.2);
        bc.rotation += bc.rotSpeed;

        if (bc.y < -40) bc.y = height + 40;
        if (bc.x < -40) bc.x = width + 40;
        if (bc.x > width + 40) bc.x = -40;

        ctx.save();
        ctx.translate(bc.x, bc.y);
        ctx.rotate(bc.rotation);

        // Apply depth-of-field blur for distant cells
        if (bc.blur > 0.5) {
          ctx.filter = `blur(${bc.blur.toFixed(1)}px)`;
        }

        // Outer Biconcave Disc Fill
        const gradient = ctx.createRadialGradient(0, 0, 2, 0, 0, bc.radiusX);
        gradient.addColorStop(0, 'rgba(244, 63, 94, 0.9)');
        gradient.addColorStop(0.7, 'rgba(225, 29, 72, 0.85)');
        gradient.addColorStop(1, 'rgba(159, 18, 57, 0.6)');

        ctx.beginPath();
        ctx.ellipse(0, 0, bc.radiusX, bc.radiusY, 0, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = bc.opacity;
        ctx.fill();

        // Inner Indented Biconcave Depression
        ctx.beginPath();
        ctx.ellipse(0, 0, bc.radiusX * 0.45, bc.radiusY * 0.45, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(159, 18, 57, 0.4)';
        ctx.fill();

        ctx.filter = 'none';
        ctx.restore();
      });

      // --- LAYER 4: Rotating Blood Platelets & White Blood Cells ---
      platelets.forEach((p) => {
        p.x += p.vx + parallaxX * 0.15;
        p.y += p.vy + parallaxY * 0.15;
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

      // --- LAYER 5: Floating 3D DNA Helices ---
      dnaHelices.forEach((dna) => {
        dna.y += dna.vy + parallaxY * 0.1;
        dna.angle += dna.rotSpeed;

        if (dna.y < -90) dna.y = height + 90;

        ctx.save();
        ctx.translate(dna.x + parallaxX * 0.2, dna.y);
        ctx.scale(dna.scale, dna.scale);

        const nodes = 7;
        for (let k = 0; k < nodes; k++) {
          const yPos = k * 14;
          const nodeAngle = dna.angle + k * 0.6;
          const x1 = Math.sin(nodeAngle) * 22;
          const x2 = -x1;

          ctx.strokeStyle = isDark ? 'rgba(20, 184, 166, 0.2)' : 'rgba(13, 148, 136, 0.15)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(x1, yPos);
          ctx.lineTo(x2, yPos);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(x1, yPos, 3, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? '#14b8a6' : '#0d9488';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x2, yPos, 3, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? '#38bdf8' : '#0284c7';
          ctx.fill();
        }

        ctx.restore();
      });

      // --- LAYER 6: Neural Network Mesh Connections ---
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alpha = (1 - dist / 100) * (isDark ? 0.15 : 0.09);
            ctx.strokeStyle = isDark ? `rgba(20, 184, 166, ${alpha})` : `rgba(2, 132, 199, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x + parallaxX * 0.3, particles[i].y + parallaxY * 0.3);
            ctx.lineTo(particles[j].x + parallaxX * 0.3, particles[j].y + parallaxY * 0.3);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.x += p.vx + parallaxX * 0.2;
        p.y += p.vy + parallaxY * 0.2;

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
