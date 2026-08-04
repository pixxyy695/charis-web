"use client";

import { motion } from "framer-motion";
import { SectionHead } from "./SectionHead";

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

export function WhyCharis() {
  return (
    <section id="about" className="bg-gradient-to-b from-charcoal to-[#150E10] px-14 py-32 max-md:px-5 max-md:py-20">
      <SectionHead
        eyebrow="Why CHARIS"
        title="Gifting deserves more than a search bar"
        subtitle="Most gift sites ask what you want to buy. CHARIS asks who you're buying for."
      />
      <div className="mx-auto grid max-w-[1100px] grid-cols-3 gap-px overflow-hidden rounded bg-white/[0.06] max-md:grid-cols-1">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="bg-charcoal px-[2.125rem] py-11 transition-colors duration-400 hover:bg-[#241A1E]"
          >
            <div className="font-display italic text-[15px] text-gold">{r.numeral}</div>
            <h3 className="mt-3.5 font-display text-2xl font-medium text-warmwhite">{r.title}</h3>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{r.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
