import { Button } from "components/ui/button";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerButton = ({ isOpen, onClick }: HamburgerButtonProps) => {
  return (
    <Button
      variant="ghost"
      className="hamburger-button h-fit w-fit cursor-pointer overflow-hidden rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 hover:bg-white/60 sm:hidden dark:hover:bg-gray-800/60"
      onClick={onClick}
      aria-label="Toggle navigation menu"
      title="Toggle menu"
    >
      <div className="flex items-center gap-0.5">
        <span className="font-rethink-sans font-normal text-gray-700 dark:text-gray-200">Menu</span>
        {isOpen ? (
          <IoChevronUp className="h-0.5 w-0.5 pt-1 text-gray-700/30 transition-transform duration-200 dark:text-[#ffffff4d]" />
        ) : (
          <IoChevronDown className="h-0.5 w-0.5 pt-1 text-gray-700/30 transition-transform duration-200 dark:text-[#ffffff4d]" />
        )}
      </div>
    </Button>
  );
};

export default HamburgerButton;
