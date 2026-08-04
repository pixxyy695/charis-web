"use client";

import Link from "next/link";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#how", label: "How it works" },
  { href: "/#philosophy", label: "Philosophy" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-gradient-to-b from-charcoal/85 to-transparent px-14 py-6 backdrop-blur-sm max-md:px-6">
      <Link href="/" className="font-display text-2xl font-medium tracking-[0.14em] text-warmwhite">
        CHAR<span className="text-gold">I</span>S
      </Link>
      <div className="flex gap-10 text-sm text-cream/75 max-md:hidden">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="transition-opacity hover:opacity-100 hover:text-cream">
            {l.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-5">
        <Link href="/login" className="text-sm text-cream/75 transition-opacity hover:opacity-100 hover:text-cream max-md:hidden">
          Sign in
        </Link>
        <Link
          href="/consultation"
          className="rounded-sm border border-gold-soft px-[1.375rem] py-2.5 text-[13px] tracking-wide text-gold-soft transition-colors duration-300 hover:bg-gold-soft hover:text-charcoal"
        >
          Begin a consultation
        </Link>
      </div>
    </nav>
  );
}
