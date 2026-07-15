export type Item = {
  id: string;
  title: string;
  description: string;
  wantedInExchange: string;
  imageUrl: string;
  contact: string;
  createdAt: number;
};

export type NewItem = Omit<Item, "id" | "createdAt">;
