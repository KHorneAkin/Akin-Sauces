import Image from "next/image";
import Link from "next/link";
import { flavors } from "@/data/flavors";
import { QuantityStepper } from "@/components/QuantityStepper";
import { ORDERING_ENABLED, siteConfig } from "@/lib/site-config";

export default function Home() {
  const featured = flavors.filter((f) => f.featured);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gold/20 bg-gradient-to-b from-background-raised to-background px-6 py-24 text-center">
        {siteConfig.heroImage && (
          <div className="absolute inset-0">
            <Image
              src={siteConfig.heroImage}
              alt=""
              fill
              priority
              className="object-cover"
              style={{ objectPosition: "30% center" }}
            />
            <div className="absolute inset-0 bg-background/60" />
          </div>
        )}
        <div className="relative">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-ember">
            Hand-crafted &middot; Small batch
          </p>
          <h1 className="mx-auto max-w-2xl">
            {siteConfig.logo.lockup ?? siteConfig.logo.icon ? (
              <Image
                src={(siteConfig.logo.lockup ?? siteConfig.logo.icon) as string}
                alt={siteConfig.businessName}
                width={600}
                height={405}
                className="mx-auto h-24 w-auto sm:h-32"
                priority
              />
            ) : (
              <span className="text-4xl font-bold tracking-tight text-gold-soft sm:text-5xl">
                {siteConfig.businessName}
              </span>
            )}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg tracking-wide text-foreground-muted">
            {siteConfig.subBrand}
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
                className="overflow-hidden rounded-xl border border-gold/20 bg-background-raised transition-colors hover:border-gold/50"
              >
                <div className="relative aspect-square w-full bg-background">
                  {flavor.image ? (
                    <Image src={flavor.image} alt={flavor.name} fill className="object-contain" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-foreground-muted">
                      Photo coming soon
                    </div>
                  )}
                  <div className="absolute right-3 top-3">
                    {ORDERING_ENABLED ? (
                      <button
                        type="button"
                        className="rounded-full bg-gold px-3 py-1.5 text-xs font-semibold text-background"
                        disabled
                      >
                        Coming soon
                      </button>
                    ) : (
                      <QuantityStepper slug={flavor.slug} name={flavor.name} />
                    )}
                  </div>
                </div>
                <div className="px-4 py-3">
                  <h3 className="text-lg font-semibold text-foreground">{flavor.name}</h3>
                </div>
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
          <p className="mt-4">
            <span className="text-lg font-semibold text-gold-soft">akin</span>{" "}
            <span className="text-foreground-muted">əˈkin</span>
          </p>
          <p className="mt-1 text-sm italic text-foreground-muted">
            Similar, related, or having the same qualities.
          </p>
          <p className="mt-4 text-foreground-muted">
            {`${siteConfig.businessName} started with a simple goal: build sauces people actually crave, not just tolerate. Every bottle is small-batch, made with real ingredients, and built around bold, distinct flavor — not just heat for heat's sake.`}
          </p>
        </div>
      </section>

      {/* About the owner */}
      <section className="px-6 py-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full border border-gold/30 bg-white">
            {siteConfig.ownerPhoto && (
              <Image src={siteConfig.ownerPhoto} alt={siteConfig.owner} fill className="object-cover" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gold-soft">Meet {siteConfig.owner}</h2>
            <p className="mt-4 text-foreground-muted">
              {`${siteConfig.owner} is the hands behind every bottle — from the recipe to the label. What started as a personal obsession with getting flavor right has grown into ${siteConfig.businessName}, one batch at a time.`}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
