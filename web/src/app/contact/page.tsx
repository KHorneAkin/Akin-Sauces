import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold text-gold-soft">Get in touch</h1>
      <p className="mt-2 text-foreground-muted">
        Questions, bulk orders, or just want to talk sauce? Reach out.
      </p>

      <div className="mt-6 flex flex-col gap-1 text-sm text-foreground-muted">
        <a href={`tel:${siteConfig.phoneHref}`} className="hover:text-gold-soft">
          {siteConfig.phone}
        </a>
        <a href={`mailto:${siteConfig.email}`} className="hover:text-gold-soft">
          {siteConfig.email}
        </a>
      </div>

      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
