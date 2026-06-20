import React, { useEffect, useRef, useCallback, useState } from 'react';
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
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(0);
  const [glareY, setGlareY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation (-10 to 10 degrees) for 3D tilt
    const rX = ((mouseY / height) - 0.5) * -8;
    const rY = ((mouseX / width) - 0.5) * 8;

    setRotateX(rX);
    setRotateY(rY);
    setGlareX(mouseX);
    setGlareY(mouseY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  if (children) {
    return (
      <div
        className={`scroll-stack-card sticky w-full max-w-[1200px] mb-[5vh] last:mb-[5vh] transform-gpu will-change-transform ${className}`.trim()}
        style={{
          top: '5vh',
          zIndex: index
        }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-[30vh] rounded-[32px] overflow-hidden bg-neutral-950/20 border border-white/10 backdrop-blur-3xl shadow-2xl flex flex-col md:flex-row cursor-pointer group"
          style={{
            transformStyle: 'preserve-3d',
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.01 : 1}, ${isHovered ? 1.01 : 1}, 1)`,
            transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`scroll-stack-card sticky w-full max-w-[1200px] mb-8 md:mb-[8vh] last:mb-16 md:last:mb-[15vh] transform-gpu will-change-transform ${className}`.trim()}
      style={{
        top: '15vh',
        zIndex: index
      }}
    >
      {/* Inner Card (Handles Glassmorphism, 3D tilt, and content layout) */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full min-h-[500px] md:h-[55vh] lg:h-[52vh] rounded-[32px] overflow-hidden bg-neutral-950/20 border border-white/10 backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] flex flex-col md:flex-row cursor-pointer group transition-colors duration-300"
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.015 : 1}, ${isHovered ? 1.015 : 1}, 1)`,
          transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s',
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Hover white glare overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 border border-white/15 rounded-[32px]"
          style={{
            background: `radial-gradient(280px circle at ${glareX}px ${glareY}px, rgba(255,255,255,0.06), transparent 60%)`,
          }}
        />

        {/* Ambient liquid blobs in bg */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-30">
          <div className="absolute w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl animate-[project-blob-1_14s_infinite_alternate_ease-in-out] -top-10 -left-10" />
          <div className="absolute w-80 h-80 rounded-full bg-purple-500/10 blur-3xl animate-[project-blob-2_18s_infinite_alternate_ease-in-out] -bottom-10 -right-10" />
        </div>

        {/* Inline styles for custom keyframe animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes project-blob-1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(50px, 40px) scale(1.15); }
          }
          @keyframes project-blob-2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-40px, -50px) scale(0.85); }
          }
        `}} />

        {/* Image section: 55% width on desktop, h-52 on mobile */}
        <div className="w-full md:w-[55%] h-52 sm:h-64 md:h-full relative overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-white/10" style={{ transform: 'translateZ(10px)' }}>
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

        {/* Content section: 45% width on desktop, auto flex-grow on mobile */}
        <div className="w-full md:w-[45%] flex-grow md:h-full p-6 sm:p-8 md:p-10 flex flex-col justify-center text-left relative z-10" style={{ transform: 'translateZ(15px)' }}>
          {/* Project Title */}
          <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-400 transition-all duration-300">
            {title}
          </h3>

          {/* Short Summary */}
          <p className="text-xs md:text-sm text-neutral-400 font-light leading-relaxed mb-4 max-w-md group-hover:text-neutral-300 transition-colors duration-300">
            {summary}
          </p>

          {/* Tech Stack Pills */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-[10px] rounded-full bg-white/[0.03] border border-white/10 text-neutral-300 font-medium tracking-wide shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-auto md:mt-4">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all duration-300 flex items-center gap-1.5 shadow-[0_4px_16px_rgba(255,255,255,0.1)] hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>Live Demo</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-white/[0.05] border border-white/10 text-white font-semibold text-xs hover:bg-white/[0.1] transition-all duration-300 flex items-center gap-1.5 hover:scale-[1.03] active:scale-[0.98]"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span>GitHub</span>
              </a>
            )}
          </div>
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

      // 3D Scale hierarchy:
      let scale = 1.0;
      if (depth <= 1) {
        scale = 1.0 - 0.05 * depth;
      } else {
        scale = 0.95 - 0.05 * Math.min(depth - 1, 1);
      }

      // Vertical offset translation (creating the stacked overlap perspective)
      const translateY = -20 * depth;

      // Opacity fade to enhance the depth effect
      const opacity = 1.0 - 0.15 * Math.min(depth, 2);

      // Blur hierarchy:
      let blur = 0;
      if (depth <= 1) {
        blur = 2 * depth;
      } else {
        blur = 2 + 2 * Math.min(depth - 1, 1);
      }

      // Image animation:
      const imageScale = 1.0 - 0.05 * Math.min(depth, 1);
      const overlayOpacity = 0.25 * Math.min(depth, 1);

      // Mutate outer container's transform, opacity, and blur
      card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      card.style.opacity = `${opacity}`;
      card.style.filter = blur > 0 ? `blur(${blur}px)` : 'none';

      // Mutate nested elements if necessary
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
