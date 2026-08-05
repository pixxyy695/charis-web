"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHead } from "./SectionHead";

const GRAIN_URL =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>";

const testimonials = [
  {
    quote: "It felt like talking to someone who actually knew my mother, not a chatbot reading a script.",
    who: "R. Whitfield",
    tilt: -2.2,
  },
  {
    quote: "I've never received so many compliments on a gift I didn't design myself.",
    who: "M. Adeyemi",
    tilt: 1.6,
  },
  {
    quote: "The story behind the piece made the gift. My husband still brings it up.",
    who: "S. Laurent",
    tilt: -1.4,
  },
];

function Tack() {
  return (
    <span className="absolute left-1/2 top-0 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-gold-soft to-[#8B6F3F] shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
  );
}

function TestimonialCard({ t, i }: { t: (typeof testimonials)[number]; i: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: reduce ? 0 : t.tilt }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { rotate: 0, y: -8, scale: 1.015 }}
      style={{ transformOrigin: "top center" }}
      className="group relative rounded-[1px] border border-white/[0.06] bg-[#221A1D] p-8 pt-10 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow] duration-400 hover:border-gold/30 hover:shadow-[0_20px_40px_-14px_rgba(0,0,0,0.65)]"
    >
      {/* Paper grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[1px] opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN_URL}")` }}
      />
      <Tack />

      {/* Faint oversized quote mark, echoing the letter motif without repeating Philosophy's exact size/placement */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-5 top-3 select-none font-display text-6xl leading-none text-gold/[0.06]"
      >
        &rdquo;
      </span>

      <p className="relative font-display text-[19px] italic leading-[1.8] text-cream/90">
        &ldquo;{t.quote}&rdquo;
      </p>

      <div className="relative mt-5 flex items-center gap-2 text-[13px] text-gold-soft">
        <motion.span
          aria-hidden
          initial={{ width: 0 }}
          whileInView={{ width: 14 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: i * 0.12 + 0.3 }}
          className="h-px bg-gold-soft/60"
        />
        {t.who}
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-charcoal to-[#150E10] px-14 py-32 max-md:px-5 max-md:py-20">
      <SectionHead eyebrow="Words from our clients" title="Gifts remembered, not just received" />
      <div className="mx-auto grid max-w-[1100px] grid-cols-3 gap-x-7 gap-y-10 max-md:grid-cols-1">
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.who} t={t} i={i} />
        ))}
      </div>
    </section>
  );
}