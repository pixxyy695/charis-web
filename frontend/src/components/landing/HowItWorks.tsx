"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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

function StepRow({ step, i }: { step: (typeof steps)[number]; i: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className="group relative grid grid-cols-[80px_1fr] gap-7 border-t border-white/[0.08] py-[2.125rem] transition-colors duration-500 last:border-b hover:bg-gold/[0.02] max-md:grid-cols-[48px_1fr]"
    >
      {/* Thread node — lights up as this row enters view */}
      <motion.span
        aria-hidden
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: i * 0.1 + 0.25 }}
        className="absolute left-10 top-1/2 z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_8px_2px_rgba(201,162,87,0.5)] max-md:left-6"
      />

      <motion.div
        initial={{ opacity: 0, rotateX: reduce ? 0 : -70 }}
        whileInView={{ opacity: 1, rotateX: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, delay: i * 0.1 + 0.05, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 400, transformOrigin: "top" }}
        className="font-display text-4xl italic text-gold-soft/70 transition-colors duration-500 group-hover:text-gold-soft"
      >
        {step.idx}
      </motion.div>

      <div>
        <h4 className="relative inline-block text-lg text-warmwhite">
          {step.title}
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold/50 transition-all duration-500 group-hover:w-full" />
        </h4>
        <p className="mt-2 max-w-[520px] text-[14.5px] leading-relaxed text-muted transition-colors duration-500 group-hover:text-warmwhite/80">
          {step.body}
        </p>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 65%", "end 45%"],
  });
  const threadScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="how" className="bg-charcoal px-14 py-32 max-md:px-5 max-md:py-20">
      <SectionHead eyebrow="How it works" title="Four quiet steps to the right gift" />

      <div ref={listRef} className="relative mx-auto flex max-w-[900px] flex-col">
        {/* Base thread — always faintly present */}
        <div
          aria-hidden
          className="absolute left-10 top-0 bottom-0 w-px bg-white/[0.08] max-md:left-6"
        />
        {/* Gold thread — draws down as you scroll through the steps */}
        <motion.div
          aria-hidden
          style={{ scaleY: reduce ? 1 : threadScale, transformOrigin: "top" }}
          className="absolute left-10 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold to-gold/40 max-md:left-6"
        />

        {steps.map((s, i) => (
          <StepRow key={s.idx} step={s} i={i} />
        ))}
      </div>
    </section>
  );
}