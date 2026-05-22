# DocFlow AI — Marketing Website

Marketing website for **DocFlow AI**, an AI-powered document extraction service for Australian accounting firms, bookkeepers, and small businesses.

Built with Next.js 16, Tailwind CSS v4, Framer Motion, and TypeScript.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, features, audience segments, pricing snapshot |
| `/how-it-works` | 4-step animated walkthrough with demo images |
| `/pricing` | Monthly/annual toggle, 3 plans, add-ons, billing FAQ |
| `/faqs` | 22 categorised questions with filter pills |
| `/guides` | 6 expandable inline guides |
| `/contact` | Contact form (Resend), Calendly placeholder |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```env
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=sid@docflowai.com.au
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/10min
```

**Resend:** Get a free API key at [resend.com](https://resend.com). Add `docflowai.com.au` as a verified sending domain.

**Calendly:** Replace `NEXT_PUBLIC_CALENDLY_URL` with your Calendly booking link once your account is set up.

### 3. Add your logo

Replace the placeholder logo by dropping your files here:

```
public/logo.svg          ← main logo SVG
public/favicon.ico       ← favicon
```

Then update `components/layout/Navbar.tsx` and `components/layout/Footer.tsx` to use `<Image src="/logo.svg" ...>` instead of the text placeholder.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploying to Vercel

### Option A — Vercel CLI

```bash
npx vercel
```

Follow the prompts. Set your environment variables in the Vercel dashboard under **Settings → Environment Variables**.

### Option B — GitHub integration

1. Push this repo to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add env vars in the Vercel dashboard
4. Deploy

### Custom domain

Add `docflowai.com.au` in your Vercel project under **Settings → Domains**.

---

## Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.x | App Router, TypeScript, SSG |
| `tailwindcss` | v4 | Styling |
| `framer-motion` | latest | Animations |
| `lucide-react` | latest | Icons |
| `react-hook-form` | latest | Form handling |
| `zod` | latest | Schema validation |
| `resend` | latest | Contact form email delivery |

---

## Design System

| Token | Value |
|-------|-------|
| `--navy` | `#0A1628` — hero backgrounds |
| `--navy-mid` | `#0F2557` — cards, nav |
| `--cyan` | `#00C2CB` — accent, CTA buttons |
| `--cyan-light` | `#E0FAFA` — tinted backgrounds |
| `--off-white` | `#F6F9FC` — alternating sections |
| Display font | `Sora` (Google Fonts) |
| Body font | `Inter` (Google Fonts) |

---

## Post-Launch Checklist

- [ ] Add real logo + favicon
- [ ] Set `RESEND_API_KEY` and verify `docflowai.com.au` domain in Resend
- [ ] Set `NEXT_PUBLIC_CALENDLY_URL` to your Calendly link
- [ ] Update `CONTACT_EMAIL` in `.env.local`
- [ ] Add Google Analytics or Plausible (optional)
- [ ] Configure Vercel domain → `docflowai.com.au`
- [ ] Add client testimonials to Home page once you have them

---

## Business Details

| Field | Value |
|-------|-------|
| Business | DocFlow AI |
| Owner | Siddhesh Lendhe |
| ABN | 99 465 716 115 |
| Location | Brisbane, QLD, Australia |
| Domain (to register) | docflowai.com.au |
