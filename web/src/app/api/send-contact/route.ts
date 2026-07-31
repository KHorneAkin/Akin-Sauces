import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";
import { buildContactEmail } from "@/lib/contact-email";

export async function POST(request: NextRequest) {
  const { name, email, reason, message } = (await request.json()) as {
    name?: string;
    email?: string;
    reason?: string;
    message?: string;
  };

  if (!email || !message) {
    return NextResponse.json({ error: "Missing email or message" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const { html, text, attachments } = await buildContactEmail({
    name: name ?? "",
    email,
    reason: reason ?? "general",
    message,
  });

  try {
    await resend.emails.send({
      from: `${siteConfig.businessName} <${siteConfig.orderFromEmail}>`,
      to: siteConfig.email,
      replyTo: email,
      subject: `Message from ${name?.trim() || email}`,
      html,
      text,
      attachments,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send contact email", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
