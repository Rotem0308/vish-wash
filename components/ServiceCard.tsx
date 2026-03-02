"use client";

import { Service } from "@/lib/data";

interface ServiceCardProps {
  service: Service;
  /** Optional CSS class for bento grid child positioning */
  className?: string;
  /** Mark card as visually featured (larger heading) */
  featured?: boolean;
}

export default function ServiceCard({ service, className = "", featured = false }: ServiceCardProps) {
  return (
    <div
      className={`group relative bg-white overflow-hidden flex flex-col gap-5 transition-all duration-350 cursor-default ${className}`}
      style={{
        borderRadius: "1.25rem",
        border: "1px solid #e2e8f0",
        padding: featured ? "2rem" : "1.5rem",
        boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.04)",
        transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-10px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 48px rgba(15,23,42,0.14), 0 0 0 1px rgba(6,182,212,0.25)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 3px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.04)";
      }}
    >
      {/* Cyan top accent line on hover */}
      <div
        className="absolute top-0 right-0 left-0 h-[3px] rounded-t-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(to left, #0f172a, #06b6d4)" }}
        aria-hidden
      />

      {/* Icon — animated placeholder */}
      <div
        className="w-14 h-14 flex items-center justify-center rounded-2xl text-3xl shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ background: "linear-gradient(135deg, #f8fafc, #e0f2fe)" }}
      >
        {service.icon}
      </div>

      <div className="flex-1">
        <h3 className={`font-extrabold text-slate-900 mb-2 ${featured ? "text-2xl" : "text-xl"}`}>{service.title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
      </div>

      <a
        href="#contact"
        className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
        style={{ color: "#0e7490" }}
      >
        בקשו שירות
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 rtl:rotate-180" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </a>
    </div>
  );
}
