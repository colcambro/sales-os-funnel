// Meta (Facebook) Pixel helper
// Pixel IDs are publishable values, safe to ship in the client bundle.

export const META_PIXEL_ID = "1619491839708065";
// Second pixel added per Colin, Oct 2026 — runs alongside the pixel above
// (both fire on every event; this is the standard supported way to send
// the same events to two ad accounts' pixels).
export const META_PIXEL_ID_2 = "2162077801014164";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

/**
 * Injects the Meta Pixel base code once and fires the initial PageView.
 * Safe to call multiple times — the base script is only injected once.
 */
export function initMetaPixel(): void {
  if (typeof window === "undefined") return;
  if (window.fbq) return;

  /* eslint-disable */
  // Standard Meta Pixel base code
  (function (f: any, b: any, e: any, v: any) {
    if (f.fbq) return;
    const n: any = (f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = b.createElement(e);
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */

  // Cast needed: TS narrows `window.fbq` to `undefined` from the early-return
  // guard above and can't see that the IIFE (typed `any` on purpose, since
  // it's the vendor's standard snippet) reassigns it at runtime.
  const fbq = window.fbq as ((...args: unknown[]) => void) | undefined;
  fbq?.("init", META_PIXEL_ID);
  fbq?.("init", META_PIXEL_ID_2);
  fbq?.("track", "PageView");
}

/**
 * Track a standard Meta Pixel event. Pass `options.eventID` to dedup a
 * browser-fired event against its server-side Conversions API twin (same
 * event_id on both sides) — Meta merges them into one for reporting
 * instead of double-counting. Falls back to no-op if fbq isn't loaded.
 */
export function trackMetaEvent(
  event: string,
  params?: Record<string, unknown>,
  options?: { eventID?: string },
): void {
  if (typeof window === "undefined" || !window.fbq) return;
  if (options?.eventID) {
    window.fbq("track", event, params ?? {}, { eventID: options.eventID });
  } else if (params) {
    window.fbq("track", event, params);
  } else {
    window.fbq("track", event);
  }
}

/**
 * Advanced Matching: re-initializes both pixels with normalized customer
 * data once it's actually known (e.g. the email Stripe confirms on the
 * thank-you page). Meta's SDK hashes these client-side before sending —
 * pass plain, normalized values here, never pre-hashed ones. Calling
 * fbq('init', ...) again on the same pixel ID merges in the new matching
 * data; it does not re-inject the base script or re-fire PageView.
 */
export interface AdvancedMatchingData {
  em?: string;
  ph?: string;
  fn?: string;
  ln?: string;
  external_id?: string;
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function setAdvancedMatching(data: AdvancedMatchingData): void {
  if (typeof window === "undefined" || !window.fbq) return;

  const matchData: Record<string, string> = {};
  if (data.em) matchData.em = normalize(data.em);
  if (data.ph) matchData.ph = normalize(data.ph).replace(/[^0-9]/g, "");
  if (data.fn) matchData.fn = normalize(data.fn);
  if (data.ln) matchData.ln = normalize(data.ln);
  if (data.external_id) matchData.external_id = data.external_id;

  if (Object.keys(matchData).length === 0) return;

  window.fbq("init", META_PIXEL_ID, matchData);
  window.fbq("init", META_PIXEL_ID_2, matchData);
}
