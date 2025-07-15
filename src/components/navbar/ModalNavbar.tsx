import React, { useRef } from "react";
import { motion } from "motion/react";
import { Button } from "components/ui/button";
import DialogForm from "layouts/form-email";

interface NavLink {
  name: string;
  href: string;
}

interface ModalNavbarProps {
  navlinks: NavLink[];
  setOpenModalMenu: (value: boolean) => void;
}

const ModalNavbar: React.FC<ModalNavbarProps> = ({ navlinks, setOpenModalMenu }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setOpenModalMenu(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-20 bg-black/20 p-3 backdrop-blur-xl lg:hidden"
      onClick={handleOverlayClick}
    >
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
          staggerChildren: 0.05,
        }}
        className="bg-card/95 flex w-full flex-col gap-2 rounded-lg border-2 p-4 shadow-2xl backdrop-blur-md"
      >
        <motion.div
          className="mb-4 flex items-center justify-end"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <Button variant="ghost" className="cursor-pointer" onClick={() => setOpenModalMenu(false)}>
            <motion.i
              className="pi pi-times text-xl"
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            />
          </Button>
        </motion.div>

        <nav className="space-y-2">
          {navlinks.map((navlink, index) => (
            <motion.a
              key={navlink.name}
              href={navlink.href}
              className="group hover:bg-accent flex items-center rounded-md px-3 py-3 text-base font-medium transition-all duration-300 hover:scale-[102%] hover:shadow-md"
              onClick={() => setOpenModalMenu(false)}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.15 + index * 0.05,
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
              whileHover={{ x: 8 }}
              whileTap={{ scale: 0.98 }}
            >
              {navlink.name}
              <motion.span
                className="ml-2 inline-block text-lg opacity-0 transition-all duration-300 group-hover:opacity-100"
                initial={{ x: -10, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </motion.a>
          ))}
        </nav>

        <motion.div
          className="mt-4"
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
  );
};

export default ModalNavbar;
