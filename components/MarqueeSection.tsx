/**
 * Infinite-scroll "Trusted by" marquee section.
 * Pure CSS animation — no JS frame loops, no layout shift.
 */

const LOGOS = [
  { name: "Google",     icon: "🔵" },
  { name: "Microsoft",  icon: "🟩" },
  { name: "Salesforce", icon: "☁️" },
  { name: "Airbnb",     icon: "🏠" },
  { name: "Spotify",    icon: "🎵" },
  { name: "Dropbox",    icon: "📦" },
  { name: "Figma",      icon: "🎨" },
  { name: "Notion",     icon: "📋" },
];

export default function MarqueeSection() {
  // Duplicate items so the loop looks seamless
  const items = [...LOGOS, ...LOGOS];

  return (
    <section
      aria-label="לקוחות שסומכים עלינו"
      className="relative overflow-hidden py-10"
      style={{
        background: "#f8fafc",
        borderTop:    "1px solid #e2e8f0",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      {/* Fade edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10"
        style={{ background: "linear-gradient(to left, #f8fafc, transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10"
        style={{ background: "linear-gradient(to right, #f8fafc, transparent)" }}
      />

      <div className="max-w-xl mx-auto text-center mb-6 px-4">
        <p
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: "#94a3b8" }}
        >
          סומכים עלינו
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="marquee-track" aria-hidden>
          {items.map((logo, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 mx-8 shrink-0"
              style={{ minWidth: "max-content" }}
            >
              <span
                className="w-10 h-10 flex items-center justify-center rounded-xl text-xl shrink-0"
                style={{ background: "#fff", border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(15,23,42,0.06)" }}
              >
                {logo.icon}
              </span>
              <span
                className="text-sm font-semibold whitespace-nowrap"
                style={{ color: "#64748b" }}
              >
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
