import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";
import { buildOrderEmail, type OrderItem } from "@/lib/order-email";

export async function POST(request: NextRequest) {
  const { items, customerEmail } = (await request.json()) as {
    items?: OrderItem[];
    customerEmail?: string;
  };

  if (!items?.length || !customerEmail) {
    return NextResponse.json({ error: "Missing items or customer email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const { html, text, attachments } = await buildOrderEmail(items, customerEmail);

  try {
    await resend.emails.send({
      from: `${siteConfig.businessName} <${siteConfig.orderFromEmail}>`,
      to: siteConfig.email,
      replyTo: customerEmail,
      subject: `Order request from ${customerEmail}`,
      html,
      text,
      attachments,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send order email", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
