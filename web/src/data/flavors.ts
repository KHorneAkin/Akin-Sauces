export type Flavor = {
  slug: string;
  name: string;
  description?: string;
  heatLevel?: number; // 1-5, undecided until Karl provides ratings
  price?: number;
  featured?: boolean;
};

export const flavors: Flavor[] = [
  { slug: "mango-habanero", name: "Mango Habanero", featured: true },
  { slug: "birdie-birdie", name: "Birdie Birdie", featured: true },
  { slug: "creole-garlic", name: "Creole Garlic" },
  { slug: "scorp", name: "Scorp" },
  { slug: "old-whiskey-dick", name: "Old Whiskey Dick", featured: true },
  { slug: "ginger-dragon", name: "Ginger Dragon" },
  { slug: "fallen-angel", name: "Fallen Angel" },
];
