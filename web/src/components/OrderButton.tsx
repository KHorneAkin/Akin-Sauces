import { siteConfig } from "@/lib/site-config";

export function OrderButton({ flavorName }: { flavorName: string }) {
  const subject = encodeURIComponent(`Order: ${flavorName}`);
  const body = encodeURIComponent(
    `Hey Karl, I'd like to order the ${flavorName} sauce. Let me know how to complete it!`
  );

  return (
    <a
      href={`mailto:${siteConfig.email}?subject=${subject}&body=${body}`}
      className="inline-block rounded-full border border-gold px-4 py-2 text-sm font-medium text-gold-soft transition-colors hover:bg-gold hover:text-background"
    >
      Order this flavor
    </a>
  );
}
