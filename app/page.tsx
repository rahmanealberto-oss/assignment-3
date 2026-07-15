"use client";

import { useCallback, useSyncExternalStore } from "react";
import { getItems, subscribeToItems } from "@/lib/items";
import ItemList from "@/components/ItemList";
import Button from "@/components/Button";

const EMPTY_ITEMS: ReturnType<typeof getItems> = [];

export default function Home() {
  const getServerSnapshot = useCallback(() => EMPTY_ITEMS, []);
  const items = useSyncExternalStore(
    subscribeToItems,
    getItems,
    getServerSnapshot
  );

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-10">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Intercambio de Bienes
        </h1>
        <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
          Una plataforma simple para intercambiar bienes con otras personas,
          sin usar dinero.
        </p>
        <Button href="/publicar">+ Publicar un bien</Button>
      </div>

      <ItemList items={items} />
    </div>
  );
}
