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
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const frames = 48;
          const step = to / frames;
          let cur = 0;
          const iv = setInterval(() => {
            cur = Math.min(cur + step, to);
            setCount(Math.round(cur));
            if (cur >= to) clearInterval(iv);
          }, 1200 / frames);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to]);

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
      className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden>
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  );
}

// ── Typewriter component ──────────────────────────────────────────
function TypewriterText({ text, startDelay = 900, speed = 42 }: { text: string; startDelay?: number; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let idx = 0;
    const timeout = setTimeout(() => {
      const iv = setInterval(() => {
        idx++;
        setDisplayed(text.slice(0, idx));
        if (idx >= text.length) {
          clearInterval(iv);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, startDelay, speed]);

  return (
    <>
      {displayed}
      {!done && (
        <span
          aria-hidden
          className="inline-block w-[3px] h-[0.85em] bg-violet-500 rounded-sm align-middle mx-0.5 animate-[blink_0.9s_step-end_infinite]"
        />
      )}
    </>
  );
}

export default function Hero() {
  // Defer Three.js mount until after first paint so LCP isn't blocked
  const [orbReady, setOrbReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setOrbReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    // No overflow-hidden — lets the 3D orb breathe
    <section
      id="hero"
      aria-label="ברוכים הבאים ל-Vish Wash – שירותי ניקוי מקצועיים"
      className="relative bg-gradient-to-br from-slate-50 via-violet-50/60 to-purple-50 pt-14 pb-20 sm:pt-20 sm:pb-28">
      {/* Mesh-gradient blobs */}
      <div aria-hidden className="absolute -top-40 -right-40 w-[36rem] h-[36rem] rounded-full bg-violet-300/20 blur-3xl pointer-events-none" />
      <div aria-hidden className="absolute -bottom-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-purple-300/20 blur-3xl pointer-events-none" />
      <div aria-hidden className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[28rem] rounded-full bg-fuchsia-100/25 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column on large: content right (RTL-first), orb left */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6 xl:gap-12">

          {/* Content column */}
          <div className="flex-1 text-center lg:text-start">

            {/* Live badge */}
            <div className="animate-fade-up opacity-0 delay-100 inline-flex items-center gap-2 bg-white border border-violet-200 shadow-sm text-violet-700 text-xs font-semibold px-4 py-2 rounded-full mb-7 tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
              </span>
              נבחרנו על ידי 150+ לקוחות {SERVICE_AREA}
            </div>

            {/* Headline */}
            <h1 className="animate-fade-up opacity-0 delay-200 text-4xl sm:text-5xl xl:text-[3.75rem] font-extrabold text-gray-900 leading-[1.16] tracking-tight mb-5">
              ניקיון מקצועי.
              <br />
              <span className="relative inline-block mt-1">
                <span className="relative z-10 gradient-text">
                  <TypewriterText text="יחס אישי, תוצאה מושלמת." startDelay={950} speed={45} />
                </span>
                <span aria-hidden className="absolute -bottom-1 right-0 left-0 h-3 bg-violet-100/70 rounded -z-10" />
              </span>
            </h1>

            {/* Sub */}
            <p className="animate-fade-up opacity-0 delay-300 text-lg sm:text-xl text-gray-600 leading-relaxed mb-9 max-w-2xl mx-auto lg:mx-0">
              שירותי ניקוי מקצועיים ואמינים{" "}
              <strong className="text-gray-800 font-semibold">למשרדים, קליניקות, בתים ודירות</strong>{" "}
               באזור {SERVICE_AREA}. צוות קטן ומסור של 1–2 עובדים – כדי שתוכלו ליהנות ממקום נקי בלי לדאוג.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up opacity-0 delay-450 flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start items-center mb-8">
              <a
                href="#contact"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-violet-600 hover:bg-violet-700 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-violet-300/50 hover:shadow-xl hover:shadow-violet-400/50 hover:-translate-y-0.5 transition-all duration-200"
              >
                ✨ קבלו הצעת מחיר חינם
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 rtl:rotate-180 group-hover:-translate-x-0.5 transition-transform duration-200" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white hover:bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-400 text-emerald-700 font-bold text-base px-8 py-4 rounded-xl shadow-sm hover:-translate-y-0.5 transition-all duration-200"
              >
                💬 פנו בוואטסאפ
              </a>
            </div>

            {/* Mini trust row */}
            <div className="animate-fade-up opacity-0 delay-600 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 mb-10 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><CheckIcon />ללא התחייבות</span>
              <span className="flex items-center gap-1.5"><CheckIcon />מענה תוך שעתיים</span>
              <span className="flex items-center gap-1.5"><CheckIcon />ביטול בכל עת</span>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center gap-1.5 text-gray-500 hover:text-violet-600 transition-colors font-semibold"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-violet-500" aria-hidden>
                  <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                </svg>
                {PHONE_NUMBER}
              </a>
            </div>

            {/* Animated stats bar */}
            <div className="animate-fade-up opacity-0 delay-750 grid grid-cols-2 sm:grid-cols-4 gap-px bg-violet-100 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-sm border border-violet-100 dark:border-gray-700">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-white dark:bg-slate-800 flex flex-col items-center justify-center py-5 px-3 gap-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-violet-600">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3D orb column — large screens only
               overflow-visible so the bubble isn't clipped at the edges */}
          <div className="hidden lg:flex flex-shrink-0 items-center justify-center relative" style={{ width: "28rem", height: "28rem" }}>
            {/* Soft glow */}
            <div aria-hidden className="absolute inset-[-15%] rounded-full bg-gradient-radial from-violet-300/30 via-purple-200/15 to-transparent blur-2xl pointer-events-none" />
            <div className="w-full h-full overflow-visible">
              {orbReady && <SoapBubble />}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
