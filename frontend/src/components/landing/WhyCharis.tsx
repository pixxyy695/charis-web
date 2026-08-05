"use client";

import { motion, useReducedMotion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHead } from "./SectionHead";

const GRAIN_URL =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>";

const reasons = [
  {
    numeral: "I.",
    title: "Conversation, not catalogue",
    body: "No filters, no endless scroll. A concierge that asks one considered question at a time, the way a trusted friend would.",
  },
  {
    numeral: "II.",
    title: "Meaning over merchandise",
    body: "Every recommendation carries a reason — a story, a symbolic thread connecting the object to the person receiving it.",
  },
  {
    numeral: "III.",
    title: "Curated, never crowded",
    body: "Thirty-five maisons, chosen for craftsmanship. Not thirty-five thousand products chosen for margin.",
  },
];

function Numeral({ text, delay }: { text: string; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative inline-block overflow-hidden">
      <motion.span
        initial={{ x: "-100%" }}
        whileInView={{ x: "0%" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={reduce ? { duration: 0 } : { duration: 0.7, delay, ease: [0.65, 0, 0.35, 1] }}
        className="block font-display italic text-[15px] text-gold"
      >
        {text}
      </motion.span>
    </span>
  );
}

function ReasonCard({ r, i }: { r: (typeof reasons)[number]; i: number }) {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spotlight = useTransform([mx, my], ([mxV, myV]: number[]) =>
    `radial-gradient(420px circle at ${mxV * 100}% ${myV * 100}%, rgba(201,162,87,0.10), transparent 70%)`
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: i * 0.12 }}
      className="group relative overflow-hidden bg-charcoal px-[2.125rem] py-11 transition-colors duration-500 hover:bg-[#241A1E]"
    >
      {/* Cursor-tracked candlelight spotlight */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
      )}

      {/* Chisel line — draws in top-to-bottom of the card on scroll */}
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: i * 0.12 + 0.15, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
        className="absolute left-0 top-0 h-px w-full bg-gold/40"
      />

      <div className="relative">
        <Numeral text={r.numeral} delay={i * 0.12 + 0.05} />

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: i * 0.12 + 0.2 }}
          className="mt-3.5 font-display text-2xl font-medium text-warmwhite"
        >
          {r.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: i * 0.12 + 0.3 }}
          className="mt-2.5 text-[14.5px] leading-relaxed text-muted transition-colors duration-500 group-hover:text-warmwhite/75"
        >
          {r.body}
        </motion.p>
      </div>
    </motion.div>
  );
}

export function WhyCharis() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-charcoal to-[#150E10] px-14 py-32 max-md:px-5 max-md:py-20"
    >
      {/* Faint stone-like grain across the whole section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN_URL}")` }}
      />

      <div className="relative">
        <SectionHead
          eyebrow="Why CHARIS"
          title="Gifting deserves more than a search bar"
          subtitle="Most gift sites ask what you want to buy. CHARIS asks who you're buying for."
        />
        <div className="mx-auto grid max-w-[1100px] grid-cols-3 gap-px overflow-hidden rounded bg-white/[0.06] max-md:grid-cols-1">
          {reasons.map((r, i) => (
            <ReasonCard key={r.title} r={r} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}