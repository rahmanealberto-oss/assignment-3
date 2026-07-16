import type { CategoryValue } from "./types";

export const CATEGORIES: { value: CategoryValue; label: string; gradient: string }[] = [
  { value: "electronica", label: "Electrónica", gradient: "from-indigo-500 to-cyan-400" },
  { value: "moda", label: "Moda", gradient: "from-fuchsia-500 to-pink-400" },
  { value: "hogar", label: "Hogar", gradient: "from-violet-500 to-fuchsia-400" },
  { value: "deporte", label: "Deporte", gradient: "from-cyan-500 to-emerald-400" },
  { value: "belleza", label: "Belleza", gradient: "from-rose-500 to-orange-400" },
  { value: "otros", label: "Otros", gradient: "from-slate-500 to-slate-400" },
];

export function getCategory(value: CategoryValue) {
  return CATEGORIES.find((c) => c.value === value) ?? CATEGORIES[CATEGORIES.length - 1];
}
