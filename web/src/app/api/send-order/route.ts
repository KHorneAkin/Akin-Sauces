import { readFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { flavors } from "@/data/flavors";
import { siteConfig } from "@/lib/site-config";

type OrderItem = { slug: string; name: string; qty: number };

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

  const lines = items.map((item) => `- ${item.qty}x ${item.name}`).join("\n");
  const text = `New order from ${customerEmail}:\n\n${lines}\n\nReply to this email to follow up on payment and shipping/pickup.`;

  // Dedupe by image path so flavors still sharing the placeholder art
  // (or any other repeated file) only get attached once per order.
  const uniqueImages = new Map<string, string>();
  for (const item of items) {
    const flavor = flavors.find((f) => f.slug === item.slug);
    if (flavor?.image && !uniqueImages.has(flavor.image)) {
      uniqueImages.set(flavor.image, item.slug);
    }
  }

  const attachments = await Promise.all(
    [...uniqueImages.entries()].map(async ([imagePath, slug]) => {
      const filePath = path.join(process.cwd(), "public", imagePath);
      const content = await readFile(filePath);
      return { filename: `${slug}${path.extname(imagePath)}`, content };
    })
  );

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: `${siteConfig.businessName} <${siteConfig.orderFromEmail}>`,
      to: siteConfig.email,
      replyTo: customerEmail,
      subject: `Order request from ${customerEmail}`,
      text,
      attachments,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send order email", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
