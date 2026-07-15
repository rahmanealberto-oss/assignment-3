import type { Item, NewItem } from "./types";

const STORAGE_KEY = "items";
const ITEMS_EVENT = "items-updated";

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

// Cache de la última lectura de localStorage. getItems() debe devolver
// siempre la misma referencia si el contenido no cambió: esto es
// necesario para poder usarla como snapshot de useSyncExternalStore
// (el hook con el que los componentes se sincronizan a localStorage).
let cachedRaw: string | null = null;
let cachedItems: Item[] = [];

/**
 * Devuelve todos los bienes guardados en localStorage.
 * Los más recientes primero. Si no hay nada (o estamos en el
 * servidor, donde no existe localStorage), devuelve un arreglo vacío.
 */
export function getItems(): Item[] {
  if (typeof window === "undefined") return cachedItems;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) {
    return cachedItems;
  }

  cachedRaw = raw;
  try {
    const parsed = raw ? (JSON.parse(raw) as Item[]) : [];
    cachedItems = parsed.slice().sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error("No se pudieron leer los items de localStorage:", error);
    cachedItems = [];
  }

  return cachedItems;
}

/**
 * Agrega un nuevo bien al listado guardado en localStorage.
 */
export function addItem(newItem: NewItem): Item {
  const item: Item = {
    ...newItem,
    id: generateId(),
    createdAt: Date.now(),
  };

  const items = [item, ...getItems()];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(ITEMS_EVENT));

  return item;
}

/**
 * Busca un bien por su id. Devuelve undefined si no existe.
 */
export function getItemById(id: string): Item | undefined {
  return getItems().find((item) => item.id === id);
}

/**
 * Se suscribe a cambios en los bienes guardados: cambios hechos desde
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
