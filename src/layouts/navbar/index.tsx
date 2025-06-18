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
    name: "About",
    href: "#about",
  },
  {
    name: "Experience",
    href: "#experience",
  },
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "Uses",
    href: "#uses",
  },
];

const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [addBlur, setAddBlur] = useState<boolean>(false);
  const [openModalMenu, setOpenModalMenu] = useState<boolean>(false);

  const handleMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const addBlurScroll = () => {
    if (window.scrollY >= 100) {
      setAddBlur(true);
    } else {
      setAddBlur(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", addBlurScroll);
    return () => {
      window.removeEventListener("scroll", addBlurScroll);
    };
  }, []);

  return (
    <nav
      className={`${
        addBlur ? "drop-shadow-lg backdrop-blur-md" : ""
      } fixed top-4 w-full z-10 transition-all duration-300`}
    >
      <motion.div
        animate={{ y: 0 }}
        initial={{ y: -100 }}
        transition={{ type: "inertia", velocity: 120 }}
        className="container"
      >
        <div className="flex rounded-4xl justify-end items-center px-0 py-4 gap-4 sm:px-6 lg:py-8 lg:gap-10">
          <div className="mr-auto">
            <a href="#home">
              {theme === "light" ? (
                <img
                  src={LogoTextBlack}
                  alt="ramapdp"
                  className="h-9 lg:h-14 w-auto"
                />
              ) : (
                <img
                  src={LogoTextWhite}
                  alt="ramapdp"
                  className="h-9 lg:h-14 w-auto"
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
          <NavigationMenu className="hidden space-x-6 lg:flex lg:space-x-10">
            <NavigationMenuList className="flex space-x-6">
              {navlinks.map((navlink) => (
                <NavigationMenuItem key={navlink.name}>
                  <NavigationMenuLink
                    href={navlink.href}
                    className="text-base font-medium"
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
      </motion.div>
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
