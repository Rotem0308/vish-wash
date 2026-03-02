"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { PHONE_NUMBER, WHATSAPP_URL, SERVICE_AREA } from "@/lib/data";

const SoapBubble = dynamic(() => import("@/components/SoapBubble"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

const STATS = [
  { value: 150, suffix: "+",  label: "לקוחות מרוצים" },
  { value: 98,  suffix: "%",  label: "שביעות רצון" },
  { value: 5,   suffix: "+",  label: "שנות ניסיון" },
  { value: 24,  suffix: "/7", label: "זמינות" },
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref  = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const frames = 50;
        const step = to / frames;
        let cur = 0;
        const iv = setInterval(() => {
          cur = Math.min(cur + step, to);
          setCount(Math.round(cur));
          if (cur >= to) clearInterval(iv);
        }, 1200 / frames);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

function TypewriterText({ text, startDelay = 900, speed = 42 }: { text: string; startDelay?: number; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let idx = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        idx++;
        setDisplayed(text.slice(0, idx));
        if (idx >= text.length) { clearInterval(iv); setIsDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text, startDelay, speed]);

  return (
    <>
      {displayed}
      {!isDone && (
        <span aria-hidden className="inline-block w-[3px] h-[0.9em] bg-cyan-400 rounded-sm align-middle mx-0.5 animate-[blink_0.9s_step-end_infinite]" />
      )}
    </>
  );
}

export default function Hero() {
  const [orbReady, setOrbReady] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setOrbReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      {/* ── Full-viewport hero ──────────────────────────────────── */}
      <section
        id="hero"
        aria-label="ברוכים הבאים ל-Vish Wash"
        className="relative flex items-center overflow-hidden"
        style={{ minHeight: "100svh" }}
      >
        {/* Dark premium background — layered gradients mimic a lit office at dusk */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, rgba(6,182,212,0.12) 0%, transparent 50%),
              linear-gradient(to bottom, rgba(15,23,42,0.86) 0%, rgba(15,23,42,0.72) 60%, rgba(15,23,42,0.92) 100%),
              url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80") center/cover no-repeat
            `,
          }}
        />

        {/* Cyan accent glow orbs */}
        <div aria-hidden className="absolute top-1/4 right-[10%] w-[28rem] h-[28rem] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.6) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div aria-hidden className="absolute bottom-1/4 left-[5%] w-[22rem] h-[22rem] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, rgba(217,119,6,0.5) 0%, transparent 70%)", filter: "blur(80px)" }} />

        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 lg:pt-40 lg:pb-32">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 xl:gap-16">

            {/* ── Left / Main content ──────────────────────────────── */}
            <div className="flex-1 text-center lg:text-start">

              {/* Eyebrow badge */}
              <div className="hero-anim hero-anim-1 inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 text-xs font-bold tracking-widest uppercase"
                style={{ background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.35)", color: "#22d3ee" }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400/70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                </span>
                נבחרנו על ידי 150+ לקוחות · {SERVICE_AREA}
              </div>

              {/* Massive headline */}
              <h1 className="hero-anim hero-anim-2 font-extrabold text-white leading-[1.08] tracking-tight mb-6"
                style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}>
                ניקיון מקצועי.
                <br />
                <span className="gradient-text-light">
                  <TypewriterText text="יחס אישי, תוצאה מושלמת." startDelay={600} speed={38} />
                </span>
              </h1>

              {/* Sub-headline */}
              <p className="hero-anim hero-anim-3 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0"
                style={{ color: "rgba(255,255,255,0.70)" }}>
                שירותי ניקוי מקצועיים ואמינים{" "}
                <strong className="text-white font-semibold">למשרדים, קליניקות, בתים ודירות</strong>{" "}
                באזור {SERVICE_AREA}. צוות קטן ומסור — תוצאות שמורגשות.
              </p>

              {/* CTA row */}
              <div className="hero-anim hero-anim-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
                {/* Primary glow CTA */}
                <a
                  href="#contact"
                  className="btn-glow group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-bold text-base sm:text-lg px-8 py-4 rounded-2xl text-white transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(135deg, #0f172a 0%, #0e7490 100%)",
                    border: "1px solid rgba(6,182,212,0.5)",
                    boxShadow: "0 4px 24px rgba(6,182,212,0.30)",
                  }}
                >
                  ✨ קבלו הצעת מחיר חינם
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 rtl:rotate-180 group-hover:-translate-x-0.5 transition-transform" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </a>

                {/* Watch Video button */}
                <button
                  onClick={() => setVideoOpen(true)}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 font-semibold text-base px-8 py-4 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    color: "rgba(255,255,255,0.90)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {/* Play icon */}
                  <span className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
                    style={{ background: "rgba(6,182,212,0.20)", border: "1px solid rgba(6,182,212,0.40)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-cyan-400 translate-x-[1px]" aria-hidden>
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </span>
                  צפו בסרטון
                </button>
              </div>

              {/* Trust micro-row */}
              <div className="hero-anim hero-anim-5 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm"
                style={{ color: "rgba(255,255,255,0.55)" }}>
                {["ללא התחייבות", "מענה תוך שעתיים", "ביטול בכל עת"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    {t}
                  </span>
                ))}
                <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-cyan-400" aria-hidden>
                    <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                  </svg>
                  {PHONE_NUMBER}
                </a>
              </div>
            </div>

            {/* ── 3D Orb — large screens ───────────────────────────── */}
            <div className="hidden lg:flex shrink-0 items-center justify-center relative" style={{ width: "30rem", height: "30rem" }}>
              <div aria-hidden className="absolute inset-0 rounded-full opacity-30"
                style={{ background: "radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)", filter: "blur(40px)" }} />
              <div className="w-full h-full">
                {orbReady && <SoapBubble />}
              </div>
            </div>

          </div>

          {/* Stats bar — floats at bottom of hero */}
          <div
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-2xl"
            style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.06)" }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col items-center justify-center py-6 px-3 gap-1 ${i < STATS.length - 1 ? "border-l border-white/10" : ""}`}
                style={{ backdropFilter: "blur(8px)" }}
              >
                <span className="text-3xl font-extrabold text-cyan-400 tabular-nums">
                  <CountUp to={s.value} suffix={s.suffix} />
                </span>
                <span className="text-xs sm:text-sm font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden>
          <span className="text-[11px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>גללו</span>
          <span className="w-px h-10 block" style={{ background: "linear-gradient(to bottom, rgba(6,182,212,0.6), transparent)" }} />
        </div>
      </section>

      {/* ── Video modal ──────────────────────────────────────────── */}
      {videoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="סרטון שירות"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.80)", backdropFilter: "blur(8px)" }}
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #0f172a, #0e7490)" }}>
              <div className="text-center text-white/70">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-lg font-semibold">סרטון בקרוב</p>
              </div>
            </div>
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors z-10"
              style={{ background: "rgba(255,255,255,0.15)" }}
              aria-label="סגור"
            >✕</button>
          </div>
        </div>
      )}
    </>
  );
}


