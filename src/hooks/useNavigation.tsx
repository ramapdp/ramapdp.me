import { useLocation } from "react-router-dom";
import { navlinks } from "utils/navbar/navMenu";

export const useNavigation = () => {
  const { pathname } = useLocation();
  const currentPath = navlinks.find(link => link.path === pathname)?.name || "Home";
  
  return {
    currentPath,
    navlinks,
    pathname
  };
};