# VOR Platform — Vanguard Of Realty

A trust-first proptech and infrastructure company platform for verified Nigerian real estate. Built as a Phase 1 MVP with Next.js 15, TypeScript, and Tailwind CSS.

## Project Overview

**Positioning:** *A transparent, technology-driven real estate and infrastructure ecosystem focused on verified land, trusted development, and structured investment opportunities.*

**Trust pillars:** TRUST · TRANSPARENCY · VERIFIED REALTY

### Three Divisions

| Division | Focus |
|----------|--------|
| **VOR Terrain** | Land intelligence, acquisition, verification, sales |
| **VOR Home & Construct** | Construction, property development, housing marketplace |
| **VOR Finance** | Project financing, investor relations, investment pools |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| Fonts | DM Sans + Fraunces (Google Fonts) |
| Data (MVP) | Mock data in `src/lib/data/mock.ts` |
| API (stub) | Next.js Route Handlers (`/api/*`) |
| Future backend | NestJS + PostgreSQL (planned Phase 2+) |
| Maps (future) | Google Maps / Mapbox placeholder components |

## Getting Started

### Prerequisites

- Node.js 18.18+ (20+ recommended)
- npm

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Folder Structure

```
├── src/
│   ├── app/                    # App Router pages & API routes
│   │   ├── page.tsx            # Homepage
│   │   ├── terrain/            # Land marketplace, detail, verification, zones
│   │   ├── home-construct/     # Homes, services, projects, dashboard
│   │   ├── finance/            # Investor portal, funding, reports, loans
│   │   ├── corporate/          # About, governance, legal, careers, etc.
│   │   ├── admin/              # Admin dashboard (layout stub, no auth yet)
│   │   └── api/                # Placeholder REST routes
│   ├── components/
│   │   ├── layout/             # Header, Footer, PageHero, RootShell
│   │   ├── ui/                 # Button, badges, CTAs, headings
│   │   ├── properties/         # PropertyCard, HomeCard
│   │   ├── terrain/            # LandFilters
│   │   ├── home/               # Homepage sections
│   │   ├── maps/               # LandMapPlaceholder
│   │   └── corporate/          # CorporatePageTemplate
│   └── lib/
│       ├── data/mock.ts        # Nigerian RE mock data
│       ├── types/              # TypeScript interfaces
│       ├── constants/          # Navigation, regulatory bodies
│       └── utils/              # cn(), formatNaira()
├── public/
├── tailwind.config.ts          # VOR design tokens
└── README.md
```

## Pages & Routes

### Main Site

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, verified properties, map placeholder, estates, divisions, investor section, projects, testimonials, legal CTA |

### VOR Terrain

| Route | Description |
|-------|-------------|
| `/terrain` | Land Marketplace with filters (state, LGA, title type, price, size, grade) |
| `/terrain/[id]` | Property detail — GPS, title, survey, ROI, inspection booking, documents |
| `/terrain/verification` | Land Verification Center |
| `/terrain/zones` | Investment Zones |

### VOR Home & Construct

| Route | Description |
|-------|-------------|
| `/home-construct` | Homes Marketplace (buy / rent / lease tabs) |
| `/home-construct/services` | Construction Services |
| `/home-construct/projects` | Ongoing Projects |
| `/home-construct/dashboard` | Client Dashboard placeholder |

### VOR Finance

| Route | Description |
|-------|-------------|
| `/finance` | Investor Portal |
| `/finance/funding` | Project Funding |
| `/finance/reports` | Financial Reports |
| `/finance/loans` | Loan Marketplace placeholder (Phase 3) |

### Corporate

| Route | Description |
|-------|-------------|
| `/corporate/about` | About VOR |
| `/corporate/governance` | Governance |
| `/corporate/legal` | Legal Compliance |
| `/corporate/careers` | Careers |
| `/corporate/partners` | Partners |
| `/corporate/contact` | Contact form |
| `/corporate/investor-relations` | Investor Relations |
| `/corporate/transparency` | Transparency Center |
| `/corporate/fraud-prevention` | Fraud Prevention Center |

### Admin & API

| Route | Description |
|-------|-------------|
| `/admin` | Admin dashboard placeholder (no auth — Phase 2) |
| `/api/health` | Health check JSON |
| `/api/properties` | Mock land listings API |

## Roadmap Phases

### Phase 1 — MVP (✅ Current)

- [x] Next.js app with institutional design system
- [x] All major marketing & division pages
- [x] Land marketplace with URL-based filters
- [x] Property detail template with inspection UI
- [x] Mock Nigerian data (Lagos, Abuja, Ogun; C of O, etc.)
- [x] Map placeholder component
- [x] Admin layout stub
- [x] API route placeholders

### Phase 2 — Platform Core (Planned)

- [ ] NestJS backend + PostgreSQL
- [ ] Authentication (NextAuth or JWT via NestJS)
- [ ] Client dashboard & investor portal (authenticated)
- [ ] KYC-gated document downloads
- [ ] Google Maps / Mapbox integration
- [ ] CMS for content management
- [ ] Email notifications (inspection bookings, etc.)

### Phase 3 — Growth (Planned)

- [ ] Loan marketplace partnerships
- [ ] SEC-aligned investment pool compliance
- [ ] Payment integration (Paystack / Flutterwave)
- [ ] Advanced analytics & reporting
- [ ] Mobile app (React Native)

### Phase 4 — Scale (Planned)

- [ ] Multi-state expansion beyond SW/North-Central
- [ ] AI-assisted title risk scoring
- [ ] Blockchain land registry pilot (optional)
- [ ] White-label for partner developers

## Regulatory Bodies Reference

VOR references alignment with Nigerian regulatory and professional bodies:

| Abbr | Body |
|------|------|
| LSLB | Lagos State Lands Bureau |
| FMHUD | Federal Ministry of Housing & Urban Development |
| FCTA | FCT Administration |
| OGMPP | Ogun State Ministry of Physical Planning |
| CAC | Corporate Affairs Commission |
| SEC Nigeria | Securities and Exchange Commission |
| SURCON | Surveyors Council of Nigeria |
| ESVARBON | Estate Surveyors and Valuers Registration Board |

## Brand Guidelines Summary

| Token | Value | Usage |
|-------|-------|--------|
| Navy | `#0B1426` | Primary brand, headers, footer |
| Gold | `#C4A052` | Accents, CTAs, premium highlights |
| Trust green | `#1A6B4A` | Verification, success, ROI |
| Cream | `#F8F6F1` | Section backgrounds |
| Display font | Fraunces | Headlines |
| Body font | DM Sans | UI and body text |

**Tone:** Institutional, secure, premium — not flashy agent marketing.

**Badges:** `VOR Verified` (green), `In Review` (amber), `Pending` (slate).

## Next Steps for Development

1. **Backend:** Scaffold NestJS monorepo or separate API; migrate mock data to PostgreSQL with Prisma/TypeORM.
2. **Auth:** Add NextAuth.js or JWT middleware; protect `/admin` and client/investor dashboards.
3. **Maps:** Integrate Mapbox GL JS with plot GeoJSON layers from survey data.
4. **Forms:** Wire contact and inspection forms to email/CRM (e.g. Resend, HubSpot).
5. **Images:** Move to CDN; add local fallbacks for offline dev.
6. **Testing:** Add Playwright E2E for critical flows (marketplace filters, property detail).
7. **Deployment:** Vercel for frontend; Railway/Render for NestJS API.

## License

Proprietary — Vanguard Of Realty. All rights reserved.
#   v o r  
 #   v o r  
 #   v o r  
 #   v o r  
 