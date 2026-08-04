"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bookmark, Gift, History, LayoutGrid, LogOut, Moon, Sun } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useThemeStore } from "@/store/themeStore";

const links = [
  ["/dashboard", "Overview", LayoutGrid],
  ["/consultation", "New consultation", Gift],
  ["/consultations", "History", History],
  ["/saved-gifts", "Saved gifts", Bookmark],
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { theme, toggle } = useThemeStore();
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center gap-6 px-5 lg:px-8">
          <Link href="/dashboard" className="font-display text-2xl tracking-[.14em]">CHARIS</Link>
          <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="Account navigation">
            {links.map(([href, label, Icon]) => (
              <Link key={href} href={href} className={`nav-pill ${pathname === href ? "nav-pill-active" : ""}`}>
                <Icon size={15} />{label}
              </Link>
            ))}
          </nav>
          <button onClick={toggle} className="icon-button" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button onClick={() => { logout(); router.replace("/"); }} className="icon-button" aria-label="Sign out"><LogOut size={17} /></button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-10 pb-28 lg:px-8">{children}</main>
      <nav className="fixed inset-x-4 bottom-4 z-40 flex justify-around rounded-2xl border border-line bg-panel/95 p-2 shadow-2xl backdrop-blur md:hidden" aria-label="Mobile navigation">
        {links.map(([href, label, Icon]) => <Link key={href} href={href} aria-label={label} className={`mobile-nav ${pathname === href ? "text-gold" : "text-subtle"}`}><Icon size={20}/><span>{label.split(" ")[0]}</span></Link>)}
      </nav>
      <span className="sr-only">Signed in as {user?.name}</span>
    </div>
  );
}
