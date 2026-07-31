export type Flavor = {
  slug: string;
  name: string;
  description?: string;
  heatLevel?: number; // 1-5, undecided until Karl provides ratings
  price?: number;
  featured?: boolean;
  /** Path under /public to the exported bottle art, e.g. "/sauces/mango-habanero.png" (2048x2048 source). */
  image?: string;
  /** Flavor-specific dietary/ingredient callout (vegan status, alcohol content, etc.). */
  note?: string;
};

export const flavors: Flavor[] = [
  {
    slug: "mango-habanero",
    name: "Mango Habanero",
    featured: true,
    image: "/FinishedSauces/MangoHabaneroArt.png",
    description:
      "Probably my best seller for a reason. Most mango sauces taste like mango but mostly like hot sauce with some mango in it. This Mango Habanero is mostly mango so you get fresh sweet tangy mango up front. Then a Habanero kick on the back end. Perfect balance of sweet and heat!",
  },
  {
    slug: "verdie-birdie",
    name: "Verdie Birdie",
    featured: true,
    image: "/FinishedSauces/VerdieBirdieArt.png",
    description:
      "A Jalapeño, green onion, and cilantro hot sauce with a touch of chicken bouillon. Tangy and delicious.  Full of flavor!",
    note: "Contains chicken bouillon — not a vegan product.",
  },
  {
    slug: "creole-garlic",
    name: "Creole Garlic",
    image: "/FinishedSauces/CreoleGarlicArt.png",
    description:
      "A medium heat Louisiana style hot sauce made with Red Chili  peppers and, a Lot of Garlic!",
  },
  {
    slug: "scorp",
    name: "Scorp",
    image: "/FinishedSauces/ScorpArt.png",
    description:
      "A high-heat Louisiana-style sauce made with Trinidad Scorpion peppers and a touch of garlic. A tangy hot flavor that will wake up the flavor of anything you put it on!",
  },
  {
    slug: "ole-whiskey-dick",
    name: "Ole Whiskey Dick",
    featured: true,
    image: "/FinishedSauces/OleWhiskeyDickArt.png",
    description:
      "A brown sugar and bourbon hot sauce made with Kentucky bourbon and Habaneros.  A deep, rich sweet-heat  sauce often used as a glaze for grilled meats or fish. But of course it can be put on anything!",
    note: "No alcohol — it dissipates during cooking, only the whiskey flavor remains.",
  },
  {
    slug: "ginger-dragon",
    name: "Ginger Dragon",
    image: "/FinishedSauces/GingerDragonArt.png",
    description:
      "An Asian inspired sweet-heat sauce made with Thai chilis, soy, garlic, and ginger. A sweet-heat taste explosion!",
  },
  {
    slug: "fallen-angel",
    name: "Fallen Angel",
    image: "/FinishedSauces/FallenAngelArt.png",
    description:
      "An insanely hot Carolina Reaper sauce that's not for the faint of heart. Super hot but also has flavor. Contains garlic and chicken bouillon and a touch of sweetness. An adrenaline rush in your mouth!",
    note: "Contains chicken bouillon — not a vegan product.",
  },
  {
    slug: "smokey-chipotle",
    name: "Smokey Chipotle",
    image: "/FinishedSauces/SmokeyChipotleArt.png",
    description:
      "A rich red Louisiana-style sauce with Red Chili peppers and Smoked Morita peppers. Medium heat, full flavor!",
  },
];
