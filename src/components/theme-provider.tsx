import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: "dark" | "light";
  isTransitioning: boolean;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  actualTheme: "light",
  isTransitioning: false,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme);
  const [actualTheme, setActualTheme] = useState<"dark" | "light">("light");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = (withTransition = false) => {
      const newActualTheme = theme === "system" ? (mediaQuery.matches ? "dark" : "light") : (theme as "dark" | "light");

      if (withTransition && newActualTheme !== actualTheme) {
        setIsTransitioning(true);

        // Add smooth transition styling for everything except theme button
        root.style.setProperty("--navbar-theme-transition-duration", "600ms");
        root.style.setProperty("--navbar-theme-transition-easing", "cubic-bezier(0.4, 0, 0.2, 1)");
        root.classList.add("navbar-theme-transitioning");

        // Apply theme change immediately
        root.classList.remove("light", "dark");
        root.classList.add(newActualTheme);
        setActualTheme(newActualTheme);

        // Clean up transition classes
        setTimeout(() => {
          setIsTransitioning(false);
          root.classList.remove("navbar-theme-transitioning");
          root.style.removeProperty("--navbar-theme-transition-duration");
          root.style.removeProperty("--navbar-theme-transition-easing");
        }, 600);
      } else {
        // Initial setup without animation
        root.classList.remove("light", "dark");
        root.classList.add(newActualTheme);
        setActualTheme(newActualTheme);
      }
    };

    // Initial theme setup (no transition)
    updateTheme(false);

    // Listen for system theme changes when theme is "system"
    if (theme === "system") {
      const handleSystemChange = () => updateTheme(true);
      mediaQuery.addEventListener("change", handleSystemChange);
      return () => mediaQuery.removeEventListener("change", handleSystemChange);
    }
  }, [theme, actualTheme]);

  const value = {
    theme,
    actualTheme,
    isTransitioning,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);

      // Calculate what the new actual theme will be
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const newActualTheme =
        newTheme === "system" ? (mediaQuery.matches ? "dark" : "light") : (newTheme as "dark" | "light");

      // Only trigger transition if actual theme will change
      if (newActualTheme !== actualTheme) {
        setIsTransitioning(true);

        const root = window.document.documentElement;
        root.style.setProperty("--navbar-theme-transition-duration", "600ms");
        root.style.setProperty("--navbar-theme-transition-easing", "cubic-bezier(0.4, 0, 0.2, 1)");
        root.classList.add("navbar-theme-transitioning");

        // Change theme immediately
        setTheme(newTheme);

        // End transition state after animation completes
        setTimeout(() => {
          setIsTransitioning(false);
          root.classList.remove("navbar-theme-transitioning");
          root.style.removeProperty("--navbar-theme-transition-duration");
          root.style.removeProperty("--navbar-theme-transition-easing");
        }, 600);
      } else {
        // No visual change needed, just update theme preference
        setTheme(newTheme);
      }
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
