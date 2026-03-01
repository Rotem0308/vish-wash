# Deploying to Vercel

This guide walks you through deploying the Vish Wash website to Vercel from scratch.

---

## Prerequisites

- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account (free tier works)
- Node.js 18+ installed locally
- The project builds successfully: `npm run build`

---

## Step 1 — Push to GitHub

If you haven't already, create a GitHub repository and push your code:

```bash
git init                        # skip if already initialized
git add .
git commit -m "Initial commit"

# Create a new repo on github.com, then run:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

---

## Step 2 — Import into Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in.
2. Click **"Add New Project"**.
3. Click **"Import"** next to your GitHub repository.
   - If you don't see your repo, click **"Adjust GitHub App Permissions"** and grant access.
4. Vercel auto-detects Next.js — no framework configuration is needed.
5. Leave the **Build & Output Settings** at their defaults.

---

## Step 3 — Set Environment Variables

Before clicking Deploy, scroll down to **Environment Variables** and add all of the following:

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_BASE_URL` | Your production domain (no trailing slash) | `https://vishwash.co.il` |
| `NEXT_PUBLIC_PHONE_NUMBER` | Phone number shown on the site | `+972501234567` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number **without** the `+` sign | `972501234567` |
| `NEXT_PUBLIC_EMAIL` | Contact email address | `info@vishwash.co.il` |
| `NEXT_PUBLIC_BUSINESS_NAME` | Your business name | `Vish Wash` |
| `NEXT_PUBLIC_CITY` | Your city (used in SEO copy) | `Tel Aviv` |
| `NEXT_PUBLIC_ADDRESS` | Your full business address | `123 Herzl Street, Tel Aviv` |
| `NEXT_PUBLIC_SERVICE_AREA` | Service area (e.g. between two cities) | `מהרצליה ועד קיסריה` |

> **Important:** All variables must use the `NEXT_PUBLIC_` prefix so they are accessible in both server and client components.

---

## Step 4 — Deploy

Click **"Deploy"**. Vercel will:

1. Clone your repository
2. Run `npm install`
3. Run `npm run build`
4. Publish to a `.vercel.app` subdomain

This usually takes 1–2 minutes. Once done, you'll get a live URL like:
`https://your-repo-name.vercel.app`

---

## Step 5 — Connect a Custom Domain (Optional)

1. In your Vercel project, go to **Settings → Domains**.
2. Click **"Add Domain"** and enter your domain (e.g. `vishwash.co.il`).
3. Vercel will show you DNS records to add. Go to your domain registrar and add them:
   - For an apex domain: add an **A record** pointing to Vercel's IP.
   - For a `www` subdomain: add a **CNAME record**.
4. DNS propagation takes a few minutes to a few hours.
5. Vercel provisions an SSL certificate automatically — no setup required.

---

## Automatic Deployments (CI/CD)

Once connected, every push to the `main` branch triggers a new production deployment automatically.

Pull requests get their own **Preview URL** — great for reviewing changes before they go live.

---

## Updating Environment Variables After Deployment

1. Go to your Vercel project → **Settings → Environment Variables**.
2. Edit or add any variable.
3. Go to **Deployments** → click the three dots on the latest deployment → **"Redeploy"**.

No code changes are needed.

---

## Vercel CLI (Alternative — Deploy from Terminal)

```bash
npm install -g vercel   # install once
vercel login
vercel --prod           # deploy to production
```

The CLI will prompt you to link to an existing project or create a new one.

---

## Checklist Before Going Live

- [ ] All environment variables set in Vercel dashboard
- [ ] `NEXT_PUBLIC_BASE_URL` matches your real production domain
- [ ] OG image placed at `public/images/og-image.jpg` (1200×630 px)
- [ ] Contact form connected to a backend (Formspree / EmailJS / API route)
- [ ] Custom domain added and DNS configured
- [ ] Tested on mobile and desktop
