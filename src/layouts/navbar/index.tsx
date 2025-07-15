import NavigationMenu from "components/navbar/navigation/NavigationMenu";
import ThemeButton from "components/navbar/button-theme/ThemeButton";
import { NavbarContainer } from "components/navbar/NavbarContainer";
import { NavbarSeparator } from "components/common/separator/SeparatorNavbar";

const Navbar = () => {
  return (
    <nav className="navbar-container fixed top-4 z-10 w-full">
      <NavbarContainer>
        <NavigationMenu />
        <NavbarSeparator />
        <ThemeButton />
      </NavbarContainer>
    </nav>
  );
};

export default Navbar;
