import { createContext, useContext, useEffect, useState, useCallback } from "react";

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
  const [actualTheme, setActualTheme] = useState<"dark" | "light">(() => {
    // Initialize actualTheme immediately to prevent flicker
    const savedTheme = (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    return savedTheme === "system" ? (mediaQuery.matches ? "dark" : "light") : (savedTheme as "dark" | "light");
  });
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const applyTheme = useCallback((newActualTheme: "dark" | "light", withTransition = false) => {
    const root = window.document.documentElement;
    
    if (withTransition && newActualTheme !== actualTheme) {
      setIsTransitioning(true);
      
      // Add transition class only to body and main containers, not navbar
      document.body.classList.add("theme-transitioning");
      
      // Apply theme immediately
      root.classList.remove("light", "dark");
      root.classList.add(newActualTheme);
      setActualTheme(newActualTheme);

      // Clean up transition after animation
      setTimeout(() => {
        setIsTransitioning(false);
        document.body.classList.remove("theme-transitioning");
      }, 300);
    } else {
      // Apply theme without transition
      root.classList.remove("light", "dark");
      root.classList.add(newActualTheme);
      setActualTheme(newActualTheme);
    }
  }, [actualTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const updateTheme = (withTransition = false) => {
      const newActualTheme = theme === "system" ? (mediaQuery.matches ? "dark" : "light") : (theme as "dark" | "light");
      applyTheme(newActualTheme, withTransition);
    };

    // Initial theme setup (no transition)
    updateTheme(false);

    // Listen for system theme changes when theme is "system"
    if (theme === "system") {
      const handleSystemChange = () => updateTheme(true);
      mediaQuery.addEventListener("change", handleSystemChange);
      return () => mediaQuery.removeEventListener("change", handleSystemChange);
    }
  }, [theme, applyTheme]);

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

      // Update theme state immediately
      setTheme(newTheme);
      
      // Apply theme with transition only if actual theme changes
      if (newActualTheme !== actualTheme) {
        applyTheme(newActualTheme, true);
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