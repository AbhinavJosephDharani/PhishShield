import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";
import { IconShieldCheck } from "@tabler/icons-react";
import { FloatingDock } from "./FloatingDock";
import { Logo } from "./Logo";

const navItems = [
  {
    title: "PhishShield",
    href: "/",
    icon: <IconShieldCheck className="h-full w-full text-white" />,
    showIconOnly: true,
  },
  {
    title: "Features",
    href: "/features",
    showText: true,
  },
  {
    title: "Community",
    href: "/community",
    showText: true,
  },
  {
    title: "About",
    href: "/about",
    showText: true,
  },
  {
    title: "Register",
    href: "/register",
    showText: true,
  },
  {
    title: "Login",
    href: "/login",
    showText: true,
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

      {/* Full-width bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-black/20 backdrop-blur-sm z-40" />

      {/* Navigation Bar */}
      <FloatingDock
        items={navItems}
        desktopClassName="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
        mobileClassName="fixed bottom-4 right-4 z-50"
      />
    </>
  );
}; 