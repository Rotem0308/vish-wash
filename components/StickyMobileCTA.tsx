import { PHONE_NUMBER, WHATSAPP_URL } from "@/lib/data";

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-2xl px-4 py-3 flex gap-3">
      <a
        href={`tel:${PHONE_NUMBER}`}
        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm py-3.5 rounded-xl transition-colors duration-200"
      >
        📞 התקשרו עכשיו
      </a>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold text-sm py-3.5 rounded-xl transition-colors duration-200"
      >
        💬 וואטסאפ
      </a>
    </div>
  );
}
