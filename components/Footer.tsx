import Link from "next/link";
import {
  BUSINESS_NAME,
  PHONE_NUMBER,
  EMAIL,
  WHATSAPP_URL,
  ADDRESS,
  CITY,
} from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🧹</span>
              <span className="text-white font-bold text-xl">{BUSINESS_NAME}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              שירותי ניקוי מקצועיים למשרדים, קליניקות, בתים ודירות
              באזור מהרצליה ועד קיסריה. צוות קטן ומסור.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              ניווט מהיר
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "שירותים", href: "#services" },
                { label: "למה אנחנו?", href: "#why-us" },
                { label: "צרו קשר", href: "#contact" },
                { label: "הצעת מחיר חינם", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              צרו קשר
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center gap-2 hover:text-white transition-colors duration-200"
                >
                  📞 <span>{PHONE_NUMBER}</span>
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors duration-200"
                >
                  💬 <span>שלחו הודעה בוואטסאפ</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-2 hover:text-white transition-colors duration-200"
                >
                  ✉️ <span>{EMAIL}</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>{ADDRESS}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-500">
          <p>© {year} {BUSINESS_NAME}. כל הזכויות שמורות.</p>
          <p>שירותי ניקוי מקצועיים | מהרצליה עד קיסריה</p>
        </div>
      </div>
    </footer>
  );
}
