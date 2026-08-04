"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bookmark, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppShell } from "@/components/layout/AppShell";
import { ProductCard } from "@/components/products/ProductCard";
import { EmptyState } from "@/components/common/EmptyState";
import { DashboardSummary } from "@/types";
import { getDashboard } from "@/lib/api/dashboard";
import { useAuthStore } from "@/store/authStore";

export default function DashboardPage() {
  const token = useAuthStore((s) => s.token)!; const user = useAuthStore((s) => s.user); const [data, setData] = useState<DashboardSummary>();
  const stats = [
    { label: "Consultations", value: data?.stats.totalConsultations || 0, Icon: MessageCircle },
    { label: "In progress", value: data?.stats.inProgress || 0, Icon: ArrowRight },
    { label: "Completed", value: data?.stats.completed || 0, Icon: CheckCircle2 },
    { label: "Saved gifts", value: data?.stats.savedGifts || 0, Icon: Bookmark },
  ];
  useEffect(() => { if (token) getDashboard(token).then(setData); }, [token]);
  return <ProtectedRoute><AppShell>
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><div className="eyebrow">Your private salon</div><h1 className="mt-3 font-display text-5xl md:text-6xl">Welcome back, {user?.name?.split(" ")[0]}.</h1><p className="mt-3 text-subtle">Meaningful gestures, thoughtfully kept in one place.</p></div><Link href="/consultation" className="button-primary"><Sparkles size={16} className="mr-2"/>Start a new consultation</Link></div>
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{stats.map(({ label, value, Icon }) => <div key={label} className="rounded-3xl border border-line bg-panel p-6"><Icon size={18} className="text-gold"/><div className="mt-7 font-display text-4xl">{value}</div><div className="mt-1 text-xs text-subtle">{label}</div></div>)}</div>
    <div className="mt-14 flex items-center justify-between"><div><div className="eyebrow">Pick up the thread</div><h2 className="mt-2 font-display text-3xl">Recent consultations</h2></div><Link href="/consultations" className="text-xs text-gold">View all →</Link></div>
    <div className="mt-6 grid gap-4 md:grid-cols-2">{data?.recentConsultations.length ? data.recentConsultations.slice(0,4).map((item) => <Link key={item.id} href={`/consultation?id=${item.id}`} className="rounded-3xl border border-line bg-panel p-6 transition hover:-translate-y-1 hover:border-gold/40"><div className="flex justify-between"><span className="eyebrow">{item.status === "active" ? "In progress" : "Complete"}</span><span className="text-xs text-subtle">{new Date(item.updatedAt || item.createdAt).toLocaleDateString()}</span></div><h3 className="mt-5 font-display text-2xl">{item.profile.recipient ? `A gift for ${item.profile.recipient}` : "A new gifting story"}</h3><p className="mt-2 text-sm text-subtle">{item.profile.occasion || "Continue the conversation"}</p></Link>) : <div className="md:col-span-2"><EmptyState title="Begin your first story" copy="Tell CHARIS about someone who matters, and we’ll shape the gesture together." /></div>}</div>
    {!!data?.savedGifts.length && <section className="mt-16"><div className="mb-6 flex items-end justify-between"><div><div className="eyebrow">Objects you kept</div><h2 className="mt-2 font-display text-3xl">Saved gifts</h2></div><Link href="/saved-gifts" className="text-xs text-gold">View all →</Link></div><div className="grid gap-7 md:grid-cols-3">{data.savedGifts.slice(0,3).map((item) => <ProductCard key={item.id} product={item.product}/>)}</div></section>}
  </AppShell></ProtectedRoute>;
}
