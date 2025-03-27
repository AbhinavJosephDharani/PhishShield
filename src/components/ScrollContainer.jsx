import { useState, useEffect, useRef } from 'react';
import Scene3D from './Scene3D';

export default function ScrollContainer({ children }) {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const currentScroll = containerRef.current.scrollTop;
        setScrollY(currentScroll);
        
        // Add scrolling state for animation effects
        if (!isScrolling) {
          setIsScrolling(true);
          document.body.style.cursor = 'grabbing';
        }
        
        // Clear the existing timeout
        if (window.scrollTimeout) {
          clearTimeout(window.scrollTimeout);
        }
        
        // Set new timeout
        window.scrollTimeout = setTimeout(() => {
          setIsScrolling(false);
          document.body.style.cursor = 'default';
        }, 150);
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      if (window.scrollTimeout) {
        clearTimeout(window.scrollTimeout);
      }
    };
  }, [isScrolling]);
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Scene3D scrollY={scrollY} />
      
      <div 
        ref={containerRef}
        className={`
          h-full w-full overflow-y-auto scroll-smooth perspective-1000 relative z-10
          transition-all duration-300 ease-out
          ${isScrolling ? 'scale-[0.995]' : 'scale-100'}
        `}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(107, 114, 128, 0.5) transparent',
          transform: `translate3d(0, 0, 0)`,
          willChange: 'transform, scale',
        }}
      >
        <div className="transform-gpu">
          {children}
        </div>
      </div>
    </div>
  );
} 