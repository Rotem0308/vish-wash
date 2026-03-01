import { MetadataRoute } from "next";

const BUSINESS_NAME = process.env.NEXT_PUBLIC_BUSINESS_NAME || "Vish Wash";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BUSINESS_NAME,
    short_name: BUSINESS_NAME,
    description: "שירותי ניקוי מסחרי מקצועיים – משרדים, קליניקות ועסקים",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#7c3aed",
    lang: "he",
    dir: "rtl",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["business", "utilities"],
  };
}
