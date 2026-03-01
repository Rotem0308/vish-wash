import { services } from "@/lib/data";
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
  return (
    <section id="services" aria-label="השירותים שלנו" className="py-16 sm:py-20 bg-gradient-to-b from-white via-violet-50/30 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            השירותים שלנו
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
            ניקוי מקצועי המותאם לכל סוג עסק. ללא חוזים נעולים. רק תוצאות עקביות.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
