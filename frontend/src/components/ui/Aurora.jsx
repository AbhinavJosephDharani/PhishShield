import React from 'react';
import './Aurora.css';

const Aurora = ({ className = "", ...props }) => {
  return (
    <div className={`relative w-full overflow-hidden ${className}`} {...props}>
      <div className="absolute inset-0 z-[-1]">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 blur-[100px] aurora-pulse-1"
          style={{
            clipPath: "circle(40% at 50% 50%)",
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50 blur-[100px] aurora-pulse-2"
          style={{
            clipPath: "circle(35% at 60% 60%)",
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 opacity-50 blur-[100px] aurora-pulse-3"
          style={{
            clipPath: "circle(35% at 40% 40%)",
          }}
        />
      </div>
    </div>
  );
};

export default Aurora; 