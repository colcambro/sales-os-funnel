import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { trackMetaEvent } from "../lib/meta-pixel";
import { PLACEHOLDER_PRICE_USD } from "../lib/pricing";
import { BASE_PATH } from "../lib/base-path";
import { CheckCircle2, Sparkles, Download, Play } from "lucide-react";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Welcome to Sales.OS — Order Confirmed & Onboarding" },
      {
        name: "description",
        content:
          "Your enrollment is complete! Check your email for instructions on how to set up your account.",
      },
      { property: "og:title", content: "Welcome to Sales.OS — Order Confirmed" },
      {
        property: "og:description",
        content: "Your Sales.OS access details and next steps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  // The two live Stripe Payment Links (see checkout.tsx) need their "after
  // payment" redirect URL set, in the Stripe Dashboard, to this page with
  // ?session_id={CHECKOUT_SESSION_ID} appended — Stripe fills that
  // placeholder in automatically. That's a deployment-time step, not
  // something this app's code does on its own. Until it's set, this page
  // falls back to a placeholder-value Purchase pixel fire below.
  const search = useSearch({ strict: false }) as {
    name?: string;
    email?: string;
    total?: string;
    bump?: string;
    session_id?: string;
  };

  const [resolvedEmail, setResolvedEmail] = useState<string | null>(search.email || null);
  const [purchaseFired, setPurchaseFired] = useState(false);

  // Look up the real Stripe session server-side rather than trusting the
  // client-editable query string — this is what confirms the sale actually
  // happened and gets the real amount/email for the Purchase pixel event.
  useEffect(() => {
    if (!search.session_id) {
      // No Stripe session on this visit (e.g. direct nav during preview) —
      // fall back to a placeholder-value Purchase fire so the pixel still
      // has *something* during testing. Flagged, not for real launch traffic.
      if (!purchaseFired) {
        trackMetaEvent("Purchase", {
          content_name: "Sales.OS Launch Special",
          currency: "USD",
          value: search.total ? Number(search.total) : PLACEHOLDER_PRICE_USD,
        });
        setPurchaseFired(true);
      }
      return;
    }

    let cancelled = false;
    // Not /.netlify/functions/... directly — see the matching comment in
    // checkout.tsx's handleStripeCheckout.
    fetch(
      `${BASE_PATH}/api/get-checkout-session?session_id=${encodeURIComponent(search.session_id)}`,
    )
      .then((res) => res.json())
      .then(
        (data: {
          status?: string;
          email?: string | null;
          amountTotal?: number;
          currency?: string;
        }) => {
          if (cancelled) return;
          if (data.email) setResolvedEmail(data.email);
          if (!purchaseFired && data.status === "paid") {
            trackMetaEvent("Purchase", {
              content_name: "Sales.OS Launch Special",
              currency: (data.currency || "usd").toUpperCase(),
              value:
                typeof data.amountTotal === "number"
                  ? data.amountTotal / 100
                  : PLACEHOLDER_PRICE_USD,
            });
            setPurchaseFired(true);
          }
        },
      )
      .catch((err) => {
        console.error("Could not verify Stripe session:", err);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.session_id]);

  const portalSteps = [
    {
      num: "01",
      title: "Your access is being switched on.",
      desc: "The payment's confirmed and your account is upgrading to full access right now - it takes just a few seconds.",
      icon: CheckCircle2,
    },
    {
      num: "02",
      title: "Head back to the platform.",
      desc: "Sign in with the account you just created. Both programmes will be unlocked.",
      icon: Play,
    },
    {
      num: "03",
      title: "Start with Lesson 1.",
      desc: "Everything's laid out in order - just pick up where the programme begins.",
      icon: Sparkles,
    },
    {
      num: "04",
      title: "Get into the community chat and the video library.",
      desc: "Seminar recordings, new coaching videos, role plays and more get added regularly - use the resources to sell and scale.",
      icon: Download,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Header Navigation */}
      <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://vibe.filesafe.space/1789478637864975309/attachments/f1acfc03-dbac-4cdf-b433-6351084dafae.png"
              alt="Sales.OS Logo"
              className="h-8 w-auto object-contain"
            />
          </Link>
          <span className="inline-flex items-center gap-2 text-xs text-foreground font-medium bg-accent border border-accent/70 px-3.5 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            Step 3 of 3: Order Confirmed
          </span>
        </div>
      </header>

      {/* Red step pill bar */}
      <div className="w-full bg-primary text-primary-foreground py-3 px-4 text-center">
        <p className="font-heading font-bold text-sm sm:text-base uppercase tracking-wide">
          Step Three — You Are In. Welcome To Sales.OS
        </p>
      </div>

      <div className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Success Hero Banner */}
          <div className="relative rounded-3xl bg-accent p-8 sm:p-12 border border-primary/40 text-center overflow-hidden shadow-2xl">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6 shadow-xl">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.5]" />
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-accent-foreground mb-3 tracking-tight">
              You're in.
            </h1>
            <p className="text-accent-foreground/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Your payment went through and <strong className="text-primary">Sales.OS</strong> is
              unlocked - and as part of your S.OS² membership,{" "}
              <strong className="text-primary">RealEstate.OS</strong> comes with it too.
            </p>
          </div>

          {/* What happens next */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-xl text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              What happens next
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {portalSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-card/60 border border-border relative overflow-hidden"
                >
                  <div className="text-3xl font-extrabold font-heading text-foreground/10 absolute top-4 right-4">
                    {step.num}
                  </div>
                  <step.icon className="w-8 h-8 text-primary mb-4" />
                  <h4 className="font-heading font-bold text-base text-foreground mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-2">
            <a
              href="https://sossalesandscaling.com/#library"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-extrabold py-4 px-8 rounded-xl transition-all shadow-lg"
            >
              Go to the platform →
            </a>
          </div>

          {/* Note */}
          <p className="text-center text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Still showing locked a minute after paying? Give it a moment and refresh, then email{" "}
            <a href="mailto:Colin@sossalesandscaling.com" className="text-primary font-semibold">
              Colin@sossalesandscaling.com
            </a>{" "}
            and we'll sort it.
          </p>
        </div>
      </div>
    </div>
  );
}
