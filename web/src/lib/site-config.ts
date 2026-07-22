export const siteConfig = {
  businessName: "Akin' Sauces & Seasonings",
  owner: "Karl Horne",
  phone: "(904) 447-0906",
  phoneHref: "+19044470906",
  email: "kh854600@gmail.com",
  tagline: "Small-batch heat, big-time flavor.",
  /** Shown under the logo mark in the hero, since the mark itself only reads "akin". */
  subBrand: "Sauces & Seasonings",
  /**
   * Drop exported logo PNGs in /public and fill these in once ready.
   * icon: square mark, ~512x512. lockup: icon+wordmark, ~1600x480.
   * Falls back to the text wordmark until set.
   */
  logo: {
    icon: "/AkinLogo.svg" as string | undefined,
    lockup: undefined as string | undefined,
  },
  /** Hero banner image, ~2400x720 (letterbox band — hero height is fixed, width scales with viewport). Falls back to the gradient hero until set. Hidden below the sm breakpoint. */
  heroImage: "/AkinSiteBanner.png" as string | undefined,
  /** Owner headshot, square works best (~1000x1000). Falls back to text-only bio until set. */
  ownerPhoto: undefined as string | undefined,
};

/**
 * v2 real checkout (cart + Stripe) is built behind this flag per the
 * source-of-truth doc — flip on once Stripe keys + fulfillment model exist.
 */
export const ORDERING_ENABLED = false;
