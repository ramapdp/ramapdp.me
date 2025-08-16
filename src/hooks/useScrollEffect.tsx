import { useEffect } from "react";

export const useScrollEffect = () => {
  useEffect(() => {
    const updateGridMask = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Detect footer element
      const footerElement = document.querySelector("#main-footer");
      let footerOffsetTop = documentHeight;

      if (footerElement) {
        footerOffsetTop = footerElement.offsetTop;
      }

      // Calculate distances
      const distanceToFooter = footerOffsetTop - (scrollTop + windowHeight);
      const isNearFooter = distanceToFooter <= 100; // Mulai fade 150px sebelum footer terlihat
      const isAtTop = scrollTop <= 70; // Fade di top 100px pertama

      let fadeTop = 0;
      let fadeBottom = 100;

      // Fade di bagian atas hanya saat di scroll paling atas
      if (isAtTop) {
        const fadeProgress = (100 - scrollTop) / 100; // 1 saat scrollTop=0, 0 saat scrollTop=100
        fadeTop = Math.max(0, fadeProgress * 8); // Fade dari 8% ke 0%
      }

      // Fade di bagian bawah hanya saat mendekati footer
      if (isNearFooter) {
        const fadeProgress = Math.max(0, (150 - distanceToFooter) / 150); // 0 saat jauh, 1 saat dekat
        fadeBottom = Math.max(85, 100 - fadeProgress * 15); // Fade dari 100% ke 85%
      }

      const maskImage = `linear-gradient(
        to bottom,
        transparent 0%,
        black ${fadeTop}%,
        black ${fadeBottom}%,
        transparent 100%
      )`;

      const gridElement = document.querySelector(".site-grid") as HTMLElement;
      if (gridElement) {
        gridElement.style.webkitMaskImage = maskImage;
        gridElement.style.maskImage = maskImage;
      }
    };

    // Update saat scroll
    window.addEventListener("scroll", updateGridMask, { passive: true });

    // Update saat resize
    window.addEventListener("resize", updateGridMask, { passive: true });

    // Initial update
    updateGridMask();

    return () => {
      window.removeEventListener("scroll", updateGridMask);
      window.removeEventListener("resize", updateGridMask);
    };
  }, []);
};
