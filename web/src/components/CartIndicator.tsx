"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export function CartIndicator() {
  const { count } = useCart();

  return (
    <Link href="/cart" className="relative flex items-center transition-colors hover:text-gold-soft">
      Cart
      {count > 0 && (
        <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-ember px-1 text-[10px] font-bold leading-none text-foreground">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}
