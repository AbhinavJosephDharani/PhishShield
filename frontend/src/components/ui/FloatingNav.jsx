import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

export const FloatingNav = ({ navItems, className }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Only trigger hide if we're not already hidden
    if (visible) {
      setVisible(false);
      setIsScrolling(true);
    }

    // Clear any existing timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // Set a longer timeout for showing the nav again
    const timeout = setTimeout(() => {
      setVisible(true);
      setIsScrolling(false);
    }, 800);

    setScrollTimeout(timeout);
  });

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
          opacity: {
            duration: 0.5,
          },
        }}
        className={cn(
          "flex w-full fixed top-0 inset-x-0 h-20 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800/50 z-[5000] px-6 items-center justify-between",
          className
        )}>
        {/* Logo Section */}
        <Link to="/" className="flex items-center">
          <span className="text-[#00FFBB] text-2xl font-bold">PhishShield</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((navItem, idx) => (
            <Link
              key={`link-${idx}`}
              to={navItem.link}
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              {navItem.name}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
            Partner Login
          </Link>
          <Link
            to="/register"
            className="bg-[#00FFBB] hover:bg-[#00FFBB]/90 text-gray-900 px-4 py-2 rounded text-sm font-medium transition-colors">
            Free Trial
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}; 