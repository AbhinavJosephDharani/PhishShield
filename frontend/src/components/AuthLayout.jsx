import React, { useState } from 'react';
import { FloatingNav } from './ui/FloatingNav';
import Sidebar from './ui/Sidebar';

const AuthLayout = ({ children, onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          onLogout={onLogout}
        />

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          {children}
        </main>
      </div>

      {/* Bottom Navigation */}
      <FloatingNav />
    </div>
  );
};

export default AuthLayout; 