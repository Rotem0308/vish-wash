# Vish Wash 🧹

A modern, production-ready website for a commercial cleaning business — built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**.

RTL-first (Hebrew), mobile-first, dark-mode ready, fully SEO-optimized, and deployable to Vercel in minutes.

---

## ✨ Features

| Category | Details |
|---|---|
| **Framework** | Next.js 16 (App Router, React 19, Server Components) |
| **Styling** | Tailwind CSS v4 with CSS custom properties for light/dark theming |
| **Language** | TypeScript — strict mode |
| **SEO** | Dynamic `<meta>`, Open Graph image generation, `sitemap.xml`, `robots.txt`, JSON-LD structured data (LocalBusiness, FAQ, BreadcrumbList, WebSite) |
| **PWA** | Web App Manifest, Apple touch icons, theme-color meta tags |
| **Accessibility** | Font-size toolbar, `aria-label` on icon-only elements, keyboard navigable |
| **Dark Mode** | Class-based toggle via `next-themes`, persisted to `localStorage` |
| **3D Animation** | Three.js cleaning scene in the hero section |
| **Contact** | Email via Resend API, WhatsApp floating button, sticky mobile CTA |
| **Chatbot** | Built-in chatbot widget for visitor questions |
| **Image Carousel** | Showcases cleaning work with 7 project photos |
| **Linting** | ESLint 9 with `eslint-config-next` |

---

## 📁 Project Structure

```
app/
├── layout.tsx          # Root layout (Header, Footer, WhatsApp, CTA)
├── page.tsx            # Homepage – composes all section components
├── globals.css         # Tailwind v4 import + theme tokens + animations
├── manifest.ts         # PWA manifest
├── sitemap.ts          # Dynamic sitemap generation
├── robots.ts           # Robots.txt generation
├── opengraph-image.tsx # OG image generation
└── api/
    ├── contact/route.ts    # Contact form → Resend email
    └── checklist/route.ts  # Cleaning checklist API

components/             # UI components (flat structure)
├── Hero.tsx            # Hero section with 3D scene
├── ServicesSection.tsx  # Service cards grid
├── TrustSection.tsx    # Trust/credibility items
├── ContactSection.tsx  # Contact form
├── FAQSection.tsx      # Accordion FAQ
├── Header.tsx          # Navigation bar
├── Footer.tsx          # Site footer
├── FloatingWhatsApp.tsx # Floating WhatsApp button
├── StickyMobileCTA.tsx # Sticky mobile call-to-action bar
├── ThemeProvider.tsx   # Dark mode provider
├── AccessibilityToolbar.tsx # Font size controls
├── ChatbotWidget.tsx   # Chatbot
└── ...

lib/
├── data.ts             # All business data (phone, email, services, trust items)
└── seo.ts              # Metadata, JSON-LD schemas

docs/
├── CUSTOMIZATION.md    # How to customize content for a new client
└── DEPLOYMENT.md       # Step-by-step Vercel deployment guide
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm**, **yarn**, **pnpm**, or **bun**

### Install & Run

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/vish-wash.git
cd vish-wash

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_PHONE_NUMBER=+972501234567
NEXT_PUBLIC_WHATSAPP_NUMBER=972501234567
NEXT_PUBLIC_EMAIL=info@vishwash.co.il
NEXT_PUBLIC_BUSINESS_NAME=Vish Wash
NEXT_PUBLIC_CITY=תל אביב
NEXT_PUBLIC_ADDRESS=רחוב הרצל 123, תל אביב, ישראל
NEXT_PUBLIC_SERVICE_AREA=מהרצליה ועד קיסריה
NEXT_PUBLIC_BASE_URL=https://vishwash.co.il

# Resend (for contact form emails)
RESEND_API_KEY=re_xxxxxxxxxxxx
```

All business data falls back to sensible defaults if env vars are not set. See [`docs/CUSTOMIZATION.md`](docs/CUSTOMIZATION.md) for the full list.

---

## 🎨 Customization

This project is designed to be white-labeled for any cleaning business:

1. **Business info** — Update env vars or edit fallback values in `lib/data.ts`
2. **Services** — Edit the `services` array in `lib/data.ts`
3. **Images** — Replace photos in `public/images/`
4. **Colors** — Adjust CSS custom properties in `app/globals.css`
5. **SEO** — Metadata and JSON-LD are auto-generated from `lib/data.ts` values

Full guide: [`docs/CUSTOMIZATION.md`](docs/CUSTOMIZATION.md)

---

## 🌐 Deployment

The site is optimized for [Vercel](https://vercel.com):

1. Push code to GitHub
2. Import the repo in the Vercel dashboard
3. Add environment variables
4. Deploy

Full guide: [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)

---

## 🛠 Tech Stack

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS v4](https://tailwindcss.com/) — Utility-first CSS
- [Three.js](https://threejs.org/) — 3D graphics for hero animation
- [next-themes](https://github.com/pacocoursey/next-themes) — Dark mode
- [Resend](https://resend.com/) — Transactional email API

---

## 📄 License

This project is private and proprietary.
