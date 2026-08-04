"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { EmptyState } from "@/components/common/EmptyState";
import { Consultation } from "@/types";
import { listConsultations } from "@/lib/api/consultations";
import { useAuthStore } from "@/store/authStore";

export default function ConsultationsPage() {
  const token = useAuthStore((s) => s.token)!; const [items, setItems] = useState<Consultation[]>();
  useEffect(() => { if (token) listConsultations(token).then(setItems); }, [token]);
  return <ProtectedRoute><AppShell><div className="mb-12"><div className="eyebrow">Conversation archive</div><h1 className="mt-4 font-display text-5xl md:text-7xl">Every thoughtful beginning.</h1></div>{items?.length ? <div className="space-y-3">{items.map((item) => <Link href={`/consultation?id=${item.id}`} key={item.id} className="group flex flex-col gap-5 rounded-3xl border border-line bg-panel p-6 transition hover:border-gold/40 sm:flex-row sm:items-center sm:justify-between"><div><span className="eyebrow">{item.status}</span><h2 className="mt-2 font-display text-2xl">{item.profile.recipient ? `For ${item.profile.recipient}` : "Untitled consultation"}</h2><p className="mt-1 text-sm text-subtle">{[item.profile.relationship, item.profile.occasion].filter(Boolean).join(" · ") || "The story is just beginning"}</p></div><div className="text-xs text-subtle">{new Date(item.updatedAt || item.createdAt).toLocaleDateString()} <span className="ml-4 text-gold">Continue →</span></div></Link>)}</div> : items ? <EmptyState title="No conversations yet" copy="Your consultation history will be safely kept here."/> : <div className="luxury-loader"/>}</AppShell></ProtectedRoute>;
}
