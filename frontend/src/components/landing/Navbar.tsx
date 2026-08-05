"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#how", label: "How it works" },
  { href: "/#philosophy", label: "Philosophy" },
  { href: "/#faq", label: "FAQ" },
];

function NavLink({ href, label, index }: { href: string; label: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.06 }}
    >
      <Link href={href} className="group relative text-sm text-cream/75 transition-colors hover:text-cream">
        {label}
        <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-gold transition-all duration-300 group-hover:w-full" />
      </Link>
    </motion.div>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <div className="relative h-4 w-5">
      <motion.span
        className="absolute left-0 top-0 h-px w-full bg-cream"
        animate={open ? { rotate: 45, top: "50%" } : { rotate: 0, top: 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.span
        className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-cream"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className="absolute bottom-0 left-0 h-px w-full bg-cream"
        animate={open ? { rotate: -45, bottom: "50%" } : { rotate: 0, bottom: 0 }}
        transition={{ duration: 0.25 }}
      />
    </div>
  );
}

export function Navbar() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-14 py-6 backdrop-blur-sm transition-[background-color,border-color,padding] duration-500 max-md:px-6 ${
          scrolled
            ? "border-b border-white/[0.08] bg-charcoal/95 py-4"
            : "border-b border-transparent bg-gradient-to-b from-charcoal/85 to-transparent"
        }`}
      >
        <Link
          href="/"
          className="font-display text-2xl font-medium tracking-[0.14em] text-warmwhite"
          onClick={() => setMenuOpen(false)}
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            animate={{ opacity: 1, letterSpacing: "0.14em" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block"
          >
            CHAR<span className="text-gold">I</span>S
          </motion.span>
        </Link>

        <div className="flex gap-10 text-sm max-md:hidden">
          {links.map((l, i) => (
            <NavLink key={l.href} {...l} index={i} />
          ))}
        </div>

        <div className="flex items-center gap-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="max-md:hidden"
          >
            <Link href="/login" className="text-sm text-cream/75 transition-colors hover:text-cream">
              Sign in
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="max-md:hidden"
          >
            <Link
              href="/consultation"
              className="group relative overflow-hidden rounded-sm border border-gold-soft px-[1.375rem] py-2.5 text-[13px] tracking-wide text-gold-soft transition-colors duration-300 hover:bg-gold-soft hover:text-charcoal"
            >
              <span className="relative z-10">Begin a consultation</span>
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
            </Link>
          </motion.div>

          {/* Mobile trigger */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="hidden items-center justify-center p-1 max-md:flex"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>

        {/* Scroll progress hairline */}
        <motion.span
          aria-hidden
          className="absolute bottom-0 left-0 h-px bg-gold"
          style={{ width: reduce ? undefined : progressWidth }}
        />
      </motion.nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-charcoal/98 backdrop-blur-md md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="flex h-full flex-col items-center justify-center gap-8 px-6"
            >
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-2xl italic text-warmwhite/90 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + links.length * 0.06 }}
                className="mt-4 flex flex-col items-center gap-5"
              >
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-cream/75 transition-colors hover:text-cream"
                >
                  Sign in
                </Link>
                <Link
                  href="/consultation"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-sm border border-gold-soft px-7 py-3 text-sm tracking-wide text-gold-soft transition-colors duration-300 hover:bg-gold-soft hover:text-charcoal"
                >
                  Begin a consultation
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}