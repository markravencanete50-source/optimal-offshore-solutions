# Optimal Offshore Solutions

Marketing + lead-generation website for **Optimal Offshore Solutions**, a KPO
(Knowledge Process Outsourcing) delivery firm. Single-page, motion-rich, and
built to convert enterprise operations leaders into pilot consultations.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Firebase (Firestore) · Vercel

- **Database:** Firebase Firestore (contact leads)
- **Repository:** GitHub
- **Hosting:** Vercel (auto-deploys on push to `main`)

## Brand palette

| Token | Hex | Use |
|-------|-----|-----|
| Corporate Blue | `#2F80ED` | interactive accents, focus states |
| Premium Gold | `#D4AF37` / `#E6C04B` | primary CTAs, signal accents |
| Charcoal Black | `#111827` | text, instrument panel |
| White | `#FFFFFF` | cards |
| Cool / Light Gray | `#6B7280` / `#F8FAFC` | supporting UI, backgrounds |

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Firebase values (optional for first run)
npm run dev                  # http://localhost:3000
```

The site runs without any environment variables — the contact form degrades
gracefully and logs submissions server-side until Firebase is configured.

## Sections

Hero (with animated operating scorecard) · Problem/Solution · 8 Services ·
Approach (Pilot → Measure → Scale) · Differentiators · Team · Mission &
Principles · Contact form · Footer.

> **Team photos** are intentionally left as initials placeholders — swap them in
> under `src/lib/content.ts` (`team[].photo`) and update `Team.tsx` once collected.

## Contact form → Firestore

`POST /api/contact` validates the payload (with a honeypot spam trap) and writes
a document to the `leads` collection via the Firebase **Admin SDK**.

Set these server-side env vars (see `.env.example`), pulled from a Firebase
service-account key:

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

Deploy `firestore.rules` (client access locked; Admin SDK bypasses rules):

```bash
firebase deploy --only firestore:rules
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add the environment variables from `.env.example` in the Vercel dashboard.
4. Deploy. Every push to `main` auto-deploys; PRs get preview URLs.

## Editing content

All copy lives in [`src/lib/content.ts`](src/lib/content.ts) — services, team
bios, principles, scorecard metrics, and company details — so non-code edits
happen in one file.
