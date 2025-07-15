import { useRef, useLayoutEffect, useState, useEffect } from "react";
import type { NavLink } from "utils/navbar/navMenu";

export const useNavigationIndicator = (currentPath: string, navlinks: NavLink[]) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const updateIndicatorStyle = () => {
    const idx = navlinks.findIndex(link => link.name === currentPath);
    const linkEl = linkRefs.current[idx];
    const containerEl = containerRef.current;

    if (linkEl && containerEl) {
      const linkRect = linkEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();
      setIndicatorStyle({
        left: linkRect.left - containerRect.left,
        width: linkRect.width,
      });
      setIsInitialized(true);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!isMounted) return;
    
    const attempts = [0, 10, 50, 100];
    const timeouts: NodeJS.Timeout[] = [];
    
    attempts.forEach(delay => {
      const timeout = setTimeout(() => {
        updateIndicatorStyle();
      }, delay);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [currentPath, isMounted, navlinks]);

  useEffect(() => {
    if (!isInitialized && isMounted) {
      const timer = setTimeout(updateIndicatorStyle, 200);
      return () => clearTimeout(timer);
    }
  }, [isInitialized, currentPath, isMounted]);

  useEffect(() => {
    const handleResize = () => {
      if (isInitialized) {
        updateIndicatorStyle();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isInitialized, currentPath]);

  return {
    containerRef,
    linkRefs,
    indicatorStyle,
    isInitialized
  };
};