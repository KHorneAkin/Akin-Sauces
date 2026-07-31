import { readFile } from "fs/promises";
import path from "path";
import { flavors } from "@/data/flavors";
import { siteConfig } from "@/lib/site-config";

export type OrderItem = { slug: string; name: string; qty: number };

async function readPublicFile(publicPath: string) {
  return readFile(path.join(process.cwd(), "public", publicPath));
}

export async function buildOrderEmail(items: OrderItem[], customerEmail: string) {
  // Dedupe by image path so flavors still sharing the placeholder art
  // (or any other repeated file) only get attached/embedded once.
  const uniqueImages = new Map<string, string>();
  for (const item of items) {
    const flavor = flavors.find((f) => f.slug === item.slug);
    if (flavor?.image && !uniqueImages.has(flavor.image)) {
      uniqueImages.set(flavor.image, item.slug);
    }
  }

  const [logoContent, ...imageAttachments] = await Promise.all([
    readPublicFile("/AkinLogoEmail.png"),
    ...[...uniqueImages.entries()].map(async ([imagePath, slug]) => ({
      filename: `${slug}${path.extname(imagePath)}`,
      content: await readPublicFile(imagePath),
      contentId: slug,
    })),
  ]);

  const attachments = [
    { filename: "logo.png", content: logoContent, contentId: "logo" },
    ...imageAttachments,
  ];

  const rows = items
    .map((item) => {
      const flavor = flavors.find((f) => f.slug === item.slug);
      const thumb = flavor?.image
        ? `<img src="cid:${item.slug}" width="48" height="48" style="border-radius:8px;background:#0a0908;display:block;" alt="${item.name}" />`
        : `<div style="width:48px;height:48px;border-radius:8px;background:#0a0908;"></div>`;
      return `
        <tr>
          <td width="56" style="vertical-align:top;padding-bottom:12px;">${thumb}</td>
          <td style="vertical-align:middle;padding-left:12px;padding-bottom:12px;color:#f5f0e6;font-size:15px;font-family:Arial,Helvetica,sans-serif;">
            ${item.qty}x ${item.name}
          </td>
        </tr>`;
    })
    .join("");

  const html = `
<div style="background:#0a0908;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:480px;margin:0 auto;background:#17140f;border:1px solid rgba(212,175,55,0.3);border-radius:12px;overflow:hidden;">
    <div style="padding:24px;text-align:center;border-bottom:1px solid rgba(212,175,55,0.2);">
      <img src="cid:logo" alt="${siteConfig.businessName}" width="140" style="display:inline-block;" />
      <p style="margin:8px 0 0;color:#b8afa0;font-size:12px;letter-spacing:1px;text-transform:uppercase;">New Order</p>
    </div>
    <div style="padding:24px;">
      <p style="color:#f5f0e6;font-size:15px;margin:0 0 16px;">Order from <strong>${customerEmail}</strong></p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${rows}
      </table>
      <p style="color:#b8afa0;font-size:13px;margin:12px 0 0;">
        Reply directly to this email to follow up on payment and pickup/shipping.
      </p>
    </div>
    <div style="padding:16px 24px;background:#0a0908;text-align:center;border-top:1px solid rgba(212,175,55,0.2);">
      <p style="color:#b8afa0;font-size:12px;margin:0;">${siteConfig.businessName} &middot; ${siteConfig.phone}</p>
    </div>
  </div>
</div>`;

  const text = `New order from ${customerEmail}:\n\n${items
    .map((item) => `- ${item.qty}x ${item.name}`)
    .join("\n")}\n\nReply to this email to follow up on payment and shipping/pickup.`;

  return { html, text, attachments };
}
