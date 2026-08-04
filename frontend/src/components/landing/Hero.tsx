"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Hero() {
  return (
    <section className="relative grid min-h-screen grid-cols-[1.1fr_0.9fr] items-center gap-10 overflow-hidden bg-charcoal px-14 pb-20 pt-[150px] max-lg:grid-cols-1 max-md:px-6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 15% 20%, rgba(122,35,64,.35), transparent 55%), radial-gradient(ellipse at 85% 80%, rgba(201,162,87,.08), transparent 50%)",
        }}
      />

      <div className="relative z-10">
        <motion.div initial="hidden" animate="show" custom={0.05} variants={fadeUp} className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
          An AI gifting concierge
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          custom={0.2}
          variants={fadeUp}
          className="mt-5 font-display text-[clamp(42px,5.2vw,74px)] font-normal leading-[1.05] text-warmwhite"
        >
          The right gift
          <br />
          is <em className="italic text-gold-soft">never</em> guessed.
          <br />
          It is understood.
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          custom={0.45}
          variants={fadeUp}
          className="mt-6 max-w-[460px] text-lg leading-relaxed text-cream/80"
        >
          CHARIS listens before it suggests. A private conversation, a handful of
          thoughtful questions, and a shortlist of gifts chosen for the person
          you love — not the algorithm&apos;s inventory.
        </motion.p>

        <motion.div initial="hidden" animate="show" custom={0.7} variants={fadeUp} className="mt-10 flex gap-4">
          <Link
            href="/consultation"
            className="rounded-sm bg-gold px-8 py-4 text-sm font-semibold tracking-wide text-charcoal shadow-[0_8px_30px_-10px_rgba(201,162,87,0.5)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_-10px_rgba(201,162,87,0.65)]"
          >
            Begin your consultation
          </Link>
          <a
            href="#how"
            className="rounded-sm border border-warmwhite/30 px-[1.875rem] py-4 text-sm text-warmwhite transition-colors duration-300 hover:border-gold-soft hover:bg-white/[0.03]"
          >
            See how it works
          </a>
        </motion.div>

        <motion.div initial="hidden" animate="show" custom={0.95} variants={fadeUp} className="mt-16 flex gap-12">
          {[
            ["12,400+", "Consultations held"],
            ["96%", "Would gift again"],
            ["35", "Curated maisons"],
          ].map(([stat, label]) => (
            <div key={label}>
              <b className="block font-display text-3xl font-medium text-gold-soft">{stat}</b>
              <span className="text-xs tracking-wide text-muted">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative flex h-[520px] items-center justify-center max-lg:h-[340px] max-lg:mt-10">
        <FloatingDot className="left-[8%] top-[18%] h-2 w-2" delay={0} />
        <FloatingDot className="left-[20%] bottom-[24%] h-1.5 w-1.5" delay={1} />
        <FloatingDot className="right-[6%] top-[60%] h-1.5 w-1.5 bg-wine" delay={0.5} />

        <motion.div
          initial={{ opacity: 0, rotate: 9, y: 30 }}
          animate={{ opacity: 1, rotate: 4, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-[420px] w-[340px] rounded-sm bg-gradient-to-br from-cream to-warmwhite p-11 text-charcoal shadow-[0_40px_90px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(201,162,87,0.15)]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 1.1, type: "spring", bounce: 0.5 }}
            className="absolute -top-[1.625rem] right-[2.375rem] flex h-[72px] w-[72px] items-center justify-center rounded-full shadow-[0_10px_24px_-6px_rgba(0,0,0,0.5)]"
            style={{ background: "radial-gradient(circle at 35% 30%, #7A2340, #3D0F21 70%)" }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-[30px] w-[30px]">
              <path
                d="M12 2 L14 9 L21 9 L15.5 13 L17.5 20 L12 16 L6.5 20 L8.5 13 L3 9 L10 9 Z"
                fill="#E3CD97"
              />
            </svg>
          </motion.div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted">For Eleanor —</div>
          <h3 className="mt-2.5 font-display text-2xl font-medium italic leading-snug text-burgundy">
            A gift that remembers her, not just the occasion.
          </h3>
          <p className="mt-[1.125rem] text-[13.5px] leading-[1.85] text-[#4A3C38]">
            Thirty years of quiet mornings, one particular shade of amber light,
            and a love of things made slowly. CHARIS suggests a hand-bound
            journal, cased in Florentine leather, with her initials pressed in
            soft gold.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingDot({ className, delay }: { className: string; delay: number }) {
  return (
    <motion.span
      className={`absolute rounded-full bg-gold-soft opacity-50 blur-[1px] ${className}`}
      animate={{ y: [0, -18, 0] }}
      transition={{ duration: 8, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}
