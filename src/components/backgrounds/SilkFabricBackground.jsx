import { useEffect, useRef } from 'react';

// Silk Fabric Background
// Soft, sheer layers with gentle organic motion
// Matches the warm cream/blush tones from reference

export default function SilkFabricBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Fabric layer configuration
    const layers = [
      {
        points: 5,
        baseY: 0.75,
        amplitude: 80,
        frequency: 0.8,
        speed: 0.15,
        phase: 0,
        color: 'rgba(180, 170, 165, 0.18)',
      },
      {
        points: 6,
        baseY: 0.6,
        amplitude: 60,
        frequency: 1.0,
        speed: 0.12,
        phase: 1,
        color: 'rgba(195, 185, 175, 0.15)',
      },
      {
        points: 5,
        baseY: 0.45,
        amplitude: 70,
        frequency: 0.7,
        speed: 0.18,
        phase: 2,
        color: 'rgba(210, 200, 190, 0.12)',
      },
      {
        points: 4,
        baseY: 0.3,
        amplitude: 50,
        frequency: 0.9,
        speed: 0.1,
        phase: 3,
        color: 'rgba(225, 218, 210, 0.1)',
      },
      {
        points: 5,
        baseY: 0.18,
        amplitude: 40,
        frequency: 1.1,
        speed: 0.14,
        phase: 4,
        color: 'rgba(240, 235, 228, 0.08)',
      },
    ];

    const drawFabricLayer = (layer, time) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const { points, baseY, amplitude, frequency, speed, phase, color } = layer;

      // Generate control points
      const controlPoints = [];
      for (let i = 0; i <= points; i++) {
        const x = (i / points) * width;
        const y = height * baseY + 
          Math.sin(i * frequency + time * speed + phase) * amplitude +
          Math.sin(i * frequency * 0.5 + time * speed * 0.7 + phase) * amplitude * 0.4;
        controlPoints.push({ x, y });
      }

      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(controlPoints[0].x, controlPoints[0].y);

      // Draw smooth bezier curves through points
      for (let i = 0; i < controlPoints.length - 1; i++) {
        const current = controlPoints[i];
        const next = controlPoints[i + 1];
        const cpX = (current.x + next.x) / 2;
        const cpY1 = current.y;
        const cpY2 = next.y;
        
        ctx.bezierCurveTo(
          cpX, cpY1,
          cpX, cpY2,
          next.x, next.y
        );
      }

      ctx.lineTo(width, height);
      ctx.closePath();

      // Gradient fill for fabric-like appearance
      const gradient = ctx.createLinearGradient(0, height * baseY - amplitude, 0, height);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.5, color.replace(/[\d.]+\)$/, (parseFloat(color.match(/[\d.]+\)$/)[0]) * 1.2) + ')'));
      gradient.addColorStop(1, color.replace(/[\d.]+\)$/, (parseFloat(color.match(/[\d.]+\)$/)[0]) * 0.5) + ')'));

      ctx.fillStyle = gradient;
      ctx.fill();
    };

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const time = (timestamp - startTime) / 1000; // Convert to seconds

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Warm gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, width * 0.3, height);
      bgGradient.addColorStop(0, '#fcfaf7');
      bgGradient.addColorStop(0.3, '#f8f5f0');
      bgGradient.addColorStop(0.7, '#f3efe8');
      bgGradient.addColorStop(1, '#ebe5dc');

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw fabric layers
      layers.forEach(layer => drawFabricLayer(layer, time));

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
