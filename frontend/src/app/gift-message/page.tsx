"use client";

import { useEffect, useState } from "react";
import { Copy, Feather, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { GiftMessageTone } from "@/types";
import * as api from "@/lib/api/giftMessages";
import { useAuthStore } from "@/store/authStore";

export const dynamic = "force-dynamic";

const tones: GiftMessageTone[] = ["elegant", "heartfelt", "formal", "romantic", "warm"];

export default function GiftMessagePage() {
  const token = useAuthStore((s) => s.token)!; const [productName, setProductName] = useState("your chosen gift");
  const [tone, setTone] = useState<GiftMessageTone>("heartfelt"); const [recipient, setRecipient] = useState(""); const [context, setContext] = useState(""); const [message, setMessage] = useState(""); const [loading, setLoading] = useState(false); const [copied, setCopied] = useState(false);
  useEffect(() => { setProductName(new URLSearchParams(window.location.search).get("name") || "your chosen gift"); }, []);
  const generate = async () => { setLoading(true); try { const result = await api.generateGiftMessage(token, { tone, recipient, productName, context }); setMessage(result.message); } finally { setLoading(false); } };
  const improve = async () => { if (!message) return generate(); setLoading(true); try { const result = await api.improveGiftMessage(token, message, tone); setMessage(result.message); } finally { setLoading(false); } };
  return <ProtectedRoute><AppShell><div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-16"><section><div className="eyebrow">The final touch</div><h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">Give the object a voice.</h1><p className="mt-5 leading-7 text-subtle">A few sincere lines can turn {productName} into a memory. Write your own, or let CHARIS help shape it.</p><div className="mt-9 space-y-5"><label className="block text-xs text-subtle">Recipient<input value={recipient} onChange={(e) => setRecipient(e.target.value)} className="field mt-2" placeholder="Their name"/></label><label className="block text-xs text-subtle">A detail only you would know<textarea value={context} onChange={(e) => setContext(e.target.value)} className="field mt-2 min-h-28 resize-none" placeholder="A memory, feeling, or reason for the gift…"/></label><fieldset><legend className="text-xs text-subtle">Tone</legend><div className="mt-3 flex flex-wrap gap-2">{tones.map((item) => <button key={item} onClick={() => setTone(item)} className={`rounded-full border px-4 py-2 text-xs capitalize transition ${tone === item ? "border-gold bg-gold/10 text-gold" : "border-line text-subtle"}`}>{item}</button>)}</div></fieldset></div></section><section className="flex min-h-[500px] flex-col rounded-[32px] border border-line bg-panel p-7 shadow-luxury md:p-10"><div className="flex items-center justify-between"><div className="flex items-center gap-2 text-xs uppercase tracking-[.18em] text-gold"><Feather size={15}/>Your message</div><button onClick={async () => { await navigator.clipboard.writeText(message); setCopied(true); }} disabled={!message} className="icon-button" aria-label="Copy message"><Copy size={15}/></button></div><textarea value={message} onChange={(e) => setMessage(e.target.value)} className="my-8 flex-1 resize-none bg-transparent font-display text-3xl leading-relaxed text-ink outline-none placeholder:text-subtle/40" placeholder="Begin writing here, or ask CHARIS to compose something meaningful…" aria-label="Gift message"/><div className="flex flex-wrap gap-3"><button onClick={generate} disabled={loading} className="button-primary"><Sparkles size={16} className="mr-2"/>{loading ? "Composing…" : "Generate with CHARIS"}</button><button onClick={improve} disabled={loading || !message} className="button-secondary">Improve my words</button>{copied && <span className="self-center text-xs text-gold">Copied</span>}</div></section></div></AppShell></ProtectedRoute>;
}
