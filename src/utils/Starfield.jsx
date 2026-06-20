import { useEffect, useRef } from 'react';

const Starfield = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let stars = [];
    const starCount = Math.min(180, Math.floor(window.innerWidth / 8));

    // Handle Resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    // Initialize Star Pool
    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          // z dictates parallax depth (0.1 to 1.0)
          z: Math.random() * 0.9 + 0.1,
          size: Math.random() * 1.5 + 0.5,
          baseAlpha: Math.random() * 0.5 + 0.3,
          alphaSpeed: Math.random() * 0.02 + 0.005,
          alphaPhase: Math.random() * Math.PI * 2
        });
      }
    };

    // Track Mouse Coordinates
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    // Initial setup
    resizeCanvas();

    let time = 0;
    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Interpolate offsets smoothly (lerp)
      const targetOffsetX = (mouseRef.current.x / window.innerWidth - 0.5) * -60;
      const targetOffsetY = (mouseRef.current.y / window.innerHeight - 0.5) * -60;

      offsetRef.current.x += (targetOffsetX - offsetRef.current.x) * 0.04;
      offsetRef.current.y += (targetOffsetY - offsetRef.current.y) * 0.04;

      // Draw vacuum space background glow
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 50,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, '#060608');
      gradient.addColorStop(0.5, '#020204');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update stars
      stars.forEach((star) => {
        // Apply parallax offset based on depth (z)
        let starX = star.x + offsetRef.current.x * star.z;
        let starY = star.y + offsetRef.current.y * star.z;

        // Wrap stars around boundaries to keep them infinite
        if (starX < 0) starX += canvas.width;
        if (starX > canvas.width) starX -= canvas.width;
        if (starY < 0) starY += canvas.height;
        if (starY > canvas.height) starY -= canvas.height;

        // Flicker alpha oscillation
        const alpha = Math.max(0.1, Math.min(1.0, star.baseAlpha + Math.sin(time * star.alphaSpeed + star.alphaPhase) * 0.25));

        ctx.beginPath();
        ctx.arc(starX, starY, star.size, 0, Math.PI * 2);
        
        // Slightly color stars for realistic variation (white, blueish-white, soft yellow-white)
        let color = 'rgba(255, 255, 255, ' + alpha + ')';
        if (star.z > 0.8) {
          color = 'rgba(165, 243, 252, ' + alpha + ')'; // cyan-ish
        } else if (star.z < 0.3) {
          color = 'rgba(224, 231, 255, ' + alpha + ')'; // indigo-ish
        }

        ctx.fillStyle = color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-50 pointer-events-none block"
    />
  );
};

export default Starfield;
