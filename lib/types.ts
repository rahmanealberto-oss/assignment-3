export type CategoryValue =
  | "electronica"
  | "moda"
  | "hogar"
  | "deporte"
  | "belleza"
  | "otros";

export type Item = {
  id: string;
  title: string;
  description: string;
  category: CategoryValue;
  wantedInExchange: string;
  contact: string;
  createdAt: number;
  views: number;
};

export type NewItem = Omit<Item, "id" | "createdAt" | "views">;
