"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Bookmark, PackageCheck, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductImage } from "@/components/products/ProductImage";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Product } from "@/types";
import * as productApi from "@/lib/api/products";
import * as savedApi from "@/lib/api/savedGifts";
import { useAuthStore } from "@/store/authStore";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>(); const token = useAuthStore((s) => s.token)!;
  const [product, setProduct] = useState<Product>(); const [related, setRelated] = useState<Product[]>([]); const [saved, setSaved] = useState(false);
  useEffect(() => { Promise.all([productApi.getProduct(id), productApi.listProducts()]).then(([one, all]) => { setProduct(one.product); setRelated(all.products.filter((p) => p.id !== id && p.category === one.product.category).slice(0, 3)); }); }, [id]);
  if (!product) return <ProtectedRoute><div className="luxury-loader" /></ProtectedRoute>;
  return <ProtectedRoute><AppShell><div className="grid gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
    <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-soft"><ProductImage product={product} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /></div>
    <div className="self-center"><div className="eyebrow">{product.brand} · {product.category}</div><h1 className="mt-4 font-display text-5xl leading-[.95] md:text-7xl">{product.name}</h1><div className="mt-6 text-xl text-gold">${product.price.toLocaleString()}</div><p className="mt-8 text-base leading-8 text-subtle">{product.description}</p><div className="mt-8 rounded-3xl border border-line bg-panel p-6"><Sparkles className="text-gold" size={20}/><h2 className="mt-4 font-display text-2xl">What it means</h2><p className="mt-2 text-sm leading-7 text-subtle">{product.symbolicMeaning}</p></div><div className="mt-7 flex flex-wrap gap-3"><button className="button-primary" disabled={saved} onClick={async () => { await savedApi.saveGift(token, product.id); setSaved(true); }}><Bookmark size={16} className="mr-2"/>{saved ? "Saved" : "Save this gift"}</button><Link href={`/gift-message?product=${product.id}&name=${encodeURIComponent(product.name)}`} className="button-secondary">Write the message</Link></div><div className="mt-6 flex items-center gap-2 text-xs text-subtle"><PackageCheck size={16} className="text-gold"/> Estimated delivery: {product.deliveryEstimate}</div></div>
  </div><section className="mx-auto my-24 max-w-3xl text-center"><div className="eyebrow">The story</div><h2 className="mt-4 font-display text-4xl">Made to be remembered</h2><p className="mt-6 text-lg leading-9 text-subtle">{product.story}</p></section>{related.length > 0 && <section><div className="eyebrow mb-6">Continue discovering</div><div className="grid gap-7 md:grid-cols-3">{related.map((item) => <ProductCard key={item.id} product={item}/>)}</div></section>}</AppShell></ProtectedRoute>;
}
