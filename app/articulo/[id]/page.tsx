"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getItemById, incrementViews, subscribeToItems } from "@/lib/items";
import { getCategory } from "@/lib/categories";
import Button from "@/components/Button";

export default function ArticuloDetallePage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const getSnapshot = useCallback(
    () => (id ? (getItemById(id) ?? null) : null),
    [id]
  );
  const getServerSnapshot = useCallback(() => null, []);

  const item = useSyncExternalStore(
    subscribeToItems,
    getSnapshot,
    getServerSnapshot
  );

  // Suma una vista cada vez que se abre el detalle de un artículo distinto.
  // No depende de `item` a propósito: así no se vuelve a disparar cuando
  // el propio contador de vistas cambia (evita un ciclo infinito).
  useEffect(() => {
    if (id) {
      incrementViews(id);
    }
  }, [id]);

  if (item === null) {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <h1 className="font-display text-2xl font-semibold text-foreground">
          No encontramos ese artículo
        </h1>
        <p className="text-sm text-muted">
          Puede que ya no exista o que el enlace sea incorrecto.
        </p>
        <Button href="/">Volver al inicio</Button>
      </div>
    );
  }

  const publishedOn = new Date(item.createdAt).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const category = getCategory(item.category);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16">
      <nav className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted">
        <Link href="/" className="underline-grow hover:text-accent">
          Inicio
        </Link>
        <span>/</span>
        <span className="text-foreground">{item.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div
          className={`relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${category.gradient}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1"
            className="h-32 w-32 text-white/25"
          >
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M8 12h8" />
            <path d="m10 8-4 4 4 4" />
            <path d="m14 8 4 4-4 4" />
          </svg>
          <span className="absolute left-4 top-4 rounded-md bg-black/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur">
            {category.label}
          </span>
          {item.views >= 30 && (
            <span className="absolute right-4 top-4 rounded-md bg-gradient-to-r from-accent to-accent-2 px-3 py-1.5 text-xs font-bold text-accent-foreground">
              Popular
            </span>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
              {item.title}
            </h1>
            <p className="mt-2 flex items-center gap-2 text-xs uppercase tracking-widest text-muted">
              <span>Publicado el {publishedOn}</span>
              <span>·</span>
              <span>
                {item.views} {item.views === 1 ? "vista" : "vistas"}
              </span>
            </p>
          </div>

          <div className="glass rounded-xl border-l-2 border-accent px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Busca a cambio
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-foreground">
              {item.wantedInExchange}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted">
              Descripción
            </p>
            <p className="mt-2 whitespace-pre-line leading-relaxed text-foreground/90">
              {item.description}
            </p>
          </div>

          {item.contact && (
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted">
                Contacto
              </p>
              <p className="mt-2 text-foreground/90">{item.contact}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
