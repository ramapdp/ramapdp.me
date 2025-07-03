import { useTheme } from "components/theme-provider";
import { Button } from "components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "components/ui/navigation-menu";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ModalNavbar from "components/navbar/ModalNavbar";
import IconNameBlack from "assets/icons/black-name.svg";
import IconNameWhite from "assets/icons/white-name.svg";
import { navlinks } from "utils/navbar/navMenu";

const ThemeButton: React.FC = () => {
  const { theme, setTheme, isTransitioning } = useTheme();

  const getNextTheme = (): "dark" | "light" | "system" => {
    const themeOrder: ("light" | "dark" | "system")[] = ["light", "dark", "system"];
    const currentIndex = themeOrder.indexOf(theme);
    return themeOrder[(currentIndex + 1) % themeOrder.length];
  };

  const getCurrentIcon = () => {
    switch (theme) {
      case "light":
        return "pi-sun";
      case "dark":
        return "pi-moon";
      case "system":
        return "pi-desktop";
      default:
        return "pi-desktop";
    }
  };

  const handleThemeChange = () => {
    if (isTransitioning) return;
    setTheme(getNextTheme());
  };

  return (
    <Button
      variant="ghost"
      className="cursor-pointer overflow-hidden"
      onClick={handleThemeChange}
      disabled={isTransitioning}
      aria-label={`Switch to ${getNextTheme()} theme.`}
      title={`Switch to ${getNextTheme()} mode`}
    >
      <AnimatePresence mode="wait">
        <motion.i
          key={theme}
          className={`pi ${getCurrentIcon()}`}
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
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </AnimatePresence>
    </Button>
  );
};

const Navbar: React.FC = () => {
  const { actualTheme } = useTheme();
  const [addBlur, setAddBlur] = useState<boolean>(false);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [openModalMenu, setOpenModalMenu] = useState<boolean>(false);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setAddBlur(currentScrollPos > 0);
    setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 200);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevScrollPos]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.nav
          className="fixed top-4 w-full z-10 navbar-container"
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <motion.div
            className={`container border navbar-backdrop rounded-full border-accent flex justify-end items-center px-0 py-2 gap-2 sm:px-6 lg:py-2 lg:gap-4 ${
              addBlur && "drop-shadow-sm backdrop-blur-sm border-accent/50"
            }`}
            layout
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <motion.div
              className="-mr-2 -my-2 lg:hidden"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.2,
                ease: [0.68, -0.55, 0.265, 1.55],
              }}
            >
              <Button
                variant="ghost"
                className="rounded-md p-2 inline-flex items-center justify-center text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary cursor-pointer transition-all duration-300 hover:scale-110"
                onClick={() => setOpenModalMenu(!openModalMenu)}
                aria-label="Toggle navigation menu"
              >
                <span className="sr-only">Open menu</span>
                <motion.i
                  className="pi pi-bars text-xl"
                  aria-hidden="true"
                  animate={{ rotate: openModalMenu ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
              </Button>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <NavigationMenu className="hidden space-x-6 lg:flex lg:space-x-8">
                <NavigationMenuList className="flex space-x-6">
                  {navlinks.map((navlink, index) => (
                    <motion.div
                      key={navlink.name}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.3 + index * 0.05,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      <NavigationMenuItem>
                        <NavigationMenuLink
                          href={navlink.href}
                          className="text-sm font-medium relative group navbar-link"
                        >
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                          >
                            {navlink.name}
                          </motion.span>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    </motion.div>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </motion.div>

            <motion.div
              className="hidden lg:flex items-center gap-2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {/* <DialogForm /> */}
              <ThemeButton />
            </motion.div>

            <motion.div
              className="lg:hidden"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.3,
                ease: [0.68, -0.55, 0.265, 1.55],
              }}
            >
              <ThemeButton />
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {openModalMenu && <ModalNavbar navlinks={navlinks} setOpenModalMenu={setOpenModalMenu} />}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
