"use client";

import { motion } from "framer-motion";
import { SectionHead } from "./SectionHead";

const steps = [
  {
    idx: "01",
    title: "Begin the conversation",
    body: "Tell CHARIS who the gift is for — a name, a relationship, an occasion. Nothing more is required to start.",
  },
  {
    idx: "02",
    title: "Answer a few thoughtful questions",
    body: "CHARIS asks about personality, interests, and the feeling you want the gift to carry — never a long form, always a dialogue.",
  },
  {
    idx: "03",
    title: "Receive a considered shortlist",
    body: "Three to five pieces, each with its story and symbolic meaning, matched to what you've shared.",
  },
  {
    idx: "04",
    title: "Add your own words",
    body: "Write a note yourself, or let CHARIS help you find the right tone — heartfelt, formal, or quietly romantic.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-charcoal px-14 py-32 max-md:px-5 max-md:py-20">
      <SectionHead eyebrow="How it works" title="Four quiet steps to the right gift" />
      <div className="mx-auto flex max-w-[900px] flex-col">
        {steps.map((s, i) => (
          <motion.div
            key={s.idx}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="grid grid-cols-[80px_1fr] gap-7 border-t border-white/[0.08] py-[2.125rem] last:border-b max-md:grid-cols-[48px_1fr]"
          >
            <div className="font-display text-4xl italic text-gold-soft/70">{s.idx}</div>
            <div>
              <h4 className="text-lg text-warmwhite">{s.title}</h4>
              <p className="mt-2 max-w-[520px] text-[14.5px] leading-relaxed text-muted">{s.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
