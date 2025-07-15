import { AnimatePresence, motion } from "motion/react";
import { FiMoon, FiSun } from "react-icons/fi";

interface ThemeIconProps {
  theme: "dark" | "light";
}

const ThemeIcon = ({ theme }: ThemeIconProps) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={theme}
      initial={{ opacity: 0, x: -20, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.8 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
    >
      {theme === "light" ? (
        <FiSun className="h-4 w-4 text-gray-600" />
      ) : (
        <FiMoon className="h-4 w-4 text-gray-300" />
      )}
    </motion.div>
  </AnimatePresence>
);

const getNextTheme = (currentTheme: "dark" | "light"): "dark" | "light" => {
  return currentTheme === "light" ? "dark" : "light";
};

export { ThemeIcon, getNextTheme };