import { IoHome, IoFolder, IoPerson, IoMail } from "react-icons/io5";
import { ComponentType } from "react";

// Define your own icon type
export type IconType = ComponentType<{ className?: string }>;

export interface NavLink {
  name: string;
  path: string;
  icon: IconType;
}

export const navlinks: NavLink[] = [
  {
    name: "Home",
    path: "/",
    icon: IoHome,
  },
  {
    name: "Projects",
    path: "/projects",
    icon: IoFolder,
  },
  {
    name: "About",
    path: "/about",
    icon: IoPerson,
  },
  {
    name: "Contact",
    path: "/contact",
    icon: IoMail,
  },
];
