/**
 * Real, live Sales.OS pricing — $100/mo or $997/yr (2 months free). The
 * checkout page (src/routes/checkout.tsx) has its own PRICING/PAYMENT_LINKS
 * constants for the actual plan toggle and Stripe Payment Link URLs; this
 * export is just the fallback value used by the Meta Pixel Purchase event
 * on the thank-you page (src/routes/thank-you.tsx) for the rare case a
 * visitor lands there without a resolvable Stripe session (e.g. a direct
 * nav during preview), so the pixel still fires a real, on-copy number
 * rather than a guess.
 */
export const PLACEHOLDER_PRICE_USD = 997;
