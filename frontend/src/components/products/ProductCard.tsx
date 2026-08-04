"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bookmark, Check, Sparkles } from "lucide-react";
import { ProductImage } from "@/components/products/ProductImage";
import { Product } from "@/types";

export function ProductCard({ product, reason, saved, onSave }: { product: Product; reason?: string; saved?: boolean; onSave?: () => void }) {
  return (
    <motion.article whileHover={{ y: -7 }} transition={{ duration: .3 }} className="group overflow-hidden rounded-[28px] border border-line bg-panel shadow-luxury">
      <div className="relative aspect-[4/4.7] overflow-hidden bg-soft">
        <ProductImage product={product} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[10px] uppercase tracking-[.18em] text-white backdrop-blur"><Sparkles size={11}/> Curator&apos;s choice</span>
        {onSave && <button onClick={onSave} className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-burgundy shadow-lg transition hover:scale-105" aria-label={saved ? "Gift saved" : "Save gift"}>{saved ? <Check size={17}/> : <Bookmark size={17}/>}</button>}
      </div>
      <div className="p-6">
        <div className="text-[10px] uppercase tracking-[.22em] text-gold">{product.brand}</div>
        <div className="mt-2 flex items-start justify-between gap-4"><h3 className="font-display text-2xl leading-tight">{product.name}</h3><span className="whitespace-nowrap text-sm">${product.price.toLocaleString()}</span></div>
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-subtle">{reason || product.symbolicMeaning}</p>
        <Link href={`/products/${product.id}`} className="mt-6 inline-flex items-center border-b border-gold/60 pb-1 text-xs uppercase tracking-[.16em] text-gold">Discover its story</Link>
      </div>
    </motion.article>
  );
}
