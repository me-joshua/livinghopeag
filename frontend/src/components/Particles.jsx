import React, { useEffect, useRef, useCallback, useMemo } from 'react';

const Particles = React.memo(({
  particleColors = ['#000000', '#1f2937'],
  particleCount = 10,
  speed = 0.1,
  particleBaseSize = 100,
  alphaParticles = false,
  disableRotation = false
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const isInitializedRef = useRef(false);

  const config = useMemo(() => ({
    particleColors,
    particleCount,
    speed,
    particleBaseSize,
    alphaParticles,
    disableRotation
  }), [particleColors, particleCount, speed, particleBaseSize, alphaParticles, disableRotation]);

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isInitializedRef.current) return;
    
    particlesRef.current = [];
    console.log('Initializing', config.particleCount, 'particles');
    for (let i = 0; i < config.particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * config.speed,
        vy: (Math.random() - 0.5) * config.speed,
        size: Math.random() * 8 + 5, // Make particles 5-13px in size
        color: config.particleColors[Math.floor(Math.random() * config.particleColors.length)],
        alpha: config.alphaParticles ? Math.random() * 0.5 + 0.3 : 1
      });
    }
    isInitializedRef.current = true;
    console.log('Particles initialized:', particlesRef.current.length);
  }, [config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      console.log('Canvas resized to:', canvas.width, 'x', canvas.height);
    };

    const animate = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        // Simple movement - NO mouse interaction
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen edges instead of bouncing
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []); // Empty dependency array to prevent re-initialization

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5
      }}
    />
  );
});

export default Particles;
