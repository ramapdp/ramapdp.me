import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

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
  const [modalIsOpen, modalSetItOpen] = useState<boolean>(false);

  console.log(`Current theme: ${theme}`);
  const handleMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    console.log(`Theme changed to: ${theme === "dark" ? "light" : "dark"}`);
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

  const toggleModal = (): void => {
    modalSetItOpen(!modalIsOpen);
  };

  return (
    <nav
      className={`${
        addBlur ? "drop-shadow-lg backdrop-blur-md" : ""
      } fixed top-0 w-full z-[100] transition-all duration-300`}
    >
      <motion.div
        viewport={{ once: true }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="container"
      >
        <div className="flex bg-red-300 justify-end items-center px-0 py-4 gap-4 sm:px-6 lg:py-8 lg:gap-10">
          <div className="mr-auto">
            <a href="#home">
              {theme === "light" ? (
                <p>Logo untuk Light Mode</p>
              ) : (
                <p>Logo untuk Dark Mode</p>
              )}
            </a>
          </div>
          <div className="-mr-2 -my-2 lg:hidden">
            <Button variant="ghost" className="rounded-md p-2 inline-flex items-center justify-center text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary">
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
          <Button
            variant="ghost"
            onClick={handleMode}
            className="hidden cursor-pointer lg:block"
          >
            {theme === "dark" ? (
              <i className="pi pi-sun h-6 w-6" />
            ) : (
              <i className="pi pi-moon h-6 w-6" />
            )}
          </Button>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
