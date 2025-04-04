import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";
import GooeyNav from './GooeyNav';

export const FloatingNav = ({ navItems, className }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    setVisible(false);
    setIsScrolling(true);

    const timeout = setTimeout(() => {
      setVisible(true);
      setIsScrolling(false);
    }, 400);

    setScrollTimeout(timeout);
  });

  const gooeyItems = navItems.map(item => ({
    label: item.name,
    href: item.link
  }));

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
          duration: 0.4,
          ease: "easeInOut",
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto z-[5000]",
          className
        )}>
        <GooeyNav
          items={gooeyItems}
          animationTime={600}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          initialActiveIndex={0}
        />
      </motion.div>
    </AnimatePresence>
  );
}; 