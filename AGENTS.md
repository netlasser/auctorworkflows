# AGENTS.md

Single-page Vite + React 18 + TypeScript site (shadcn/ui + Tailwind + framer-motion + GSAP) — the **Auctor Workflows** two-person agency landing page (founders Biruke Zeckariyas + Horeb Yohannes). Rebrand from Biruke's solo site is complete, and the site has been rebuilt as a dark "Midnight Luxe" cinematic experience (obsidian base, monochrome logo-grey accent, Ivory text, no gold).

## Design system (rebuilt)
- Preset B "Midnight Luxe" adapted to a monochrome accent: `--background` obsidian `#0D0D12` (`240 16% 6%`), `--primary` logo grey `#DCDCDC` (`0 0% 86%`), `--foreground` ivory (`40 33% 97%`), `--border` slate (`240 12% 19%`). No champagne/gold anywhere.
- Fonts: **Inter** (headings, tight tracking), **Playfair Display italic** (drama — `.font-drama`), **JetBrains Mono** (data/labels — `.font-mono`/`.font-data`). Loaded via Google Fonts `@import` in `src/index.css`.
- Motion: all scroll/entrance animation uses **GSAP** (`src/lib/gsap.ts` registers ScrollTrigger once; always wrap in `gsap.context(...)` + `ctx.revert()`). Helpers: `prefersReducedMotion()`. Shared magnetic button: `src/components/ui/MagneticButton.tsx`. `src/lib/useInView.ts` (IntersectionObserver) pauses always-on loops (Features artifacts, Testimonials autoplay) when off-screen. Vite `build.rollupOptions.output.manualChunks` splits `gsap` / `framer-motion` / `embla-carousel-react` into vendor chunks.
- Fixed look: global noise overlay (`NoiseOverlay.tsx`, inline `feTurbulence` @ 0.05), radius scale `rounded-[2rem]`–`[3rem]`, magnetic buttons (`scale 1.03`, sliding bg span), link `.lift` (`translateY(-1px)`).

## Commands
- `npm run dev` — Vite on http://localhost:3000 (host `0.0.0.0`, HMR overlay disabled)
- `npm run build` — `vite build` only. **No typecheck in build**; type errors will not fail it
- `npm run lint` — `eslint .` (strictness deliberately off)
- `npm test` — vitest (jsdom), picks up `src/**/*.{test,spec}.{ts,tsx}`, setup at `src/test/setup.ts`
- Typecheck (there is no npm script for it): `npx tsc -b`
- Preferred verify order: `lint` → `tsc -b` → `test` → `build`
- Lockfile is `bun.lockb`; README and `vercel.json` use npm. Either works — don't treat absence of one as an error.

## Architecture
- One route: `/` → `src/pages/Index.tsx` composes `src/components/site/*` in order (Ambient, NoiseOverlay, SiteNav, Hero, TrustedBy, Features, Philosophy, Protocol, TechStack, Pricing, Testimonials, Members, CTA, SiteFooter, StickyCTA). Everything else → `NotFound`. Below-the-fold sections (TrustedBy, Features, Philosophy, TechStack, Pricing, Testimonials, Members) are `React.lazy` + `Suspense`; Hero and Protocol stay eager (Protocol owns the GSAP ScrollTrigger scrub).
- Cinematic sections: `SiteNav` (floating-island pill), `Hero` (Opening Shot, GSAP timeline), `Features` (3 interactive artifacts: Diagnostic Shuffler / Telemetry Typewriter / Cursor Protocol Scheduler — replaces old `Services`), `Philosophy` (Manifesto, word-reveal, carries the 4 principles), `Protocol` (3-card sticky stacking archive — grouped Discover/Build/Ship, replaces old 6-stage `Process`; the sticky stack + its GSAP scrub are gated to `md:` and up — mobile renders a plain vertical list), `Members` (editorial team grid — replaces old `Team`). `Services.tsx`, `Process.tsx`, `Team.tsx` were deleted.
- Alias `@/*` → `src/*` (configured in both Vite and vitest).
- **External links live in exactly one place:** `src/lib/site.ts` (`CAL_LINK`, `GITHUB_LINK`, `EMAIL`, `PHONE`, `PHONE_DISPLAY`, `TELEGRAM`, `WHATSAPP`) — imported by Hero, Pricing, Process, SiteNav, StickyCTA, CTA. Update links/contact there, not inside components. Telegram/WhatsApp use Horeb's number +251 991 173 217.
- **All page copy is inline** in the component files as const arrays: `offerings` (Pricing.tsx), `services` (Features.tsx), `principles` (Philosophy.tsx), `phases` (Protocol.tsx), `testimonials` (Testimonials.tsx), `clientCompanies` + `ecosystemTools` (TrustedBy.tsx), `tools` (TechStack.tsx), `members` (Members.tsx), hero copy/`stats` in JSX (Hero.tsx).
- Only `Members` uses the founder portraits (`@/assets/Biruke.jpg` + `@/assets/Horeb.jpg`, downscaled to ~480px wide) — the Hero is deliberately typographic with no photos (no duplicate faces, no stock imagery). Public assets (all Pillow-generated): `/logo.png` (128², used by SiteNav + SiteFooter), `/favicon.png` (256², tab), `/apple-touch-icon.png` (180²), `/og-image.png` (1200×630). Nothing else lives in `src/assets`.
- SEO/meta/JSON-LD live in `index.html` (Organization "Auctor Workflows", founders Biruke + Horeb; og/twitter image `/og-image.png`; apple-touch icon). **No custom domain yet** — canonical/og:url/JSON-LD point at `workflowfelip.lovable.app`; when a domain goes live update **`SITE_URL` in `src/lib/site.ts` AND** the URLs in `index.html` + `metadata.json` (search for that host). `metadata.json` mirrors it for Lovable.

## Styling
- Custom utilities in `src/index.css` `@layer utilities`: `.font-logo`/`.font-heading`/`.font-display` (all Inter), `.font-drama` (Playfair italic), `.font-mono`/`.font-data` (JetBrains Mono), `.section-label`, `.gradient-text`, `.card-surface` (2rem radius), `.btn-primary-glow`, `.lift`, `.ease-cinematic`, `.dur-900`, `.reveal`. Keyframes also live there: `spin-slow`, `scan-line`, `ekg-path`, `pulse-dot`, `caret-blink`, `.dot-grid`, `.grid-overlay`, `.orb`. Read before adding button/card styles.
- Brand colors are CSS variables in `:root` (obsidian background, logo-grey `--primary`); Tailwind maps colors to these `hsl(var(--…))` vars (tailwind.config.ts). Body/heading font is Inter.
- shadcn/ui primitives live in `src/components/ui` (plus `MagneticButton.tsx`); business/section components in `src/components/site`.

## Supabase / edge function
- `vercel.json` hardcodes the real Supabase URL + anon publishable key + project id as build env. `src/integrations/supabase/client.ts` is Lovable **auto-generated — do not edit**; it falls back to placeholders without `.env` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`).
- `supabase/functions/hubspot-lead/` is a Deno edge function that creates/updates HubSpot contacts (with fallback-to-update on 409) and optionally posts to Slack, via Lovable's `connector-gateway` (secrets needed: `LOVABLE_API_KEY`, `HUBSPOT_API_KEY`, optional `SLACK_API_KEY`).
- **Nothing in the frontend calls `hubspot-lead` today — no lead form is wired up.** The CTA section only renders cal.com, phone, and social icon links. Don't assume a submit pipeline exists.

## Gotchas
- Types/lint are lax on purpose: `strict:false`, `noImplicitAny:false`, unused-var checks off. Lint/tsc silence is not evidence the code is strongly typed.
- `.lovable/plan.md` is **stale** — it describes a real-estate `CampaignBanner`/`Concierge`/`Navbar`/`FAQ` build that doesn't exist here. Ignore it.
- `src/assets` holds **only** the two founder portraits (`Biruke.jpg`, `Horeb.jpg`). The old scrap images (`bz-logo.jpg`, `bz-logo-transparent.png`, `case-study-1..5.png`, `felipe-logo.png`, `logo-{acuity,chapa,laven,mereb}.png`, `public/placeholder.svg`) were deleted — do not re-add them.
- Recent commits use `feat:`/`refactor:`/`chore:` prefixes. This repo is the source for the Lovable project — pushed commits are reflected back into Lovable.

## Mobile animation pass (latest)
- `src/index.css`: marquee keyframes (`.marquee-track`, `.marquee-mask`), `prefers-reduced-motion` off switch, tap-highlight removal.
- `Protocol.tsx`: `gsap.matchMedia()` mobile block (`max-width: 767px`) — each `.protocol-inner` fades up on scroll, stage items stagger; desktop sticky stack untouched (`min-width: 768px`).
- `SiteNav.tsx`: framer-motion `AnimatePresence` for mobile dropdown (height/opacity + icon swap); tap feedback on links.
- `TechStack.tsx`: phone-only marquee rows (duplicated sets for seamless loop, reverse second row); tablet/desktop grid unchanged (`hidden sm:grid`).
- `Hero.tsx`: parallax on background glow/grid layer (`yPercent: 14`, scrub, scoped to inner wrapper so bottom fade stays static); `overflow-hidden` on outer.
- `CTA.tsx`, `Pricing.tsx`, `Testimonials.tsx`, `SiteNav.tsx`, `SiteFooter.tsx`: `active:` feedback (`scale-95`, `opacity-70`, etc.) across CTAs, social icons, nav links, testimonial controls.
- `index.html`: `viewport-fit=cover` meta.
- `SiteNav.tsx` header: `pt-[env(safe-area-inset-top)]` for top notch.
- `StickyCTA.tsx`: bottom/right safe-area via `calc(1.25rem+env(safe-area-inset-bottom/right))`; fixed dead `text-primary-light` → `text-primary`.
- Verified: lint (0 err/7 pre-existing warn), `tsc -b` clean, test 1/1, build OK (main ~128 kB gzip, vendor chunks stable).