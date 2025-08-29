import { useState } from "react";
import NavigationMenu from "components/navbar/navigation/NavigationMenu";
import ThemeButton from "components/navbar/button-theme/ThemeButton";
import HamburgerButton from "components/navbar/button-hamburger/HamburgerButton";
import MobileMenu from "components/navbar/mobile-menu/MobileMenu";
import { NavbarContainer } from "components/navbar/NavbarContainer";
import { NavbarSeparator } from "components/common/separator/SeparatorNavbar";
import { useNavigation } from "hooks/useNavigation";
import { useBodyScrollLock } from "hooks/useBodyScrollLock";
import "./index.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentPath, navlinks } = useNavigation();

  useBodyScrollLock(isMobileMenuOpen);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar-container fixed top-4 z-10 w-full">
        <div className="flex w-full items-center justify-center">
          <NavbarContainer>
            {/* Desktop Navigation */}
            <div className="hidden sm:flex sm:items-center sm:gap-3">
              <NavigationMenu />
              <NavbarSeparator />
            </div>

            {/* Theme Button - Always visible */}
            <ThemeButton />

            {/* Mobile Hamburger Menu */}
            <div className="flex items-center gap-1 sm:hidden">
              <NavbarSeparator />
              <HamburgerButton isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
            </div>
          </NavbarContainer>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} navlinks={navlinks} currentPath={currentPath} />
    </>
  );
};

export default Navbar;
