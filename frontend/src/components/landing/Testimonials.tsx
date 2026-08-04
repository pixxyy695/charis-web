"use client";

import { motion } from "framer-motion";
import { SectionHead } from "./SectionHead";

const testimonials = [
  {
    quote: "It felt like talking to someone who actually knew my mother, not a chatbot reading a script.",
    who: "R. Whitfield",
  },
  {
    quote: "I've never received so many compliments on a gift I didn't design myself.",
    who: "M. Adeyemi",
  },
  {
    quote: "The story behind the piece made the gift. My husband still brings it up.",
    who: "S. Laurent",
  },
];

export function Testimonials() {
  return (
    <section className="bg-gradient-to-b from-charcoal to-[#150E10] px-14 py-32 max-md:px-5 max-md:py-20">
      <SectionHead eyebrow="Words from our clients" title="Gifts remembered, not just received" />
      <div className="mx-auto grid max-w-[1100px] grid-cols-3 gap-7 max-md:grid-cols-1">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.who}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="rounded-md border border-white/[0.06] bg-[#221A1D] p-8 transition-colors duration-400 hover:border-gold/30"
          >
            <p className="font-display text-[19px] italic leading-[1.8] text-cream/90">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-5 text-[13px] text-gold-soft">— {t.who}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
