import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface NavLink {
  name: string;
  href: string;
}

interface ModalNavbarProps {
  navlinks: NavLink[];
  theme: string;
  handleMode: () => void;
  setOpenModalMenu: (value: boolean) => void;
}

const ModalNavbar: React.FC<ModalNavbarProps> = ({
  navlinks,
  theme,
  handleMode,
  setOpenModalMenu,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setOpenModalMenu(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 backdrop-blur-lg z-50 p-3 lg:hidden"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-[oklch(0.145 0 0)] border-2 shadow-2xl rounded-lg p-4 w-full"
      >
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" onClick={handleMode}>
            {theme === "dark" ? (
              <i className="pi pi-sun" />
            ) : (
              <i className="pi pi-moon" />
            )}
          </Button>
          <Button variant="ghost" onClick={() => setOpenModalMenu(false)}>
            <i className="pi pi-times text-xl" />
          </Button>
        </div>
        <nav className="space-y-2">
          {navlinks.map((navlink) => (
            <a
              key={navlink.name}
              href={navlink.href}
              className="group flex items-center px-3 py-1 text-base rounded-md font-medium hover:bg-accent transition-colors duration-200"
              onClick={() => setOpenModalMenu(false)}
            >
              {navlink.name}
              <span className="inline-block ml-2 text-lg transition-transform duration-300 transform translate-x-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1">
                →
              </span>
            </a>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default ModalNavbar;
