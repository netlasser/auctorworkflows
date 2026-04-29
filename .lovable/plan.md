## Goal

Add a temporary, removable campaign for the AI WhatsApp Concierge ("The Lead-Leakage Shield") that matches your sales push without disrupting the existing editorial aesthetic.

## What gets built

### 1. Sticky announcement banner (`src/components/CampaignBanner.tsx`)

Thin bar above the navbar, full-width, monochrome editorial style (no WhatsApp green, no urgency).

- Left: small dot + label "New · Real Estate" then headline "The Lead-Leakage Shield — AI WhatsApp Concierge for property developers."
- Right: inline link "See how it works →" that smooth-scrolls to `#concierge`.
- Dismiss "×" button on the far right; dismissal stored in `localStorage` (`campaign-concierge-dismissed`) so it stays closed per visitor.
- Mobile: collapses to headline + arrow link, dismiss icon stays visible.
- Mounted at the top of `Index.tsx`, above `<Navbar />`. Navbar stays transparent over the hero — banner sits above it as a separate strip so the hero webcam visual is untouched.

### 2. Dedicated section (`src/components/Concierge.tsx`)

Inserted in `Index.tsx` between `Services` and `Testimonials` with `id="concierge"` so the banner link, nav, and any campaign URL (`/#concierge`) all land here.

Layout (editorial, two-column on desktop, stacked on mobile, matches FAQ/Services rhythm):

```text
 ┌─────────────────────────────────────────────────────────────┐
 │  • Featured Offer                                           │
 │  The Lead-Leakage Shield.                                   │
 │  An AI WhatsApp concierge that owns the first 2 minutes     │
 │  of every property inquiry — so no high-intent buyer ever   │
 │  gets a "seen" with no follow-up.                           │
 │                                                             │
 │  [ Book My Lead Audit ]   Download the Blueprint →          │
 └─────────────────────────────────────────────────────────────┘
 ┌──────────────────────────────┬──────────────────────────────┐
 │  Built for                   │  What it does                │
 │  — Property developers        │  01  Zero-Latency Response  │
 │    launching projects         │      Brochures, price lists,│
 │  — High-volume agencies       │      floor plans in <3s.    │
 │    spending 50k+ Ksh/mo       │  02  Buyer Liquidity Check  │
 │    on Meta / Google ads       │      Budget + cash vs.      │
 │  — Directors tired of "seen"  │      financing, asked early.│
 │    on business WhatsApp       │  03  High-Intent Alerting   │
 │                               │      Pings your lead broker │
 │                               │      the moment a high-     │
 │                               │      budget buyer surfaces. │
 │                               │  04  Calendar Sync          │
 │                               │      Books viewings via your│
 │                               │      booking link directly. │
 └──────────────────────────────┴──────────────────────────────┘
                  Sits on top of your existing
                  WhatsApp Business number. Not a
                  replacement for your agents — an
                  executive assistant that never sleeps.
```

CTAs (tiered, as you specified):
- **Primary** — "Book My Lead Audit" → opens your Cal.com link (`https://cal.com/biruke-felipe/30-minutes-assessment-call`) in a new tab. Solid black pill button matching the Hero CTA.
- **Secondary** — "Download the Blueprint" → smooth-scrolls to `#contact` (the existing HubSpot form). Underlined text-link style.

Animations: Framer Motion fade/slide-in on view, consistent with Services/FAQ. No green, no countdown, no badges — stays in the site's editorial monochrome.

### 3. Wiring

- `src/pages/Index.tsx`: render `<CampaignBanner />` at the top of the page tree, and insert `<Concierge />` between `<Services />` and `<Testimonials />`.
- Optional: add a "Concierge" item to `Navbar` nav links pointing to `#concierge` so it stays discoverable after the banner is dismissed. (Will add unless you'd rather keep the nav untouched.)

## Easy to remove later

Both pieces are isolated single-file components. When the campaign ends:
- Delete `<CampaignBanner />` and `<Concierge />` lines from `Index.tsx`.
- Delete the two component files.
- Remove the optional Navbar link.

No other files touched, no schema or backend changes.

## Out of scope (confirm if you want any of these added)

- WhatsApp click-to-chat button / `wa.me` link (you opted for Cal + form CTAs — happy to add a tertiary "Chat on WhatsApp" link if you give me the number).
- Voiceflow Loom embed / screenshot in the section (can drop one in if you share the asset).
- Auto-emailing the Loom after form submission (would need an edge function update).
