# American Dream — The Platform

An interactive, browser-based sales deck for the American Dream mall (Meadowlands, NJ) — built as a cross between a luxury brand website, a cinematic pitch deck, and an explorable commercial site. Every section is designed to move prospects toward a specific business action: leasing a space, sponsoring the property, or booking a venue.

**Live URL:** _add deployed URL here_

---

## Tech stack

- **Next.js 16** (App Router, Turbopack, React 19)
- **TypeScript** (strict)
- **Framer Motion 12** — motion design, scroll-linked parallax, masked reveals
- **Tailwind 4** — layout + responsive breakpoints (inline styles for component-specific styling)
- **Cloudinary** — all imagery/video delivered with `f_auto,q_auto` optimization; hero poster preloaded for sub-1.5s LCP
- **Google Fonts** via `next/font` — Montserrat (UI), Fraunces (editorial display), Geist (system)

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (14 static routes + 1 dynamic API route)
npm run start        # serve the production build
```

No environment variables needed. The inquiry API route (`/api/inquiry`) logs to server console — swap in Resend / SMTP / CRM for production without touching any UI code.

---

## Project structure

```
app/
├── layout.tsx               # Root metadata, OG tags, InquiryProvider, fonts
├── page.tsx                 # Phase 1 deck (homepage)
├── api/inquiry/route.ts     # POST endpoint — validates + logs
├── leasing/                 # PHASE 2 MODULE — Leasing Paths
│   ├── page.tsx             # Hub: concertina 4-tile chooser
│   └── [category]/page.tsx  # Dynamic: luxury / retail / dining / popup
└── venues/                  # PHASE 2 MODULE — Venues
    ├── page.tsx             # Hub: 2×2 cinematic grid
    └── [venue]/page.tsx     # Dynamic: arena / performing-arts / expo / private-events

components/
├── Hero, WhyProperty, StorySlides, LuxurySection,
│   ExperienceGrid, BrandMarquee, DiningSection,
│   EventsSection, Footer, Navbar     # Phase 1 homepage sections
├── InquiryModal.tsx                  # Shared modal (4 tabs + API submit)
├── leasing/                          # Phase 2 leasing section components
└── venues/                           # Phase 2 venue section components

lib/
├── leasing.ts                        # Single source of truth — 4 categories, 32 tenants
└── venues.ts                         # Single source of truth — 4 venues, specs, past events

providers/
├── InquiryProvider.tsx               # Global modal open/close context
└── SmoothScrollProvider.tsx
```

---

## Architecture notes

**Single-page deck** (Phase 1): video-first hero, non-linear anchor nav, 8 narrative sections. Adaptive Navbar theme detects which section is currently behind it and swaps between light/dark palettes automatically.

**Two sub-modules** (Phase 2):
- **Leasing Paths** — parallel-path pattern. 4 sub-routes (`/leasing/luxury`, etc.) share one template, differentiated only by data. Adding a 5th category = one entry in `lib/leasing.ts`.
- **Venues** — hub-and-detail pattern. Different layout language (2×2 grid hub, spec-and-production per venue) to demonstrate architectural range, not just template reuse.

Both modules share the same typography, motion curves, and palette, but have zero shared components — this keeps each module independently maintainable.

**Inquiry flow** — a single `<InquiryModal>` with 4 tabs (Leasing / Sponsorship / Booking / Press) is reachable from every CTA on every page via the `useInquiry()` hook. The modal submits to `/api/inquiry` with zod-style manual validation.

---

## AI tools used

- **Cinematic hero images** (4 leasing categories + venue photography) — AI-generated, refined through iteration to match the luxury/editorial palette (navy base, gold accents, deep shadows).
- **Brand logos** — sourced from public vector repositories (WorldVectorLogo, SeekLogo, etc.), uploaded to Cloudinary. Applied Cloudinary's `e_make_transparent` transform during development when we needed white backgrounds stripped (later removed once the tenant cards went white).
- **Copywriting assist** — pitch, testimonial, and past-events copy drafted with AI and edited for voice consistency (editorial, luxury-magazine cadence).
- **Development** — Claude Code (Opus 4.6) for iterative implementation, architectural decisions, and design refinement. Every file in this repo has been reviewed and edited through conversation rather than one-shot generation.

---

## Design decisions

- **Typography as a system** — Fraunces (serif, display) for editorial moments, Montserrat (geometric sans) for UI. Gold `#C9A96E` as the single brand accent.
- **Non-linear, not linear** — every page is scroll-through, but the deck does not enforce a narrative order. Nav, footer, and cross-links let a prospect land anywhere.
- **One modal, four uses** — rather than four separate inquiry pages, the modal reuses the same form with context-aware copy per tab. Cleaner UX, less code, faster to extend.
- **White brand-wall tenant cards** — on the leasing pages, tenant logos sit on pure-white cards against a dark section. This is the classic "luxury group" treatment (think Madison Avenue press wall), and it lets every logo read at its native color/weight without needing monochrome normalization.
- **Adaptive Navbar** — detects light-vs-dark section behind it on scroll and animates between two palettes. Text is always readable; glass is always appropriate.
- **Performance-first Cloudinary pipeline** — every image served through `f_auto,q_auto`. Hero poster uses an explicit `<link rel="preload">` + high-priority `<img>` to hit LCP < 1.5s on desktop.

---

## Performance

- **Desktop Lighthouse** (median of 3 runs on homepage): Performance 94 · Accessibility 100 · Best Practices 100 · SEO 100
- **Mobile Lighthouse** (homepage): Accessibility 100, Best Practices 100, SEO 97, Performance 64 (video-heavy LCP on throttled 4G — brief notes mobile as "a bonus")

---

## What I'd improve with more time

- **Real CMS integration** — `lib/leasing.ts` and `lib/venues.ts` should be driven from Sanity or similar so the commercial team can edit tenants/spaces without deploys.
- **Sponsorship module** (3rd Phase 2 sub-module) — currently only reachable through the modal; could get its own `/sponsorship` page with tier table + audience data.
- **Real inquiry backend** — Resend + dedicated inbox per category (leasing / sponsorship / booking / press) routed automatically.
- **3D floorplan teaser** — on the leasing space listings, a lightweight Three.js/r3f overlay showing the unit's position in the mall.
- **i18n-ready** — the brief talks about global brand prospects; adding `/en`, `/ar`, `/zh` routing would open this for international outreach.
- **Analytics hooks** — tag every InquiryModal open/submit with source (which CTA was clicked) so the sales team can see which sections convert.

---

## Deployment

Deployed on Vercel. The `metadataBase` in [app/layout.tsx](app/layout.tsx) should be updated to the live URL on first deploy so Open Graph share previews resolve correctly.
