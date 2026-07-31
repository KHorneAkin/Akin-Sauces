import { readFile } from "fs/promises";
import path from "path";
import { siteConfig } from "@/lib/site-config";

export async function readPublicFile(publicPath: string) {
  return readFile(path.join(process.cwd(), "public", publicPath));
}

export async function getLogoAttachment() {
  return {
    filename: "logo.png",
    content: await readPublicFile("/AkinLogoEmail.png"),
    contentId: "logo",
  };
}

export function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Shared black/gold card shell — logo header, arbitrary body, contact footer. */
export function wrapEmailHtml(eyebrow: string, bodyHtml: string) {
  return `
<div style="background:#0a0908;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:480px;margin:0 auto;background:#17140f;border:1px solid rgba(212,175,55,0.3);border-radius:12px;overflow:hidden;">
    <div style="padding:24px;text-align:center;border-bottom:1px solid rgba(212,175,55,0.2);">
      <img src="cid:logo" alt="${siteConfig.businessName}" width="140" style="display:inline-block;" />
      <p style="margin:8px 0 0;color:#b8afa0;font-size:12px;letter-spacing:1px;text-transform:uppercase;">${eyebrow}</p>
    </div>
    <div style="padding:24px;">
      ${bodyHtml}
    </div>
    <div style="padding:16px 24px;background:#0a0908;text-align:center;border-top:1px solid rgba(212,175,55,0.2);">
      <p style="color:#b8afa0;font-size:12px;margin:0;">${siteConfig.businessName} &middot; ${siteConfig.phone}</p>
    </div>
  </div>
</div>`;
}
