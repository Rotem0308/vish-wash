import { NextRequest, NextResponse } from "next/server";

// Never execute this route at build time (requires RESEND_API_KEY at runtime)
export const dynamic = "force-dynamic";

// ─── Server-side IP rate limiter ─────────────────────────────────────────────
// Resets on serverless cold-start. For persistent limits add Upstash Redis.
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_PER_WINDOW = 3; // max submissions per IP per 24 h

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.windowStart > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (record.count >= MAX_PER_WINDOW) {
    return true;
  }

  record.count++;
  return false;
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Resolve client IP (works on Vercel)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    // Allow bypass in dev/testing when both the server flag and the client header are set
    const devBypass =
      process.env.DISABLE_RATE_LIMIT === "true" &&
      req.headers.get("x-dev-bypass") === "1";

    if (!devBypass) {
      return NextResponse.json(
        { error: "rate_limited", message: "נשלחו יותר מדי פניות. נסו שוב מחר." },
        { status: 429 }
      );
    }
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { name, phone, email, message } = body;

  if (!name?.trim() || !phone?.trim()) {
    return NextResponse.json(
      { error: "missing_fields", message: "שם ומספר טלפון הם שדות חובה." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY env var is not set.");
    return NextResponse.json({ error: "server_config" }, { status: 500 });
  }
  // Dynamic import prevents Resend from being evaluated at build time
  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const toEmail =
    process.env.CONTACT_EMAIL ?? process.env.NEXT_PUBLIC_EMAIL ?? "";
  const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME ?? "Vish Wash";

  if (!toEmail) {
    console.error("CONTACT_EMAIL env var is not set.");
    return NextResponse.json({ error: "server_config" }, { status: 500 });
  }

  try {
    await resend.emails.send({
      // Use your verified Resend domain in production.
      // During development "onboarding@resend.dev" works without domain setup.
      from: `${businessName} Contact Form <onboarding@resend.dev>`,
      to: [toEmail],
      replyTo: email?.trim() || undefined,
      subject: `פנייה חדשה מ-${name} – ${businessName}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #1d4ed8; margin-bottom: 24px;">פנייה חדשה דרך האתר</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #374151; width: 140px;">שם:</td>
              <td style="padding: 10px 0; color: #111827;">${name}</td>
            </tr>
            <tr style="background: #f9fafb;">
              <td style="padding: 10px; font-weight: bold; color: #374151;">טלפון:</td>
              <td style="padding: 10px; color: #111827;">
                <a href="tel:${phone}" style="color: #1d4ed8;">${phone}</a>
              </td>
            </tr>
            ${
              email
                ? `<tr>
              <td style="padding: 10px 0; font-weight: bold; color: #374151;">אימייל:</td>
              <td style="padding: 10px 0; color: #111827;">
                <a href="mailto:${email}" style="color: #1d4ed8;">${email}</a>
              </td>
            </tr>`
                : ""
            }
            ${
              message
                ? `<tr style="background: #f9fafb;">
              <td style="padding: 10px; font-weight: bold; color: #374151; vertical-align: top;">הודעה:</td>
              <td style="padding: 10px; color: #111827; white-space: pre-wrap;">${message}</td>
            </tr>`
                : ""
            }
          </table>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;" />
          <p style="font-size: 12px; color: #9ca3af;">פנייה זו נשלחה מטופס יצירת הקשר באתר ${businessName}.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "send_failed", message: "שליחת האימייל נכשלה. נסו שוב מאוחר יותר." },
      { status: 500 }
    );
  }
}
