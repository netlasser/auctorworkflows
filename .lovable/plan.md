## Goal

Three campaign-funnel fixes:
1. Replace the "Download the Blueprint" scroll-link with a dedicated mini lead-capture form inside the Concierge section (segmented in HubSpot as `source: "blueprint"`).
2. Add a "Concierge" item to the Navbar so the section stays discoverable after the banner is dismissed.
3. Fix the visual overlap between the sticky `CampaignBanner` and the `fixed` Navbar.

---

## 1. Dedicated Blueprint form (Concierge section)

### Backend — extend the `hubspot-lead` edge function
File: `supabase/functions/hubspot-lead/index.ts`

- Add an optional `source` field to the `LeadPayload` interface and validator (defaults to `"contact-form"`, max 60 chars, alphanumeric + `-`).
- Add an optional `whatsapp` field (digits / `+` / spaces, max 30 chars, optional).
- When present, append the source into HubSpot's `message` property (e.g. `[blueprint] Wants to automate: …`) and into the `lifecyclestage`-adjacent `hs_lead_status` is left untouched. Phone gets mapped to HubSpot's `phone` property.
- Slack notification: include the `source` in the header line so blueprint leads stand out (e.g. `:tada: *New Blueprint download* — Lead-Leakage Shield`).
- Reuse the existing create-or-update-by-email flow — no schema changes, no new function.

### Frontend — new compact form inside Concierge
File: `src/components/Concierge.tsx`

- Replace the secondary "Download the Blueprint" text-link with an in-section card (right side of the existing two-column area, or as a new full-width row below "What it does" — final placement: a new row directly under the features grid so it doesn't fight the audience column on mobile).
- Fields (intentionally short to maximize completion):
  - Full name (required, max 120)
  - WhatsApp number (required, max 30, basic regex)
  - Monthly ad spend (required, Select: `<50k Ksh`, `50k–150k`, `150k–500k`, `500k+`)
  - Email (required, for delivering the blueprint)
- Submit calls `supabase.functions.invoke("hubspot-lead", { body: { fullName, email, whatsapp, headcount: adSpend, automationGoal: "Blueprint download — Lead-Leakage Shield", source: "blueprint" } })`. We reuse `headcount` to carry ad-spend so we don't need a new HubSpot property.
- Success state: replaces the form with a confirmation card ("Blueprint sent to your inbox.") + a small "Or book a call now →" link. Mirrors the editorial style of the existing Contact success state but smaller.
- Error: toast via existing `useToast`.
- Validation client-side with the same patterns already used in `Contact.tsx` (no new lib).
- Primary "Book My Lead Audit" CTA stays as-is.

### Optional follow-up (not in this plan)
Auto-emailing the actual PDF blueprint requires a transactional email setup. For now the success copy promises "we'll send it within a few minutes" and your inbox notification (Slack + HubSpot) lets you send it manually until email infra is wired.

---

## 2. Navbar — add Concierge link
File: `src/components/Navbar.tsx`

- Add `{ label: "Concierge", href: "#concierge" }` to `navLinks` (placed first so it's prominent during the campaign).
- Add `"concierge"` to `sectionIds` so the active-section underline tracks it.
- Mobile sheet inherits the new link automatically (it maps over `navLinks`).
- No logo/brand changes (respects the brand-logo-only rule).

---

## 3. Fix banner / navbar overlap
Files: `src/components/Navbar.tsx`, `src/components/CampaignBanner.tsx`, `src/pages/Index.tsx`

Current bug: `CampaignBanner` sits in normal flow at the top of `Index.tsx`, but `Navbar` is `fixed top-0` with `z-50`, so as soon as the user scrolls a single pixel the navbar slides over the banner.

Fix (simplest, no layout thrash):
- Make the banner itself `fixed top-0 left-0 right-0 z-[60]` so it stays pinned above the navbar.
- Push the navbar down by the banner height while the banner is visible. Implementation:
  - `CampaignBanner` writes a CSS variable `--campaign-banner-h` on `document.documentElement` (measured via `ref` + `ResizeObserver`); on dismiss it sets it to `0px`.
  - `Navbar` uses inline style `top: var(--campaign-banner-h, 0px)` instead of `top-0`.
  - `Hero`/page top padding: the Hero already starts the page with its own top spacing, but to prevent the banner from covering the very top of the hero on first paint, add `padding-top: var(--campaign-banner-h, 0px)` to the root `<div>` in `Index.tsx`.
- Add `scroll-margin-top` to `#concierge` (and ideally each anchored section) equal to `calc(var(--campaign-banner-h, 0px) + 4rem)` so anchor jumps land below both bars. Done via a Tailwind class on the section: `style={{ scrollMarginTop: 'calc(var(--campaign-banner-h, 0px) + 5rem)' }}`.

Result: banner and navbar stack cleanly, scroll-to anchors no longer hide under them, and dismissing the banner reclaims the space without a layout jump (the CSS var transitions to `0px`).

---

## Files touched

- `supabase/functions/hubspot-lead/index.ts` — add `source` + `whatsapp`, tag in HubSpot message + Slack
- `src/components/Concierge.tsx` — add Blueprint mini-form + success state, drop the scroll-link
- `src/components/Navbar.tsx` — add Concierge nav link + section tracking + use CSS-var top offset
- `src/components/CampaignBanner.tsx` — fixed positioning + publish height to CSS var
- `src/pages/Index.tsx` — root padding offset using the same CSS var

No schema changes, no new dependencies, no new HubSpot custom properties.
