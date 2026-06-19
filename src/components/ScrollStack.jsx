import React, { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

export const ScrollStackItem = ({
  title,
  summary,
  tags = [],
  imageSrc,
  githubUrl,
  liveUrl,
  index,
  className = '',
  children
}) => {
  if (children) {
    return (
      <div
        className={`scroll-stack-card sticky w-full max-w-[1200px] h-[70vh] rounded-[40px] overflow-hidden bg-[#0A0A0C]/80 border border-white/[0.08] backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row mb-[25vh] last:mb-[15vh] transform-gpu will-change-transform ${className}`.trim()}
        style={{
          top: '15vh',
          transform: 'translate3d(0,0,0) scale(1)',
          filter: 'none',
          zIndex: index
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`scroll-stack-card sticky w-full max-w-[1200px] h-[70vh] rounded-[40px] overflow-hidden bg-[#0A0A0C]/85 border border-white/[0.08] backdrop-blur-3xl shadow-2xl flex flex-col md:flex-row mb-[25vh] last:mb-[15vh] transform-gpu will-change-transform ${className}`.trim()}
      style={{
        top: '15vh',
        transform: 'translate3d(0,0,0) scale(1)',
        filter: 'none',
        zIndex: index
      }}
    >
      {/* 55% Image section on desktop, 40% height on mobile */}
      <div className="w-full md:w-[55%] h-[40%] md:h-full relative overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="project-image w-full h-full object-cover transform-gpu will-change-transform transition-transform duration-700 ease-out origin-center"
          style={{ transform: 'scale(1)' }}
        />
        {/* Dark overlay for brightness animation */}
        <div 
          className="project-image-overlay absolute inset-0 bg-black pointer-events-none transition-opacity duration-700 ease-out" 
          style={{ opacity: 0 }}
        />
      </div>

      {/* 45% Content section on desktop, 60% height on mobile */}
      <div className="w-full md:w-[45%] h-[60%] md:h-full p-8 md:p-12 flex flex-col justify-center text-left">
        {/* Project Title */}
        <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          {title}
        </h3>

        {/* Short Summary */}
        <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed mb-6 max-w-md">
          {summary}
        </p>

        {/* Tech Stack Pills */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 text-xs rounded-full bg-white/[0.04] border border-white/[0.08] text-neutral-300 font-medium tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-auto md:mt-4">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all duration-300 flex items-center gap-2 shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Live Demo</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white font-semibold text-sm hover:bg-white/[0.12] transition-all duration-300 flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98]"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const ScrollStack = ({
  children,
  className = '',
  stickyTop = '15vh'
}) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const cachedParentTopRef = useRef(0);
  const cachedTriggersRef = useRef([]);
  const cachedHeightsRef = useRef([]);

  const getStickyTopPx = useCallback(() => {
    if (typeof stickyTop === 'string' && stickyTop.endsWith('vh')) {
      const vh = parseFloat(stickyTop);
      return (vh / 100) * window.innerHeight;
    }
    return parseFloat(stickyTop) || 0;
  }, [stickyTop]);

  const recalcLayout = useCallback(() => {
    const parent = containerRef.current;
    if (!parent) return;

    const cards = Array.from(parent.querySelectorAll('.scroll-stack-card'));
    cardsRef.current = cards;

    if (cards.length === 0) return;

    const rect = parent.getBoundingClientRect();
    const parentTop = rect.top + window.scrollY;
    cachedParentTopRef.current = parentTop;

    const stickyTopPx = getStickyTopPx();

    // Cache static triggers
    cachedTriggersRef.current = cards.map(card => parentTop + card.offsetTop - stickyTopPx);

    // Cache distances to next card (which is the scroll height of the transition)
    cachedHeightsRef.current = cards.map((card, i) => {
      if (i < cards.length - 1) {
        return cards[i + 1].offsetTop - card.offsetTop;
      }
      return window.innerHeight;
    });
  }, [getStickyTopPx]);

  const updateTransforms = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards || cards.length === 0) return;

    const scrollY = window.scrollY;
    const triggers = cachedTriggersRef.current;
    const heights = cachedHeightsRef.current;

    if (triggers.length === 0) return;

    const progress = [];
    for (let i = 0; i < cards.length - 1; i++) {
      const start = triggers[i];
      const dist = heights[i];
      const p = dist > 0 ? Math.min(Math.max((scrollY - start) / dist, 0), 1) : 0;
      progress.push(p);
    }

    cards.forEach((card, i) => {
      let depth = 0;
      for (let j = i; j < cards.length - 1; j++) {
        depth += progress[j];
      }

      // Scale hierarchy:
      // depth 0: scale 1
      // depth 1: scale 0.94
      // depth 2+: scale 0.88
      let scale = 1.0;
      if (depth <= 1) {
        scale = 1.0 - 0.06 * depth;
      } else {
        scale = 0.94 - 0.06 * Math.min(depth - 1, 1);
      }

      // Blur hierarchy:
      // depth 0: blur 0px
      // depth 1: blur 3px
      // depth 2+: blur 6px
      let blur = 0;
      if (depth <= 1) {
        blur = 3 * depth;
      } else {
        blur = 3 + 3 * Math.min(depth - 1, 1);
      }

      // Image animation:
      // active card image: scale 1, brightness 1 (overlay opacity 0)
      // inactive cards: scale 0.95, brightness 0.8 (overlay opacity 0.2)
      const imageScale = 1.0 - 0.05 * Math.min(depth, 1);
      const overlayOpacity = 0.2 * Math.min(depth, 1);

      card.style.transform = `translate3d(0, 0, 0) scale(${scale})`;
      card.style.filter = blur > 0 ? `blur(${blur}px)` : 'none';

      const img = card.querySelector('.project-image');
      if (img) {
        img.style.transform = `translate3d(0, 0, 0) scale(${imageScale})`;
      }

      const overlay = card.querySelector('.project-image-overlay');
      if (overlay) {
        overlay.style.opacity = `${overlayOpacity}`;
      }
    });
  }, []);

  useEffect(() => {
    // Initialize Lenis smooth scroll globally on window
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Initial positioning
    recalcLayout();
    updateTransforms();

    // Use ResizeObserver to update layout cache when DOM dimensions change
    const observer = new ResizeObserver(() => {
      recalcLayout();
      updateTransforms();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleScroll = () => {
      updateTransforms();
    };

    const handleResize = () => {
      recalcLayout();
      updateTransforms();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('load', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
    };
  }, [recalcLayout, updateTransforms]);

  const cards = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { index });
    }
    return child;
  });

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex flex-col items-center px-4 md:px-8 py-[10vh] ${className}`.trim()}
    >
      {cards}
    </div>
  );
};

export default ScrollStack;
