import { PHONE_NUMBER, WHATSAPP_URL } from "@/lib/data";

export default function CtaSection() {
  return (
    <section aria-label="קריאה לפעולה – קבלו הצעת מחיר" className="py-16 sm:py-20 bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Scarcity badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
          🔥 זמינות מוגבלת – הזמינו עוד היום
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
          מוכנים לסביבת עבודה
          <br />
          נקייה יותר מחר?
        </h2>
        <p className="text-violet-100 text-base sm:text-lg mb-10 max-w-xl mx-auto">
          אל תחכו. הלוח זמנים שלנו מתמלא מהר. קבלו הצעת מחיר חינם ללא התחייבות תוך שעתיים.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 active:bg-gray-100 text-violet-700 font-bold text-lg px-8 py-4 rounded-xl shadow-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            📞 התקשרו עכשיו
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-green-400 hover:bg-green-300 active:bg-green-500 text-gray-900 font-bold text-lg px-8 py-4 rounded-xl shadow-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            💬 וואטסאפ
          </a>
        </div>
      </div>
    </section>
  );
}
