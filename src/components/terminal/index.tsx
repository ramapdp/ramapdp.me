import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

type Step = { type: "cmd"; text: string } | { type: "out"; text: string } | { type: "prog"; label: string }; // realistic install progress

const TerminalTyping = ({ isHovered }: { isHovered: boolean }) => {
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
    <div className="w-[420px] rounded-md border bg-gradient-to-b from-slate-900/70 to-slate-900/50 p-3 text-slate-100 shadow-inner">
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
                borderColor: "transparent",
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
                borderColor: "transparent",
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
                  className="stroke-black dark:stroke-white"
                  strokeWidth="0.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="terminal-scroll font-fira-code h-[260px] overflow-hidden rounded bg-black/20 p-3"
      >
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
};

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
  const [reduced, setReduced] = useState<boolean>(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const h = () => setReduced(m.matches);
    m.addEventListener?.("change", h);
    return () => m.removeEventListener?.("change", h);
  }, []);
  return reduced;
}

export default TerminalTyping;

// sample usage:
{
  /* <div className="relative flex flex-col items-center">
  <motion.div style={blob(0.5)} className="relative z-10 rounded-md shadow-xl backdrop-blur-md">
    <TerminalTyping isHovered={peek} />
  </motion.div>
</div>; */
}
