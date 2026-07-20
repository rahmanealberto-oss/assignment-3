import Link from "next/link";
import type { Item } from "@/lib/types";
import { getCategory } from "@/lib/categories";

export default function ItemCard({
  item,
  rank,
}: {
  item: Item;
  rank?: number;
}) {
  const category = getCategory(item.category);

  return (
    <Link
      href={`/articulo/${item.id}`}
      className="lift-hover shadow-soft group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface hover:border-accent/40"
    >
      <div
        className={`relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-gradient-to-br ${category.gradient}`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1"
          className="h-24 w-24 text-white/25 transition-transform duration-500 group-hover:scale-110"
        >
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 12h8" />
          <path d="m10 8-4 4 4 4" />
          <path d="m14 8 4 4-4 4" />
        </svg>

        <span className="absolute left-3 top-3 rounded-md bg-black/30 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur">
          {category.label}
        </span>

        {rank ? (
          <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-xs font-bold text-accent-foreground">
            {rank}
          </span>
        ) : (
          item.views >= 30 && (
            <span className="absolute right-3 top-3 rounded-md bg-accent-mint px-2 py-1 text-[10px] font-bold text-black/80">
              Popular
            </span>
          )
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="line-clamp-1 font-display text-base font-semibold text-foreground">
          {item.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted">
          <span className="text-accent">Busca a cambio:</span>{" "}
          {item.wantedInExchange}
        </p>
        <p className="mt-1 text-xs text-muted">
          {item.views} {item.views === 1 ? "vista" : "vistas"}
        </p>
      </div>
    </Link>
  );
}
