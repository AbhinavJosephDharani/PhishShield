import React from 'react';
import { FloatingNav } from './ui/FloatingNav';

const navItems = [
  {
    name: "Platform",
    link: "/platform"
  },
  {
    name: "Solutions",
    link: "/solutions"
  },
  {
    name: "Why PhishShield",
    link: "/why-phishshield"
  },
  {
    name: "Resources",
    link: "/resources"
  },
  {
    name: "About",
    link: "/about"
  }
];

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-transparent text-white">
      {/* Floating Navigation */}
      <FloatingNav navItems={navItems} />

      {/* Main Content */}
      <main className="pt-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} PhishShield. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 