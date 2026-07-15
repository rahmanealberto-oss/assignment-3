"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getItemById, subscribeToItems } from "@/lib/items";
import Button from "@/components/Button";

export default function BienDetallePage() {
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

  if (item === null) {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <p className="text-4xl">🤷</p>
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          No encontramos ese bien
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
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

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-10">
      <Button href="/" variant="secondary" className="self-start">
        ← Volver al listado
      </Button>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-6xl">
              📦
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {item.title}
            </h1>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
              Publicado el {publishedOn}
            </p>
          </div>

          <div className="rounded-xl bg-zinc-100 px-4 py-3 dark:bg-zinc-800">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Busca a cambio
            </p>
            <p className="mt-1 font-medium text-zinc-900 dark:text-zinc-50">
              {item.wantedInExchange}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Descripción
            </p>
            <p className="mt-1 whitespace-pre-line text-zinc-700 dark:text-zinc-300">
              {item.description}
            </p>
          </div>

          {item.contact && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Contacto
              </p>
              <p className="mt-1 text-zinc-700 dark:text-zinc-300">
                {item.contact}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
