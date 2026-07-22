export type Flavor = {
  slug: string;
  name: string;
  description?: string;
  heatLevel?: number; // 1-5, undecided until Karl provides ratings
  price?: number;
  featured?: boolean;
  /** Path under /public to the exported bottle art, e.g. "/sauces/mango-habanero.png" (2048x2048 source). */
  image?: string;
};

// Shared placeholder until Karl sends the full catalog — swap to a per-flavor
// image path once each sauce has its own exported art.
const PLACEHOLDER_IMAGE = "/SauceTemplate.png";

export const flavors: Flavor[] = [
  { slug: "mango-habanero", name: "Mango Habanero", featured: true, image: PLACEHOLDER_IMAGE },
  { slug: "birdie-birdie", name: "Birdie Birdie", featured: true, image: PLACEHOLDER_IMAGE },
  { slug: "creole-garlic", name: "Creole Garlic", image: PLACEHOLDER_IMAGE },
  { slug: "scorp", name: "Scorp", image: PLACEHOLDER_IMAGE },
  { slug: "old-whiskey-dick", name: "Old Whiskey Dick", featured: true, image: PLACEHOLDER_IMAGE },
  { slug: "ginger-dragon", name: "Ginger Dragon", image: PLACEHOLDER_IMAGE },
  { slug: "fallen-angel", name: "Fallen Angel", image: PLACEHOLDER_IMAGE },
];
