"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppShell } from "@/components/layout/AppShell";
import { ProductCard } from "@/components/products/ProductCard";
import { EmptyState } from "@/components/common/EmptyState";
import { SavedGift } from "@/types";
import * as api from "@/lib/api/savedGifts";
import { useAuthStore } from "@/store/authStore";

export default function SavedGiftsPage() {
  const token = useAuthStore((s) => s.token)!; const [items, setItems] = useState<SavedGift[]>();
  useEffect(() => { if (token) api.listSavedGifts(token).then((r) => setItems(r.savedGifts)); }, [token]);
  const remove = async (id: string) => { await api.removeSavedGift(token, id); setItems((current) => current?.filter((item) => item.id !== id)); };
  return <ProtectedRoute><AppShell><div className="mb-12"><div className="eyebrow">Your collection</div><h1 className="mt-4 font-display text-5xl md:text-7xl">Gifts worth returning to.</h1><p className="mt-4 max-w-xl text-subtle">A considered collection of objects and the stories you may one day give with them.</p></div>{items === undefined ? <div className="luxury-loader"/> : items.length === 0 ? <EmptyState title="Nothing saved—yet" copy="When a piece feels right, save it here while you consider the final gesture."/> : <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">{items.map((item) => <div key={item.id} className="relative"><ProductCard product={item.product}/><button onClick={() => remove(item.id)} className="absolute bottom-5 right-5 icon-button" aria-label={`Remove ${item.product.name}`}><Trash2 size={15}/></button></div>)}</div>}</AppShell></ProtectedRoute>;
}
