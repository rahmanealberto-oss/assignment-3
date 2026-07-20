import type { Item } from "@/lib/types";
import ItemCard from "./ItemCard";
import Button from "./Button";

export default function ItemList({
  items,
  ranked = false,
}: {
  items: Item[];
  ranked?: boolean;
}) {
  if (items.length === 0) {
    return (
      <div className="shadow-soft flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-surface px-6 py-20 text-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-10 w-10 text-muted"
        >
          <path d="M4 7V5a1 1 0 0 1 1-1h4M4 17v2a1 1 0 0 0 1 1h4M20 7V5a1 1 0 0 0-1-1h-4M20 17v2a1 1 0 0 1-1 1h-4" />
          <path d="M8 12h8" />
        </svg>
        <p className="max-w-sm font-display text-lg font-semibold text-foreground">
          Todavía no hay artículos publicados.
        </p>
        <p className="max-w-sm text-sm text-muted">
          Sé la primera persona en ofrecer algo para intercambiar.
        </p>
        <Button href="/publicar">Publicar un artículo</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <ItemCard key={item.id} item={item} rank={ranked ? index + 1 : undefined} />
      ))}
    </div>
  );
}
