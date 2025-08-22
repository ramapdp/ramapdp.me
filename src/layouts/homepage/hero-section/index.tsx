import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "components/ui/button";
import DialogForm from "layouts/form-email";
import "./index.css";
import Lanyard from "components/lanyard";
import { Sparkles } from "lucide-react";

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
    <section className="relative isolate flex min-h-screen items-center">
      {/* Global connecting lines */}
      <div aria-hidden className="site-grid pointer-events-none fixed inset-0 -z-10" />

      {/* Background blobs */}
      <motion.div
        style={blob(-0.6)}
        className="pointer-events-none absolute top-[280px] -right-3 size-[200px] rounded-full bg-gradient-to-br from-indigo-400/20 via-purple-400/20 to-pink-400/20 blur-3xl"
      />

      <div className="relative container">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="text-muted-foreground mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs backdrop-blur-md">
              <Sparkles className="size-3.5" />
              Building delightful, fast web experiences
            </div>

            <h1 className="font-rethink-sans text-7xl leading-tight font-bold text-balance whitespace-nowrap sm:text-7xl">
              I'm Rama.
              {/* <br className="hidden sm:block" />A{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 bg-clip-text text-transparent">
                Frontend Engineer
              </span> */}
            </h1>

            <p className="text-muted-foreground mt-5 max-w-[60ch] text-pretty">
              I ship responsive UIs, accessible components, and smooth interactions using React, TypeScript, and
              Tailwind—optimized for speed and maintainability.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <DialogForm />
              <Button asChild variant="outline" className="cursor-pointer">
                <a href="/resume.pdf" target="_blank" rel="noreferrer">
                  Check Resume
                </a>
              </Button>
            </div>

            {/* Socials */}
            <div className="text-muted-foreground mt-5 flex flex-wrap gap-4 text-sm">
              <a className="hover:underline" href="https://linkedin.com" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <span>•</span>
              <a className="hover:underline" href="https://github.com" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <span>•</span>
              <a className="hover:underline" href="https://x.com" target="_blank" rel="noreferrer">
                Twitter / X
              </a>
            </div>
          </div>

          {/* Visual/right */}
          <div className="group/visual relative -mt-10 hidden md:col-span-5 md:block">
            <Lanyard position={[0, 0, 16]} gravity={[0, -40, 0]} fov={18} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
