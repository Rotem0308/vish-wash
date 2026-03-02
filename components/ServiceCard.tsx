import { Service } from "@/lib/data";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-cyan-200 hover:-translate-y-1.5 transition-all duration-300 p-7 flex flex-col gap-5">
      {/* Icon box */}
      <div className="w-14 h-14 flex items-center justify-center bg-slate-900 group-hover:bg-cyan-600 rounded-2xl text-3xl transition-colors duration-300">
        {service.icon}
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
      </div>

      {/* Subtle divider */}
      <div className="h-px bg-slate-100 group-hover:bg-cyan-100 transition-colors duration-300" />

      <a
        href="#contact"
        className="inline-flex items-center gap-1.5 text-slate-700 group-hover:text-cyan-600 font-semibold text-sm transition-colors duration-200"
      >
        בקשו שירות
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 rtl:rotate-180 group-hover:-translate-x-0.5 transition-transform duration-200" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </a>
    </div>
  );
}
