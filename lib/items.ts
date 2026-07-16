import type { Item, NewItem } from "./types";

const STORAGE_KEY = "items";
const SEEDED_KEY = "items-seeded";
const ITEMS_EVENT = "items-updated";

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function daysAgo(days: number): number {
  return Date.now() - days * 24 * 60 * 60 * 1000;
}

// Artículos de ejemplo para que la app no se vea vacía en la primera visita.
// Se insertan una sola vez (ver SEEDED_KEY) y a partir de ahí se comportan
// como cualquier otro artículo: se pueden ver, acumulan vistas, etc.
const SEED_ITEMS: Item[] = [
  {
    id: "seed-1",
    title: "Bicicleta de montaña rodada 26",
    description:
      "Bicicleta rodada 26, frenos de disco, poco uso. Ideal para moverse por la ciudad o rodar los fines de semana.",
    category: "deporte",
    wantedInExchange: "Guitarra acústica o eléctrica",
    contact: "Mensaje directo por la plataforma",
    createdAt: daysAgo(6),
    views: 47,
  },
  {
    id: "seed-2",
    title: "Consola PlayStation 4 + 2 controles",
    description:
      "PS4 slim de 500GB con dos controles originales. Incluye 3 juegos físicos. Funciona perfecto, se cambia por otra consola.",
    category: "electronica",
    wantedInExchange: "Laptop o tablet en buen estado",
    contact: "Mensaje directo por la plataforma",
    createdAt: daysAgo(3),
    views: 63,
  },
  {
    id: "seed-3",
    title: "Guitarra acústica Yamaha",
    description:
      "Guitarra acústica Yamaha C40, cuerdas nuevas, ideal para empezar a aprender. Incluye funda.",
    category: "otros",
    wantedInExchange: "Bicicleta o patineta",
    contact: "Mensaje directo por la plataforma",
    createdAt: daysAgo(9),
    views: 38,
  },
  {
    id: "seed-4",
    title: "Chamarra impermeable talla M",
    description:
      "Chamarra técnica para exteriores, poco uso, sin manchas ni desgaste. Ideal para senderismo o lluvia.",
    category: "moda",
    wantedInExchange: "Tenis deportivos talla 26-27",
    contact: "Mensaje directo por la plataforma",
    createdAt: daysAgo(14),
    views: 12,
  },
  {
    id: "seed-5",
    title: "Patineta profesional (skateboard)",
    description:
      "Patineta completa, truck de aluminio, ruedas nuevas. Perfecta para trucos o para moverte por el barrio.",
    category: "deporte",
    wantedInExchange: "Audífonos inalámbricos",
    contact: "Mensaje directo por la plataforma",
    createdAt: daysAgo(2),
    views: 29,
  },
  {
    id: "seed-6",
    title: "Audífonos Sony inalámbricos",
    description:
      "Audífonos Sony WH-CH510, cancelación de ruido pasiva, batería de hasta 35 horas. Poco uso, en su caja original.",
    category: "electronica",
    wantedInExchange: "Videojuegos o accesorios de consola",
    contact: "Mensaje directo por la plataforma",
    createdAt: daysAgo(1),
    views: 21,
  },
];

// Cache de la última lectura de localStorage. getItems() debe devolver
// siempre la misma referencia si el contenido no cambió: esto es
// necesario para poder usarla como snapshot de useSyncExternalStore
// (el hook con el que los componentes se sincronizan a localStorage).
let cachedRaw: string | null = null;
let cachedItems: Item[] = [];

function readRaw(): Item[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) {
    return cachedItems;
  }

  cachedRaw = raw;
  try {
    const parsed = raw ? (JSON.parse(raw) as Item[]) : [];
    cachedItems = parsed.slice().sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error("No se pudieron leer los artículos de localStorage:", error);
    cachedItems = [];
  }

  return cachedItems;
}

function writeItems(items: Item[]): void {
  cachedRaw = JSON.stringify(items);
  cachedItems = items.slice().sort((a, b) => b.createdAt - a.createdAt);
  window.localStorage.setItem(STORAGE_KEY, cachedRaw);
}

/**
 * Devuelve todos los artículos guardados en localStorage.
 * Los más recientes primero. Si no hay nada (o estamos en el
 * servidor, donde no existe localStorage), devuelve un arreglo vacío.
 *
 * La primera vez que se usa la app en un navegador (localStorage
 * completamente vacío) se precargan algunos artículos de ejemplo, para
 * que el listado y la sección de tendencias no se vean vacíos.
 */
export function getItems(): Item[] {
  if (typeof window === "undefined") return cachedItems;

  const alreadySeeded = window.localStorage.getItem(SEEDED_KEY);
  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!alreadySeeded && raw === null) {
    window.localStorage.setItem(SEEDED_KEY, "true");
    writeItems(SEED_ITEMS);
    return cachedItems;
  }

  return readRaw();
}

/**
 * Agrega un nuevo artículo al listado guardado en localStorage.
 */
export function addItem(newItem: NewItem): Item {
  const item: Item = {
    ...newItem,
    id: generateId(),
    createdAt: Date.now(),
    views: 0,
  };

  writeItems([item, ...getItems()]);
  window.dispatchEvent(new Event(ITEMS_EVENT));

  return item;
}

/**
 * Busca un artículo por su id. Devuelve undefined si no existe.
 */
export function getItemById(id: string): Item | undefined {
  return getItems().find((item) => item.id === id);
}

/**
 * Suma una vista a un artículo (se llama al abrir su página de detalle).
 * Es la base de la sección de "Tendencias" del inicio.
 */
export function incrementViews(id: string): void {
  if (typeof window === "undefined") return;

  const items = getItems();
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return;

  const updated = items.slice();
  updated[index] = { ...updated[index], views: updated[index].views + 1 };

  writeItems(updated);
  window.dispatchEvent(new Event(ITEMS_EVENT));
}

/**
 * Devuelve los artículos con más vistas (los que más se están
 * consultando/intercambiando), de mayor a menor. Por defecto los 4
 * primeros.
 */
export function getTrendingItems(limit = 4): Item[] {
  return getItems()
    .slice()
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

/**
 * Se suscribe a cambios en los artículos guardados: cambios hechos desde
 * otra pestaña ("storage") y cambios hechos en la misma pestaña vía
 * addItem() (evento personalizado "items-updated"). Pensado para usarse
 * con useSyncExternalStore.
 */
export function subscribeToItems(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  window.addEventListener("storage", callback);
  window.addEventListener(ITEMS_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(ITEMS_EVENT, callback);
  };
}
