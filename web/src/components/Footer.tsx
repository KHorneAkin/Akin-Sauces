import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-background-raised">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-foreground-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.businessName}
        </p>
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
          <a href={`tel:${siteConfig.phoneHref}`} className="hover:text-gold-soft">
            {siteConfig.phone}
          </a>
          <a href={`mailto:${siteConfig.email}`} className="hover:text-gold-soft">
            {siteConfig.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
