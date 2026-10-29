/**
 * Attribution capture — UTM + Meta click/browser id pass-through.
 *
 * On first load with UTM params in the URL, mints a visit_id (uuid), fires
 * a non-blocking insert into Supabase's `visits` table (anon, insert-only —
 * see the "anon can insert visits" RLS policy), and stores the visit_id in
 * localStorage so it survives a refresh or a later visit within the same
 * funnel session without a fresh set of UTMs. checkout.tsx reads the stored
 * visit_id back and passes it to Stripe as client_reference_id, so the
 * webhook (calum-wq/sos-site netlify/functions/stripe-webhook.js) can look
 * up this row and copy utm_source/utm_medium/utm_campaign/utm_term/
 * utm_content/fbclid/fbp/fbc/site_source_name/placement onto the payments row.
 *
 * site_source_name/placement are Meta Ads Manager's own dynamic URL
 * parameters (not UTMs) — {{site_source_name}} resolves to the platform
 * (fb/ig/msg/an) and {{placement}} to the specific placement (e.g.
 * Facebook_Mobile_Feed). They only show up when added to the ad's
 * destination URL tracking template in Ads Manager, which is always done
 * alongside the UTMs above — so they ride along on the same hasUtm-gated
 * visit insert below rather than independently triggering one.
 *
 * Must never block page render or video playback: every storage/network
 * call here is wrapped in try/catch, the Supabase insert is fire-and-forget
 * (never awaited by the caller), and nothing here throws out of this module.
 */

const STORAGE_KEY = "sos_visit_id";

// Cookie fallback lifetime — matches a typical ad-attribution window and
// keeps attribution working in Safari/private-browsing contexts where
// localStorage is blocked, partitioned, or evicted.
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 days

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

// Meta Ads Manager's own dynamic URL parameters — see the module comment
// above. Captured whenever present, but not part of the hasUtm gate below
// since they're not UTMs and shouldn't independently trigger a visit insert.
const META_PLACEMENT_KEYS = ["site_source_name", "placement"] as const;

// Stripe Payment Links only accept client_reference_id made of letters,
// numbers, dashes and underscores, max 200 characters. Every visit_id we
// mint below is already a plain uuid (so always valid), but checkout.tsx
// re-validates whatever comes back out of storage before using it, in case
// something else in the browser ever wrote to this key.
export const CLIENT_REFERENCE_ID_PATTERN = /^[A-Za-z0-9_-]{1,200}$/;

function readCookie(name: string): string | null {
  try {
    const escaped = name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1");
    const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  } catch {
    return null;
  }
}

function writeCookie(name: string, value: string, maxAgeSeconds: number): void {
  try {
    document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAgeSeconds}; path=/; SameSite=Lax`;
  } catch {
    // Non-fatal — localStorage is still the primary store.
  }
}

function getStoredVisitId(): string | null {
  try {
    const fromStorage = localStorage.getItem(STORAGE_KEY);
    if (fromStorage) return fromStorage;
  } catch {
    // Storage disabled/unavailable (private browsing, blocked, etc) — fall
    // through to the cookie fallback below.
  }
  const fromCookie = readCookie(STORAGE_KEY);
  if (fromCookie) {
    try {
      localStorage.setItem(STORAGE_KEY, fromCookie);
    } catch {
      // Non-fatal — the cookie alone is enough to keep attribution working.
    }
    return fromCookie;
  }
  return null;
}

function storeVisitId(id: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // Non-fatal — the cookie below still carries attribution.
  }
  writeCookie(STORAGE_KEY, id, COOKIE_MAX_AGE_SECONDS);
}

function newVisitId(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch {
    // fall through to the manual generator below
  }
  // Fallback for browsers without crypto.randomUUID. This id is only ever
  // used for marketing attribution, never for anything security-sensitive.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
/**
 * Call once on initial page load (see __root.tsx's RootComponent). Reads
 * UTMs/fbclid from the URL and the _fbp/_fbc cookies Meta Pixel sets.
 *
 * Strict first-touch: if a visit_id is already stored (localStorage or the
 * cookie fallback), this is a no-op — we never overwrite the visitor's
 * original attribution, even if the current URL carries a different/newer
 * set of UTMs (a later ad click, a reshared link, etc). Only when nothing
 * is stored yet, and the URL carries UTMs, do we mint a new visit_id, store
 * it (localStorage + a 180-day cookie, so it survives Safari's storage
 * limits and private-browsing sessions), and fire a non-blocking insert
 * into Supabase's `visits` table.
 */
export function captureAttribution(): void {
  try {
    if (getStoredVisitId()) return;

    const params = new URLSearchParams(window.location.search);
    const hasUtm = UTM_KEYS.some((key) => params.has(key));
    if (!hasUtm) return;

    const visitId = newVisitId();
    storeVisitId(visitId);

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn(
        "[attribution] VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY not set — skipping visit capture.",
      );
      return;
    }

    const row: Record<string, string | null> = {
      id: visitId,
      landing_url: window.location.href,
      referrer: document.referrer || null,
      fbclid: params.get("fbclid"),
      fbp: readCookie("_fbp"),
      fbc: readCookie("_fbc"),
    };
    for (const key of UTM_KEYS) {
      row[key] = params.get(key);
    }
    for (const key of META_PLACEMENT_KEYS) {
      row[key] = params.get(key);
    }

    // Fire-and-forget on purpose — a slow or failed Supabase insert must
    // never delay first paint or video playback on the page that called us.
    fetch(`${supabaseUrl}/rest/v1/visits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
      keepalive: true,
    }).catch((err) => {
      console.warn("[attribution] visit insert failed (non-fatal):", err);
    });
  } catch (err) {
    // Must never break page render.
    console.warn("[attribution] captureAttribution failed (non-fatal):", err);
  }
}

/** Read back the stored visit_id, if any, for the checkout handoff. */
export function getVisitId(): string | null {
  return getStoredVisitId();
}
