export const NAVBAR_STYLES = {
  active: "text-gray-900 dark:text-white",
  inactive:
    "text-gray-700 hover:bg-white/60 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800/60 dark:hover:text-white",
  container: "relative flex gap-1",
  link: "navbar-link relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
  indicator: "absolute top-0 bottom-0 z-0 rounded-full bg-white/90 shadow-md backdrop-blur-sm dark:bg-gray-900/90",
} as const;

export const ANIMATION_CONFIG = {
  indicator: {
    opacity: { duration: 0.3 },
    scale: { duration: 0.3 },
    spring: { type: "spring", stiffness: 400, damping: 30 },
  },
  theme: {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1] as const,
  },
} as const;
