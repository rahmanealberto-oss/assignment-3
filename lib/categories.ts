import type { CategoryValue } from "./types";

export const CATEGORIES: { value: CategoryValue; label: string; gradient: string }[] = [
  { value: "electronica", label: "Electrónica", gradient: "from-violet-500 to-blue-500" },
  { value: "moda", label: "Moda", gradient: "from-fuchsia-500 to-violet-500" },
  { value: "hogar", label: "Hogar", gradient: "from-blue-500 to-indigo-500" },
  { value: "deporte", label: "Deporte", gradient: "from-emerald-400 to-teal-500" },
  { value: "belleza", label: "Belleza", gradient: "from-rose-500 to-fuchsia-500" },
  { value: "otros", label: "Otros", gradient: "from-slate-600 to-slate-500" },
];

export function getCategory(value: CategoryValue) {
  return CATEGORIES.find((c) => c.value === value) ?? CATEGORIES[CATEGORIES.length - 1];
}
