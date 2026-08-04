"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="px-14 py-32 max-md:px-5 max-md:py-20">
      <SectionHead eyebrow="Questions" title="Before you begin" />
      <div className="mx-auto max-w-[760px]">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="border-b border-white/[0.08]">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between py-[1.625rem] text-left text-base text-warmwhite"
              >
                {item.q}
                <span className={`text-gold transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-[14.5px] leading-relaxed text-muted">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
