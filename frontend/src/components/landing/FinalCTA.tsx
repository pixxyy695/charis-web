"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef } from "react";

const GRAIN_URL =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>";

const DUST = [
  { x: "8%", y: "20%", s: 2, d: 9 },
  { x: "18%", y: "70%", s: 1.5, d: 11 },
  { x: "32%", y: "35%", s: 1, d: 8 },
  { x: "82%", y: "60%", s: 2, d: 12 },
  { x: "91%", y: "30%", s: 1, d: 9.5 },
];

function GoldFlourish() {
  const reduce = useReducedMotion();
  return (
    <svg width="180" height="26" viewBox="0 0 180 26" fill="none" aria-hidden className="mt-7">
      <motion.path
        d="M2 13 C 40 2, 64 2, 90 13 C 116 24, 140 24, 178 13"
        stroke="#C9A257"
        strokeWidth="1.25"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={reduce ? { duration: 0 } : { duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: 0.5 }}
      />
    </svg>
  );
}

// Small fleur used at each frame corner — echoes the flourish divider.
function CornerFleur({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={className} aria-hidden>
      <circle cx="9" cy="9" r="2" fill="#C9A257" />
      <path d="M9 2 V6 M9 12 V16 M2 9 H6 M12 9 H16" stroke="#C9A257" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/**
 * A generated "old master" still life — a wrapped gift under a single
 * raking light, painted with layered gradients + turbulence texture
 * rather than a licensed artwork. Framed in gilt, on a brass plaque.
 */
function PaintingPanel() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 20 });
  const glowX = useTransform(mx, [-0.5, 0.5], ["30%", "70%"]);
  const glowY = useTransform(my, [-0.5, 0.5], ["30%", "70%"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.92, x: 24 }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
      className="relative mx-auto w-full max-w-[360px]"
    >
      {/* Ambient wall glow, like a gallery spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-10 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(201,162,87,0.25), transparent 70%)" }}
      />

      <motion.div
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* Outer hairline */}
        <div className="relative rounded-[2px] border border-gold/25 p-[3px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]">
          {/* Gilt molding */}
          <div
            className="relative rounded-[1px] p-3"
            style={{
              background: "linear-gradient(135deg,#8B6F3F 0%,#E4C888 25%,#8B6F3F 50%,#E4C888 75%,#8B6F3F 100%)",
            }}
          >
            <CornerFleur className="absolute -left-1 -top-1" />
            <CornerFleur className="absolute -right-1 -top-1" />
            <CornerFleur className="absolute -bottom-1 -left-1" />
            <CornerFleur className="absolute -bottom-1 -right-1" />

            {/* Inner bevel */}
            <div className="rounded-[1px] border border-black/40 p-[2px]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1px] bg-[#0F0B0C]">
                <svg viewBox="0 0 400 500" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <radialGradient id="light" cx="30%" cy="18%" r="75%">
                      <stop offset="0%" stopColor="#E8CE9A" stopOpacity="0.55" />
                      <stop offset="45%" stopColor="#8B6F3F" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="cloth" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#241A1C" />
                      <stop offset="55%" stopColor="#140E10" />
                      <stop offset="100%" stopColor="#0A0708" />
                    </linearGradient>
                    <linearGradient id="box" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#B98A3F" />
                      <stop offset="100%" stopColor="#5E4322" />
                    </linearGradient>
                    <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#E4C888" />
                      <stop offset="100%" stopColor="#9C7A3E" />
                    </linearGradient>
                    <filter id="canvasWeave">
                      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
                      <feColorMatrix in="n" type="saturate" values="0" />
                    </filter>
                    <filter id="brush">
                      <feTurbulence type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="3" result="w" />
                      <feDisplacementMap in="SourceGraphic" in2="w" scale="14" />
                    </filter>
                  </defs>

                  {/* Background drape */}
                  <rect width="400" height="500" fill="url(#cloth)" filter="url(#brush)" />

                  {/* Table line */}
                  <rect x="0" y="370" width="400" height="130" fill="#0A0706" opacity="0.9" filter="url(#brush)" />

                  {/* Gift box, lit from upper-left like a Dutch still life */}
                  <g filter="url(#brush)">
                    <rect x="130" y="230" width="150" height="140" fill="url(#box)" />
                    <rect x="130" y="230" width="150" height="140" fill="url(#light)" />
                    {/* ribbon */}
                    <rect x="192" y="230" width="26" height="140" fill="url(#ribbon)" opacity="0.9" />
                    <rect x="130" y="292" width="150" height="26" fill="url(#ribbon)" opacity="0.9" />
                    {/* bow */}
                    <path
                      d="M205 230 C 180 205, 150 205, 155 232 C 158 244, 190 240, 205 230 Z"
                      fill="url(#ribbon)"
                    />
                    <path
                      d="M205 230 C 230 205, 260 205, 255 232 C 252 244, 220 240, 205 230 Z"
                      fill="url(#ribbon)"
                    />
                  </g>

                  {/* Chiaroscuro spotlight over everything */}
                  <rect width="400" height="500" fill="url(#light)" />

                  {/* Canvas weave */}
                  <rect width="400" height="500" filter="url(#canvasWeave)" opacity="0.05" style={{ mixBlendMode: "overlay" }} />

                  {/* Vignette */}
                  <rect
                    width="400"
                    height="500"
                    fill="url(#vignette)"
                  />
                  <radialGradient id="vignette" cx="50%" cy="45%" r="75%">
                    <stop offset="55%" stopColor="black" stopOpacity="0" />
                    <stop offset="100%" stopColor="black" stopOpacity="0.55" />
                  </radialGradient>
                </svg>

                {/* Slow ambient varnish sheen */}
                {!reduce && (
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
                    }}
                    animate={{ backgroundPositionX: ["-40%", "140%"] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Brass plaque */}
        <div className="mx-auto mt-4 w-fit rounded-[2px] border border-gold/30 bg-[#2A2019] px-4 py-1.5 text-center">
          <p className="font-display text-[11px] italic tracking-wide text-gold/80">
            Still Life, with Gift &mdash; CHARIS Collection
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const grainY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-14 py-32 max-md:px-6 max-md:py-20"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(201,162,87,.08), transparent 60%), #1C1518",
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-[-4%] opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN_URL}")`, y: reduce ? 0 : grainY }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)" }}
      />
      {!reduce &&
        DUST.map((d, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="pointer-events-none absolute rounded-full bg-gold/40"
            style={{ left: d.x, top: d.y, width: d.s, height: d.s }}
            animate={{ y: [0, -14, 0], opacity: [0.15, 0.55, 0.15] }}
            transition={{ duration: d.d, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-10">
        {/* Text side */}
        <div className="text-center lg:col-span-7 lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold/70"
          >
            The Art of Giving
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-4 font-display text-[clamp(34px,4.2vw,54px)] font-normal leading-[1.1] text-warmwhite"
          >
            Let&apos;s find the right gift together.
          </motion.h2>

          <div className="lg:mx-0">
            <GoldFlourish />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 flex justify-center lg:justify-start"
          >
            <Link
              href="/consultation"
              className="group relative overflow-hidden rounded-sm bg-gold px-8 py-4 text-sm font-semibold tracking-wide text-charcoal shadow-[0_8px_30px_-10px_rgba(201,162,87,0.5)] transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="relative z-10">Begin your consultation</span>
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
            </Link>
          </motion.div>
        </div>

        {/* Painting side */}
        <div className="lg:col-span-5">
          <PaintingPanel />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative flex items-center justify-between border-t border-white/[0.08] bg-[#1C1518] px-14 py-10 text-[13px] text-muted max-md:flex-col max-md:gap-3 max-md:px-6">
      <span className="group relative font-display text-lg text-warmwhite">
        CHARIS
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold/60 transition-all duration-500 group-hover:w-full" />
      </span>
      <div>&copy; 2026 CHARIS. The art of giving.</div>
    </footer>
  );
}