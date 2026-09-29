import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { trackMetaEvent } from "../lib/meta-pixel";
import { CHECKOUT_TESTIMONIALS } from "../components/TestimonialGrid";
import { ShieldCheck, Lock, Zap, ArrowRight } from "lucide-react";

// These are the real, live Sales.OS Stripe Payment Links — the same ones
// already wired into the main site's STRIPE_LINKS (sos-site/index.html).
// Payment Links are Stripe-hosted: clicking through creates the Checkout
// Session on Stripe's side, so this app doesn't need its own
// create-checkout-session function or a Stripe secret key just to start a
// purchase. See netlify/functions/get-checkout-session.js for the
// read-only verification call this app DOES still make, on the thank-you
// page, to confirm the sale and fire an accurate Meta Pixel Purchase event.
//
// IMPORTANT: once this funnel is deployed, these two Payment Links' "after
// payment" redirect needs updating in the Stripe Dashboard to point at this
// app's own /thank-you route (with ?session_id={CHECKOUT_SESSION_ID}
// appended) instead of wherever they currently redirect. That's a
// deployment-time step, not something this app's code can do on its own.
const PAYMENT_LINKS = {
  monthly: "https://buy.stripe.com/5kQ9AT1zP10I9Ih71OgnL20",
  annual: "https://buy.stripe.com/00wdR93HX5gYf2B3PCgnL1Z",
} as const;

const PRICING = {
  monthly: { label: "$100/mo", value: 100 },
  annual: { label: "$997/yr", value: 997, note: "2 months free" },
} as const;

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Order Sales.OS — Secure Checkout & Enrollment" },
      {
        name: "description",
        content: "Complete your enrollment in Sales.OS. Instant access to the entire portal.",
      },
      { property: "og:title", content: "Order Sales.OS — Secure Checkout & Enrollment" },
      {
        property: "og:description",
        content: "Complete your order to get instant access to Sales.OS.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const [plan, setPlan] = useState<"monthly" | "annual">("annual");

  useEffect(() => {
    trackMetaEvent("InitiateCheckout", {
      content_name: "Sales.OS Launch Special",
      currency: "USD",
      value: PRICING[plan].value,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePlanChange(next: "monthly" | "annual") {
    setPlan(next);
    trackMetaEvent("InitiateCheckout", {
      content_name: "Sales.OS Launch Special",
      currency: "USD",
      value: PRICING[next].value,
    });
  }

  // Reuses the same locked checkout-style testimonials as the main sales
  // page (see src/components/TestimonialGrid.tsx) rather than a separate
  // hardcoded set — the previous local set here (Tony/Wunmi/Hannah) included
  // Wunmi's real-estate-specific quote, which isn't in the Sales.OS copy
  // doc. Tony's quote does appear in the copy doc (section 13), just as part
  // of the full 10-card grid rather than this 3-card checkout set.
  const testimonials = CHECKOUT_TESTIMONIALS;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Header Navigation */}
      <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://vibe.filesafe.space/1789478637864975309/attachments/f1acfc03-dbac-4cdf-b433-6351084dafae.png"
              alt="S.OS² Logo"
              className="h-8 w-auto object-contain"
            />
          </Link>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 text-xs text-accent-foreground font-medium bg-accent border border-accent/70 px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Step 2 of 3: Enrollment Details
            </span>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="w-3.5 h-3.5 text-primary" />
              <span>256-Bit SSL</span>
            </div>
          </div>
        </div>
      </header>

      {/* Red step pill bar */}
      <div className="w-full bg-primary text-primary-foreground py-3 px-4 text-center">
        <p className="font-heading font-bold text-sm sm:text-base uppercase tracking-wide">
          Step Two — You're Ready To Sell Consistently. Let's Go.
        </p>
      </div>

      <div className="py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8">
          {/* Left Column: Embedded Payment Form */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-8">
              <h1 className="font-heading text-2xl font-extrabold text-foreground mb-2 flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                Step 2 of 3: Enrollment Details
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mb-6">
                Enter your contact & payment details below for instant access to Sales.OS.
              </p>

              {/* ════════════════════════════════════════════════════════════════
                  STRIPE CHECKOUT
                  ───────────────────────────────────────────────────────────────
                  Links straight to Stripe's own hosted Payment Link pages
                  (PAYMENT_LINKS above) — no card details ever touch this app,
                  and no custom Checkout Session needs creating here since
                  Stripe creates one automatically when the customer opens the
                  Payment Link.
              ════════════════════════════════════════════════════════════════ */}
              <div className="rounded-xl border border-border bg-background p-5 sm:p-6 space-y-4">
                {/* Plan toggle */}
                <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-accent border border-border">
                  <button
                    type="button"
                    onClick={() => handlePlanChange("monthly")}
                    className={`py-2 px-3 rounded-md text-sm font-semibold transition ${
                      plan === "monthly"
                        ? "bg-primary text-primary-foreground shadow"
                        : "text-accent-foreground hover:bg-background/60"
                    }`}
                >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePlanChange("annual")}
                    className={`py-2 px-3 rounded-md text-sm font-semibold transition ${
                      plan === "annual"
                        ? "bg-primary text-primary-foreground shadow"
                        : "text-accent-foreground hover:bg-background/60"
                    }`}
                  >
                    Annual <span className="opacity-80">(2 months free)</span>
                  </button>
                </div>

                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm font-semibold text-foreground">
                    Sales.OS — Launch Special
                  </span>
                  <span className="font-heading text-2xl font-extrabold text-primary">
                    {PRICING[plan].label}
                  </span>
                </div>

                <a
                  href={PAYMENT_LINKS[plan]}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-heading font-bold text-sm sm:text-base py-3.5 px-6 hover:opacity-90 transition"
                >
                  Pay Securely with Stripe <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="flex flex-col items-center gap-3 pt-6">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Lock className="w-4 h-4 text-primary" /> Instant Access
                </span>
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <span className="flex items-center gap-2 text-xl font-heading font-extrabold text-primary justify-center">
                    <ShieldCheck className="w-6 h-6 text-primary shrink-0" /> Our Crazy Guarantee
                  </span>
                  <p className="text-base font-semibold text-foreground">
                    We 100% guarantee you'll love Sales.OS - and your results - so much that if you
                    follow the plan and don't get results, we'll give you a refund.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Testimonials */}
          <div className="lg:col-span-4 space-y-4">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-5 rounded-2xl bg-background border border-border flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full border-2 border-primary/30 overflow-hidden mb-3 bg-accent flex items-center justify-center shrink-0 shadow-md">
                  {t.image ? (
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-accent-foreground font-bold text-base">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground leading-relaxed italic">"{t.quote}"</p>
                <p className="text-xs font-bold text-primary mt-2 uppercase tracking-wide">
                  {t.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
