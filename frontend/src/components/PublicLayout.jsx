import React from 'react';
import { FloatingNav } from './ui/FloatingNav';

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Bottom Navigation */}
      <FloatingNav />
    </div>
  );
};

export default PublicLayout; 