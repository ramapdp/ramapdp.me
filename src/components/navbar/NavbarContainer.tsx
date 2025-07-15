import { cn } from "lib/utils";

interface NavbarContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const NavbarContainer = ({ children, className }: NavbarContainerProps) => (
  <div
    className={cn(
      "container-nav navbar-glassmorphism flex w-fit items-center justify-center gap-3 rounded-full p-1.5 shadow-lg backdrop-blur-md",
      className,
    )}
  >
    {children}
  </div>
);
