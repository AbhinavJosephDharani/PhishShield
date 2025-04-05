import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";
import { IconHome, IconShieldCheck, IconUsers, IconInfoCircle, IconLogin, IconUserPlus } from "@tabler/icons-react";
import { FloatingDock } from "./FloatingDock";
import { Logo } from "./Logo";

const navItems = [
  {
    title: "Home",
    href: "/",
    icon: <IconShieldCheck className="h-full w-full text-white" />,
  },
  {
    title: "Features",
    href: "/features",
    icon: <IconHome className="h-full w-full text-white" />,
  },
  {
    title: "Community",
    href: "/community",
    icon: <IconUsers className="h-full w-full text-white" />,
  },
  {
    title: "About",
    href: "/about",
    icon: <IconInfoCircle className="h-full w-full text-white" />,
  },
  {
    title: "Register",
    href: "/register",
    icon: <IconUserPlus className="h-full w-full text-white" />,
  },
  {
    title: "Login",
    href: "/login",
    icon: <IconLogin className="h-full w-full text-white" />,
  },
];

export const FloatingNav = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  const translateY = useTransform(scrollY, [0, 100], [0, -100]);

  return (
    <>
      {/* Top Logo */}
      <motion.div
        style={{ opacity, translateY }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <Logo size="lg" showText={true} />
      </motion.div>

      {/* Navigation Bar */}
      <FloatingDock
        items={navItems}
        desktopClassName="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-sm"
        mobileClassName="fixed bottom-4 right-4 z-50 shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-sm"
      />
    </>
  );
}; 