"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SectionHead } from "./SectionHead";

const faqs = [
  {
    q: "How long does a consultation take?",
    a: "Most conversations take three to five minutes — a handful of questions, answered at your own pace.",
  },
  {
    q: "Are the products real, purchasable items?",
    a: "This prototype uses a curated set of illustrative luxury pieces to demonstrate the recommendation experience.",
  },
  {
    q: "Can I save gifts for later?",
    a: "Yes. Every recommendation can be saved to your dashboard and revisited any time.",
  },
];

function PlusMinus({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-4 w-4 items-center justify-center">
      <motion.span
        className="absolute h-px w-3.5 bg-gold"
        animate={{ rotate: open ? 90 : 0, opacity: open ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute h-px w-3.5 bg-gold"
        animate={{ rotate: 0 }}
        transition={{ duration: 0.3 }}
      />
    </span>
  );
}

function FAQRow({
  item,
  i,
  isOpen,
  onToggle,
}: {
  item: (typeof faqs)[number];
  i: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="border-b border-white/[0.08]"
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-center justify-between gap-6 py-[1.625rem] text-left text-base text-warmwhite transition-colors duration-300 hover:text-gold-soft"
      >
        <span className="flex items-baseline gap-4">
          <span className="font-display text-xs italic text-gold/50">
            {String(i + 1).padStart(2, "0")}
          </span>
          {item.q}
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
          className="flex shrink-0 items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M8 1V15M1 8H15" stroke="#C9A257" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <motion.span
              aria-hidden
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              exit={{ width: 0 }}
              transition={{ duration: 0.4, delay: reduce ? 0 : 0.1 }}
              className="mb-3 block h-px bg-gold/50"
            />
            <p className="max-w-[560px] pb-6 text-[14.5px] leading-relaxed text-muted">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="px-14 py-32 max-md:px-5 max-md:py-20">
      <SectionHead eyebrow="Questions" title="Before you begin" />
      <div className="mx-auto max-w-[760px]">
        {faqs.map((item, i) => (
          <FAQRow
            key={item.q}
            item={item}
            i={i}
            isOpen={open === i}
            onToggle={() => setOpen(open === i ? null : i)}
          />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: faqs.length * 0.08 + 0.15 }}
        className="mx-auto mt-10 max-w-[760px] text-[13.5px] text-muted"
      >
        Still have a question?{" "}
        <a href="/#contact" className="text-gold-soft underline-offset-4 transition-colors hover:text-gold hover:underline">
          Get in touch
        </a>
        .
      </motion.p>
    </section>
  );
}