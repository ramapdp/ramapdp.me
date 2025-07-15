import { Link } from "react-router-dom";
import { cn } from "lib/utils";
import { forwardRef } from "react";
import type { NavLink } from "utils/navbar/navMenu";

interface NavigationLinkProps {
  link: NavLink;
  isActive: boolean;
  activeStyle: string;
  inactiveStyle: string;
}

const NavigationLink = forwardRef<HTMLAnchorElement, NavigationLinkProps>(
  ({ link, isActive, activeStyle, inactiveStyle }, ref) => (
    <Link
      ref={ref}
      to={link.path}
      className={cn(
        "navbar-link relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
        isActive ? activeStyle : inactiveStyle,
      )}
      aria-current={isActive ? "page" : undefined}
      title={link.name}
    >
      {link.name}
    </Link>
  )
);

NavigationLink.displayName = "NavigationLink";

interface NavigationLinksProps {
  links: NavLink[];
  currentPath: string;
  linkRefs: React.MutableRefObject<(HTMLAnchorElement | null)[]>;
  activeStyle: string;
  inactiveStyle: string;
}

const NavigationLinks = ({ links, currentPath, linkRefs, activeStyle, inactiveStyle }: NavigationLinksProps) => (
  <>
    {links.map((link, idx) => (
      <NavigationLink
        key={link.name}
        link={link}
        isActive={currentPath === link.name}
        ref={el => (linkRefs.current[idx] = el)}
        activeStyle={activeStyle}
        inactiveStyle={inactiveStyle}
      />
    ))}
  </>
);

export { NavigationLinks, NavigationLink };