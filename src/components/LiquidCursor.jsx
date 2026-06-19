import React, { useEffect, useRef, useState } from 'react';

const LiquidCursor = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate refs
  const mouseRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef({ x: 0, y: 0 });
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const speedRef = useRef(0);
  const angleRef = useRef(0);

  // Smooth interpolated scale refs for liquid bounce feel
  const scaleXRef = useRef(1);
  const scaleYRef = useRef(1);

  // DOM node refs
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // 1. Check for touch devices so we don't render on mobile/tablets
  useEffect(() => {
    const checkTouch = () => {
      const touch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(touch);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // 2. Track mouse position, hover triggers, and run animation loop
  useEffect(() => {
    if (isTouchDevice) return;

    // Track mouse coordinates
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    // Track hovering on interactive items via event delegation
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.cursor-pointer') ||
        target.getAttribute('role') === 'button';

      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    // 3. Animation loop using requestAnimationFrame
    let rafId;
    const updateCursor = () => {
      // Position values
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      let tx = trailRef.current.x;
      let ty = trailRef.current.y;

      // Calculate instantaneous mouse speed (velocity) and angle of travel
      const pmx = prevMouseRef.current.x;
      const pmy = prevMouseRef.current.y;
      const dx = mx - pmx;
      const dy = my - pmy;
      const targetSpeed = Math.sqrt(dx * dx + dy * dy);
      const targetAngle = dx || dy ? Math.atan2(dy, dx) * (180 / Math.PI) : angleRef.current;

      // Lerp speed and angle to smooth out velocity changes
      speedRef.current += (targetSpeed - speedRef.current) * 0.15;
      angleRef.current = targetAngle; // angle updates instantly on direction change

      // Update previous coordinates for next frame calculations
      prevMouseRef.current.x = mx;
      prevMouseRef.current.y = my;

      // Outer ring trails behind center dot (lerp rate 0.18 for elegant fluid lag)
      tx += (mx - tx) * 0.18;
      ty += (my - ty) * 0.18;
      trailRef.current.x = tx;
      trailRef.current.y = ty;

      // Liquid stretching math: stretch X along direction, squash Y to preserve mass/area
      const stretchAmount = Math.min(speedRef.current * 0.015, 0.45);
      const targetScaleX = 1 + stretchAmount;
      const targetScaleY = 1 - stretchAmount * 0.75;

      // Smoothly interpolate the scales to prevent jittering
      scaleXRef.current += (targetScaleX - scaleXRef.current) * 0.15;
      scaleYRef.current += (targetScaleY - scaleYRef.current) * 0.15;

      // Apply transforms directly to DOM elements to bypass React re-render overhead (60fps)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        const rotationStr = `rotate(${angleRef.current}deg)`;
        const scaleStr = `scale(${scaleXRef.current}, ${scaleYRef.current})`;
        ringRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%) ${rotationStr} ${scaleStr}`;
      }

      rafId = requestAnimationFrame(updateCursor);
    };

    rafId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] select-none mix-blend-normal">
      {/* 1. Precise Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full bg-white opacity-85 shadow-[0_0_8px_rgba(255,255,255,0.6)] pointer-events-none will-change-transform transition-[width,height,background-color,box-shadow] duration-200 ${
          isHovered ? 'w-4.5 h-4.5 bg-cyan-400 shadow-[0_0_12px_#06B6D4]' : 'w-2.5 h-2.5'
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      />

      {/* 2. Outer Lagging Liquid Glass Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none will-change-transform transition-[width,height,border-color,background-color,box-shadow] duration-300 ease-out ${
          isHovered
            ? 'w-14 h-14 border-[1.5px] border-cyan-400/50 bg-cyan-500/10 shadow-[0_0_24px_rgba(6,182,212,0.2),inset_0_2px_8px_rgba(6,182,212,0.15)]'
            : 'w-10 h-10 border border-white/30 bg-white/[0.04] shadow-[0_0_16px_rgba(255,255,255,0.1),inset_0_2px_4px_rgba(255,255,255,0.15)]'
        } rounded-full backdrop-blur-[2.5px]`}
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      />
    </div>
  );
};

export default LiquidCursor;
