"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { PHONE_NUMBER, WHATSAPP_URL, EMAIL } from "@/lib/data";

const CleaningScene = dynamic(() => import("@/components/CleaningScene"), { ssr: false });

const SERVICES = [
  { value: "offices",    label: "ניקיון משרדים" },
  { value: "clinics",    label: "ניקיון קליניקות (אדם / בעלי חיים)" },
  { value: "homes",      label: "ניקיון בתים ודירות" },
  { value: "maintenance",label: "ניקוי שוטף ותחזוקה" },
];

const STORAGE_KEY = "vishwash_contact_submitted";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sceneVisible, setSceneVisible] = useState(false);

  // Only mount Three.js CleaningScene once this section enters the viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setSceneVisible(true); obs.disconnect(); } },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [alreadySent, setAlreadySent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // On mount: check if this user already submitted (client-side guard)
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "1") {
      setAlreadySent(true);
      setSubmitted(true);
    }
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || submitted) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          res.status === 429
            ? "שלחתם יותר מדי פניות. נסו שוב מחר או התקשרו אלינו ישירות."
            : data?.message ?? "אירעה שגיאה. נסו שוב או פנו אלינו בטלפון."
        );
        return;
      }
      localStorage.setItem(STORAGE_KEY, "1");
      setSubmitted(true);
    } catch {
      setError("בעיית חיבור. בדקו את האינטרנט ונסו שוב.");
    } finally {
      setLoading(false);
    }
  }

  // Cleanliness score: 1 point per valid field (max 4)
  const cleanlinessScore = useMemo(() => {
    let s = 0;
    if (formState.name.trim().length >= 2)    s++;
    if (formState.phone.trim().length >= 7)   s++;
    if (formState.service !== "")             s++;
    if (formState.message.trim().length >= 5) s++;
    return s;
  }, [formState.name, formState.phone, formState.service, formState.message]);

  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm transition-colors placeholder:text-gray-400";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 sm:py-20 bg-gradient-to-b from-violet-50/40 via-gray-50 to-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            צרו קשר
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
            בקשו הצעת מחיר חינם — ראו את הסצנה מתנקה ככל שממלאים את הטופס!
          </p>
        </div>

        {/* ── Quick-contact strip ─────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <a href={`tel:${PHONE_NUMBER}`}
            className="inline-flex items-center gap-2.5 bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm font-semibold text-gray-700 hover:border-violet-300 hover:shadow-sm transition-all">
            <span className="text-base">📞</span>{PHONE_NUMBER}
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm font-semibold text-gray-700 hover:border-green-400 hover:shadow-sm transition-all">
            <span className="text-base">💬</span>וואטסאפ
          </a>
          <a href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2.5 bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm font-semibold text-gray-700 hover:border-violet-300 hover:shadow-sm transition-all">
            <span className="text-base">✉️</span>{EMAIL}
          </a>
        </div>

        {/* ── 2-column: 3D scene | Form ──────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* ── 3D Scene ───────────────────────────────────────────────── */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-violet-100 min-h-[320px] lg:min-h-[540px] bg-[#110d1c]">
            {sceneVisible ? (
              <CleaningScene
                cleanlinessScore={cleanlinessScore}
                serviceSelected={formState.service}
                submitted={submitted}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-violet-400/40 border-t-violet-400 animate-spin" />
              </div>
            )}

            {/* Progress bar overlay */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/65 to-transparent pointer-events-none select-none">
              <div className="flex items-center justify-between text-white text-xs font-medium mb-1.5">
                <span>ניקיון הסצנה</span>
                <span>{cleanlinessScore * 25}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-400 transition-all duration-700"
                  style={{ width: `${cleanlinessScore * 25}%` }}
                />
              </div>
              <p className="text-white/60 text-[11px] mt-1.5 text-center">
                {submitted
                  ? "✨ הסצנה נוקתה לחלוטין!"
                  : cleanlinessScore === 0
                  ? "מלאו את הפרטים כדי לנקות את החדר 🧹"
                  : cleanlinessScore === 4
                  ? "מוכןָ — שלחו את הפנייה!"
                  : "ממשיכים לנקות..."}
              </p>
            </div>

            {/* Field-completion badge row */}
            <div className="absolute top-3 right-3 flex gap-1.5 pointer-events-none select-none">
              {(["שם", "טלפון", "שירות", "הודעה"] as const).map((label, i) => (
                <span
                  key={label}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border transition-all duration-500 ${
                    cleanlinessScore > i
                      ? "bg-violet-500/80 border-violet-300/60 text-white"
                      : "bg-black/30 border-white/10 text-white/40"
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* ── Form ───────────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 gap-5 text-center">
                <div className="text-6xl">{alreadySent && !loading ? "⏳" : "✅"}</div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {alreadySent && !loading ? "כבר שלחתם פנייה" : "ההודעה נשלחה!"}
                </h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  {alreadySent && !loading
                    ? "קיבלנו את הפנייה שלכם ונחזור אליכם בהקדם. אם הנושא דחוף – התקשרו."
                    : "נחזור אליכם תוך שעתיים. תודה שפניתם!"}
                </p>
                {alreadySent && !loading && (
                  <a href={`tel:${PHONE_NUMBER}`}
                    className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors shadow-sm">
                    📞 התקשרו עכשיו
                  </a>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <h3 className="text-xl font-bold text-gray-900 mb-1">בקשו הצעת מחיר חינם</h3>
                <p className="text-xs text-violet-600 mb-4">כל שדה שתמלאו ינקה את הסצנה 🧹✨</p>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">שם מלא *</label>
                  <input id="name" name="name" type="text" required
                    placeholder="ישראל ישראלי" value={formState.name} onChange={handleChange}
                    className={inputCls} />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">מספר טלפון *</label>
                  <input id="phone" name="phone" type="tel" required
                    placeholder="050-123-4567" value={formState.phone} onChange={handleChange}
                    className={inputCls} />
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    סוג שירות
                    <span className="text-violet-500 text-[11px] mr-1">(מופיע בסצנה!)</span>
                  </label>
                  <select id="service" name="service" value={formState.service} onChange={handleChange}
                    className={`${inputCls} cursor-pointer`}>
                    <option value="">בחרו שירות...</option>
                    {SERVICES.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">כתובת אימייל</label>
                  <input id="email" name="email" type="email"
                    placeholder="name@company.co.il" value={formState.email} onChange={handleChange}
                    className={inputCls} />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">הודעה</label>
                  <textarea id="message" name="message" rows={4}
                    placeholder="ספרו לנו על המקום ועל צרכי הניקוי שלכם..."
                    value={formState.message} onChange={handleChange}
                    className={`${inputCls} resize-none`} />
                </div>

                {error && (
                  <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                    <span className="text-base leading-none mt-0.5">⚠️</span>
                    <span>{error}</span>
                  </div>
                )}

                <button type="submit" disabled={loading}
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-base py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      שולח...
                    </>
                  ) : (
                    "שלחו פנייה וצפו בניקוי ✨"
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  אנחנו שומרים על פרטיותכם. ללא דואר זבל, לעולם.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}