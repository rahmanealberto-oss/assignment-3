"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/publicar", label: "Publicar" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="glass sticky top-0 z-10 border-x-0 border-t-0">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-accent-foreground">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M7 4 3 8l4 4" />
              <path d="M3 8h13" />
              <path d="M17 20l4-4-4-4" />
              <path d="M21 16H8" />
            </svg>
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            Intercambio de Bienes
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                  isActive
                    ? "bg-gradient-to-r from-accent to-accent-2 text-accent-foreground"
                    : "text-foreground/70 hover:bg-surface-2 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
