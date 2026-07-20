import type { CategoryValue } from "./types";

export const CATEGORIES: { value: CategoryValue; label: string; gradient: string }[] = [
  { value: "electronica", label: "Electrónica", gradient: "from-blue-500 to-cyan-400" },
  { value: "moda", label: "Moda", gradient: "from-rose-500 to-orange-400" },
  { value: "hogar", label: "Hogar", gradient: "from-cyan-500 to-blue-500" },
  { value: "deporte", label: "Deporte", gradient: "from-emerald-400 to-teal-500" },
  { value: "belleza", label: "Belleza", gradient: "from-rose-400 to-amber-300" },
  { value: "otros", label: "Otros", gradient: "from-slate-600 to-slate-500" },
];

export function getCategory(value: CategoryValue) {
  return CATEGORIES.find((c) => c.value === value) ?? CATEGORIES[CATEGORIES.length - 1];
}
