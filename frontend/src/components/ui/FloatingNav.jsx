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
        <div className="flex items-center justify-center mx-auto max-w-[704px] h-[64px] bg-[#131313] border border-[#242424] rounded-[20.25px] px-[22.5px] pr-[11.25px] gap-[22.5px] text-[18px] leading-[23.4px] text-[#eeeeee] font-sans mb-[22.5px] antialiased">
          <Link to="/" className="flex items-center gap-2">
            <IconShieldCheck className="h-6 w-6 text-white" />
          </Link>
          {navItems.map((navItem, idx) => (
            <Link
              key={`link-${idx}`}
              to={navItem.link}
              className={cn(
                "relative text-[#eeeeee] font-sans font-bold hover:text-neutral-300"
              )}>
              <span className="text-[18px]">{navItem.name}</span>
            </Link>
          ))}
          <div className="flex items-center gap-3">
            <BackgroundGradient containerClassName="rounded-[20.25px] overflow-hidden">
              <Link
                to="/register"
                className="block bg-black text-white px-6 py-3 rounded-[20.25px] font-sans font-bold hover:bg-gray-900 transition-colors">
                <span className="text-[18px]">Register</span>
              </Link>
            </BackgroundGradient>
            <Link
              to="/login"
              className="border font-sans font-bold relative border-[#242424] text-black px-6 py-3 rounded-[20.25px] bg-white hover:bg-white/90 transition-colors">
              <span className="text-[18px]">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}; 