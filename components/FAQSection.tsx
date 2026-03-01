"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "כמה עולה ניקוי משרד או דירה?",
    a: 'המחיר תלוי בגודל המקום ובתדירות הניקוי. Vish Wash מציעה הצעת מחיר חינם ומותאמת אישית תוך שעתיים מפנייתכם – ללא התחייבות.',
  },
  {
    q: "באילו ימים ושעות אתם מעניקים שירות?",
    a: "אנחנו פועלים ימים א'–ה' בין 07:00–20:00 וביום שישי 07:00–14:00. אנחנו מתגמשים לצורכי הלקוח, כולל ניקוי בשעות הערב.",
  },
  {
    q: "האם אתם מנקים קליניקות לבעלי חיים?",
    a: "כן! אנחנו מתמחים בניקוי וחיטוי קליניקות לבני אדם וגם לבעלי חיים – מרפאות וטרינריות. הצוות עבר הכשרה מיוחדת ומשתמש בחומרי חיטוי מאושרים.",
  },
  {
    q: "כמה עובדים מגיעים לניקוי?",
    a: "אנחנו עובדים בצוות קטן ומסור של 1–2 עובדים. זה מאפשר לנו לתת יחס אישי, להכיר את המקום שלכם ולהתאים את הניקוי בדיוק לצרכים.",
  },
  {
    q: "באילו אזורים אתם נותנים שירות?",
    a: "אנחנו פועלים באזור מהרצליה ועד קיסריה. ניתן לשנות את אזור השירות דרך משתנה סביבה.",
  },
  {
    q: "האם השירות כולל ביטוח אחריות?",
    a: "כן. Vish Wash מבוטחת בביטוח אחריות מקצועית מלא. במקרה של נזק – אנחנו נושאים באחריות המלאה.",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section
      id="faq"
      aria-label="שאלות נפוצות"
      className="py-16 sm:py-20 bg-gradient-to-b from-white to-violet-50/30"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            שאלות נפוצות
          </h2>
          <p className="text-gray-500 text-base sm:text-lg">
            כל מה שרציתם לדעת על שירותי הניקוי שלנו
          </p>
        </div>

        <dl className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-violet-200 bg-violet-50/60 shadow-sm"
                    : "border-gray-200 bg-white hover:border-violet-100"
                }`}
              >
                <dt>
                  <button
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-right"
                  >
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">
                      {faq.q}
                    </span>
                    <span
                      aria-hidden
                      className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-violet-600 border-violet-200 bg-white transition-transform duration-200 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </dt>
                <dd
                  id={`faq-answer-${i}`}
                  hidden={!isOpen}
                  className="px-5 pb-4 text-sm sm:text-base text-gray-600 leading-relaxed"
                >
                  {faq.a}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
