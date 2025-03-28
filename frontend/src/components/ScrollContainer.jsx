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
        
        if (!isScrolling) {
          setIsScrolling(true);
          document.body.style.cursor = 'grabbing';
        }
        
        if (window.scrollTimeout) {
          clearTimeout(window.scrollTimeout);
        }
        
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
    <>
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <Scene3D scrollY={scrollY} />
      </div>
      <div 
        ref={containerRef}
        className="absolute inset-0 w-full h-full overflow-y-auto"
      >
        {children}
      </div>
    </>
  );
} 