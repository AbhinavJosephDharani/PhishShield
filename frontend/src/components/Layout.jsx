import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="relative min-h-screen w-full bg-gray-900 text-gray-100 flex flex-col items-center">
      {/* Glitch effect background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-30" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 w-full">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Logo />
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
      <main className="relative z-10 flex-grow w-full flex flex-col items-center">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 w-full">
        <div className="container max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} PhishShield. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 