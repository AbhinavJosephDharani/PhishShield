import React from 'react';

const GlitchText = ({ children, className = '' }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute top-0 left-0 -translate-x-[2px] translate-y-[2px] text-[#00ff00] opacity-70 z-0"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}>
        {children}
      </span>
      <span className="absolute top-0 left-0 translate-x-[2px] -translate-y-[2px] text-[#ff0000] opacity-70 z-0"
            style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' }}>
        {children}
      </span>
    </div>
  );
};

export default GlitchText; 