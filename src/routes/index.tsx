import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  ShoppingCart,
  ArrowDown,
} from "lucide-react";
import { INCLUDED_ITEMS, VIDEO_TESTIMONIALS, THIRTY_DAY_PILLARS } from "../lib/sales-content";
import { BottomSalesSections } from "../components/BottomSalesSections";
import { MeetFoundersSection } from "../components/MeetFoundersSection";
import { TestimonialGrid, CHECKOUT_TESTIMONIALS } from "../components/TestimonialGrid";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sales.OS — The Complete Sales Operating System" },
      {
        name: "description",
        content: "The complete sales operating system for anyone who sells, in any industry.",
      },
      { property: "og:title", content: "Sales.OS — The Complete Sales Operating System" },
      {
        property: "og:description",
        content: "The complete sales operating system for anyone who sells, in any industry.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SalesPage,
});

function HeaderLogo() {
  return (
    <div className="flex items-center gap-3">
      <img
        src="https://vibe.filesafe.space/1789478637864975309/attachments/f1acfc03-dbac-4cdf-b433-6351084dafae.png"
        alt="S.OS² Logo"
        className="h-9 w-auto object-contain"
      />
      <span className="hidden sm:inline-block h-4 w-px bg-border"></span>
      <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-foreground font-semibold">
        Sales & Scaling System
      </span>
    </div>
  );
}

export default function SalesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-background border-b border-border text-foreground text-xs sm:text-sm font-extrabold py-2.5 px-4 text-center tracking-wider uppercase">
        <span className="text-primary font-black mr-2">SPECIAL LAUNCH:</span>2 Months Free With Our
        Annual Plan
      </div>

      {/* Navigation Header */}
      <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <HeaderLogo />

          <div className="flex items-center gap-4">
            <span className="hidden md:inline-flex items-center gap-2 text-xs text-foreground font-medium bg-accent border border-accent/70 px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Step 1 of 3: System Overview
            </span>
            <Link
              to="/checkout"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm px-5 py-2 rounded-lg transition-all"
            >
              I'm Ready To Sell Consistently
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. PRE-HEADLINE & MAIN HEADLINE SECTION */}
      <section className="pt-8 pb-8 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        {/* Yellow-accented highlight banner from layout */}
        <div className="inline-block bg-accent text-accent-foreground font-semibold text-xs sm:text-sm md:text-base px-4 py-1.5 rounded-sm mb-6 shadow-sm">
          The Complete Sales Operating System - For Anyone Who Sells, In Any Industry
        </div>

        {/* Big Impact Headline with selective brand colors */}
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.12] text-foreground max-w-4xl mx-auto mb-5">
          <span className="text-primary">Imagine</span> If You Had{" "}
          <span className="text-primary">Everything</span> You Needed To Sell Consistently - Not By
          Working Harder, But By Running Sales Like A System
        </h1>

        {/* Sub-headline in italic */}
        <p className="font-serif italic text-base sm:text-xl md:text-2xl text-secondary max-w-3xl mx-auto leading-relaxed mb-8">
          ...so you can stop winging it and start operating with the skills, process and numbers of
          a top performer.
        </p>

        {/* 3. VIDEO BOX */}
        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border bg-card shadow-2xl">
          <div className="relative aspect-video w-full bg-black">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/82q8puAtlH8?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1"
              title="Sales.OS — a quick video from Calum & Colin, founders of Sales.OS"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="px-4 py-3 text-center bg-card border-t border-border">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Watch this quick video from Calum & Colin, founders of Sales.OS
            </p>
          </div>
        </div>

        {/* 4. UNDER VIDEO: CTA BUTTON */}
        <div className="mt-6 max-w-4xl mx-auto text-center">
          <Link
            to="/checkout"
            className="inline-flex flex-col items-center justify-center w-full bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-extrabold py-4 px-6 rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg"
          >
            <span className="flex items-center justify-center gap-2 text-base sm:text-xl md:text-2xl uppercase tracking-wide">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              YES! I Want The Sales.OS Launch Offer
            </span>
            <span className="text-[11px] sm:text-xs font-normal text-primary-foreground/90 mt-1">
              Lock in the launch price - 2 months free on the annual plan
            </span>
          </Link>
        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="border-t border-border my-2 max-w-6xl mx-auto"></div>

      {/* 5. TWO-COLUMN LAYOUT (LEFT: EDITORIAL LETTER / RIGHT: STICKY OFFER STACK) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* ================= LEFT COLUMN: MAIN SALES LETTER (7 cols) ================= */}
          <div className="lg:col-span-7 space-y-8">
            {/* Big Editorial Headline */}
            <div>
              <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground leading-[1.1]">
                Why Sales.OS Is The{" "}
                <span className="underline decoration-primary decoration-4">Shortcut</span> To
                Selling Consistently - In Any Industry
              </h2>
            </div>

            <p className="text-base sm:text-lg font-medium text-foreground leading-relaxed">
              <strong className="font-serif italic text-primary">IT'S TRUE:</strong> the salespeople
              who consistently perform at the highest level DON'T simply rely on more leads, more
              calls or working longer hours...
            </p>

            <p className="text-sm sm:text-base text-secondary leading-relaxed">
              Sorry, but it's true.
            </p>

            <p className="text-sm sm:text-base text-secondary leading-relaxed">
              The usual answer when someone isn't getting results is almost always the same:
            </p>

            <p className="text-sm sm:text-base text-foreground font-semibold leading-relaxed">
              Make more calls. Book more meetings. Send more proposals. Work harder.
            </p>

            <p className="text-sm sm:text-base text-secondary leading-relaxed">
              And when that doesn't work?
            </p>

            <p className="text-sm sm:text-base text-foreground font-semibold leading-relaxed">
              Do even more.
            </p>

            <p className="text-sm sm:text-base text-secondary leading-relaxed">
              But here's the problem...
            </p>

            <p className="text-sm sm:text-base text-secondary leading-relaxed">
              More calls won't fix a weak opening. More leads won't fix poor qualification. More
              meetings won't help if you can't uncover the real objection. And more proposals won't
              help if nobody understood the value before you sent one.
            </p>

            {/* Transition Headline */}
            <div className="pt-6">
              <h3 className="font-heading text-2xl sm:text-4xl font-black uppercase tracking-tight text-foreground leading-tight">
                So what do the salespeople who consistently perform at the highest level have that
                everyone else doesn't...? It's simple:
              </h3>
            </div>

            {/* 4 Core Pillars */}
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-lg bg-card border border-border flex items-start gap-3">
                <span className="font-heading font-black text-xl text-primary shrink-0">1.</span>
                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                  They know their numbers, so they can see exactly where opportunities are being won
                  and lost.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-card border border-border flex items-start gap-3">
                <span className="font-heading font-black text-xl text-primary shrink-0">2.</span>
                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                  They follow a repeatable process, from prospecting and discovery through to
                  positioning value, objections and closing.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-card border border-border flex items-start gap-3">
                <span className="font-heading font-black text-xl text-primary shrink-0">3.</span>
                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                  They develop the skills to convert the opportunities already in front of them,
                  rather than constantly blaming a lack of leads.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-card border border-border flex items-start gap-3">
                <span className="font-heading font-black text-xl text-primary shrink-0">4.</span>
                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                  And FINALLY... they review their performance, identify what's holding them back
                  and fix it.
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-secondary leading-relaxed">
              Because here's the thing nobody tells you when you're handed a phone, a CRM login and
              a target:
            </p>

            <div className="p-4 rounded-xl bg-accent border border-border text-accent-foreground text-sm sm:text-base font-semibold">
              → The result is simply the OUTPUT. Your process is what creates it.
            </div>

            <p className="text-sm sm:text-base text-secondary leading-relaxed">
              And your process is something you can control.
            </p>

            <p className="text-sm sm:text-base text-foreground font-semibold leading-relaxed">
              Sales.OS breaks sales performance down into three areas:
            </p>

            {/* Skills. Volume. Process. */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-lg bg-card border border-border">
                <p className="font-heading font-black text-lg text-primary">
                  SKILLS. VOLUME. PROCESS.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-card border border-border flex items-start gap-3">
                <span className="font-heading font-black text-xl text-primary shrink-0">→</span>
                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                  Making enough calls but not booking meetings? That's probably a{" "}
                  <strong>skills</strong> problem.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-card border border-border flex items-start gap-3">
                <span className="font-heading font-black text-xl text-primary shrink-0">→</span>
                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                  Great in the room but not speaking to enough people? That's a{" "}
                  <strong>volume</strong> problem.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-card border border-border flex items-start gap-3">
                <span className="font-heading font-black text-xl text-primary shrink-0">→</span>
                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                  Getting leads, meetings and conversations but watching opportunities disappear?
                  That's probably a <strong>process</strong> problem.
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-secondary leading-relaxed">
              Sales.OS gives you the system to identify which one is holding you back, and what to
              do about it.
            </p>

            <p className="text-sm sm:text-base text-secondary leading-relaxed">
              It's the training Calum and Colin both wish someone had given them - instead of
              handing them a phone and a target and telling them to figure it out.
            </p>

            <p className="text-sm sm:text-base text-secondary leading-relaxed">
              Now, between building a 700-person team in the world's most exciting real estate
              market and working directly with 125+ businesses across every industry from
              recruitment to insurance to property and real estate, they've taken those lessons and
              turned them into a complete operating system.
            </p>

            {/* Mission Headline */}
            <div className="pt-6">
              <h3 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-foreground leading-[1.08]">
                The Mission Is Simple:
              </h3>
            </div>

            <p className="text-sm sm:text-base text-secondary leading-relaxed">
              Help you stop winging it...
            </p>

            <p className="text-sm sm:text-base text-secondary leading-relaxed">
              ...stop relying on luck and hoping the next deal lands...
            </p>

            <p className="text-sm sm:text-base text-secondary leading-relaxed">
              ...and start operating with the skills, numbers and process that give you control over
              your performance.
            </p>

            <p className="text-base sm:text-lg font-bold text-foreground">
              Because the best salespeople aren't simply busier.
            </p>

            <p className="text-base sm:text-lg font-bold text-primary">They operate better.</p>

            <p className="text-sm sm:text-base text-foreground font-semibold leading-relaxed">
              And Sales.OS shows you how.
            </p>
          </div>

          {/* ================= RIGHT COLUMN: STICKY LAUNCH OFFER & VALUE STACK (5 cols) ================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-6">
            <div className="rounded-xl bg-card border-2 border-border shadow-2xl p-5 sm:p-6">
              {/* Header Box */}
              <div className="text-center pb-4">
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  One-Time Launch Offer
                </h3>
                <div className="w-24 h-1 bg-primary mx-auto mt-1 rounded-full"></div>
              </div>

              {/* Discount Box */}
              <div className="bg-primary text-primary-foreground font-bold text-xs sm:text-sm text-center py-3 px-4 rounded-lg leading-snug mb-4">
                2 months free with our annual plan. Lock in the launch price now.
              </div>

              {/* Arrow Callout */}
              <div className="text-center mb-4">
                <p className="text-xs text-secondary font-semibold uppercase tracking-wider flex items-center justify-center gap-1">
                  Quick, secure your space now!
                </p>
                <div className="flex justify-center text-primary mt-1 animate-bounce">
                  <ArrowDown className="w-5 h-5" />
                </div>
              </div>

              {/* Step #2 CTA Button */}
              <Link
                to="/checkout"
                className="w-full inline-flex flex-col items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-extrabold py-4 px-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] text-center"
              >
                <span className="flex items-center gap-2 text-base sm:text-lg uppercase tracking-wide">
                  <ArrowRight className="w-5 h-5" />
                  Go To Step #2
                </span>
                <span className="text-[11px] font-medium text-primary-foreground/90 mt-0.5">
                  Unlock The One Time Launch Offer
                </span>
              </Link>

              {/* Security & Guarantee Trust Badges */}
              <div className="text-center mt-4 pt-3 border-t border-border space-y-2">
                <div className="text-[11px] text-secondary flex items-center justify-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-primary" />
                  100% Secure 256-Bit Encrypted Checkout
                </div>

                {/* Payment Cards row */}
                <div className="flex items-center justify-center gap-2 text-xs text-secondary font-mono">
                  <span className="px-2 py-0.5 rounded bg-background border border-border text-[10px] font-bold">
                    PayPal
                  </span>
                  <span className="px-2 py-0.5 rounded bg-background border border-border text-[10px] font-bold">
                    VISA
                  </span>
                  <span className="px-2 py-0.5 rounded bg-background border border-border text-[10px] font-bold">
                    Mastercard
                  </span>
                  <span className="px-2 py-0.5 rounded bg-background border border-border text-[10px] font-bold">
                    AMEX
                  </span>
                </div>

                <div className="text-[11px] text-foreground font-semibold flex items-center justify-center gap-1 mt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  Backed by Our 100% Money Back Guarantee.
                </div>
              </div>

              {/* STACKED "INCLUDED" ITEMS LIST (matching Screenshots 1 & 5) */}
              <div className="mt-6 space-y-5 pt-4 border-t border-border">
                {INCLUDED_ITEMS.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    {/* Black "INCLUDED" bar exactly like the ClickFunnels template */}
                    <div className="bg-black border border-border text-foreground text-[10px] font-black uppercase tracking-widest text-center py-1 rounded">
                      INCLUDED
                    </div>

                    <div className="flex items-start gap-3 pt-1">
                      <div className="w-12 h-12 rounded-lg bg-accent border border-border flex items-center justify-center shrink-0 text-primary">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading font-bold text-sm text-foreground leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-xs text-secondary leading-relaxed mt-1">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. MEET THE FOUNDERS — DUAL FOUNDER BIO SECTION ================= */}
      <MeetFoundersSection />

      {/* ================= 7. FULL-WIDTH BLACK VIDEO TESTIMONIALS SECTION (Screenshot 2) ================= */}
      <section className="bg-black border-y border-border py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Centered Big White Headline matching ClickFunnels Screenshot 2 */}
          <div className="text-center max-w-4xl mx-auto mb-8">
            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              REAL BUSINESSES. REAL RESULTS. SALES.OS.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-secondary font-medium">
              Check out what they think of Sales.OS
            </p>
          </div>

          {/* Full testimonial grid — quote cards with photo where we have one, initials avatar otherwise */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEO_TESTIMONIALS.map((v, i) => (
              <div
                key={i}
                className="group relative rounded-xl bg-card border border-border shadow-lg transform hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full border-2 border-primary/30 overflow-hidden mb-4 bg-accent flex items-center justify-center shrink-0 shadow-md">
                  {v.image ? (
                    <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-accent-foreground font-bold text-sm">
                      {v.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  )}
                </div>

                <p className="text-sm text-foreground leading-relaxed italic flex-1">"{v.quote}"</p>

                <div className="mt-4">
                  <p className="font-heading font-bold text-sm text-foreground">{v.name}</p>
                  <p className="text-[11px] text-secondary font-medium mt-0.5">{v.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Under-grid CTA Button */}
          <div className="mt-8 text-center">
            <Link
              to="/checkout"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-xl transition-all transform hover:scale-105"
            >
              <span>I'm Ready To Sell Consistently</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= 6.5. CHECKOUT-STYLE TESTIMONIAL CARDS ================= */}
      <section className="py-10 px-4 sm:px-6 max-w-6xl mx-auto">
        <TestimonialGrid items={CHECKOUT_TESTIMONIALS} />
      </section>

      {/* ================= 7. WORKSHOP / IN-PERSON MASTERCLASS IMAGE BANNER (Screenshot 3) ================= */}
      <section className="py-10 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        {/* Yellow-accented launch special box */}
        <div className="inline-block bg-accent text-accent-foreground font-extrabold text-sm sm:text-base md:text-lg px-6 py-1.5 uppercase tracking-wide rounded-sm mb-4 shadow-sm">
          Sales.OS Launch Special
        </div>

        {/* Headline */}
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black text-foreground max-w-3xl mx-auto leading-tight mb-6">
          The Simplest Route To Selling Consistently, In Any Industry
        </h2>

        {/* Large Coaching / Masterclass Image — CONFIRMED PLACEHOLDER, per client: keep as-is until a
            real photo of Calum & Colin together (or Colin's photo paired with Calum's) is ready. */}
        <div className="rounded-2xl overflow-hidden border border-border shadow-2xl relative bg-card">
          <img
            src="https://vibe.filesafe.space/1789478637864975309/attachments/250eb40b-4f24-4b8c-8a5d-b35c3723d9ab.jpg"
            alt="Sales.OS coaching / masterclass — placeholder image"
            className="w-full h-auto object-cover max-h-[640px]"
          />
        </div>
      </section>

      {/* ================= 8. "WITH SALES.OS YOU WILL..." BULLET SECTION (Screenshots 4 & 5) ================= */}
      <section className="py-10 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-left mb-8">
          <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            With Sales.OS You Will...
          </h2>
          <div className="w-20 h-1 bg-primary mt-3 rounded-full"></div>
        </div>

        {/* Bullet List with red target/dot circles */}
        <div className="space-y-6 sm:space-y-8">
          {THIRTY_DAY_PILLARS.map((pillar, idx) => (
            <div key={idx} className="flex items-start gap-4">
              {/* Bullseye / target circle icon in brand red */}
              <div className="shrink-0 mt-1">
                <div className="w-6 h-6 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                </div>
              </div>

              {/* Text content: bold title + italicized parenthetical description */}
              <div className="flex-1 text-foreground leading-relaxed text-base sm:text-lg">
                <strong className="font-heading font-bold text-foreground mr-1.5">
                  {pillar.title}
                </strong>
                <span className="font-serif italic text-secondary">({pillar.desc})</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modular bottom sections: Launch Special CTA, Guarantee */}
        <BottomSalesSections />
      </section>

      {/* Page Footer */}
      <footer className="border-t border-border py-8 px-4 text-center text-xs text-secondary bg-background">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <HeaderLogo />
          <div>© {new Date().getFullYear()} S.OS² System. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-foreground">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
