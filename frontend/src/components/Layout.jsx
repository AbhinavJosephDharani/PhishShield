import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { FloatingNav } from './ui/FloatingNav';

const navItems = [
  {
    name: "How it works?",
    link: "/how-it-works",
    icon: "❓"
  },
  {
    name: "Products",
    link: "/products",
    icon: "🛡️"
  },
  {
    name: "About Us",
    link: "/about",
    icon: "ℹ️"
  },
  {
    name: "Resources",
    link: "/resources",
    icon: "📚"
  }
];

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Floating Navigation */}
      <FloatingNav navItems={navItems} />

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
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