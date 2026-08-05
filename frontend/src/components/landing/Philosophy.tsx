"use client";

import { motion, useReducedMotion } from "framer-motion";

const GRAIN_URL =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>";

const QUOTE_WORDS =
  `A gift is a sentence in a longer conversation between two people. CHARIS exists to help you find the right words.`.split(
    " "
  );

const wordVariants = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function WaxSeal() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: -36, scale: 0.6, rotate: -8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={
        reduce
          ? { duration: 0.3 }
          : { type: "spring", stiffness: 260, damping: 16, delay: 1.6 }
      }
      className="relative mx-auto mt-9 h-14 w-14"
    >
      {/* Impact flash on "press" */}
      {!reduce && (
        <motion.span
          aria-hidden
          className="absolute inset-[-10px] rounded-full bg-gold/30 blur-md"
          initial={{ opacity: 0.8, scale: 0.4 }}
          whileInView={{ opacity: 0, scale: 1.6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.75, ease: "easeOut" }}
        />
      )}
      <svg viewBox="0 0 56 56" className="relative h-full w-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.5)]">
        <defs>
          <radialGradient id="wax" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#C9A257" />
            <stop offset="55%" stopColor="#8B6F3F" />
            <stop offset="100%" stopColor="#4A3620" />
          </radialGradient>
        </defs>
        {/* Irregular wax blob edge */}
        <path
          d="M28 2 C40 2 51 8 53 20 C55 32 49 42 39 49 C29 55 16 54 8 45 C1 37 1 24 8 15 C14 7 20 2 28 2 Z"
          fill="url(#wax)"
        />
        <circle cx="28" cy="28" r="17" fill="none" stroke="#2B0A17" strokeWidth="0.75" opacity="0.4" />
        <text
          x="28"
          y="35"
          textAnchor="middle"
          fontFamily="var(--font-display, serif)"
          fontSize="22"
          fill="#2B0A17"
          opacity="0.85"
        >
          C
        </text>
      </svg>
    </motion.div>
  );
}

export function Philosophy() {
  const reduce = useReducedMotion();

  return (
    <section
      id="philosophy"
      className="relative overflow-hidden px-14 py-36 text-center max-md:px-6 max-md:py-24"
      style={{ background: "linear-gradient(140deg, #3D0F21, #2B0A17 70%)" }}
    >
      {/* Paper grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN_URL}")` }}
      />
      {/* Breathing candlelight glow */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[18%] h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(201,162,87,0.16), transparent 70%)" }}
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.4) 100%)" }}
      />

      <div className="relative mx-auto max-w-[780px]">
        {/* Oversized ghost quotation mark, seated behind the text */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 select-none font-display text-[220px] leading-none text-gold/[0.07] max-md:text-[140px]"
        >
          &ldquo;
        </span>

        <motion.blockquote
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={reduce ? { duration: 0.4 } : { staggerChildren: 0.035 }}
          className="relative font-display text-[clamp(26px,3.4vw,40px)] italic leading-[1.5] text-warmwhite"
        >
          &ldquo;
          {QUOTE_WORDS.map((word, i) => (
            <motion.span
              key={i}
              variants={reduce ? undefined : wordVariants}
              initial={reduce ? { opacity: 1 } : undefined}
              className="inline-block"
            >
              {word}
              {i < QUOTE_WORDS.length - 1 ? "\u00A0" : ""}
            </motion.span>
          ))}
          &rdquo;
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-7 flex items-center justify-center gap-3"
        >
          <motion.span
            aria-hidden
            initial={{ width: 0 }}
            whileInView={{ width: 24 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.15, ease: "easeOut" }}
            className="h-px bg-gold-soft/60"
          />
          <cite className="block text-[13px] font-normal not-italic uppercase tracking-[0.14em] text-gold-soft">
            The CHARIS gifting philosophy
          </cite>
          <motion.span
            aria-hidden
            initial={{ width: 0 }}
            whileInView={{ width: 24 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.15, ease: "easeOut" }}
            className="h-px bg-gold-soft/60"
          />
        </motion.div>

        <WaxSeal />
      </div>
    </section>
  );
}