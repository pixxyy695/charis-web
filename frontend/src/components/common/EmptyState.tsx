import Link from "next/link";
import { Gift } from "lucide-react";

export function EmptyState({ title, copy, href = "/consultation", action = "Begin a consultation" }: { title: string; copy: string; href?: string; action?: string }) {
  return <div className="rounded-[28px] border border-dashed border-line bg-panel px-6 py-16 text-center"><Gift className="mx-auto text-gold"/><h2 className="mt-5 font-display text-3xl">{title}</h2><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-subtle">{copy}</p><Link href={href} className="button-primary mt-7 inline-flex">{action}</Link></div>;
}
