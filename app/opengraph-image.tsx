import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Vish Wash – שירותי ניקוי מקצועיים | מהרצליה עד קיסריה";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BUSINESS_NAME = process.env.NEXT_PUBLIC_BUSINESS_NAME || "Vish Wash";
const CITY = process.env.NEXT_PUBLIC_CITY || "תל אביב";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e1030 0%, #3b1a6b 50%, #1a1040 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(124,58,237,0.25)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "rgba(139,92,246,0.18)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            zIndex: 1,
          }}
        >
          {/* Logo / brand */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            🧹 {BUSINESS_NAME}
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 34,
              fontWeight: 600,
              color: "#c4b5fd",
              marginTop: 8,
            }}
          >
            שירותי ניקוי מסחרי מקצועיים ב{CITY}
          </div>

          {/* Pills */}
          <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
            {["ניקוי משרדים", "ניקוי קליניקות", "לאחר שיפוץ"].map((s) => (
              <div
                key={s}
                style={{
                  background: "rgba(124,58,237,0.4)",
                  border: "1.5px solid rgba(196,181,253,0.5)",
                  borderRadius: 9999,
                  padding: "10px 24px",
                  fontSize: 22,
                  color: "#f3f0ff",
                  fontWeight: 600,
                }}
              >
                {s}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              marginTop: 28,
              background: "#7c3aed",
              borderRadius: 14,
              padding: "14px 40px",
              fontSize: 26,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            הצעת מחיר חינם תוך שעתיים ✅
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
