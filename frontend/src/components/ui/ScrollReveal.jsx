import React, { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0,
  blurStrength = 10,
  containerClassName = "",
  textClassName = "",
}) => {
  const containerRef = useRef(null);
  const words = useMemo(() => {
    if (typeof children !== 'string') return [];
    return children.split(' ');
  }, [children]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wordElements = container.querySelectorAll('.word');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
        toggleActions: "play none none reverse"
      }
    });

    // Initial state
    gsap.set(wordElements, {
      opacity: baseOpacity,
      filter: enableBlur ? `blur(${blurStrength}px)` : 'none'
    });

    // Animate each word with a stagger
    tl.to(wordElements, {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1,
      stagger: {
        amount: 0.5,
        from: "start"
      },
      ease: "power2.out"
    });

    return () => {
      tl.kill();
    };
  }, [words, baseOpacity, blurStrength, enableBlur]);

  if (typeof children !== 'string') {
    return <div ref={containerRef}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={containerClassName}>
      <div className={textClassName}>
        {words.map((word, i) => (
          <span key={i} className="word inline-block px-[0.15em] select-none">
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ScrollReveal; 