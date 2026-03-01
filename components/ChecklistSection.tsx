"use client";

import { useState } from "react";

const TYPES = [
  { key: "office",    label: "🏢 משרד",     color: "blue"   },
  { key: "clinic",    label: "🏥 קליניקה",   color: "green"  },
  { key: "apartment", label: "🏠 בית / דירה",  color: "violet" },
] as const;

type ChecklistType = (typeof TYPES)[number]["key"];

const PREVIEW: Record<ChecklistType, string[]> = {
  office: [
    "ניקוי ואיבוק שולחנות עבודה וכסאות",
    "ניקוי מסכי מחשב, מקלדות ועכברים",
    "שאיבת שטיחים / מגוב רצפות",
    "ניקוי שירותים עם חומרים מחטאים",
    "ניקוי מטבחון ומכשירי מזון",
  ],
  clinic: [
    "חיטוי משטחים בין מטופל למטופל",
    "ניקוי וחיטוי שירותים לקהל",
    "חיטוי ידיות דלתות ולחצנים",
    "ניקוי ריצוף עם חומרים מחטאים מאושרים",
    "החלפת ציפות נייר על מיטות הטיפול",
  ],
  apartment: [
    "שאיבת שטיחים ומגוב כל הרצפות",
    "ניקוי חדר אמבטיה ושירותים",
    "ניקוי מטבח – ספות, כיור, קבינטים",
    "איבוק ריהוט בסלון וחדרי שינה",
    "ניקוי חלונות וזגוגיות פנימיות",
  ],
};

const TOTAL_ITEMS: Record<ChecklistType, number> = {
  office: 15,
  clinic: 15,
  apartment: 15,
};

export default function ChecklistSection() {
  const [activeType, setActiveType] = useState<ChecklistType>("office");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), type: activeType }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.message ?? "אירעה שגיאה, נסו שוב.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMsg("אירעה שגיאה בחיבור. נסו שוב.");
      setStatus("error");
    }
  };

  const typeInfo = TYPES.find((t) => t.key === activeType)!;

  return (
    <section
      id="checklist"
      aria-label="הורידו צ'קליסט ניקוי חינם"
      className="relative py-20 sm:py-24 overflow-hidden bg-white dark:bg-gray-950"
    >
      {/* Background decoration */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-32 w-80 h-80 rounded-full bg-violet-100/60 dark:bg-violet-950/40 blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-72 h-72 rounded-full bg-purple-100/50 dark:bg-purple-950/30 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4">
            <span>✨</span> בחינם, ללא התחייבות
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
            הורידו צ'קליסט ניקוי מלא —{" "}
            <span className="gradient-text">חינם</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            בחרו סוג מקום וקבלו 15 פריטים מפורטים ישירות למייל. מוכן להדפסה.
          </p>
        </div>

        {/* Type tabs */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {TYPES.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActiveType(t.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2 ${
                activeType === t.key
                  ? "bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-200 dark:shadow-violet-900/40 -translate-y-0.5"
                  : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-violet-300 hover:text-violet-700 dark:hover:border-violet-600 dark:hover:text-violet-400"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Main card */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* ── Left: preview panel ── */}
          <div className="relative bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-violet-100 dark:border-violet-900/50 overflow-hidden p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-lg shrink-0">
                📋
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-base leading-tight">
                  {typeInfo.label.split(" ").slice(1).join(" ")} — צ'קליסט מלא
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {TOTAL_ITEMS[activeType]} פריטים • מוכן להדפסה
                </p>
              </div>
            </div>

            {/* Preview items */}
            <ul className="space-y-2.5 mb-4 flex-1">
              {PREVIEW[activeType].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded border-2 border-violet-300 dark:border-violet-700 shrink-0 bg-white dark:bg-gray-800" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>

            {/* Blurred "more items" teaser */}
            <div className="relative">
              <ul className="space-y-2.5 blur-sm select-none pointer-events-none" aria-hidden>
                {["...", "..."].map((_, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded border-2 border-violet-300 dark:border-violet-700 shrink-0 bg-white dark:bg-gray-800" />
                    <span className="text-sm text-gray-400 dark:text-gray-600">
                      {i === 0 ? "ריסוס חיטוי משטחים בתדירות גבוהה" : "ו-9 פריטים נוספים..."}
                    </span>
                  </li>
                ))}
              </ul>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-violet-50/90 dark:to-gray-900/90" />
            </div>

            <div className="mt-4 text-center">
              <span className="inline-flex items-center gap-1.5 bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 text-xs font-medium px-3 py-1.5 rounded-full">
                🔒 {TOTAL_ITEMS[activeType] - PREVIEW[activeType].length} פריטים נוספים מחכים לך
              </span>
            </div>
          </div>

          {/* ── Right: email gate ── */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl shadow-violet-100/40 dark:shadow-none p-8 flex flex-col justify-center">
            {status === "success" ? (
              /* Success state */
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-3xl mx-auto mb-5">
                  ✅
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-3">
                  הצ'קליסט נשלח!
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                  בדקו את תיבת הדואר הנכנס שלכם (ואת תיקיית הספאם 😉).<br />
                  קיבלתם {TOTAL_ITEMS[activeType]} פריטי ניקוי עם תיבות V להדפסה.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => { setStatus("idle"); setEmail(""); }}
                    className="text-sm text-violet-600 dark:text-violet-400 hover:underline font-medium"
                  >
                    שלחו סוג אחר →
                  </button>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-violet-200 dark:shadow-violet-900/40 hover:shadow-lg transition-all duration-200"
                  >
                    הצעת מחיר חינם ✨
                  </a>
                </div>
              </div>
            ) : (
              /* Form state */
              <>
                <div className="mb-6">
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">
                    קבלו את הצ'קליסט המלא 📩
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    הזינו מייל וקבלו {TOTAL_ITEMS[activeType]} פריטי ניקוי מפורטים עם תיבות סימון להדפסה, בחינם לגמרי.
                  </p>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {["🔒 ללא ספאם", "📄 מומלץ לעסקים", "⚡ נשלח מייד"].map((badge) => (
                    <span
                      key={badge}
                      className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <label
                      htmlFor="checklist-email"
                      className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                      כתובת אימייל
                    </label>
                    <input
                      id="checklist-email"
                      type="email"
                      required
                      dir="ltr"
                      autoComplete="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "loading"}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 disabled:opacity-60"
                    />
                  </div>

                  {status === "error" && errorMsg && (
                    <p role="alert" className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading" || !email.trim()}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-l from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-violet-200 dark:shadow-violet-900/40 hover:shadow-xl hover:shadow-violet-300/40 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-sm"
                  >
                    {status === "loading" ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        שולח...
                      </>
                    ) : (
                      <>
                        שלחו לי את הצ'קליסט
                        <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L6 12l7.5 7.5M18 12H6" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400 dark:text-gray-600">
                    לא מוציאים ספאם. ניתן לבטל הרשמה בכל עת.
                  </p>
                </form>

                {/* Social proof */}
                <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
                  <div className="flex -space-x-2 rtl:space-x-reverse rtl:-space-x-2">
                    {["🧑‍💼", "👩‍⚕️", "🏠"].map((emoji, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/50 border-2 border-white dark:border-gray-900 flex items-center justify-center text-sm"
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    <strong className="text-gray-700 dark:text-gray-300">+340 עסקים</strong> כבר הורידו השבוע
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
