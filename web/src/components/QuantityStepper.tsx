"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export function QuantityStepper({ slug, name }: { slug: string; name: string }) {
  const { items, addItem, updateQty } = useCart();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  const qty = items.find((i) => i.slug === slug)?.qty ?? 0;

  const commitDraft = () => {
    const parsed = Math.max(0, Math.floor(Number(draft)));
    updateQty(slug, Number.isFinite(parsed) ? parsed : qty);
    setEditing(false);
  };

  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={() => addItem(slug, name)}
        aria-label={`Add ${name} to cart`}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-lg font-bold leading-none text-background shadow-lg transition-colors hover:bg-gold-soft"
      >
        +
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1 rounded-full bg-background/90 px-1 py-1 shadow-lg backdrop-blur">
      <button
        type="button"
        onClick={() => updateQty(slug, qty - 1)}
        aria-label={`Decrease ${name} quantity`}
        className="flex h-7 w-7 items-center justify-center rounded-full text-gold-soft transition-colors hover:bg-background-raised"
      >
        &minus;
      </button>
      {editing ? (
        <input
          autoFocus
          type="number"
          min={0}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onFocus={(e) => e.target.select()}
          onBlur={commitDraft}
          onKeyDown={(e) => e.key === "Enter" && commitDraft()}
          className="w-10 rounded bg-background-raised text-center text-sm text-foreground outline-none"
        />
      ) : (
        <span
          onDoubleClick={() => {
            setDraft(String(qty));
            setEditing(true);
          }}
          className="w-6 text-center text-sm font-semibold text-foreground"
        >
          {qty}
        </span>
      )}
      <button
        type="button"
        onClick={() => updateQty(slug, qty + 1)}
        aria-label={`Increase ${name} quantity`}
        className="flex h-7 w-7 items-center justify-center rounded-full text-gold-soft transition-colors hover:bg-background-raised"
      >
        +
      </button>
    </div>
  );
}
