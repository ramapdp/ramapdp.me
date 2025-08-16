import { useEffect, useState, useRef } from "react";
import { motion, animate } from "motion/react";
import { Button } from "components/ui/button";
import DialogForm from "layouts/form-email";
import { Code2, Sparkles, MonitorSmartphone, Rocket } from "lucide-react";
import "./index.css";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiVite, SiReactquery } from "react-icons/si";

type Step = { type: "cmd"; text: string } | { type: "out"; text: string } | { type: "prog"; label: string }; // realistic install progress

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

  // Stack cloud hover/peek control
  const [peek, setPeek] = useState(false);
  useEffect(() => {
    // first-load auto-peek then hide
    setPeek(true);
    const t = setTimeout(() => setPeek(false), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative isolate min-h-[82vh] pt-36 pb-20">
      {/* Global connecting lines */}
      <div aria-hidden className="site-grid pointer-events-none fixed inset-0 -z-10" />

      {/* Background blobs */}
      <motion.div
        style={blob(-0.6)}
        className="pointer-events-none absolute top-1/4 -right-20 size-[520px] rounded-full bg-gradient-to-br from-indigo-400/20 via-purple-400/20 to-pink-400/20 blur-3xl"
      />

      <div className="relative container">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="text-muted-foreground mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs backdrop-blur-md">
              <Sparkles className="size-3.5" />
              Building delightful, fast web experiences
            </div>

            <h1 className="text-4xl leading-tight font-extrabold text-balance sm:text-5xl">
              Hi, I'm <span className="underline decoration-wavy decoration-2 underline-offset-4">Rama</span>.
              <br className="hidden sm:block" />A{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 bg-clip-text text-transparent">
                Frontend Engineer
              </span>
            </h1>

            <p className="text-muted-foreground mt-5 max-w-[60ch] text-pretty">
              I ship responsive UIs, accessible components, and smooth interactions using React, TypeScript, and
              Tailwind—optimized for speed and maintainability.
            </p>

            {/* Tech stack badges (kept here for reference; di-animate di visual right) */}
            <div className="mt-6 hidden flex-wrap gap-2 md:flex">
              <StackBadge icon={<Code2 className="size-3.5" />} label="React" />
              <StackBadge icon={<Code2 className="size-3.5" />} label="TypeScript" />
              <StackBadge icon={<Code2 className="size-3.5" />} label="Tailwind CSS" />
              <StackBadge icon={<MonitorSmartphone className="size-3.5" />} label="Vite" />
              <StackBadge icon={<Rocket className="size-3.5" />} label="Motion/Firebase/etc." />
            </div>

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
          <div
            className="group/visual relative hidden md:col-span-5 md:block"
            onMouseEnter={() => setPeek(true)}
            onMouseLeave={() => setPeek(false)}
          >
            {/* light blob */}
            <motion.div
              style={blob(0.8)}
              className="absolute -top-6 -right-6 size-24 rounded-full bg-gradient-to-tr from-white/10 to-white/0 shadow-2xl backdrop-blur-xl dark:from-black/20"
            />

            {/* Container for card and icons */}
            <div className="relative flex flex-col items-center">
              {/* card with shift animation */}
              <motion.div
                style={blob(0.5)}
                className="bg-card/60 relative z-10 rounded-2xl border p-4 shadow-xl backdrop-blur-md"
              >
                <TerminalTyping isHovered={peek} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function TerminalTyping({ isHovered }: { isHovered: boolean }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const script: Step[] = [
    { type: "cmd", text: "npx create-next-app@latest dashboard --ts --tailwind --eslint" },
    { type: "out", text: "✔ Using TypeScript, ESLint, Tailwind CSS" },
    { type: "prog", label: "Installing packages (npm)" },
    { type: "out", text: "✔ Success! Created dashboard" },
    { type: "cmd", text: "cd dashboard && npm run dev" },
    { type: "out", text: "Ready in 0.48s • local: http://localhost:3000" },
    { type: "cmd", text: "npm create vite@latest ui-kit -- --template react-swc-ts" },
    { type: "prog", label: "Installing dependencies (npm)" },
    { type: "cmd", text: 'git init && git add -A && git commit -m "chore: init"' },
    { type: "out", text: "[main (root-commit) a1b2c3d] chore: init" },
  ];

  const prefersReduced = usePrefersReducedMotion();
  const [lines, setLines] = useState<{ type: "cmd" | "out"; text: string }[]>([]);
  const [i, setI] = useState(0);
  const [sub, setSub] = useState(0);
  const [install, setInstall] = useState<{ active: boolean; p: number; frame: number; label: string } | null>(null);
  const speed = prefersReduced ? 0 : 16;

  const containerRef = useRef<HTMLDivElement>(null);
  const eyesContainerRef = useRef<HTMLDivElement>(null); // Ref khusus untuk mata
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [eyesClosed, setEyesClosed] = useState(false);

  const hoveredRef = useRef(isHovered);
  useEffect(() => {
    hoveredRef.current = isHovered;
  }, [isHovered]);

  // auto-scroll to bottom when new content
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lines, i, sub, install?.p]);

  // typing + progress orchestrator
  useEffect(() => {
    if (i >= script.length) {
      const t = setTimeout(() => {
        setLines([]);
        setI(0);
        setSub(0);
        setInstall(null);
      }, 2400);
      return () => clearTimeout(t);
    }

    const step = script[i];

    // Handle realistic progress step
    if (step.type === "prog") {
      if (!install?.active) {
        setInstall({ active: true, p: 0, frame: 0, label: step.label });
      }
      const id = setInterval(
        () => {
          setInstall(s => {
            if (!s) return s;
            const inc = Math.max(1, Math.round(Math.random() * 6)); // random-ish pace
            const np = Math.min(100, s.p + inc);
            const nf = (s.frame + 1) % spinnerFrames.length;
            return { ...s, p: np, frame: nf };
          });
        },
        prefersReduced ? 0 : 90,
      );

      return () => clearInterval(id);
    }

    // Normal typing step
    if (sub < step.text.length) {
      const t = setTimeout(() => setSub(s => s + 1), speed);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setLines(prev => [...prev, step]);
      setI(x => x + 1);
      setSub(0);
    }, 220);
    return () => clearTimeout(t);
  }, [i, sub, script, speed, install?.active, prefersReduced]);

  // Transition after progress completes
  useEffect(() => {
    if (!install?.active) return;
    if (install.p < 100) return;

    // finalize install output
    setLines(prev => [
      ...prev,
      { type: "out", text: "⟳ Resolving packages…" },
      { type: "out", text: "⬇ Fetching dependencies…" },
      { type: "out", text: "🔗 Linking…" },
      { type: "out", text: "✔ Installed 182 packages in 4.2s" },
    ]);
    setInstall(null);
    setI(x => x + 1);
    setSub(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [install?.p]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      console.log("Mouse move detected", e.clientX, e.clientY); // Debug 1

      if (!eyesContainerRef.current) {
        console.log("No eyes container ref"); // Debug 2
        return;
      }

      const rect = eyesContainerRef.current.getBoundingClientRect();
      console.log("Eyes container rect:", rect); // Debug 3

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const maxDistance = 4;
      const factor = Math.min(distance / 100, 1);

      const newPos = {
        x: (deltaX / distance) * maxDistance * factor || 0,
        y: (deltaY / distance) * maxDistance * factor || 0,
      };

      console.log("New eye position:", newPos); // Debug 4
      setEyePos(newPos);
    };

    console.log("Adding mouse listener"); // Debug 5
    window.addEventListener("mousemove", onMove);
    return () => {
      console.log("Removing mouse listener"); // Debug 6
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  // Eyes blink effect when not hovered
  useEffect(() => {
    if (isHovered) return;

    const blinkInterval = setInterval(() => {
      setEyesClosed(true);
      setTimeout(() => setEyesClosed(false), 150); // blink duration
    }, 4000); // blink every 4 seconds

    return () => clearInterval(blinkInterval);
  }, [isHovered]);

  // Eyes closed effect when hovered - PERBAIKAN DI SINI
  useEffect(() => {
    setEyesClosed(isHovered);
  }, [isHovered]);

  const current = i < script.length ? script[i] : undefined;

  const renderLine = (l: { type: "cmd" | "out"; text: string }, key: number) => (
    <div key={key} className="text-sm leading-relaxed whitespace-pre-wrap">
      {l.type === "cmd" ? (
        <span className="text-emerald-400 select-none">➜</span>
      ) : (
        <span className="text-muted-foreground/60 select-none">•</span>
      )}{" "}
      <span className={l.type === "cmd" ? "text-emerald-200" : "text-slate-300/85 dark:text-slate-200/80"}>
        {l.text}
      </span>
    </div>
  );

  return (
    <div className="w-[420px] rounded-md border bg-gradient-to-b from-slate-900/70 to-slate-900/40 p-3 text-slate-100 shadow-inner">
      {/* window controls with eyes */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex gap-1">
          <span className="size-2.5 rounded-full bg-red-400/80" />
          <span className="size-2.5 rounded-full bg-amber-400/80" />
          <span className="size-2.5 rounded-full bg-emerald-400/80" />
        </div>

        {/* Eyes dengan kacamata dan mulut */}
        <div ref={eyesContainerRef} className="flex flex-col items-center gap-0.5">
          {/* Mata dan kacamata */}
          <div className="relative flex gap-1">
            {/* Mata kiri */}
            <motion.div
              className="relative size-4 overflow-hidden rounded-full shadow-inner"
              animate={{
                scaleY: eyesClosed ? 0.1 : 1,
                backgroundColor: eyesClosed ? "#1e293b" : "rgba(255, 255, 255, 0.9)",
                borderWidth: eyesClosed ? 0 : 0.5,
                borderColor: eyesClosed ? "transparent" : "rgba(255, 255, 255, 0.9)",
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            >
              <motion.div
                className="absolute size-1.5 rounded-full bg-slate-800"
                style={{
                  top: "50%",
                  left: "50%",
                }}
                animate={{
                  opacity: eyesClosed ? 0 : 1,
                  x: eyePos.x - 3,
                  y: eyePos.y - 3,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
              >
                <div className="absolute top-0.5 left-0.5 size-[1px] rounded-full bg-white/80" />
              </motion.div>
            </motion.div>

            {/* Mata kanan */}
            <motion.div
              className="relative size-4 overflow-hidden rounded-full shadow-inner"
              animate={{
                scaleY: eyesClosed ? 0.1 : 1,
                backgroundColor: eyesClosed ? "#1e293b" : "rgba(255, 255, 255, 0.9)",
                borderWidth: eyesClosed ? 0 : 0.5,
                borderColor: eyesClosed ? "transparent" : "rgba(255, 255, 255, 0.9)",
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            >
              <motion.div
                className="absolute size-1.5 rounded-full bg-gray-800"
                style={{
                  top: "50%",
                  left: "50%",
                }}
                animate={{
                  opacity: eyesClosed ? 0 : 1,
                  x: eyePos.x - 3,
                  y: eyePos.y - 3,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
              >
                <div className="absolute top-0.5 left-0.5 size-[1px] rounded-full bg-white/80" />
              </motion.div>
            </motion.div>

            {/* Frame kacamata */}
          </div>

          {/* Mulut */}
          <motion.div
            className="relative mt-0.5"
            animate={{
              y: isHovered ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Mulut bentuk O saat hover */}
            <motion.div
              className="absolute -top-1.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full border-[0.5px] border-black/80 dark:border-gray-800"
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.5,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            />

            {/* Mulut senyum saat tidak hover */}
            <motion.div
              className="absolute inset-0"
              animate={{
                opacity: isHovered ? 0 : 1,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              {/* Senyum - kurva dengan border */}
              <svg width="8" height="6" viewBox="0 0 8 6" className="absolute -top-1 -translate-x-1/2">
                <path
                  d="M1 1.5 Q4 4.5 7 1.5"
                  className="stroke-black dark:stroke-gray-800"
                  strokeWidth="0.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div ref={containerRef} className="terminal-scroll font-code h-[260px] overflow-hidden rounded bg-black/20 p-3">
        {lines.map(renderLine)}

        {/* If we're in a typing step, show the caret */}
        {current && current.type !== "prog" ? (
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            <span className="text-emerald-400 select-none">{current.type === "cmd" ? "➜" : "•"}</span>{" "}
            <span className={current.type === "cmd" ? "text-emerald-200" : "text-slate-300/85 dark:text-slate-200/80"}>
              {current.text.slice(0, sub)}
            </span>
            <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-emerald-300/80 align-middle" />
          </div>
        ) : null}

        {/* Installing progress (realistic) */}
        {install?.active ? <InstallLine p={install.p} frame={install.frame} label={install.label} /> : null}
      </div>
    </div>
  );
}

const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

function InstallLine({ p, frame, label }: { p: number; frame: number; label: string }) {
  const width = 26;
  const done = Math.round((p / 100) * width);
  const bar = "█".repeat(done) + "░".repeat(Math.max(0, width - done));
  const spin = spinnerFrames[frame % spinnerFrames.length];
  return (
    <div className="font-code mt-1 text-sm leading-relaxed text-slate-200">
      <div className="mb-1 text-slate-300/80">{label}</div>
      <div className="flex items-center gap-2">
        <span className="text-cyan-300">{spin}</span>
        <span className="text-emerald-300">[{bar}]</span>
        <span className="text-slate-300/80 tabular-nums">{String(p).padStart(3, " ")}%</span>
      </div>
      <div className="mt-1 text-xs text-slate-400/80">Resolving • Fetching • Linking • PostInstall</div>
    </div>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const h = () => setReduced(m.matches);
    m.addEventListener?.("change", h);
    return () => m.removeEventListener?.("change", h);
  }, []);
  return reduced;
}

const StackBadge = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <span className="bg-background/60 text-foreground/80 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs backdrop-blur">
    {icon}
    {label}
  </span>
);

// function AnimeStack({ active }: { active: boolean }) {
//   const containerRef = useRef<HTMLDivElement>(null);

//   const count = 14;
//   const particles = Array.from({ length: count }, (_, i) => ({
//     key: i,
//     size: 8 + ((i * 7) % 10),
//     hue: 190 + ((i * 37) % 140),
//   }));

//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;

//     const nodes = el.querySelectorAll<HTMLElement>(".particle");

//     // stop animasi lama
//     nodes.forEach(n => n.getAnimations().forEach(a => a.cancel()));

//     if (active) {
//       // Explosion animation - partikel meledak dengan kekuatan berbeda
//       const intensity = 1.2;
//       const R = 120 + 100 * intensity; // radius ledakan lebih besar
//       const minDur = 1400 / intensity;
//       const maxDur = 3000 / intensity;

//       const explode = () => {
//         // Ledakan awal dengan force yang besar
//         const explosionForce = 180;
//         return Math.round((Math.random() * 2 - 1) * explosionForce);
//       };

//       const rand = () => Math.round((Math.random() * 2 - 1) * R);

//       const ctrls = Array.from(nodes).map((node, idx) => {
//         const durationMs = Math.random() * (maxDur - minDur) + minDur;
//         const explosionDelay = idx * 0.008; // ledakan lebih cepat

//         return animate(
//           node,
//           {
//             x: [0, explode(), rand(), rand()], // mulai dari center, lalu ledak, lalu random
//             y: [0, explode(), rand(), rand()],
//             scale: [0.8, 1.8, 1.2, 0.9 + Math.random() * 0.3], // scale besar saat ledak
//             opacity: [0.3, 1, 0.9, 0.7],
//             rotate: [0, Math.random() * 360, Math.random() * 720], // rotasi saat meledak
//           },
//           {
//             duration: durationMs / 1000,
//             delay: explosionDelay,
//             easing: [0.25, 0.46, 0.45, 0.94], // easing lebih agresif
//             direction: "alternate",
//             repeat: Infinity,
//           },
//         );
//       });

//       return () => {
//         nodes.forEach(n => n.getAnimations().forEach(a => a.cancel()));
//         ctrls.forEach(c => c.cancel?.());
//       };
//     } else {
//       // Stack animation - partikel berkumpul di tengah dan bergerak melingkar
//       const stackRadius = 6; // radius kumpulan partikel lebih kecil
//       const circleRadius = 10; // radius gerakan melingkar

//       const ctrls = Array.from(nodes).map((node, idx) => {
//         // Posisi dalam lingkaran kecil
//         const angle = (idx / count) * Math.PI * 2;
//         const stackX = Math.cos(angle) * stackRadius;
//         const stackY = Math.sin(angle) * stackRadius;

//         // Animasi gerakan melingkar
//         return animate(
//           node,
//           {
//             x: [
//               stackX + Math.cos(0) * circleRadius,
//               stackX + Math.cos(Math.PI * 2) * circleRadius,
//               stackX + Math.cos(0) * circleRadius,
//             ],
//             y: [
//               stackY + Math.sin(0) * circleRadius,
//               stackY + Math.sin(Math.PI * 2) * circleRadius,
//               stackY + Math.sin(0) * circleRadius,
//             ],
//             scale: [0.7, 0.85, 0.7],
//             opacity: [0.8, 1, 0.8],
//             rotate: [0, 180, 360], // rotasi halus saat berkumpul
//           },
//           {
//             duration: 4 + idx * 0.15, // durasi berbeda untuk setiap partikel
//             delay: idx * 0.08,
//             easing: "ease-in-out",
//             repeat: Infinity,
//           },
//         );
//       });

//       return () => {
//         nodes.forEach(n => n.getAnimations().forEach(a => a.cancel()));
//         ctrls.forEach(c => c.cancel?.());
//       };
//     }
//   }, [active]);

//   // Animasi transisi ledakan saat active berubah
//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;

//     const nodes = el.querySelectorAll<HTMLElement>(".particle");

//     if (active) {
//       // EXPLOSION EFFECT - ledakan dramatis
//       Array.from(nodes).forEach((node, idx) => {
//         // Efek shockwave
//         animate(
//           node,
//           {
//             scale: [0.5, 2.2, 1.5, 1],
//             opacity: [0.3, 1, 0.9, 1],
//             rotate: [0, Math.random() * 180],
//             filter: [
//               "brightness(1) saturate(1)",
//               "brightness(1.8) saturate(1.5)",
//               "brightness(1.3) saturate(1.2)",
//               "brightness(1) saturate(1)",
//             ],
//           },
//           {
//             duration: 0.8,
//             delay: idx * 0.015, // ledakan berurutan
//             easing: [0.68, -0.55, 0.265, 1.55], // bounce effect
//           },
//         );

//         // Efek ledakan radiasi keluar
//         const explosionAngle = (idx / nodes.length) * Math.PI * 2;
//         const explosionRadius = 60 + Math.random() * 40;
//         const explosionX = Math.cos(explosionAngle) * explosionRadius;
//         const explosionY = Math.sin(explosionAngle) * explosionRadius;

//         animate(
//           node,
//           {
//             x: [0, explosionX * 0.3, explosionX, explosionX * 0.7],
//             y: [0, explosionY * 0.3, explosionY, explosionY * 0.7],
//           },
//           {
//             duration: 0.6,
//             delay: idx * 0.01,
//             easing: [0.25, 0.46, 0.45, 0.94],
//           },
//         );
//       });

//       // Efek flash/glow container
//       animate(
//         el,
//         {
//           filter: [
//             "brightness(1) contrast(1)",
//             "brightness(1.5) contrast(1.3)",
//             "brightness(1.2) contrast(1.1)",
//             "brightness(1) contrast(1)",
//           ],
//         },
//         {
//           duration: 0.4,
//           easing: "ease-out",
//         },
//       );
//     } else {
//       // IMPLOSION EFFECT - kembali ke center dengan efek reverse
//       Array.from(nodes).forEach((node, idx) => {
//         const angle = (idx / nodes.length) * Math.PI * 2;
//         const stackX = Math.cos(angle) * 6;
//         const stackY = Math.sin(angle) * 6;

//         // Efek implosion
//         animate(
//           node,
//           {
//             x: [undefined, stackX * 2, stackX],
//             y: [undefined, stackY * 2, stackY],
//             scale: [undefined, 0.4, 0.8],
//             opacity: [undefined, 0.5, 0.9],
//             rotate: [undefined, -90, 0],
//             filter: ["brightness(1) saturate(1)", "brightness(0.7) saturate(0.8)", "brightness(1) saturate(1)"],
//           },
//           {
//             duration: 1.0,
//             delay: idx * 0.04, // kembali berurutan tapi lebih lambat
//             easing: [0.4, 0, 0.2, 1], // smooth deceleration
//           },
//         );
//       });

//       // Efek dim container
//       animate(
//         el,
//         {
//           filter: ["brightness(1) contrast(1)", "brightness(0.8) contrast(0.9)", "brightness(1) contrast(1)"],
//         },
//         {
//           duration: 0.6,
//           easing: "ease-out",
//         },
//       );
//     }
//   }, [active]);

//   const box = 160 + (active ? 120 : 0); // box lebih besar saat aktif

//   return (
//     <div aria-hidden className="pointer-events-none absolute -top-5 -right-5 z-0" style={{ width: box, height: box }}>
//       <div ref={containerRef} className="relative h-full w-full">
//         {particles.map(p => (
//           <span
//             key={p.key}
//             className="particle"
//             style={{
//               width: p.size,
//               height: p.size,
//               position: "absolute",
//               left: box - p.size - 6,
//               top: 6 + ((p.key * 11) % 18),
//               background: `radial-gradient(circle at 30% 30%, hsl(${p.hue} 90% 70%) 0%, hsl(${p.hue} 90% 55%) 45%, hsla(${p.hue} 90% 45% / .85) 100%)`,
//               borderRadius: 9999,
//               boxShadow: active
//                 ? "0 12px 32px rgba(0,0,0,.4), 0 0 20px hsla(200, 90%, 60%, 0.3)"
//                 : "0 8px 24px rgba(0,0,0,.25)",
//               filter: "saturate(1.15) blur(0.2px)",
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// function FloatingTechIcons({ active }: { active: boolean }) {
//   const containerRef = useRef<HTMLDivElement>(null);

//   const techStack = [
//     { icon: SiReact, color: "hsl(193, 95%, 68%)", name: "React" },
//     { icon: SiNextdotjs, color: "hsl(0, 0%, 0%)", name: "Next.js" },
//     { icon: SiTypescript, color: "hsl(211, 60%, 55%)", name: "TypeScript" },
//     { icon: SiTailwindcss, color: "hsl(198, 93%, 60%)", name: "Tailwind" },
//     { icon: SiVite, color: "hsl(258, 92%, 67%)", name: "Vite" },
//     { icon: SiReactquery, color: "hsl(348, 83%, 47%)", name: "React Query" },
//   ];

//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;

//     const icons = el.querySelectorAll<HTMLElement>(".tech-icon");

//     // Cancel previous animations
//     icons.forEach(icon => icon.getAnimations().forEach(a => a.cancel()));

//     if (active) {
//       // Show and animate icons from below
//       Array.from(icons).forEach((icon, idx) => {
//         // Initial appear animation from bottom
//         animate(
//           icon,
//           {
//             opacity: [0, 1],
//             scale: [0.3, 1.1, 1],
//             y: [40, 10, 0], // slide up from below
//           },
//           {
//             duration: 0.7,
//             delay: idx * 0.08,
//             easing: [0.68, -0.55, 0.265, 1.55],
//           },
//         );

//         // Floating animation
//         setTimeout(
//           () => {
//             animate(
//               icon,
//               {
//                 y: [-6, 6, -6],
//                 x: [-3, 3, -3],
//                 rotate: [-1, 1, -1],
//               },
//               {
//                 duration: 2.5 + idx * 0.3,
//                 repeat: Infinity,
//                 easing: "ease-in-out",
//               },
//             );
//           },
//           700 + idx * 80,
//         );

//         // Enhanced glow pulse with brand colors
//         animate(
//           icon,
//           {
//             filter: [
//               `drop-shadow(0 0 6px ${techStack[idx].color}30)`,
//               `drop-shadow(0 0 12px ${techStack[idx].color}60)`,
//               `drop-shadow(0 0 6px ${techStack[idx].color}30)`,
//             ],
//           },
//           {
//             duration: 2,
//             delay: idx * 0.2,
//             repeat: Infinity,
//             easing: "ease-in-out",
//           },
//         );
//       });
//     } else {
//       // Hide icons by sliding down
//       Array.from(icons).forEach((icon, idx) => {
//         animate(
//           icon,
//           {
//             opacity: [undefined, 0],
//             scale: [undefined, 0.2],
//             y: [undefined, 30], // slide down
//             rotate: [undefined, Math.random() > 0.5 ? 90 : -90],
//           },
//           {
//             duration: 0.5,
//             delay: idx * 0.04,
//             easing: [0.4, 0, 1, 1],
//           },
//         );
//       });
//     }

//     return () => {
//       icons.forEach(icon => icon.getAnimations().forEach(a => a.cancel()));
//     };
//   }, [active]);

//   return (
//     <motion.div
//       aria-hidden
//       className="pointer-events-none relative mt-4 flex justify-center"
//       style={{ width: 300, height: 120 }}
//       initial={{ height: 0 }}
//       animate={{
//         height: active ? 120 : 0,
//       }}
//       transition={{
//         type: "spring",
//         stiffness: 300,
//         damping: 30,
//       }}
//     >
//       <div ref={containerRef} className="relative h-full w-full">
//         {techStack.map((tech, idx) => {
//           // Arrange icons in two rows
//           const isTopRow = idx < 3;
//           const posInRow = idx % 3;

//           const x = 75 + posInRow * 75; // 75px spacing between icons
//           const y = isTopRow ? 20 : 70; // top row at 20px, bottom row at 70px

//           return (
//             <div
//               key={tech.name}
//               className="tech-icon absolute flex items-center justify-center"
//               style={{
//                 left: x - 20,
//                 top: y - 20,
//                 width: 40,
//                 height: 40,
//                 opacity: 0,
//               }}
//             >
//               <div
//                 className="bg-background/90 flex h-9 w-9 items-center justify-center rounded-xl border shadow-lg backdrop-blur-sm transition-transform hover:scale-105"
//                 style={{
//                   borderColor: tech.color + "40",
//                   backgroundColor: tech.color + "15",
//                 }}
//               >
//                 <tech.icon className="h-5 w-5" style={{ color: tech.color }} />
//               </div>

//               {/* Tooltip */}
//               <div
//                 className="bg-background/90 text-foreground pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 transform rounded-md border px-2 py-1 text-xs opacity-0 shadow-sm backdrop-blur-sm transition-opacity"
//                 style={{
//                   opacity: active ? 0.8 : 0,
//                   transitionDelay: `${idx * 100 + 800}ms`,
//                 }}
//               >
//                 {tech.name}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </motion.div>
//   );
// }

export default Hero;
