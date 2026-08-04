"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section
      className="px-14 py-32 text-center max-md:px-6 max-md:py-24"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(201,162,87,.08), transparent 60%), #1C1518",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="font-display text-[clamp(34px,4.6vw,56px)] font-normal text-warmwhite"
      >
        Let&apos;s find the right gift together.
      </motion.h2>
      <div className="mt-10 flex justify-center">
        <Link
          href="/consultation"
          className="rounded-sm bg-gold px-8 py-4 text-sm font-semibold tracking-wide text-charcoal shadow-[0_8px_30px_-10px_rgba(201,162,87,0.5)] transition-transform duration-300 hover:-translate-y-1"
        >
          Begin your consultation
        </Link>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="flex items-center justify-between border-t border-white/[0.08] px-14 py-10 text-[13px] text-muted max-md:flex-col max-md:gap-3 max-md:px-6">
      <div className="font-display text-lg text-warmwhite">CHARIS</div>
      <div>&copy; 2026 CHARIS. The art of giving.</div>
    </footer>
  );
}
