"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Inicio", icon: "home" as const },
  { href: "/publicar", label: "Publicar", icon: "plus" as const },
];

function Icon({ name, className }: { name: "home" | "plus"; className?: string }) {
  if (name === "home") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 11.5 12 5l8 6.5" />
        <path d="M6 10v9a1 1 0 0 0 1 1h4v-6h2v6h4a1 1 0 0 0 1-1v-9" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

function Logo() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-white">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M7 4 3 8l4 4" />
        <path d="M3 8h13" />
        <path d="M17 20l4-4-4-4" />
        <path d="M21 16H8" />
      </svg>
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Sidebar — desktop */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-surface md:flex">
        <Link href="/" className="flex items-center gap-2.5 px-5 py-6">
          <Logo />
          <span className="font-display text-sm font-bold leading-tight tracking-tight text-foreground">
            Intercambio
            <br />
            de Bienes
          </span>
        </Link>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-r from-accent/15 to-accent-2/10 text-foreground"
                    : "text-muted hover:bg-surface-2 hover:text-foreground"
                }`}
              >
                <Icon
                  name={link.icon}
                  className={`h-[18px] w-[18px] shrink-0 transition-colors ${
                    active ? "text-accent" : "text-muted group-hover:text-foreground"
                  }`}
                />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border px-5 py-4 text-[11px] leading-relaxed text-muted">
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent-mint align-middle" />
          Sin cuentas · sin pagos · 100% local
        </div>
      </aside>

      {/* Top bar — mobile */}
      <header className="glass sticky top-0 z-20 flex items-center justify-between border-b border-border px-4 py-3 md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-display text-sm font-bold tracking-tight text-foreground">
            Intercambio de Bienes
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                  active
                    ? "bg-gradient-to-br from-accent to-accent-2 text-white"
                    : "text-muted hover:bg-surface-2 hover:text-foreground"
                }`}
              >
                <Icon name={link.icon} className="h-[18px] w-[18px]" />
              </Link>
            );
          })}
        </nav>
      </header>
    </>
  );
}
