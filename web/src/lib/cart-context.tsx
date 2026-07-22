"use client";

import { useSyncExternalStore } from "react";

export type CartItem = { slug: string; name: string; qty: number };

const STORAGE_KEY = "akin-cart";
const listeners = new Set<() => void>();

function readStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

let cachedItems: CartItem[] = readStorage();

function commit(items: CartItem[]) {
  cachedItems = items;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return cachedItems;
}

const EMPTY_ITEMS: CartItem[] = [];

function getServerSnapshot(): CartItem[] {
  return EMPTY_ITEMS;
}

export function addItem(slug: string, name: string) {
  const existing = cachedItems.find((i) => i.slug === slug);
  commit(
    existing
      ? cachedItems.map((i) => (i.slug === slug ? { ...i, qty: i.qty + 1 } : i))
      : [...cachedItems, { slug, name, qty: 1 }]
  );
}

export function removeItem(slug: string) {
  commit(cachedItems.filter((i) => i.slug !== slug));
}

export function updateQty(slug: string, qty: number) {
  commit(
    qty <= 0
      ? cachedItems.filter((i) => i.slug !== slug)
      : cachedItems.map((i) => (i.slug === slug ? { ...i, qty } : i))
  );
}

export function clearCart() {
  commit([]);
}

export function useCart() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  return { items, count, addItem, removeItem, updateQty, clear: clearCart };
}
