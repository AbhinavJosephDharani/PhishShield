import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";
import { IconHome, IconShieldCheck, IconUser, IconInfoCircle } from "@tabler/icons-react";
import { FloatingDock } from "./FloatingDock";

const navItems = [
  {
    title: "Home",
    href: "/",
    icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-400" />,
  },
  {
    title: "Check URL",
    href: "/check",
    icon: <IconShieldCheck className="h-full w-full text-neutral-500 dark:text-neutral-400" />,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-400" />,
  },
  {
    title: "About",
    href: "/about",
    icon: <IconInfoCircle className="h-full w-full text-neutral-500 dark:text-neutral-400" />,
  },
];

export const FloatingNav = () => {
  return (
    <FloatingDock
      items={navItems}
      desktopClassName="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
      mobileClassName="fixed bottom-4 right-4 z-50"
    />
  );
}; 