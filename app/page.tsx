"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { getItems, subscribeToItems } from "@/lib/items";
import ItemList from "@/components/ItemList";
import Button from "@/components/Button";

const EMPTY_ITEMS: ReturnType<typeof getItems> = [];

const HOW_IT_WORKS = [
  {
    title: "Publica tu artículo",
    body: "Sube lo que ya no usas: título, categoría, descripción y qué te gustaría recibir a cambio.",
  },
  {
    title: "Explora la comunidad",
    body: "Busca entre los artículos disponibles y encuentra algo que de verdad te sirva.",
  },
  {
    title: "Acuerda el trueque",
    body: "Contacta directo a la otra persona y acuerden dónde y cuándo hacer el intercambio.",
  },
];

export default function Home() {
  const getServerSnapshot = useCallback(() => EMPTY_ITEMS, []);
  const items = useSyncExternalStore(
    subscribeToItems,
    getItems,
    getServerSnapshot
  );

  const [query, setQuery] = useState("");

  const trending = useMemo(
    () =>
      items
        .slice()
        .sort((a, b) => b.views - a.views)
        .slice(0, 4),
    [items]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => item.title.toLowerCase().includes(q));
  }, [items, query]);

  return (
    <div className="flex flex-1 flex-col">
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="animate-float-a absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/30 blur-3xl"
          aria-hidden
        />
        <div
          className="animate-float-b absolute -right-24 top-10 h-80 w-80 rounded-full bg-accent-2/25 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 py-24 text-center md:py-32">
          <span className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            Trueque comunitario · sin dinero de por medio
          </span>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            Intercambia lo que tienes{" "}
            <span className="text-gradient">por lo que necesitas</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted">
            Publica un artículo que ya no uses, revisa lo que ofrece tu
            comunidad y acuerda el trueque directamente con la otra persona.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <Button href="/publicar">Publicar un artículo</Button>
            <Link
              href="#catalogo"
              className="underline-grow text-sm font-medium tracking-wide text-foreground"
            >
              Ver artículos
            </Link>
          </div>

          <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            <StatChip label="Artículos publicados" value={`${items.length}`} />
            <StatChip label="Costo por usar la app" value="$0" />
            <StatChip label="Comisión" value="Ninguna" />
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12 flex flex-col gap-2 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              El proceso
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
              Cómo funciona
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.title} className="glass rounded-2xl p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 font-display text-sm font-bold text-accent-foreground">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div
        id="catalogo"
        className="mx-auto flex w-full max-w-6xl flex-1 scroll-mt-24 flex-col gap-16 px-6 py-20"
      >
        {trending.length > 0 && (
          <section className="flex flex-col gap-6">
            <div className="flex items-baseline justify-between border-b border-border pb-4">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Tendencias
              </h2>
              <span className="text-xs uppercase tracking-widest text-muted">
                Los más consultados
              </span>
            </div>
            <ItemList items={trending} ranked />
          </section>
        )}

        <section className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Todos los artículos
            </h2>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar un artículo…"
              className="w-full max-w-xs rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm text-foreground outline-none placeholder:text-muted/70 focus:border-accent"
            />
          </div>
          <ItemList items={filtered} />
        </section>
      </div>
    </div>
  );
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-xl px-5 py-4">
      <p className="font-display text-xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted">{label}</p>
    </div>
  );
}
