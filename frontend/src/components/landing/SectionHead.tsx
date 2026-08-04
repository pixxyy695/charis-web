"use client";

import { motion } from "framer-motion";

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export function SectionHead({ eyebrow, title, subtitle }: SectionHeadProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="mx-auto mb-16 max-w-[640px] text-center"
    >
      <div className="text-xs font-medium uppercase tracking-[0.28em] text-gold">{eyebrow}</div>
      <h2 className="mt-4 font-display text-[clamp(32px,4vw,48px)] font-normal text-warmwhite">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-muted">{subtitle}</p>}
    </motion.div>
  );
}
