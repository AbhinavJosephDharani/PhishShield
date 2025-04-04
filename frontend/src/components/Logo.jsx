import React from 'react';

const Logo = ({ className = '', size = 28 }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Shield base */}
        <path
          d="M12 2L3 7V12C3 16.97 7.02 21.5 12 22C16.98 21.5 21 16.97 21 12V7L12 2Z"
          fill="#3B82F6"
          fillOpacity="0.1"
          stroke="#3B82F6"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Fish hook representing phishing */}
        <path
          d="M9 12C9 12 10 11 12 11C14 11 15 12 15 12"
          stroke="#3B82F6"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Slash through the hook to represent prevention */}
        <path
          d="M7.5 9.5L16.5 14.5"
          stroke="#EF4444"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-medium text-base text-white">
        PhishShield
      </span>
    </div>
  );
};

export default Logo; 