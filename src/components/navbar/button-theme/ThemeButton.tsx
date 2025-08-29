import { getNextTheme, ThemeIcon } from "components/navbar/button-theme/ThemeIcon";
import { useTheme } from "components/theme-provider";
import { Button } from "components/ui/button";

const ThemeButton: React.FC = () => {
  const { setTheme, actualTheme, isTransitioning } = useTheme();

  return (
    <Button
      variant="ghost"
      className="theme-button h-fit w-fit cursor-pointer overflow-hidden rounded-full p-1 px-1.5 transition-colors duration-200 hover:bg-white/60 sm:p-2 sm:px-3 dark:hover:bg-gray-800/60"
      onClick={() => !isTransitioning && setTheme(getNextTheme(actualTheme))}
      disabled={isTransitioning}
      aria-label={`Switch to ${getNextTheme(actualTheme)} theme.`}
      title={`Switch to ${getNextTheme(actualTheme)} mode`}
    >
      <ThemeIcon theme={actualTheme} />
    </Button>
  );
};

export default ThemeButton;
