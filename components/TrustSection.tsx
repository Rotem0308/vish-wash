"use client";

import { useEffect, useRef } from "react";
import { trustItems, TrustItem, PHONE_NUMBER, WHATSAPP_URL } from "@/lib/data";

function TrustCard({ item, delay }: { item: TrustItem; delay: string }) {
  return (
    <div
      className={`reveal ${delay} group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 flex flex-col items-start gap-4 hover:shadow-xl hover:border-cyan-200 hover:-translate-y-1.5 transition-all duration-300 cursor-default`}
    >
      <div className="w-12 h-12 flex items-center justify-center bg-slate-900 group-hover:bg-cyan-600 rounded-xl text-2xl transition-colors duration-300">
        {item.icon}
      </div>
      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">{item.title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
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
      { threshold: 0.12 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const delays = ["reveal-d1", "reveal-d2", "reveal-d3", "reveal-d4"];

  return (
    <section id="why-us" aria-label="למה לבחור ב-Vish Wash" className="py-16 sm:py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="reveal text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest text-cyan-600 uppercase mb-3">למה לבחור בנו</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            למה עסקים בוחרים בנו?
          </h2>
          <div className="mx-auto w-14 h-1 rounded-full bg-cyan-500 mb-5" />
          <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto">
            בנינו את המוניטין שלנו על אמינות, איכות ותוצאות שמורגשות מיידית.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {trustItems.map((item, i) => (
            <TrustCard key={item.id} item={item} delay={delays[i] ?? ""} />
          ))}
        </div>

        {/* Free walkthrough CTA block */}
        <div className="reveal reveal-d3 rounded-2xl bg-slate-900 px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-start">
          <div>
            <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-2">ללא עלות • ללא התחייבות</p>
            <h3 className="text-2xl font-extrabold text-white mb-1">תאמו סיור חינם במקום שלכם</h3>
            <p className="text-slate-400 text-sm max-w-sm">נגיע, נבדוק, ונציע פתרון ניקוי המותאם בדיוק לצרכים שלכם.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-bold px-7 py-3 rounded-xl transition-colors duration-200 shadow-md">
              תאמו סיור חינם
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3 rounded-xl transition-colors duration-200">
              💬 וואטסאפ
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
