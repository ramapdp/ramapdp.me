import NavigationMenu from "components/navbar/NavigationMenu";
import ThemeButton from "components/navbar/ThemeButton";
import { Separator } from "components/ui/separator";

const Navbar = () => {
  return (
    <nav className="navbar-container fixed top-4 z-10 w-full">
      <div className="container-nav bg-primary flex w-fit items-center justify-center gap-3 rounded-full p-1 shadow-md dark:bg-gray-800">
        <NavigationMenu />
        <Separator orientation="vertical" className="bg-border h-6 w-px opacity-50" />
        <ThemeButton />
      </div>
    </nav>
  );
};

export default Navbar;
