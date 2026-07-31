"use client";

import { useState, type FormEvent } from "react";
import { CONTACT_REASONS } from "@/lib/contact-reasons";
import { siteConfig } from "@/lib/site-config";

type SendState = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState<string>(CONTACT_REASONS[0].value);
  const [message, setMessage] = useState("");
  const [sendState, setSendState] = useState<SendState>("idle");

  const buildMailto = () => {
    const subject = encodeURIComponent(`Message from ${name || "the website"}`);
    const body = encodeURIComponent(message);
    return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSendState("sending");
    try {
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, reason, message }),
      });
      if (!res.ok) throw new Error("Send failed");
      setSendState("sent");
    } catch {
      // Email service unavailable/misconfigured — fall back to the
      // visitor's own email client so the message still goes through.
      setSendState("error");
      window.location.href = buildMailto();
    }
  }

  if (sendState === "sent") {
    return (
      <p className="rounded-lg border border-gold/20 bg-background-raised px-4 py-3 text-foreground-muted">
        Message sent! Karl will reply to {email} soon.
      </p>
    );
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
        Email
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="rounded-lg border border-gold/20 bg-background-raised px-4 py-2 text-foreground outline-none focus:border-gold"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-foreground-muted">
        What&rsquo;s this about?
        <select
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          className="rounded-lg border border-gold/20 bg-background-raised px-4 py-2 text-foreground outline-none focus:border-gold"
        >
          {CONTACT_REASONS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
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

      {sendState === "error" && (
        <p className="text-sm text-ember">
          Couldn&rsquo;t send that automatically, so we&rsquo;ve opened your email app instead —
          just hit send there.
        </p>
      )}

      <button
        type="submit"
        disabled={sendState === "sending"}
        className="self-start rounded-full bg-gold px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-gold-soft disabled:opacity-50"
      >
        {sendState === "sending" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
