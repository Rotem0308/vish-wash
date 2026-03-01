# Project Customization Guide

Everything you need to change before launching this site for a real client or business. All adjustable content is centralized — you should never need to hunt through component files.

---

## 1. Business Contact Details

**File:** `lib/data.ts`

Set these via environment variables (recommended) or edit the fallback values directly in the file.

| Env Variable | What it controls | Where it appears |
|---|---|---|
| `NEXT_PUBLIC_PHONE_NUMBER` | Phone number with country code | Header, Hero, CTA section, Contact section, Footer |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number **without** `+` | All WhatsApp links (`wa.me/...`) |
| `NEXT_PUBLIC_EMAIL` | Contact email | Contact section, Footer |
| `NEXT_PUBLIC_BUSINESS_NAME` | Brand name | Header logo, Footer, SEO titles, JSON-LD schema |
| `NEXT_PUBLIC_CITY` | City name | Hero badge, SEO keywords, Footer, JSON-LD schema |
| `NEXT_PUBLIC_ADDRESS` | Full street address | Footer, JSON-LD schema |
| `NEXT_PUBLIC_SERVICE_AREA` | Service area description | Hero, Footer, SEO, JSON-LD schema |
| `NEXT_PUBLIC_BASE_URL` | Production domain | Open Graph, canonical URL, JSON-LD schema |

> Set these in your `.env.local` file locally, or in the **Vercel dashboard → Environment Variables** for production. See [DEPLOYMENT.md](./DEPLOYMENT.md).

---

## 2. Services

**File:** `lib/data.ts` → `services` array

Each service is an object with four fields:

```ts
{
  id: 1,
  title: "Office Cleaning",            // Card heading
  description: "Short benefit copy",   // 1–2 sentences
  icon: "🏢",                          // Emoji or swap for an SVG component
}
```

- Add, remove, or rename services here.
- The `ServicesSection` component renders them dynamically — the grid adjusts automatically.
- Currently set to 3 services; any number works.

---

## 3. Trust / Credibility Items

**File:** `lib/data.ts` → `trustItems` array

```ts
{
  id: 1,
  icon: "⚡",
  title: "Fast Response",
  description: "We respond within 2 hours — guaranteed.",
}
```

- Edit the 4 items to match your real business strengths.
- The grid layout adapts to any number of items.

---

## 4. SEO — Titles, Description & Keywords

**File:** `lib/seo.ts`

- `defaultMetadata.title.default` — the `<title>` tag shown in browser tabs and Google results.
- `defaultMetadata.description` — the meta description (shown under the link in search results, ~155 chars).
- `defaultMetadata.keywords` — array of search terms; adjust to your city and actual services.

The city name is pulled from `NEXT_PUBLIC_CITY` automatically, so updating that env var updates the keywords too.

---

## 5. Local Business Schema (JSON-LD)

**File:** `lib/seo.ts` → `localBusinessSchema`

This structured data helps Google show your business in local search and Maps.

Things to update manually (not covered by env vars):

```ts
geo: {
  latitude: 32.0853,    // ← replace with your actual latitude
  longitude: 34.7818,   // ← replace with your actual longitude
},
openingHoursSpecification: [
  // ← adjust days and hours to match your real schedule
],
priceRange: "$$",       // ← $, $$, or $$$
```

To find your coordinates: open [maps.google.com](https://maps.google.com), right-click your address, and copy the coordinates.

---

## 6. Hero Section Copy

**File:** `components/Hero.tsx`

- **Headline** (`<h1>`) — the main benefit statement. Make it specific to your market.
- **Subheadline** (`<p>`) — who you serve (offices, clinics, etc.).
- **Badge** — the social proof line above the headline (e.g. "Trusted by 200+ Businesses").
- **Micro-copy** — the small line below the CTA buttons (response time, phone number).

---

## 7. CTA Section Copy

**File:** `components/CtaSection.tsx`

- Headline and subheadline text
- Scarcity badge text (e.g. "Limited availability – Book Today")

---

## 8. OG / Social Sharing Image

**File:** `public/images/og-image.jpg`

This image appears when someone shares your link on WhatsApp, Facebook, or LinkedIn.

- Dimensions: **1200 × 630 px**
- Format: JPG or PNG
- Replace the placeholder with a real branded image (logo on a clean background, or a photo of your team/work)

---

## 9. Favicon

**File:** `app/favicon.ico`

Replace with your own favicon. You can generate one from your logo at [favicon.io](https://favicon.io).

---

## 10. Contact Form Backend

**File:** `components/ContactSection.tsx` → `handleSubmit` function

The form UI is complete but the submission logic is a placeholder (`setSubmitted(true)`). Connect it to one of these:

| Option | How |
|---|---|
| **Formspree** (easiest) | Replace `handleSubmit` body with `fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', body: JSON.stringify(formState) })` |
| **EmailJS** | `npm install @emailjs/browser`, then call `emailjs.send(...)` |
| **Next.js API route** | Create `app/api/contact/route.ts` and use `nodemailer` or `resend` |

---

## 11. Colors & Branding

The site uses **blue-600** as the primary accent color throughout. To change the brand color, do a project-wide find-and-replace:

- Replace `blue-600` / `blue-700` / `blue-50` / `blue-100` with your chosen Tailwind color (e.g. `emerald-600`)
- Replace `shadow-blue-200` accordingly

No Tailwind config changes are needed — Tailwind v4 scans your files automatically.

---

## 12. Language / Locale

**File:** `app/layout.tsx`

```tsx
<html lang="en" ...>
```

Change `en` to your language code (e.g. `he` for Hebrew, `ar` for Arabic). This affects screen readers and browser translation prompts.

For RTL support (`he`, `ar`), also add `dir="rtl"` to the `<html>` tag and review the layout for alignment adjustments.
