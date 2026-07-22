import type { Metadata } from "next";
import Image from "next/image";
import { flavors } from "@/data/flavors";
import { QuantityStepper } from "@/components/QuantityStepper";
import { ORDERING_ENABLED } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Sauces",
};

export default function SaucesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-gold-soft">The full lineup</h1>
      <p className="mt-2 max-w-xl text-foreground-muted">
        {`${flavors.length} flavors and counting. Add what you want to your cart, then send Karl the order.`}
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {flavors.map((flavor) => (
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
              <h2 className="text-lg font-semibold text-foreground">{flavor.name}</h2>
              {flavor.description && (
                <p className="mt-1 text-sm text-foreground-muted">{flavor.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
