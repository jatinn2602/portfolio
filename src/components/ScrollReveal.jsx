import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom'
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    if (Array.isArray(children)) {
      let wordIndex = 0;
      return children.map((item, idx) => {
        if (typeof item === 'string') {
          return item.split(/(\s+)/).map((word) => {
            if (word.match(/^\s+$/)) return word;
            wordIndex++;
            return (
              <span className="inline-block word" key={`word-${wordIndex}`}>
                {word}
              </span>
            );
          });
        } else if (item && typeof item === 'object' && item.text) {
          return item.text.split(/(\s+)/).map((word) => {
            if (word.match(/^\s+$/)) return word;
            wordIndex++;
            return (
              <span className={`inline-block word ${item.className || ''}`} key={`word-${wordIndex}`}>
                {word}
              </span>
            );
          });
        }
        return null;
      });
    }

    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    gsap.fromTo(el, { transformOrigin: '0% 50%', rotate: baseRotation }, {
      ease: 'none',
      rotate: 0,
      scrollTrigger: {
        trigger: el,
        scroller,
        start: 'top bottom',
        end: rotationEnd,
        scrub: true
      }
    });

    const wordElements = el.querySelectorAll('.word');

    gsap.fromTo(wordElements, { opacity: baseOpacity, willChange: 'opacity' }, {
      ease: 'none',
      opacity: 1,
      stagger: 0.05,
      scrollTrigger: {
        trigger: el,
        scroller,
        start: 'top bottom-=20%',
        end: wordAnimationEnd,
        scrub: true
      }
    });

    if (enableBlur) {
      gsap.fromTo(wordElements, { filter: `blur(${blurStrength}px)` }, {
        ease: 'none',
        filter: 'blur(0px)',
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=20%',
          end: wordAnimationEnd,
          scrub: true
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <div ref={containerRef} className={`${containerClassName}`}>
      <p
        className={`text-white leading-[1.5] ${textClassName || 'text-[clamp(1.1rem,4vw,2rem)] font-semibold'}`}>
        {splitText}
      </p>
    </div>
  );
};

export default ScrollReveal;
