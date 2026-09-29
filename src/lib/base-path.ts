/**
 * This app is deployed at sossalesandscaling.com/sales-os/ — a hidden
 * subpath of the existing S.OS site, not linked from its nav, reached only
 * via cold ad traffic (mirroring the pattern used by the sister
 * realestate-os-funnel project). The main site (a separate Netlify site/repo
 * this project doesn't have access to) proxies that subpath through to this
 * app's own Netlify deployment. See HANDOFF.md for the exact proxy rule and
 * required env vars.
 *
 * This constant is the single source of truth for that subpath within this
 * app's own source. vite.config.ts's `base` option CANNOT import this (it
 * runs outside the app bundle, in Vite's own config-loading context) — it's
 * a plain string literal there and must be kept in sync with this file by
 * hand if the subpath ever changes.
 */
export const BASE_PATH = "/sales-os";
