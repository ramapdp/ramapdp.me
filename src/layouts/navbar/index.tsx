import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import LogoTextBlack from "@/assets/text-black.svg";
import LogoTextWhite from "@/assets/text-white.svg";
import ModalNavbar from "@/components/navbar/ModalNavbar";
import DialogForm from "@/components/dialog";

const navlinks = [
  {
    name: "Home",
    href: "#home",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Projects",
    href: "#projects",
  },
];

const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [addBlur, setAddBlur] = useState<boolean>(false);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [openModalMenu, setOpenModalMenu] = useState<boolean>(false);

  const handleMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setAddBlur(currentScrollPos > 0);
    setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 150);
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
    <nav className="fixed top-4 w-full z-10">
      <motion.nav
        className="container"
        initial={{ top: 16 }}
        animate={{
          top: isVisible ? 16 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div
          className={`border ${
            addBlur
              ? "drop-shadow-lg backdrop-blur-sm border-accent"
              : "border-transparent"
          } flex transition-all duration-300 rounded-2xl justify-end items-center px-0 py-2 gap-4 sm:px-6 lg:py-3 lg:gap-4`}
        >
          <div className="mr-auto">
            <a href="#">
              {theme === "light" ? (
                <img
                  src={LogoTextBlack}
                  alt="ramapdp"
                  className="h-8 lg:h-9 w-auto"
                />
              ) : (
                <img
                  src={LogoTextWhite}
                  alt="ramapdp"
                  className="h-8 lg:h-9 w-auto"
                />
              )}
            </a>
          </div>
          <div className="-mr-2 -my-2 lg:hidden">
            <Button
              variant="ghost"
              className="rounded-md p-2 inline-flex items-center justify-center text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary cursor-pointer"
              onClick={() => setOpenModalMenu(!openModalMenu)}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open menu</span>
              <i className="pi pi-bars text-xl" aria-hidden="true" />
            </Button>
          </div>
          <NavigationMenu className="hidden space-x-6 lg:flex lg:space-x-8">
            <NavigationMenuList className="flex space-x-6">
              {navlinks.map((navlink) => (
                <NavigationMenuItem key={navlink.name}>
                  <NavigationMenuLink
                    href={navlink.href}
                    className="text-sm font-medium hover:scale-105"
                  >
                    {navlink.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden lg:flex items-center">
            <DialogForm />
          </div>
          <Button
            variant="ghost"
            onClick={handleMode}
            className="hidden cursor-pointer lg:block"
          >
            {theme === "dark" ? (
              <i className="pi pi-sun" />
            ) : (
              <i className="pi pi-moon" />
            )}
          </Button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {openModalMenu && (
          <ModalNavbar
            navlinks={navlinks}
            theme={theme}
            handleMode={handleMode}
            setOpenModalMenu={setOpenModalMenu}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
