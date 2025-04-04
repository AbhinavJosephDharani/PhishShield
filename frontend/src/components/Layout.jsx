import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import GlitchText from './GlitchText';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Glitch effect background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-30" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <GlitchText className="text-xl font-bold">
                  PhishShield
                </GlitchText>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {location.pathname !== '/login' && location.pathname !== '/register' && (
                <>
                  <Link
                    to="/dashboard"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900/80 backdrop-blur-sm border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} PhishShield. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 