"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppShell } from "@/components/layout/AppShell";
import { ProductCard } from "@/components/products/ProductCard";
import { EmptyState } from "@/components/common/EmptyState";
import { useConsultationStore } from "@/store/consultationStore";
import { useAuthStore } from "@/store/authStore";
import * as savedApi from "@/lib/api/savedGifts";

export default function RecommendationsPage() {
  const { recommendations, consultationId, profile } = useConsultationStore();
  const token = useAuthStore((s) => s.token)!;
  const [saved, setSaved] = useState<string[]>([]);
  useEffect(() => { if (token) savedApi.listSavedGifts(token).then(({ savedGifts }) => setSaved(savedGifts.map((item) => item.product.id))).catch(() => undefined); }, [token]);
  const save = async (id: string) => { if (saved.includes(id)) return; await savedApi.saveGift(token, id, consultationId || undefined); setSaved((items) => [...items, id]); };
  return <ProtectedRoute><AppShell>
    <section className="mb-12 max-w-3xl"><div className="eyebrow">Your private shortlist</div><h1 className="mt-4 font-display text-5xl leading-tight md:text-7xl">Objects chosen with intention.</h1><p className="mt-5 max-w-2xl leading-7 text-subtle">Each piece reflects what you shared{profile.recipient ? ` about ${profile.recipient}` : ""}—not merely their taste, but the feeling you want to leave with them.</p></section>
    {recommendations.length ? <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">{recommendations.map((product) => <ProductCard key={product.id} product={product} saved={saved.includes(product.id)} onSave={() => save(product.id)} />)}</div> : <EmptyState title="Your shortlist awaits" copy="Complete a conversation with CHARIS and your most meaningful matches will appear here." />}
    <div className="mt-12 flex flex-wrap gap-3"><Link href="/consultation" className="button-secondary">Refine the conversation</Link><Link href="/saved-gifts" className="button-primary">View saved gifts</Link></div>
  </AppShell></ProtectedRoute>;
}
