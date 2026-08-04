"use client";

import { motion } from "framer-motion";

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="bg-gradient-to-[140deg] from-burgundy to-burgundy-dark px-14 py-36 text-center max-md:px-6 max-md:py-24"
      style={{ background: "linear-gradient(140deg, #3D0F21, #2B0A17 70%)" }}
    >
      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-[780px] font-display text-[clamp(26px,3.4vw,40px)] italic leading-[1.5] text-warmwhite"
      >
        &ldquo;A gift is a sentence in a longer conversation between two
        people. CHARIS exists to help you find the right words.&rdquo;
      </motion.blockquote>
      <cite className="mt-7 block text-[13px] font-normal not-italic uppercase tracking-[0.14em] text-gold-soft">
        The CHARIS gifting philosophy
      </cite>
    </section>
  );
}
