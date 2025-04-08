import React from "react";
import { motion } from "framer-motion";
import { IconShieldCheck } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { BackgroundGradient } from "./BackgroundGradient";

const navItems = [
  {
    name: "Features",
    link: "/features"
  },
  {
    name: "Community",
    link: "/community"
  },
  {
    name: "About",
    link: "/about"
  }
];

export const FloatingNav = () => {
  return (
    <>
      {/* Top Logo */}
      <motion.div
        className="fixed top-8 left-1/2 -translate-x-1/2 z-[99999] flex items-center gap-2">
        <IconShieldCheck className="h-8 w-8" />
        <span className="text-xl font-[100] font-['Editorial_New'] text-white">PhishShield</span>
      </motion.div>

      {/* Navigation Bar */}
      <div className="fixed bottom-6 inset-x-0 mx-auto z-[99999]">
        <div className="flex items-center justify-center gap-8 p-3 bg-[#1a1a1a]/95 backdrop-blur-md border border-white/[0.2] rounded-3xl max-w-fit mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <IconShieldCheck className="h-5 w-5 text-white" />
          </Link>
          {navItems.map((navItem, idx) => (
            <Link
              key={`link-${idx}`}
              to={navItem.link}
              className={cn(
                "relative text-white font-sans font-medium hover:text-neutral-300"
              )}>
              <span className="text-lg">{navItem.name}</span>
            </Link>
          ))}
          <div className="flex items-center gap-3">
            <BackgroundGradient>
              <Link
                to="/register"
                className="block bg-black text-white px-5 py-2.5 rounded-2xl font-sans font-medium hover:bg-gray-900 transition-colors"
              >
                <span className="text-lg">Register</span>
              </Link>
            </BackgroundGradient>
            <Link
              to="/login"
              className="relative inline-flex h-12 overflow-hidden rounded-2xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-2xl bg-white px-5 py-2.5 text-lg font-sans font-medium text-black backdrop-blur-3xl hover:bg-white/90 transition-colors">
                Login
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}; 