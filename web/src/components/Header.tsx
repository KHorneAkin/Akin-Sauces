import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { CartIndicator } from "@/components/CartIndicator";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/sauces", label: "Sauces" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center text-lg font-semibold tracking-wide text-gold-soft">
          {siteConfig.logo.lockup ?? siteConfig.logo.icon ? (
            <Image
              src={(siteConfig.logo.lockup ?? siteConfig.logo.icon) as string}
              alt={siteConfig.businessName}
              width={600}
              height={405}
              className="h-10 w-auto"
              priority
            />
          ) : (
            siteConfig.businessName
          )}
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-foreground-muted">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-gold-soft"
            >
              {link.label}
            </Link>
          ))}
          <CartIndicator />
        </nav>
      </div>
    </header>
  );
}
