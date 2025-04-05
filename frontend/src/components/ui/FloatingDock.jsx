import { cn } from "../../lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

const NavItem = ({ title, icon, href, showIconOnly, showText }) => {
  return (
    <Link
      to={href}
      className="px-4 py-2 text-white hover:text-white/80 transition-colors flex items-center gap-2"
    >
      {showIconOnly ? (
        <div className="w-5 h-5">{icon}</div>
      ) : showText ? (
        <span className="text-sm font-medium">{title}</span>
      ) : null}
    </Link>
  );
};

const FloatingDockDesktop = ({ items, className }) => {
  return (
    <div
      className={cn(
        "mx-auto hidden md:flex h-16 items-center justify-center gap-2",
        className
      )}
    >
      {items.map((item) => (
        <NavItem key={item.title} {...item} />
      ))}
    </div>
  );
};

const FloatingDockMobile = ({ items, className }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 right-0 flex flex-col items-end gap-2 bg-black/20 backdrop-blur-sm rounded-lg py-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: 20,
                  transition: { delay: idx * 0.05 },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <NavItem {...item} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-white" />
      </button>
    </div>
  );
};

export const FloatingDock = ({ items, desktopClassName, mobileClassName }) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
}; 