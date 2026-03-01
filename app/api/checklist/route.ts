import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// ─── Checklist data ───────────────────────────────────────────────────────────
const CHECKLISTS: Record<string, { title: string; items: string[] }> = {
  office: {
    title: "צ'קליסט ניקוי משרד",
    items: [
      "ניקוי ואיבוק שולחנות עבודה וכסאות",
      "ניקוי מסכי מחשב, מקלדות ועכברים",
      "ניקוי ואיבוק מדפים, ארוניות ומגירות",
      "שאיבת שטיחים ופרקטים או מגוב רצפות",
      "ניקוי שירותים ואזורי רחצה עם חומרים מחטאים",
      "ניקוי מטבחון – ספות, כיור, מיקרוגל ומקרר (חיצוני)",
      "רוקנו פחי אשפה והחלפת שקיות",
      "ניקוי זגוגיות מחיצות ומשטחי זכוכית",
      "ניקוי מסדרונות, אזורי כניסה ולובי",
      "ניקוי מכשיר הדפסה ומשטחים משותפים",
      "החלפת מגבות נייר, סבון ידיים ונייר טואלט",
      "ניקוי ידיות דלתות, מתגי אור ולחצנים",
      "ניקוי ווילונות, רולטות ורהיטים קלים",
      "טיפול בכתמים על שטיחים ורצפות",
      "ריסוס חיטוי משטחים בתדירות גבוהה (שולחנות, ידיות)",
    ],
  },
  clinic: {
    title: "צ'קליסט ניקוי קליניקה",
    items: [
      "חיטוי כל המשטחים בחדרי הטיפולים בין מטופל למטופל",
      "ניקוי וחיטוי שירותים ואזורי רחצה לקהל",
      "החלפת ציפות נייר על מיטות הטיפול",
      "ניקוי ואיבוק אזור המתנה ורהיטים",
      "חיטוי ידיות דלתות, מתגי אור ולחצני מעלית",
      "ניקוי ריצוף עם חומרים מחטאים מאושרים",
      "פינוי פסולת רפואית ורגילה לפי נהלים",
      "חיטוי כיורים, ברזים ומשטחי עבודה",
      "ניקוי פנל העבודה ומשטחי הכנה",
      "בדיקה וחיטוי מכשור שאינו בשימוש",
      "ריסוס ועיקור קירות ופינות בחדרי הטיפול",
      "ניקוי ומחיקת כתמים מרצפות אנטי-חיידקיות",
      "רוקנו ועיקור קופסאות חדות (Sharp containers)",
      "עדכון יומן ניקוי וחיטוי",
      "בדיקת מלאי חומרי חיטוי וציוד מגן אישי",
    ],
  },
  apartment: {
    title: "צ'קליסט ניקוי דירה",
    items: [
      "שאיבת שטיחים ומגוב כל הרצפות",
      "ניקוי חדר אמבטיה – אמבטיה/מקלחת, כיור, אסלה",
      "ניקוי שירותים נפרדים (אם קיים)",
      "ניקוי מטבח – ספות, כיור, קאונטרים וקבינטים",
      "ניגוב חיצוני ופנימי של מיקרוגל ותנור",
      "ניקוי חיצוני ופנימי של מקרר (כולל דלת בלי חיצונית)",
      "ניקוי מרפסת / גינה / כניסה",
      "איבוק ריהוט בסלון, חדרי שינה ומדפים",
      "ניקוי חלונות וזגוגיות פנימיות",
      "פינוי אשפה מכל החדרים",
      "ניקוי תחתיות רהיטים ואזורים 'מתים'",
      "ניקוי מכשיר כביסה ומייבש (גומיות, מגירת אבקה)",
      "ניקוי מאווררים, מנורות ומנקי אוויר",
      "ניקוי דלתות-פנים, ידיות ומסגרות",
      "ריסוס חיטוי משטחים בשכיחות גבוהה (ידיות, שולחן אוכל)",
    ],
  },
};

// ─── Simple rate limiter ──────────────────────────────────────────────────────
const rlMap = new Map<string, { count: number; windowStart: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = rlMap.get(ip);
  if (!rec || now - rec.windowStart > 24 * 60 * 60 * 1000) {
    rlMap.set(ip, { count: 1, windowStart: now });
    return false;
  }
  if (rec.count >= 5) return true;
  rec.count++;
  return false;
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "rate_limited", message: "נשלחו יותר מדי בקשות. נסו שוב מחר." },
      { status: 429 }
    );
  }

  let body: Record<string, string>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "invalid_json" }, { status: 400 }); }

  const { email, type } = body;

  if (!email?.trim() || !type) {
    return NextResponse.json(
      { error: "missing_fields", message: "אנא הזינו כתובת אימייל ובחרו סוג צ'קליסט." },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return NextResponse.json(
      { error: "invalid_email", message: "כתובת האימייל אינה תקינה." },
      { status: 400 }
    );
  }

  const checklist = CHECKLISTS[type];
  if (!checklist) {
    return NextResponse.json({ error: "invalid_type" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY not set");
    return NextResponse.json({ error: "server_config" }, { status: 500 });
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME ?? "Vish Wash";

  const itemsHtml = checklist.items
    .map(
      (item, i) => `
      <tr style="background: ${i % 2 === 0 ? "#ffffff" : "#f9fafb"};">
        <td style="padding: 10px 12px; text-align: center; color: #7c3aed; font-weight: bold; width: 36px;">${i + 1}</td>
        <td style="padding: 10px 12px; color: #111827; font-size: 15px;">${item}</td>
        <td style="padding: 10px 12px; text-align: center; width: 32px;">
          <span style="display:inline-block; width:18px; height:18px; border:2px solid #7c3aed; border-radius:3px;"></span>
        </td>
      </tr>`
    )
    .join("");

  try {
    await resend.emails.send({
      from: `${businessName} <onboarding@resend.dev>`,
      to: [email.trim()],
      subject: `✅ ${checklist.title} – ${businessName}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); padding: 32px 24px; text-align: center;">
            <div style="font-size: 40px; margin-bottom: 8px;">🧹</div>
            <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 800;">${checklist.title}</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">הוכן במיוחד עבורך על ידי ${businessName}</p>
          </div>
          <!-- Intro -->
          <div style="padding: 24px 24px 8px;">
            <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0;">
              שמחים לשלוח לך את הצ'קליסט המלא! הדפס/י ושמור/י לשימוש חוזר. ✅ = בוצע.
            </p>
          </div>
          <!-- Checklist table -->
          <div style="padding: 16px 24px 24px;">
            <table style="width: 100%; border-collapse: collapse; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb;">
              <thead>
                <tr style="background: #7c3aed;">
                  <th style="padding: 10px 12px; color: white; font-size: 13px; width: 36px;">#</th>
                  <th style="padding: 10px 12px; color: white; font-size: 13px; text-align: right;">משימה</th>
                  <th style="padding: 10px 12px; color: white; font-size: 13px; width: 32px;">✓</th>
                </tr>
              </thead>
              <tbody>${itemsHtml}</tbody>
            </table>
          </div>
          <!-- Footer CTA -->
          <div style="background: #f5f3ff; padding: 20px 24px; text-align: center; border-top: 1px solid #ede9fe;">
            <p style="color: #6d28d9; font-weight: 700; margin: 0 0 12px; font-size: 15px;">רוצה שנעשה את הניקוי בשבילך? 😊</p>
            <a href="https://vishwash.co.il/#contact"
               style="display: inline-block; background: #7c3aed; color: white; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 700; font-size: 14px;">
              קבל/י הצעת מחיר חינם »
            </a>
          </div>
          <div style="padding: 16px 24px; text-align: center;">
            <p style="font-size: 12px; color: #9ca3af; margin: 0;">
              אימייל זה נשלח אוטומטית על ידי ${businessName}. לביטול הרשמה פנה/י אלינו.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend checklist error:", err);
    return NextResponse.json(
      { error: "send_failed", message: "שליחת האימייל נכשלה. נסו שוב מאוחר יותר." },
      { status: 500 }
    );
  }
}
