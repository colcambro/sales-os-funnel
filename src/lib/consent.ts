/**
 * Minimal marketing-consent gate.
 *
 * This funnel only ever sets one kind of non-essential cookie/storage: Meta
 * Pixel (fbq's _fbp/_fbc cookies + the pixel script itself) and the
 * fbclid/UTM capture in attribution.ts (which reads the URL and fires a
 * Supabase insert). Both are "marketing" in GDPR terms, so this is a single
 * accept/decline choice rather than the 3-category panel on the main
 * sos-site (necessary/analytics/marketing) — there's nothing else here to
 * separate out.
 *
 * Mirrors the storage shape sos-site uses (a JSON blob with a timestamp) so
 * the pattern is familiar, but keeps its own storage key since this is a
 * different origin and a simpler shape (no analytics category).
 */

const CONSENT_KEY = "sos_funnel_consent";

export type ConsentState = {
  marketing: boolean;
  ts: number;
};

export function getConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.marketing === "boolean") return parsed as ConsentState;
    return null;
  } catch {
    return null;
  }
}

export function hasDecided(): boolean {
  return getConsent() !== null;
}

export function setConsent(marketing: boolean): void {
  const state: ConsentState = { marketing, ts: Date.now() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  } catch {
    // Non-fatal — worst case we ask again next visit.
  }
}
