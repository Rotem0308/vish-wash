"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { PHONE_NUMBER, WHATSAPP_URL, EMAIL } from "@/lib/data";

const CleaningScene = dynamic(() => import("@/components/CleaningScene"), { ssr: false });

const SERVICES = [
  { value: "offices",     label: "ניקיון משרדים" },
  { value: "clinics",     label: "ניקיון קליניקות (אדם / בעלי חיים)" },
  { value: "homes",       label: "ניקיון בתים ודירות" },
  { value: "maintenance", label: "ניקוי שוטף ותחזוקה" },
];

const STORAGE_KEY = "vishwash_contact_submitted";

/* Floating-label field wrapper */
function FLField({ children }: { children: React.ReactNode }) {
  return <div className="fl-group">{children}</div>;
}

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
  // Set NEXT_PUBLIC_DISABLE_SUBMIT_GUARD=true in .env.local to bypass (dev/testing)
  const submitGuardDisabled = process.env.NEXT_PUBLIC_DISABLE_SUBMIT_GUARD === "true";

  useEffect(() => {
    if (submitGuardDisabled) return;
    if (localStorage.getItem(STORAGE_KEY) === "1") {
      setAlreadySent(true);
      setSubmitted(true);
    }
  }, [submitGuardDisabled]);

  /** Fire-and-forget Make / n8n webhook — URL set via NEXT_PUBLIC_MAKE_WEBHOOK_URL */
  async function triggerWebhook(payload: typeof formState) {
    const url = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL;
    if (!url) return;
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          submittedAt: new Date().toISOString(),
          source: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
    } catch {
      // Webhook errors are silent — don't block the UX
    }
  }

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
      if (!submitGuardDisabled) localStorage.setItem(STORAGE_KEY, "1");
      setSubmitted(true);
      // Trigger Make / n8n webhook (non-blocking)
      triggerWebhook(formState);
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

  /* Shared input base style for dark glass card */
  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "0.75rem",
    color: "#f1f5f9",
    outline: "none",
    fontSize: "0.9rem",
    padding: "1.5rem 1rem 0.5rem",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-28"
    >
      {/* Animated mesh gradient bg */}
      <div className="mesh-animated absolute inset-0" aria-hidden />

      {/* Subtle top border line */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(6,182,212,0.4), transparent)" }} aria-hidden />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="text-center mb-10">
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
            style={{ color: "#22d3ee", background: "rgba(6,182,212,0.10)", border: "1px solid rgba(6,182,212,0.25)" }}
          >
            צרו קשר
          </span>
          <h2
            className="font-extrabold text-white mb-4"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
          >
            בקשו הצעת מחיר{" "}
            <span style={{ color: "#22d3ee" }}>חינם</span>
          </h2>
          <div className="mx-auto w-12 h-[3px] rounded-full mb-4" style={{ background: "linear-gradient(to left, #0f172a, #06b6d4)" }} />
          <p className="text-slate-400 text-base max-w-lg mx-auto">
            ראו את הסצנה מתנקה ככל שממלאים את הטופס — ונחזור אליכם תוך שעתיים.
          </p>
        </div>

        {/* ── Quick-contact strip ──────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { href: `tel:${PHONE_NUMBER}`, icon: "📞", label: PHONE_NUMBER },
            { href: WHATSAPP_URL, icon: "💬", label: "וואטסאפ", external: true },
            { href: `mailto:${EMAIL}`, icon: "✉️", label: EMAIL },
          ].map(({ href, icon, label, external }) => (
            <a
              key={href}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#cbd5e1",
                backdropFilter: "blur(8px)",
              }}
            >
              <span>{icon}</span>{label}
            </a>
          ))}
        </div>

        {/* ── 2-column: 3D scene | Form ───────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* ── 3D Scene ─────────────────────────────────────────────── */}
          <div
            className="relative rounded-2xl overflow-hidden min-h-[320px] lg:min-h-[540px] bg-[#0a0f1a]"
            style={{
              border: "1px solid rgba(6,182,212,0.15)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 24px 48px rgba(0,0,0,0.40)",
            }}
          >
            {sceneVisible ? (
              <CleaningScene
                cleanlinessScore={cleanlinessScore}
                serviceSelected={formState.service}
                submitted={submitted}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-cyan-400/40 border-t-cyan-400 animate-spin" />
              </div>
            )}

            {/* Progress bar overlay */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/65 to-transparent pointer-events-none select-none">
              <div className="flex items-center justify-between text-white text-xs font-medium mb-1.5">
                <span>ניקיון הסצנה</span>
                <span style={{ color: "#22d3ee" }}>{cleanlinessScore * 25}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${cleanlinessScore * 25}%`,
                    background: "linear-gradient(to left, #22d3ee, #0284c7)",
                  }}
                />
              </div>
              <p className="text-white/60 text-[11px] mt-1.5 text-center">
                {submitted
                  ? "✨ הסצנה נוקתה לחלוטין!"
                  : cleanlinessScore === 0
                  ? "מלאו את הפרטים כדי לנקות את החדר 🧹"
                  : cleanlinessScore === 4
                  ? "מוכן — שלחו את הפנייה!"
                  : "ממשיכים לנקות..."}
              </p>
            </div>

            {/* Field-completion badge row */}
            <div className="absolute top-3 right-3 flex gap-1.5 pointer-events-none select-none">
              {(["שם", "טלפון", "שירות", "הודעה"] as const).map((label, i) => (
                <span
                  key={label}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full border transition-all duration-500"
                  style={
                    cleanlinessScore > i
                      ? { background: "rgba(6,182,212,0.80)", border: "1px solid rgba(6,182,212,0.60)", color: "#fff" }
                      : { background: "rgba(0,0,0,0.30)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.40)" }
                  }
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* ── Contact Form — glassmorphism card ───────────────────── */}
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{
              background: "rgba(15,23,42,0.70)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 24px 48px rgba(0,0,0,0.40)",
            }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 gap-5 text-center">
                <div className="text-6xl">{alreadySent && !loading ? "⏳" : "✅"}</div>
                <h3 className="text-2xl font-bold text-white">
                  {alreadySent && !loading ? "כבר שלחתם פנייה" : "ההודעה נשלחה!"}
                </h3>
                <p className="text-slate-400 text-sm max-w-xs">
                  {alreadySent && !loading
                    ? "קיבלנו את הפנייה שלכם ונחזור אליכם בהקדם. אם הנושא דחוף – התקשרו."
                    : "נחזור אליכם תוך שעתיים. תודה שפניתם!"}
                </p>
                {alreadySent && !loading && (
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="inline-flex items-center gap-2 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #0f172a, #0e7490)",
                      border: "1px solid rgba(6,182,212,0.40)",
                      boxShadow: "0 4px 14px rgba(6,182,212,0.30)",
                    }}
                  >
                    📞 התקשרו עכשיו
                  </a>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="mb-2">
                  <h3 className="text-xl font-bold text-white mb-1">בקשו הצעת מחיר חינם</h3>
                  <p className="text-xs" style={{ color: "#22d3ee" }}>כל שדה שתמלאו ינקה את הסצנה 🧹✨</p>
                </div>

                {/* Name */}
                <FLField>
                  <input
                    id="name" name="name" type="text" required
                    placeholder=" "
                    value={formState.name} onChange={handleChange}
                    style={inputBase}
                  />
                  <label htmlFor="name">שם מלא *</label>
                </FLField>

                {/* Phone */}
                <FLField>
                  <input
                    id="phone" name="phone" type="tel" required
                    placeholder=" "
                    value={formState.phone} onChange={handleChange}
                    style={inputBase}
                  />
                  <label htmlFor="phone">מספר טלפון *</label>
                </FLField>

                {/* Service — select with fl-has-value */}
                <FLField>
                  <select
                    id="service" name="service"
                    value={formState.service} onChange={handleChange}
                    className={formState.service ? "fl-has-value" : ""}
                    style={{ ...inputBase, cursor: "pointer" }}
                  >
                    <option value="" disabled hidden />
                    {SERVICES.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                  <label htmlFor="service">
                    סוג שירות{" "}
                    <span style={{ color: "#22d3ee", fontSize: "0.7rem" }}>(מופיע בסצנה!)</span>
                  </label>
                </FLField>

                {/* Email */}
                <FLField>
                  <input
                    id="email" name="email" type="email"
                    placeholder=" "
                    value={formState.email} onChange={handleChange}
                    style={inputBase}
                  />
                  <label htmlFor="email">כתובת אימייל</label>
                </FLField>

                {/* Message */}
                <FLField>
                  <textarea
                    id="message" name="message" rows={4}
                    placeholder=" "
                    value={formState.message} onChange={handleChange}
                    style={{ ...inputBase, resize: "none" }}
                  />
                  <label htmlFor="message">הודעה</label>
                </FLField>

                {error && (
                  <div
                    className="flex items-start gap-3 text-sm px-4 py-3 rounded-xl"
                    style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.30)", color: "#fca5a5" }}
                  >
                    <span className="text-base leading-none mt-0.5">⚠️</span>
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit" disabled={loading}
                  className="btn-submit-pulse w-full text-white font-bold text-base py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(135deg, #0f172a 0%, #0e7490 100%)",
                    border: "1px solid rgba(6,182,212,0.40)",
                    boxShadow: "0 6px 24px rgba(6,182,212,0.30)",
                  }}
                >
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

                <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.30)" }}>
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