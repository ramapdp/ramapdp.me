import { useTheme } from "components/theme-provider";
import { Button } from "components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { FiMoon } from "react-icons/fi";
import { FiSun } from "react-icons/fi";
import { HiOutlineComputerDesktop } from "react-icons/hi2";

const ThemeButton: React.FC = () => {
  const { theme, setTheme, actualTheme, isTransitioning } = useTheme();

  const getNextTheme = (): "dark" | "light" => {
    // Only toggle between dark and light after initial system theme
    return actualTheme === "light" ? "dark" : "light";
  };

  const getCurrentIcon = () => {
    // Show icon based on actual theme for immediate feedback
    switch (actualTheme) {
      case "light":
        return <FiSun className="h-3 w-3 text-gray-500 transition-colors duration-200 hover:text-black" />;
      case "dark":
        return <FiMoon className="text-foreground h-3 w-3 transition-colors duration-200 hover:text-white" />;
      default:
        return <HiOutlineComputerDesktop className="text-foreground h-3 w-3" />;
    }
  };

  const handleThemeChange = () => {
    if (isTransitioning) return;
    setTheme(getNextTheme());
  };

  return (
    <Button
      variant="ghost"
      className="theme-button h-fit w-fit cursor-pointer overflow-hidden rounded-full p-2 px-3.5"
      onClick={handleThemeChange}
      disabled={isTransitioning}
      aria-label={`Switch to ${getNextTheme()} theme.`}
      title={`Switch to ${getNextTheme()} mode`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={actualTheme}
          initial={{
            opacity: 0,
            x: -20,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            x: 20,
            scale: 0.8,
          }}
          transition={{
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {getCurrentIcon()}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
};

export default ThemeButton;
