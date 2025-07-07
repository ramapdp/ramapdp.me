import { useLocation } from "react-router-dom";
import { navlinks } from "utils/navbar/navMenu";

const NavigationMenu = () => {
  const { pathname } = useLocation();

  const navActiveStyle = "bg-white text-black dark:bg-black dark:text-white shadow-md";
  const navActivePath = navlinks.find(link => link.path === pathname)?.name || "Home";

  return (
    <div className="flex gap-2">
      {navlinks.map(link => (
        <a
          key={link.name}
          href={link.path}
          className={`rounded-full px-4 py-1.5 transition-colors text-sm duration-300 ${
            navActivePath === link.name ? navActiveStyle : "text-gray-500 hover:text-white dark:hover:bg-gray-600"
          }`}
          aria-current={navActivePath === link.name ? "page" : undefined}
          title={link.name}
        >
          {link.name}
        </a>
      ))}
    </div>
  );
};

export default NavigationMenu;
