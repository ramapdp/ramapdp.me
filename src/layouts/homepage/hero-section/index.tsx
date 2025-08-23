import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Lanyard from "components/hero-section/lanyard";
import HeroInfo from "components/hero-section/HeroInfo";

const Hero = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setPos({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const blob = (mult = 1) => ({
    transform: `translate(${pos.x * 12 * mult}px, ${pos.y * 12 * mult}px)`,
  });

  return (
    <section className="relative isolate flex h-screen items-center">
      {/* Global connecting lines */}
      <div aria-hidden className="site-grid pointer-events-none fixed inset-0 -z-10 hidden sm:block" />

      {/* Background blobs */}
      <motion.div
        style={blob(-0.6)}
        className="pointer-events-none absolute top-[150px] -right-3 size-[300px] rounded-full bg-gradient-to-br from-orange-300/15 via-red-500/10 to-pink-500/10 blur-3xl md:size-[400px] lg:size-[500px]"
      />

      {/* Hero Info */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:z-auto md:px-8 lg:px-0">
        <HeroInfo />
      </div>

      {/* Lanyard */}
      <div className="pointer-events-none absolute inset-0 -z-5 w-full md:z-5">
        <div className="pointer-events-auto">
          <Lanyard position={[0, 0, 16]} gravity={[0, -40, 0]} />
        </div>
        <div className="bg-background/30 pointer-events-none absolute inset-0 w-full backdrop-blur-xs md:hidden" />
      </div>
    </section>
  );
};

export default Hero;
