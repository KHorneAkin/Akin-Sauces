"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site-config";

export function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(`Message from ${name || "the website"}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm text-foreground-muted">
        Name
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded-lg border border-gold/20 bg-background-raised px-4 py-2 text-foreground outline-none focus:border-gold"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-foreground-muted">
        Message
        <textarea
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="rounded-lg border border-gold/20 bg-background-raised px-4 py-2 text-foreground outline-none focus:border-gold"
        />
      </label>
      <button
        type="submit"
        className="self-start rounded-full bg-gold px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-gold-soft"
      >
        Send
      </button>
    </form>
  );
}
