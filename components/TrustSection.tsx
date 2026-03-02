"use client";

import { useEffect, useRef, useState } from "react";
import { trustItems, TrustItem, WHATSAPP_URL } from "@/lib/data";

function TrustCard({ item, delay }: { item: TrustItem; delay: string }) {
  return (
    <div
      className={`reveal ${delay} group bg-white rounded-2xl flex flex-col items-start gap-4 transition-all duration-300 cursor-default overflow-hidden`}
      style={{
        border: "1px solid #e2e8f0",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(15,23,42,0.05)",
        transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-8px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 40px rgba(15,23,42,0.12), 0 0 0 1px rgba(6,182,212,0.20)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 3px rgba(15,23,42,0.05)";
      }}
    >
      <div
        className="w-12 h-12 flex items-center justify-center rounded-xl text-2xl shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)" }}
      >
        {item.icon}
      </div>
      <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
    </div>
  );
}

/** Interactive Before & After slider */
function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);

  return (
    <div className="before-after-container select-none" style={{ height: "340px" }}>
      {/* AFTER panel (full width, cleaned office) */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #0c4a6e 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-center text-white opacity-60">
          <div className="text-5xl mb-3">✨</div>
          <p className="text-sm font-semibold tracking-wide">אחרי הניקוי</p>
        </div>
      </div>

      {/* BEFORE panel (clipped to slider position) */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          background: "linear-gradient(135deg, #374151 0%, #6b7280 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "clip-path 0s",
        }}
      >
        <div className="text-center text-white opacity-50">
          <div className="text-5xl mb-3">💨</div>
          <p className="text-sm font-semibold tracking-wide">לפני הניקוי</p>
        </div>
      </div>

      {/* Divider line + handle */}
      <div className="ba-divider" style={{ left: `${position}%` }} />
      <div className="ba-handle" style={{ left: `${position}%` }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M7 5L2 10L7 15M13 5L18 10L13 15" stroke="#0e7490" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Labels */}
      <span className="absolute top-3 right-4 text-xs font-bold text-white/70 z-5 pointer-events-none">לפני</span>
      <span className="absolute top-3 left-4 text-xs font-bold text-white/70 z-5 pointer-events-none">אחרי</span>

      {/* Range input captures drag */}
      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label="השוואת לפני ואחרי ניקוי"
      />
    </div>
  );
}

export default function TrustSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const items = section.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.10 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const delays = ["reveal-d1", "reveal-d2", "reveal-d3", "reveal-d4"];

  return (
    <section
      id="why-us"
      aria-label="למה לבחור ב-Vish Wash"
      className="py-24 sm:py-32"
      ref={ref}
      style={{ background: "#f8fafc" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="reveal text-center mb-16">
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
            style={{ color: "#0891b2", background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.20)" }}
          >
            למה לבחור בנו
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5 tracking-tight">
            למה עסקים בוחרים בנו?
          </h2>
          <div className="mx-auto w-12 h-[3px] rounded-full mb-6" style={{ background: "linear-gradient(to left, #0f172a, #06b6d4)" }} />
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            בנינו את המוניטין שלנו על אמינות, איכות ותוצאות שמורגשות מיידית.
          </p>
        </div>

        {/* Two-column: trust cards + before/after */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Trust cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {trustItems.map((item, i) => (
              <TrustCard key={item.id} item={item} delay={delays[i] ?? ""} />
            ))}
          </div>

          {/* Before / After slider */}
          <div className="reveal reveal-d2">
            <div className="mb-5">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">לפני ואחרי הניקוי</h3>
              <p className="text-slate-500 text-sm">גררו את המחוון כדי לראות את ההבדל האמיתי</p>
            </div>
            <BeforeAfterSlider />
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="flex-1 inline-flex items-center justify-center gap-2 font-bold text-sm px-6 py-3 rounded-full text-white transition-all duration-200 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #0f172a 0%, #0e7490 100%)",
                  boxShadow: "0 4px 14px rgba(6,182,212,0.30)",
                  border: "1px solid rgba(6,182,212,0.40)",
                }}
              >
                תאמו סיור חינם
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "#fff",
                  border: "1.5px solid #e2e8f0",
                  color: "#0f172a",
                  boxShadow: "0 1px 4px rgba(15,23,42,0.08)",
                }}
              >
                💬 וואטסאפ
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
