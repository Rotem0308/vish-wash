import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ThemeProvider from "@/components/ThemeProvider";
import AccessibilityToolbar from "@/components/AccessibilityToolbar";
import ChatbotWidget from "@/components/ChatbotWidget";
import { defaultMetadata, localBusinessSchema, webSiteSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";

const rubik = Rubik({
  subsets: ["latin", "hebrew"],
  variable: "--font-rubik",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* ── Theme colour (address-bar on mobile) ───────────────────── */}
        <meta name="theme-color" content="#7c3aed" />
        <meta name="theme-color" content="#f8f5ff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0c0a16" media="(prefers-color-scheme: dark)" />

        {/* ── Apple touch / PWA ──────────────────────────────────────── */}
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Vish Wash" />

        {/* ── JSON-LD structured data ─────────────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body className={`${rubik.variable} font-sans antialiased bg-white text-gray-900`}>
        <ThemeProvider>
          <AccessibilityToolbar />
          <Header />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
          <ChatbotWidget />
          <StickyMobileCTA />
        </ThemeProvider>
      </body>
    </html>
  );
}
