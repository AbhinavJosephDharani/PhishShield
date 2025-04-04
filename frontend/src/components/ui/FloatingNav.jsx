import React from "react";
import { motion } from "framer-motion";
import { IconShieldCheck } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Logo } from "./Logo";

const navItems = [
  {
    name: "PhishShield",
    link: "/",
    icon: <IconShieldCheck className="h-5 w-5" />
  },
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
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <Logo size="lg" showText={true} />
      </motion.div>

      {/* Navigation Bar */}
      <div className="fixed bottom-4 inset-x-0 mx-auto z-50 flex justify-center">
        <div className="flex max-w-fit items-center border border-white/[0.2] rounded-full bg-[#1a1a1a] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] pr-2 pl-8 py-2 space-x-4">
          {navItems.map((navItem, idx) => (
            <Link
              key={`link-${idx}`}
              to={navItem.link}
              className={cn(
                "relative text-white items-center flex space-x-1 hover:text-neutral-300"
              )}>
              {navItem.icon && <span className="block sm:hidden">{navItem.icon}</span>}
              <span className="text-sm font-medium">{navItem.name}</span>
            </Link>
          ))}
          <Link
            to="/register"
            className="border text-sm font-medium relative border-white/[0.2] text-white px-4 py-2 rounded-full bg-black hover:bg-black/80 transition-colors">
            <span>Register</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </Link>
          <Link
            to="/login"
            className="border text-sm font-medium relative border-white/[0.2] text-black px-4 py-2 rounded-full bg-white hover:bg-white/90 transition-colors">
            <span>Login</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </Link>
        </div>
      </div>
    </>
  );
}; 