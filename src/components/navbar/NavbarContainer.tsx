import { cn } from "lib/utils";

interface NavbarContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const NavbarContainer = ({ children, className }: NavbarContainerProps) => (
  <div
    className={cn(
      "navbar-glassmorphism flex items-center justify-center gap-3 rounded-full shadow-lg backdrop-blur-md",
      "w-fit max-w-max min-w-0 px-2 py-1.5 sm:px-3 sm:py-1.5",
      className,
    )}
  >
    {children}
  </div>
);
