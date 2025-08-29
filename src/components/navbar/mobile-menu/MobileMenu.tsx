import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import DialogForm from "layouts/form-email";
import { cn } from "lib/utils";
import type { NavLink } from "utils/navbar/navMenu";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navlinks: NavLink[];
  currentPath: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navlinks, currentPath }) => {
  const handleLinkClick = () => {
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="mobile-menu-container mobile-menu-overlay bg-black/20 sm:hidden"
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="mobile-menu-content mobile-menu-glassmorphism flex flex-col gap-2 rounded-2xl p-3 shadow-2xl"
          >
            {/* Navigation Links */}
            <nav className="space-y-1">
              {navlinks.map((navlink, index) => {
                const Icon = navlink.icon;
                return (
                  <motion.div
                    key={navlink.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + index * 0.05,
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    <Link
                      to={navlink.path}
                      className={cn(
                        "group font-rethink-sans flex items-center justify-between rounded-lg px-3 py-2 text-base font-normal transition-all duration-200 hover:scale-[102%] hover:shadow-sm",
                        currentPath === navlink.name
                          ? "bg-white/70 text-gray-900 shadow-sm dark:bg-[#ffffff1a] dark:text-white"
                          : "text-gray-700 hover:bg-white/60 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800/60 dark:hover:text-white",
                      )}
                      onClick={handleLinkClick}
                    >
                      {/* Left side: Icon and Text */}
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4" />
                        <span>{navlink.name}</span>
                      </div>

                      <motion.span
                        className={cn(
                          "inline-block text-lg transition-all duration-200",
                          currentPath === navlink.name ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                        )}
                        initial={{ x: -10, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Contact Form Button */}
            <motion.div
              className="border-t border-white/20 pt-2 dark:border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <DialogForm />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
