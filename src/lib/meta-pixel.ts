// Meta (Facebook) Pixel helper
// Pixel ID is a publishable value, safe to ship in the client bundle.

export const META_PIXEL_ID = "1619491839708065";

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
  fbq?.("track", "PageView");
}

/**
 * Track a standard Meta Pixel event. Falls back to no-op if fbq isn't loaded.
 */
export function trackMetaEvent(event: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined" || !window.fbq) return;
  if (params) {
    window.fbq("track", event, params);
  } else {
    window.fbq("track", event);
  }
}
