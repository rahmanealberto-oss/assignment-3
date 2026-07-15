import type { Item } from "@/lib/types";
import ItemCard from "./ItemCard";
import Button from "./Button";

export default function ItemList({ items }: { items: Item[] }) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-700">
        <p className="text-4xl">🔍</p>
        <p className="max-w-sm text-zinc-600 dark:text-zinc-400">
          Todavía no hay bienes publicados. ¡Sé la primera persona en
          ofrecer algo para intercambiar!
        </p>
        <Button href="/publicar">Publicar un bien</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
