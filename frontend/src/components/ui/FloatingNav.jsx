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
        className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
        <IconShieldCheck className="h-8 w-8" />
        <span className="text-xl font-[100] font-['Editorial_New'] text-white">PhishShield</span>
      </motion.div>

      {/* Navigation Bar */}
      <div className="fixed bottom-6 inset-x-0 mx-auto z-50">
        <div className="flex items-center justify-center gap-6 p-4 bg-[#1a1a1a] border border-white/[0.2] rounded-2xl max-w-fit mx-auto">
          {navItems.map((navItem, idx) => (
            <Link
              key={`link-${idx}`}
              to={navItem.link}
              className={cn(
                "relative text-white font-['Editorial_New'] font-[100] hover:text-neutral-300"
              )}>
              <span className="text-base">{navItem.name}</span>
            </Link>
          ))}
          <BackgroundGradient>
            <Link
              to="/register"
              className="block bg-black text-white px-4 py-2 rounded-xl font-['Editorial_New'] font-[100] hover:bg-gray-900 transition-colors">
              <span>Register</span>
            </Link>
          </BackgroundGradient>
          <Link
            to="/login"
            className="border font-['Editorial_New'] font-[100] relative border-white/[0.2] text-black px-4 py-2 rounded-xl bg-white hover:bg-white/90 transition-colors">
            <span>Login</span>
          </Link>
        </div>
      </div>
    </>
  );
}; 