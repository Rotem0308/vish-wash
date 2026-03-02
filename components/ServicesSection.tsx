import { services } from "@/lib/data";
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
  return (
    <section id="services" aria-label="השירותים שלנו" className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest text-cyan-600 uppercase mb-3">מה אנחנו מציעים</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            השירותים שלנו
          </h2>
          {/* Cyan underline accent */}
          <div className="mx-auto w-14 h-1 rounded-full bg-cyan-500 mb-5" />
          <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto">
            ניקוי מקצועי המותאם לכל סוג עסק. ללא חוזים נעולים. רק תוצאות עקביות.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
