import { Metadata } from "next";
import { BUSINESS_NAME, CITY, PHONE_NUMBER, EMAIL, ADDRESS, SERVICE_AREA } from "./data";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://vishwash.co.il";

// ─── Core metadata ──────────────────────────────────────────────────────────

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${BUSINESS_NAME} – ניקוי משרדים, קליניקות, בתים ודירות | ${SERVICE_AREA}`,
    template: `%s | ${BUSINESS_NAME} – ניקוי מקצועי`,
  },
  description: `${BUSINESS_NAME} – שירותי ניקוי מקצועיים באזור ${SERVICE_AREA}. ניקוי משרדים, קליניקות (אדם ובעלי חיים), בתים ודירות. צוות של 1–2 עובדים, הצעת מחיר חינם תוך שעתיים. ✅ מבוטחים ✅ ניסיון מוכח.`,
  keywords: [
    `ניקוי משרדים`,
    `ניקוי דירות`,
    `ניקוי בתים`,
    `ניקוי קליניקות`,
    `ניקוי קליניקות וטרינריות`,
    `ניקוי משרדים הרצליה`,
    `ניקוי משרדים נתניה`,
    `ניקוי דירות קיסריה`,
    `ניקוי בתים חדרה`,
    `שירות ניקוי לעסקים`,
    `ניקוי שוטף ותחזוקה`,
    `ניקוי לאחר שיפוץ`,
    `מנקה משרדים`,
    `ניקוי שבועי לעסקים`,
    `cleaning services herzliya`,
    `office cleaning netanya`,
    `apartment cleaning israel`,
  ],
  authors: [{ name: BUSINESS_NAME, url: BASE_URL }],
  creator: BUSINESS_NAME,
  publisher: BUSINESS_NAME,
  category: "שירות ניקוי מסחרי",
  applicationName: BUSINESS_NAME,
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  // Verification — fill in real codes after registering in Search Console / Bing
  // verification: { google: "YOUR_GOOGLE_TOKEN", yandex: "...", bing: "..." },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: BASE_URL,
    siteName: BUSINESS_NAME,
    title: `${BUSINESS_NAME} – ניקוי משרדים, קליניקות, בתים ודירות | ${SERVICE_AREA}`,
    description: `שירותי ניקוי מקצועיים באזור ${SERVICE_AREA}. משרדים, קליניקות, בתים ודירות. מענה תוך שעתיים. צוות מסור ומבוטח.`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${BUSINESS_NAME} – שירותי ניקוי מסחרי מקצועיים ב${CITY}`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS_NAME} – ניקוי משרדים מקצועי | ${SERVICE_AREA}`,
    description: `ניקוי משרדים, קליניקות, בתים ודירות באזור ${SERVICE_AREA}. הצעת מחיר חינם תוך שעתיים. ✅`,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: { "he-IL": BASE_URL },
  },
};

// ─── LocalBusiness schema (full) ─────────────────────────────────────────────

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${BASE_URL}/#business`,
  name: BUSINESS_NAME,
  description: `שירותי ניקוי משרדים, קליניקות, בתים ודירות באזור ${SERVICE_AREA}. צוות של 1–2 עובדים, מענה מהיר, מחירים הוגנים ואיכות מובטחת.`,
  url: BASE_URL,
  telephone: PHONE_NUMBER,
  email: EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS,
    addressLocality: CITY,
    addressRegion: "מחוז תל אביב",
    postalCode: "6100000",
    addressCountry: "IL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 32.0853,
    longitude: 34.7818,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "07:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday"],
      opens: "07:00",
      closes: "14:00",
    },
  ],
  priceRange: "$$",
  image: `${BASE_URL}/og-image.png`,
  logo: `${BASE_URL}/icons/icon-192.png`,
  sameAs: [
    `https://wa.me/${PHONE_NUMBER.replace(/\D/g, "")}`,
  ],
  areaServed: [
    { "@type": "City", name: "הרצליה" },
    { "@type": "City", name: "נתניה" },
    { "@type": "City", name: "חדרה" },
    { "@type": "City", name: "כפר סבא" },
    { "@type": "City", name: "רעננה" },
    { "@type": "City", name: "אור עקיבא" },
    { "@type": "City", name: "זכרון יעקב" },
    { "@type": "City", name: "קיסריה" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "134",
    bestRating: "5",
    worstRating: "1",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "שירותי ניקוי",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "ניקוי משרדים",
          description: `ניקוי יסודי של משרדים קטנים באזור ${SERVICE_AREA}`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "ניקוי קליניקות",
          description: `ניקוי וחיטוי קליניקות לבני אדם ולבעלי חיים באזור ${SERVICE_AREA}`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "ניקוי בתים ודירות",
          description: `ניקוי יסודי של בתים ודירות באזור ${SERVICE_AREA}`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "ניקוי שוטף ותחזוקה",
          description: `ניקוי שבועי או דו-שבועי למשרדים, בתים וקליניקות`,
        },
      },
    ],
  },
};

// ─── WebSite schema (enables Sitelinks Search Box) ───────────────────────────

export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: BUSINESS_NAME,
  url: BASE_URL,
  publisher: { "@id": `${BASE_URL}/#business` },
  inLanguage: "he-IL",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

// ─── FAQPage schema ──────────────────────────────────────────────────────────

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: `כמה עולה ניקוי משרד או דירה?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `המחיר תלוי בגודל המקום ובתדירות הניקוי. ${BUSINESS_NAME} מציעה הצעת מחיר חינם ומותאמת אישית תוך שעתיים מפנייתכם. צרו קשר לקבלת הצעה ללא התחייבות.`,
      },
    },
    {
      "@type": "Question",
      name: "באילו ימים ושעות אתם מעניקים שירות?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `${BUSINESS_NAME} פועלת ימים א'–ה' בין 07:00–20:00 וביום שישי 07:00–14:00. אנחנו מתגמשים לפי צורכי הלקוח כולל ניקוי בשעות הערב ובסופי שבוע.`,
      },
    },
    {
      "@type": "Question",
      name: "האם אתם מנקים קליניקות לבעלי חיים?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `כן. ${BUSINESS_NAME} מתמחה בניקוי וחיטוי קליניקות לבני אדם וגם לבעלי חיים. הצוות עבר הכשרה מיוחדת ומשתמש בחומרי חיטוי מאושרים.`,
      },
    },
    {
      "@type": "Question",
      name: "כמה עובדים מגיעים לניקוי?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `אנחנו עובדים בצוות קטן ומסור של 1–2 עובדים. זה מאפשר לנו לתת יחס אישי ולהתאים את הניקוי לצרכים שלכם.`,
      },
    },
    {
      "@type": "Question",
      name: "באילו אזורים אתם נותנים שירות?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `אנחנו פועלים באזור ${SERVICE_AREA}. ניתן לשנות את אזור השירות דרך משתנה סביבה.`,
      },
    },
    {
      "@type": "Question",
      name: "האם השירות כולל ביטוח אחריות?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `כן. ${BUSINESS_NAME} מבוטחת בביטוח אחריות מקצועית מלא. במקרה של נזק – אנחנו נושאים באחריות המלאה.`,
      },
    },
    {
      "@type": "Question",
      name: "האם אתם מציעים ניקוי לאחר שיפוץ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `כן. ניקוי לאחר שיפוץ הוא אחד השירותים שלנו. הצוות מוצא וסולק שיירי אבק, גיר, סיד ושאריות בנייה מכל פינות הנכס.`,
      },
    },
  ],
};

// ─── BreadcrumbList schema ───────────────────────────────────────────────────

export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "ראשי",
      item: BASE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "שירותים",
      item: `${BASE_URL}/#services`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "צרו קשר",
      item: `${BASE_URL}/#contact`,
    },
  ],
};

