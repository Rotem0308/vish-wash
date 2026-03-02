import { PHONE_NUMBER, WHATSAPP_URL } from "@/lib/data";

export default function CtaSection() {
  return (
    <section aria-label="קריאה לפעולה – קבלו הצעת מחיר" className="py-20 sm:py-24 bg-slate-900 relative overflow-hidden">
      {/* Decorative cyan glow */}
      <div aria-hidden className="absolute -top-40 left-1/2 -translate-x-1/2 w-[42rem] h-[20rem] rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div aria-hidden className="absolute -bottom-24 -right-24 w-[24rem] h-[24rem] rounded-full bg-cyan-400/8 blur-2xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Scarcity badge */}
        <div className="inline-flex items-center gap-2 bg-white/8 border border-white/10 backdrop-blur-sm text-cyan-300 text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
          🔥 זמינות מוגבלת – הזמינו עוד היום
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
          מוכנים לסביבת עבודה
          <br />
          <span className="text-cyan-400">נקייה יותר מחר?</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg mb-10 max-w-xl mx-auto">
          אל תחכו. הלוח זמנים שלנו מתמלא מהר. קבלו הצעת מחיר חינם ללא התחייבות תוך שעתיים.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-900 font-bold text-lg px-8 py-4 rounded-xl shadow-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            📞 התקשרו עכשיו
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            💬 וואטסאפ
          </a>
        </div>
      </div>
    </section>
  );
}
