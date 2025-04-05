import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

export const FloatingNav = ({ navItems, className }) => {
  return (
    <div className={cn(
      "flex fixed bottom-8 left-1/2 -translate-x-1/2 h-16 bg-transparent z-[5000] px-6 items-center justify-center gap-8",
      className
    )}>
      {/* Navigation Links */}
      <div className="flex items-center space-x-8">
        {navItems.map((navItem, idx) => (
          <Link
            key={`link-${idx}`}
            to={navItem.link}
            className="text-white hover:text-white/80 text-sm font-medium transition-colors">
            {navItem.name}
          </Link>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        <Link
          to="/login"
          className="text-white hover:text-white/80 text-sm font-medium transition-colors">
          Partner Login
        </Link>
        <Link
          to="/register"
          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
          Free Trial
        </Link>
      </div>
    </div>
  );
}; 