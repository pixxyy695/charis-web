"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Fine canvas-grain texture, generated at build time — no external asset needed.
const GRAIN_URL =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>";

const DUST = [
  { x: "8%", y: "20%", s: 2, d: 9 },
  { x: "18%", y: "70%", s: 1.5, d: 11 },
  { x: "32%", y: "35%", s: 1, d: 8 },
  { x: "68%", y: "22%", s: 1.5, d: 10 },
  { x: "82%", y: "60%", s: 2, d: 12 },
  { x: "91%", y: "30%", s: 1, d: 9.5 },
  { x: "50%", y: "80%", s: 1, d: 10.5 },
];

function GoldFlourish() {
  const reduce = useReducedMotion();
  return (
    <svg
      width="220"
      height="30"
      viewBox="0 0 220 30"
      fill="none"
      aria-hidden
      className="mx-auto mt-8 mb-2"
    >
      <motion.path
        d="M4 15 C 52 2, 80 2, 110 15 C 140 28, 168 28, 216 15"
        stroke="#C9A257"
        strokeWidth="1.25"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={
          reduce ? { duration: 0 } : { duration: 1.3, ease: [0.65, 0, 0.35, 1], delay: 0.5 }
        }
      />
      <motion.circle
        cx="110"
        cy="15"
        r="2.5"
        fill="#C9A257"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: reduce ? 0 : 1.5, duration: 0.4 }}
      />
    </svg>
  );
}

function CornerBrackets() {
  const base =
    "absolute h-6 w-6 border-gold/30 max-md:h-4 max-md:w-4";
  return (
    <>
      <span className={`${base} left-6 top-6 border-l border-t max-md:left-3 max-md:top-3`} />
      <span className={`${base} right-6 top-6 border-r border-t max-md:right-3 max-md:top-3`} />
      <span className={`${base} bottom-6 left-6 border-b border-l max-md:bottom-3 max-md:left-3`} />
      <span className={`${base} bottom-6 right-6 border-b border-r max-md:bottom-3 max-md:right-3`} />
    </>
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
      className="relative overflow-hidden px-14 py-32 text-center max-md:px-6 max-md:py-24"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(201,162,87,.08), transparent 60%), #1C1518",
      }}
    >
      {/* Canvas grain / patina layer — drifts slowly on scroll */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-[-4%] opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN_URL}")`, y: reduce ? 0 : grainY }}
      />
      {/* Vignette, like aged varnish at the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)",
        }}
      />
      {/* Drifting dust motes, like light through a gallery window */}
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

      <CornerBrackets />

      <div className="relative">
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
          className="mt-4 font-display text-[clamp(34px,4.6vw,56px)] font-normal text-warmwhite"
        >
          Let&apos;s find the right gift together.
        </motion.h2>

        <GoldFlourish />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 flex justify-center"
        >
          <Link
            href="/consultation"
            className="group relative overflow-hidden rounded-sm bg-gold px-8 py-4 text-sm font-semibold tracking-wide text-charcoal shadow-[0_8px_30px_-10px_rgba(201,162,87,0.5)] transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="relative z-10">Begin your consultation</span>
            {/* Shimmer sweep, like light catching gold leaf */}
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
          </Link>
        </motion.div>
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