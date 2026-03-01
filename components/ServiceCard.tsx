import { Service } from "@/lib/data";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <div className="w-14 h-14 flex items-center justify-center bg-violet-50 rounded-2xl text-3xl">
        {service.icon}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
      </div>
      <a
        href="#contact"
        className="mt-auto inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors duration-200 shadow-sm"
      >
        בקשו שירות ←
      </a>
    </div>
  );
}
