export interface NavLink {
  name: string;
  path: string;
}

export const navlinks: NavLink[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Projects",
    path: "/projects",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  }
];