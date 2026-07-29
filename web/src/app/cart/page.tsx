"use client";

import Image from "next/image";
import Link from "next/link";
import { flavors } from "@/data/flavors";
import { useCart } from "@/lib/cart-context";
import { siteConfig } from "@/lib/site-config";

export default function CartPage() {
  const { items, updateQty, removeItem, clear } = useCart();

  const buildMailto = () => {
    const lines = items.map((i) => `- ${i.qty}x ${i.name}`).join("\n");
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const subject = encodeURIComponent("Order request");
    const body = encodeURIComponent(
      `Hey Karl, I'd like to order:\n\n${lines}\n\nSee photos of these sauces at ${origin}/sauces\n\nLet me know how to complete it!`
    );
    return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h1 className="text-3xl font-bold text-gold-soft">Your cart is empty</h1>
        <p className="mt-4 text-foreground-muted">
          Add a few flavors from the{" "}
          <Link href="/sauces" className="text-gold-soft hover:underline">
            full lineup
          </Link>{" "}
          to build your order.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold text-gold-soft">Your order</h1>
      <p className="mt-2 text-foreground-muted">
        Review your flavors, then send it to Karl — he&rsquo;ll follow up on payment and
        pickup/shipping.
      </p>

      <ul className="mt-8 flex flex-col gap-4">
        {items.map((item) => {
          const flavor = flavors.find((f) => f.slug === item.slug);
          return (
          <li
            key={item.slug}
            className="flex items-center justify-between rounded-xl border border-gold/20 bg-background-raised p-4"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-background">
                {flavor?.image ? (
                  <Image
                    src={flavor.image}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="object-contain"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[9px] text-foreground-muted">
                    No photo
                  </div>
                )}
              </div>
              <span className="font-semibold text-foreground">{item.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => updateQty(item.slug, item.qty - 1)}
                aria-label={`Decrease ${item.name} quantity`}
                className="h-8 w-8 rounded-full border border-gold/40 text-gold-soft transition-colors hover:bg-background"
              >
                &minus;
              </button>
              <span className="w-6 text-center">{item.qty}</span>
              <button
                type="button"
                onClick={() => updateQty(item.slug, item.qty + 1)}
                aria-label={`Increase ${item.name} quantity`}
                className="h-8 w-8 rounded-full border border-gold/40 text-gold-soft transition-colors hover:bg-background"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => removeItem(item.slug)}
                className="text-sm text-foreground-muted hover:text-ember"
              >
                Remove
              </button>
            </div>
          </li>
          );
        })}
      </ul>

      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href={buildMailto()}
          className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-gold-soft"
        >
          Send order to Karl
        </a>
        <button
          type="button"
          onClick={clear}
          className="rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold text-gold-soft transition-colors hover:bg-background-raised"
        >
          Clear cart
        </button>
      </div>
    </div>
  );
}
