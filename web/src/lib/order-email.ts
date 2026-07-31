import path from "path";
import { flavors } from "@/data/flavors";
import { escapeHtml, getLogoAttachment, readPublicFile, wrapEmailHtml } from "@/lib/email-layout";

export type OrderItem = { slug: string; name: string; qty: number };

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

  const [logoAttachment, ...imageAttachments] = await Promise.all([
    getLogoAttachment(),
    ...[...uniqueImages.entries()].map(async ([imagePath, slug]) => ({
      filename: `${slug}${path.extname(imagePath)}`,
      content: await readPublicFile(imagePath),
      contentId: slug,
    })),
  ]);

  const attachments = [logoAttachment, ...imageAttachments];

  const rows = items
    .map((item) => {
      const flavor = flavors.find((f) => f.slug === item.slug);
      const thumb = flavor?.image
        ? `<img src="cid:${item.slug}" width="48" height="48" style="border-radius:8px;background:#0a0908;display:block;" alt="${escapeHtml(item.name)}" />`
        : `<div style="width:48px;height:48px;border-radius:8px;background:#0a0908;"></div>`;
      return `
        <tr>
          <td width="56" style="vertical-align:top;padding-bottom:12px;">${thumb}</td>
          <td style="vertical-align:middle;padding-left:12px;padding-bottom:12px;color:#f5f0e6;font-size:15px;font-family:Arial,Helvetica,sans-serif;">
            ${item.qty}x ${escapeHtml(item.name)}
          </td>
        </tr>`;
    })
    .join("");

  const bodyHtml = `
    <p style="color:#f5f0e6;font-size:15px;margin:0 0 16px;">Order from <strong>${escapeHtml(customerEmail)}</strong></p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${rows}
    </table>
    <p style="color:#b8afa0;font-size:13px;margin:12px 0 0;">
      Reply directly to this email to follow up on payment and pickup/shipping.
    </p>`;

  const html = wrapEmailHtml("New Order", bodyHtml);

  const text = `New order from ${customerEmail}:\n\n${items
    .map((item) => `- ${item.qty}x ${item.name}`)
    .join("\n")}\n\nReply to this email to follow up on payment and shipping/pickup.`;

  return { html, text, attachments };
}
