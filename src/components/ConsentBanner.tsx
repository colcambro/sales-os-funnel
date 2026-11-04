import { useEffect, useState } from "react";
import { getConsent, setConsent } from "../lib/consent";

/**
 * Minimal cookie-consent prompt, styled to match the dark panel + coral
 * accent button used on the main sos-site cookie banner — but a single
 * accept/decline choice instead of its 3-category panel, since this app
 * only ever sets one kind of non-essential cookie (Meta Pixel + the
 * fbclid/UTM capture in attribution.ts). See src/lib/consent.ts.
 *
 * `onAccept` fires the actual marketing side effects (Meta Pixel +
 * attribution capture) — kept outside this component so it stays a pure
 * "ask the question" UI, same as __root.tsx wires it.
 */
export function ConsentBanner({ onAccept }: { onAccept: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if the visitor hasn't already decided, and only after
    // mount (avoids a server/client markup mismatch on first paint).
    setVisible(getConsent() === null);
  }, []);

  if (!visible) return null;

  function handleAccept() {
    setConsent(true);
    setVisible(false);
    onAccept();
  }

  function handleDecline() {
    setConsent(false);
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed left-4 right-4 bottom-4 z-[95] mx-auto max-w-sm rounded-2xl border border-border bg-card p-4 shadow-2xl sm:left-4 sm:right-auto"
    >
      <p className="text-[11.5px] leading-snug font-light text-muted-foreground">
        <b className="font-bold text-foreground">We use cookies.</b> We use a
        marketing cookie to track ad performance and attribute your visit —
        nothing else.
      </p>
      <div className="mt-3 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleAccept}
          className="rounded-lg bg-primary px-3 py-1.5 font-heading text-[11px] font-bold text-primary-foreground transition hover:opacity-90"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={handleDecline}
          className="rounded-lg border border-border px-3 py-1.5 font-heading text-[11px] font-bold text-foreground transition hover:border-primary hover:text-primary"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
