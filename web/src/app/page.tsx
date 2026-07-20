import Link from "next/link";
import { flavors } from "@/data/flavors";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  const featured = flavors.filter((f) => f.featured);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="border-b border-gold/20 bg-gradient-to-b from-background-raised to-background px-6 py-24 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-ember">
          Hand-crafted &middot; Small batch
        </p>
        <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-gold-soft sm:text-5xl">
          {siteConfig.businessName}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-foreground-muted">
          {siteConfig.tagline}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/sauces"
            className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-gold-soft"
          >
            Browse the flavors
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold text-gold-soft transition-colors hover:bg-background-raised"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* Sauce preview */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold text-gold-soft">Fan favorites</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {featured.map((flavor) => (
              <div
                key={flavor.slug}
                className="rounded-xl border border-gold/20 bg-background-raised p-6 transition-colors hover:border-gold/50"
              >
                <h3 className="text-lg font-semibold text-foreground">{flavor.name}</h3>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/sauces" className="text-sm font-medium text-gold-soft hover:underline">
              See the full lineup &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* About the business */}
      <section className="border-t border-gold/20 bg-background-raised px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold text-gold-soft">Our roots</h2>
          <p className="mt-4 text-foreground-muted">
            {`${siteConfig.businessName} started with a simple goal: build sauces people actually crave, not just tolerate. Every bottle is small-batch, made with real ingredients, and built around bold, distinct flavor — not just heat for heat's sake.`}
          </p>
        </div>
      </section>

      {/* About the owner */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold text-gold-soft">Meet {siteConfig.owner}</h2>
          <p className="mt-4 text-foreground-muted">
            {`${siteConfig.owner} is the hands behind every bottle — from the recipe to the label. What started as a personal obsession with getting flavor right has grown into ${siteConfig.businessName}, one batch at a time.`}
          </p>
        </div>
      </section>
    </div>
  );
}
