import { services } from "@/lib/data";
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
  return (
    <section id="services" aria-label="השירותים שלנו" className="py-24 sm:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
            style={{ color: "#0891b2", background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.20)" }}
          >
            מה אנחנו מציעים
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5 tracking-tight">
            השירותים שלנו
          </h2>
          {/* Thin cyan rule */}
          <div className="mx-auto w-12 h-[3px] rounded-full mb-6" style={{ background: "linear-gradient(to left, #0f172a, #06b6d4)" }} />
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            ניקוי מקצועי המותאם לכל סוג עסק. ללא חוזים נעולים. רק תוצאות עקביות.
          </p>
        </div>

        {/* Bento-box asymmetric grid */}
        <div className="bento-grid">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              featured={i === 0}
              className={`bento-${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
