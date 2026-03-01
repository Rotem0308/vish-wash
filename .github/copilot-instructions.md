# Vish Wash – Copilot Instructions

## Project Overview
Next.js 16 (App Router) website for a commercial cleaning business.
TypeScript, Tailwind CSS v4, ESLint 9.

## Architecture Rules
- All business data (phone, email, services, trust items) lives in `lib/data.ts`
- SEO metadata and JSON-LD schema live in `lib/seo.ts`
- Components are in `components/` — flat structure, no sub-folders unless feature grows large
- Use Server Components by default; add `"use client"` only when hooks/events are needed
- Tailwind CSS v4 — uses `@import "tailwindcss"` in globals.css, NOT `@tailwind` directives
- No inline styles — use Tailwind utility classes only

## Key Files
- `lib/data.ts` — phone number, WhatsApp, email, services array, trust items
- `lib/seo.ts` — Metadata export + localBusinessSchema JSON-LD
- `app/layout.tsx` — Root layout with Header, Footer, FloatingWhatsApp, StickyMobileCTA
- `app/page.tsx` — Homepage composing all section components
- `app/globals.css` — Tailwind v4 import + custom keyframe animations

## Coding Conventions
- Use named exports for data/utilities, default exports for components
- Always use `@/` import alias (configured in tsconfig)
- Mobile-first: write base styles for mobile, use `sm:`, `md:`, `lg:` for larger screens
- Accessibility: include `aria-label` on icon-only buttons and links
