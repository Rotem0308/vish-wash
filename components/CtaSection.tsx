import { PHONE_NUMBER, WHATSAPP_URL } from "@/lib/data";

export default function CtaSection() {
  return (
    <section
      aria-label="קריאה לפעולה – קבלו הצעת מחיר"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: "#0f172a" }}
    >
      {/* Decorative glows */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 0%, rgba(6,182,212,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 40% 50% at 80% 80%, rgba(217,119,6,0.10) 0%, transparent 60%)
          `,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Scarcity badge */}
        <div
          className="inline-flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase"
          style={{
            background: "rgba(6,182,212,0.10)",
            border: "1px solid rgba(6,182,212,0.30)",
            color: "#22d3ee",
          }}
        >
          🔥 זמינות מוגבלת – הזמינו עוד היום
        </div>

        <h2
          className="font-extrabold text-white leading-tight mb-5 tracking-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          מוכנים לסביבת עבודה
          <br />
          <span
            style={{
              background: "linear-gradient(120deg, #fff 0%, #06b6d4 60%, #22d3ee 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            נקייה יותר מחר?
          </span>
        </h2>

        <p className="text-lg mb-12 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
          אל תחכו. הלוח זמנים שלנו מתמלא מהר. קבלו הצעת מחיר חינם ללא התחייבות תוך שעתיים.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 font-bold text-lg px-10 py-4 rounded-full text-white transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #0e7490 0%, #06b6d4 100%)",
              boxShadow: "0 6px 28px rgba(6,182,212,0.40)",
              border: "1px solid rgba(6,182,212,0.50)",
            }}
          >
            📞 התקשרו עכשיו
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 font-bold text-lg px-10 py-4 rounded-full text-slate-900 transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
            style={{
              background: "#22c55e",
              boxShadow: "0 6px 28px rgba(34,197,94,0.30)",
            }}
          >
            💬 וואטסאפ
          </a>
        </div>

        {/* Small social proof */}
        <p className="mt-10 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          הצטרפו ל-150+ עסקים שכבר בוטחחו בשירותים שלנו ַ קבלת הצעה אינה מחייבת
        </p>
      </div>
    </section>
  );
}
