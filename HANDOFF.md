# Sales.OS Funnel — Handoff

A standalone TanStack Start (React 19 + Vite) 3-page funnel (sales page → checkout →
thank-you) for **Sales.OS** — the dual-founder (Calum White + Colin Campbell), industry-agnostic
sister product to Real Estate S.OS². Built by cloning the sister project
`realestate-os-funnel`'s structure and reskinning all content per the locked copy doc.

**Deployment target: `sossalesandscaling.com/sales-os/`** — a hidden subpath of the existing
S.OS site (not linked from its nav), reached only via ad traffic. This is its own separate
Netlify site/repo, proxied through from the main site's Netlify project, mirroring the
`/realestate-os/` pattern exactly.

## What's done

- All content reskinned from the locked Sales.OS sales letter draft: hero, offer stack
  (`INCLUDED_ITEMS`, 6 real tools), 30-day pillars, checkout/full testimonial grids (real
  client quotes, not fabricated), guarantee section, and a dual founder bio
  (`src/components/MeetFoundersSection.tsx`) covering both Calum and Colin, including the
  real "how they met" origin story (CamBro Conversations podcast, March 2025).
- `npm run build`, `npx tsc --noEmit`, and `npx eslint .` all pass clean.
- **Checkout uses Stripe's existing live hosted Payment Links directly** — not a custom
  Checkout Session flow. `src/routes/checkout.tsx` links straight to the real, already-live
  Sales.OS Payment Links (monthly/annual toggle), so there's no `create-checkout-session.js`
  function and no Stripe Price object wiring needed in this app at all.
- `netlify/functions/get-checkout-session.js` is kept — a read-only Stripe session lookup so
  the thank-you page can show the real email and fire an accurate Meta Pixel `Purchase`
  event. Requires `STRIPE_SECRET_KEY`.
- `src/routes/thank-you.tsx` is this funnel's own dedicated thank-you page (not a reuse of
  the existing static `sos-site/sales-os/thank-you/` page), matching its already-approved
  copy.
- Configured to run under the `/sales-os` subpath — see `src/lib/base-path.ts` (single
  source of truth in-app; mirrored as a literal in `vite.config.ts` and the Netlify Function,
  which run outside the app bundle and can't import it).

## Required setup before/at deploy

In this project's Netlify site → Site settings → Environment variables, set:

- `STRIPE_SECRET_KEY` — Stripe secret key (test key while testing, live key once ready)

See `.env.example` for local development.

## Deploying

1. Push this repo to GitHub, connect it to Netlify as its own new site (Add new site →
   Import an existing project), set `STRIPE_SECRET_KEY` above, and note the resulting
   `*.netlify.app` URL.
2. Add a proxy rule to the **main site's** (`sos-site`) `netlify.toml`:
   ```toml
   [[redirects]]
     from = "/sales-os/*"
     to = "https://<this-site>.netlify.app/sales-os/:splat"
     status = 200
     force = true
   ```
3. **Once live**, update the two Sales.OS Stripe Payment Links' "after payment" redirect URL
   in the Stripe Dashboard to `https://sossalesandscaling.com/sales-os/thank-you` with
   `?session_id={CHECKOUT_SESSION_ID}` appended (Stripe fills that placeholder in
   automatically) — this is what makes the thank-you page's session lookup and the Meta
   Pixel `Purchase` event work with real data. Until this is set, the thank-you page falls
   back to a placeholder-value pixel fire.
4. Test end-to-end on the real URL (page loads, plan toggle, Payment Link redirects, a
   Stripe test-mode payment lands back on `/sales-os/thank-you` showing the real email)
   before sending real ad traffic.

## Known open items

- The Meta Pixel ID currently in this app was carried over unchanged from
  `realestate-os-funnel` — confirm whether Sales.OS should use its own pixel before sending
  real ad spend through it.
- Tony's and Hannah's testimonial photos may sit slightly off-center in their circular
  avatar frames (the source images were originally cropped/zoomed for a different layout) —
  worth a visual check once live.
