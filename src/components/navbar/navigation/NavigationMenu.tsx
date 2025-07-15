import ActiveIndicator from "components/navbar/navigation/ActiveIndicatorMenu";
import { NavigationLinks } from "components/navbar/navigation/NavigationLink";
import { useNavigationIndicator } from "hooks/useNavigationIndicator";
import { useLocation } from "react-router-dom";
import { navlinks } from "utils/navbar/navMenu";

const NavigationMenu = () => {
  const { pathname } = useLocation();
  const currentPath = navlinks.find(link => link.path === pathname)?.name || "Home";

  const { containerRef, linkRefs, indicatorStyle, isInitialized } = useNavigationIndicator(currentPath, navlinks);

  const navActiveStyle = "text-gray-900 dark:text-white";
  const navInactiveStyle =
    "text-gray-700 hover:bg-white/60 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800/60 dark:hover:text-white";

  return (
    <div className="relative flex gap-1" ref={containerRef}>
      <ActiveIndicator style={indicatorStyle} isVisible={isInitialized} />
      <NavigationLinks
        links={navlinks}
        currentPath={currentPath}
        linkRefs={linkRefs}
        activeStyle={navActiveStyle}
        inactiveStyle={navInactiveStyle}
      />
    </div>
  );
};

export default NavigationMenu;
