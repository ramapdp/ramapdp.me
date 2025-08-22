import { motion } from "motion/react";

interface ActiveIndicatorProps {
  style: { left: number; width: number };
  isVisible: boolean;
}

const ActiveIndicator = ({ style, isVisible }: ActiveIndicatorProps) => (
  <motion.div
    className="absolute top-0 bottom-0 z-0 rounded-full bg-white/70 shadow-md backdrop-blur-sm dark:bg-gray-900/70"
    style={style}
    initial={{
      opacity: 0,
      scale: 0.8,
      left: style.left,
      width: style.width,
    }}
    animate={{
      opacity: isVisible ? 1 : 0,
      scale: isVisible ? 1 : 0.8,
      left: style.left,
      width: style.width,
    }}
    transition={{
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 },
      left: { type: "spring", stiffness: 400, damping: 30 },
      width: { type: "spring", stiffness: 400, damping: 30 },
    }}
  />
);

export default ActiveIndicator;
