"use client";

import { useEffect, useRef } from "react";
import { trustItems, TrustItem } from "@/lib/data";

function TrustCard({ item, delay }: { item: TrustItem; delay: string }) {
  return (
    <div
      className={`reveal ${delay} group bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 flex flex-col items-start gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default`}
    >
      <div className="w-12 h-12 flex items-center justify-center bg-blue-50 group-hover:bg-blue-100 rounded-xl text-2xl transition-colors duration-200">
        {item.icon}
      </div>
      <h3 className="font-bold text-gray-900 text-base">{item.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
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
    <section id="why-us" aria-label="למה לבחור ב-Vish Wash" className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 via-violet-50/40 to-purple-50/30" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            למה עסקים בוחרים בנו?
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
            בנינו את המוניטין שלנו על אמינות, איכות ותוצאות שמורגשות מיידית.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustItems.map((item, i) => (
            <TrustCard key={item.id} item={item} delay={delays[i] ?? ""} />
          ))}
        </div>
      </div>
    </section>
  );
}
