import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconShieldCheck } from "@tabler/icons-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Platform", link: "/platform" },
    { name: "Solutions", link: "/solutions" },
    { name: "Why PhishShield", link: "/why-phishshield" },
    { name: "Resources", link: "/resources" },
    { name: "About", link: "/about" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="nav-line grid-column-gap-[1.25rem] grid-row-gap-[1.25rem] border-[1px] border-solid border-[#242424] bg-[#131313] rounded-[1.125rem] justify-content-center align-items-center margin-bottom-[1.25rem] padding-[1.25rem] flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <IconShieldCheck className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-white">PhishShield</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-5">
            <Link
              to="/login"
              className="text-white hover:text-gray-300 px-5 py-[1.25rem] rounded-md text-sm font-medium transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-5 py-[1.25rem] rounded-[1.125rem] text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, height: isMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-[#131313]">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-800"
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 pb-3 border-t border-gray-700">
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-800"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:text-blue-500 hover:bg-gray-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar; 