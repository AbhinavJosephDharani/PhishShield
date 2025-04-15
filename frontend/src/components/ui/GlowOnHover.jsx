import { cn } from "../../lib/utils";
import React from "react";
import { motion } from "framer-motion";

export const GlowOnHover = ({
  children,
  className,
  containerClassName,
}) => {
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      {/* Glow effect - only visible on hover */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-0 group-hover:opacity-60 blur-xl transition duration-500",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />
      {/* Content */}
      <div className={cn("relative z-10 bg-[#1a1a1a] rounded-3xl", className)}>
        {children}
      </div>
    </div>
  );
}; 