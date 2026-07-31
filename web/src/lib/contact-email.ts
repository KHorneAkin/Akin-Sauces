import { escapeHtml, getLogoAttachment, wrapEmailHtml } from "@/lib/email-layout";
import { CONTACT_REASONS } from "@/lib/contact-reasons";

function reasonLabel(reason: string) {
  return CONTACT_REASONS.find((r) => r.value === reason)?.label ?? "General question";
}

export async function buildContactEmail({
  name,
  email,
  reason,
  message,
}: {
  name: string;
  email: string;
  reason: string;
  message: string;
}) {
  const logoAttachment = await getLogoAttachment();
  const label = reasonLabel(reason);
  const displayName = name.trim() || "Someone";

  const bodyHtml = `
    <p style="color:#f5f0e6;font-size:15px;margin:0 0 8px;"><strong>${escapeHtml(displayName)}</strong> (${escapeHtml(email)}) reached out about:</p>
    <p style="display:inline-block;margin:0 0 16px;padding:4px 12px;border-radius:999px;background:rgba(212,175,55,0.15);color:#e8cd6e;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:0.5px;">${escapeHtml(label)}</p>
    <p style="color:#f5f0e6;font-size:15px;line-height:1.5;white-space:pre-wrap;margin:0 0 16px;">${escapeHtml(message)}</p>
    <p style="color:#b8afa0;font-size:13px;margin:0;">Reply directly to this email to respond to ${escapeHtml(email)}.</p>`;

  const html = wrapEmailHtml("New Message", bodyHtml);

  const text = `New message from ${displayName} (${email}) about ${label}:\n\n${message}\n\nReply to this email to respond.`;

  return { html, text, attachments: [logoAttachment] };
}
