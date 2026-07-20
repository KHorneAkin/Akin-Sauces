import type { Metadata } from "next";
import { flavors } from "@/data/flavors";
import { OrderButton } from "@/components/OrderButton";
import { ORDERING_ENABLED } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Sauces",
};

export default function SaucesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-gold-soft">The full lineup</h1>
      <p className="mt-2 max-w-xl text-foreground-muted">
        {`${flavors.length} flavors and counting. Text or email to order — online checkout is coming soon.`}
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {flavors.map((flavor) => (
          <div
            key={flavor.slug}
            className="flex flex-col justify-between rounded-xl border border-gold/20 bg-background-raised p-6 transition-colors hover:border-gold/50"
          >
            <div>
              <h2 className="text-lg font-semibold text-foreground">{flavor.name}</h2>
              {flavor.description && (
                <p className="mt-2 text-sm text-foreground-muted">{flavor.description}</p>
              )}
            </div>
            <div className="mt-6">
              {ORDERING_ENABLED ? (
                <button
                  type="button"
                  className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-background"
                  disabled
                >
                  Add to cart
                </button>
              ) : (
                <OrderButton flavorName={flavor.name} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
