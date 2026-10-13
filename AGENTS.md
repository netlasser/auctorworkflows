# AGENTS.md

Single-page Vite + React 18 + TypeScript site (Lovable scaffold, shadcn/ui + Tailwind + framer-motion) — the **Auctor Workflows** two-person agency landing page (founders Biruke Zeckariyas + Horeb Yohannes). Rebrand from Biruke's solo site is complete: all copy is agency "we"-voice, Testimonials reference "Auctor Workflows", and SEO/schema is an Organization with both founders.

## Commands
- `npm run dev` — Vite on http://localhost:3000 (host `0.0.0.0`, HMR overlay disabled)
- `npm run build` — `vite build` only. **No typecheck in build**; type errors will not fail it
- `npm run lint` — `eslint .` (strictness deliberately off)
- `npm test` — vitest (jsdom), picks up `src/**/*.{test,spec}.{ts,tsx}`, setup at `src/test/setup.ts`
- Typecheck (there is no npm script for it): `npx tsc -b`
- Preferred verify order: `lint` → `tsc -b` → `test` → `build`
- Lockfile is `bun.lockb`; README and `vercel.json` use npm. Either works — don't treat absence of one as an error.

## Architecture
- One route: `/` → `src/pages/Index.tsx` composes `src/components/site/*` in order (Ambient, SiteNav, Hero, TrustedBy, Services, Process, TechStack, Pricing, Testimonials, CTA, SiteFooter, StickyCTA). Everything else → `NotFound`.
- Alias `@/*` → `src/*` (configured in both Vite and vitest).
- **External links live in exactly one place:** `src/lib/site.ts` (`CAL_LINK`, `GITHUB_LINK`, `EMAIL`, `PHONE`, `PHONE_DISPLAY`, `TELEGRAM`, `WHATSAPP`) — imported by Hero, Pricing, Process, SiteNav, StickyCTA, CTA. Update links/contact there, not inside components. Telegram/WhatsApp use Horeb's number +251 991 173 217.
- **All page copy is inline** in the component files as const arrays: `offerings` (Pricing.tsx), `processSteps` + `principles` (Process.tsx), `testimonials` (Testimonials.tsx), `clientCompanies` + `ecosystemTools` (TrustedBy.tsx), `tools` (TechStack.tsx), hero copy/`stats` in JSX (Hero.tsx).
- Hero's profile card shows both founders: imports `@/assets/Biruke.jpg` + `@/assets/Horeb.jpg`. SiteNav/SiteFooter use the logo at `/favicon.png` (public asset; also the favicon + new agency logo).
- SEO/meta/JSON-LD live in `index.html` (Organization "Auctor Workflows", founders Biruke + Horeb; canonical still `workflowfelip.lovable.app` — no new domain yet). `metadata.json` mirrors it for Lovable.

## Styling
- Custom utilities defined in `src/index.css` `@layer utilities`: `.font-logo` (Space Grotesk), `.section-label`, `.gradient-text`, `.card-surface`, `.btn-primary-glow`. Read these before adding button/card styles.
- Brand colors are CSS variables in `:root` (near-black background, gold `--primary`); Tailwind maps colors to these `hsl(var(--…))` vars (tailwind.config.ts). Body/display font is Outfit.
- shadcn/ui primitives live in `src/components/ui`; business components in `src/components/site`.

## Supabase / edge function
- `vercel.json` hardcodes the real Supabase URL + anon publishable key + project id as build env. `src/integrations/supabase/client.ts` is Lovable **auto-generated — do not edit**; it falls back to placeholders without `.env` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`).
- `supabase/functions/hubspot-lead/` is a Deno edge function that creates/updates HubSpot contacts (with fallback-to-update on 409) and optionally posts to Slack, via Lovable's `connector-gateway` (secrets needed: `LOVABLE_API_KEY`, `HUBSPOT_API_KEY`, optional `SLACK_API_KEY`).
- **Nothing in the frontend calls `hubspot-lead` today — no lead form is wired up.** The CTA section only renders cal.com, phone, and social icon links. Don't assume a submit pipeline exists.

## Gotchas
- Types/lint are lax on purpose: `strict:false`, `noImplicitAny:false`, unused-var checks off. Lint/tsc silence is not evidence the code is strongly typed.
- `.lovable/plan.md` is **stale** — it describes a real-estate `CampaignBanner`/`Concierge`/`Navbar`/`FAQ` build that doesn't exist here. Ignore it.
- `src/assets` holds only the founder portraits (`Biruke.jpg`, `Horeb.jpg`) plus legacy scrap images; the old `bz-profile.jpg`, `bz-logo-transparent.png`, `founder-biruke.jpeg`, `cofounder-nahum.png`, `newlogo.png`, and `felipe-logo.png` were deleted during the rebrand — do not re-import them.
- Recent commits use `feat:`/`refactor:`/`chore:` prefixes. This repo is the source for the Lovable project — pushed commits are reflected back into Lovable.