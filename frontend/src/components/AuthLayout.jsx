import React, { useState } from 'react';
import { FloatingNav } from './ui/FloatingNav';
import Sidebar from './ui/Sidebar';
import { useAuth } from '../context/AuthContext';

const AuthLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          onLogout={logout}
        />

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} pb-24`}>
          {children}
        </main>
      </div>

      {/* Bottom Navigation */}
      <FloatingNav />
    </div>
  );
};

export default AuthLayout; 