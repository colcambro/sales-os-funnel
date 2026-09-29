import { Link } from "@tanstack/react-router";
import { ShoppingCart, ArrowRight } from "lucide-react";

export function BottomSalesSections() {
  return (
    <>
      {/* 9. REPEAT CTA CARD */}
      <div className="mt-16 rounded-2xl bg-card border-2 border-border p-6 sm:p-10 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary"></div>

        <h3 className="font-heading italic text-2xl sm:text-4xl md:text-5xl font-black text-foreground mb-3 leading-tight tracking-tight">
          Let's do this!
        </h3>
        <p className="text-xs sm:text-base text-secondary mb-8">
          Click the button below to access the one-time offer on the next page
        </p>

        <Link
          to="/checkout"
          className="inline-flex flex-col items-center justify-center w-full max-w-2xl mx-auto bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-extrabold py-5 px-6 rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-2xl text-center"
        >
          <span className="flex items-center justify-center gap-2 text-base sm:text-xl md:text-2xl uppercase tracking-wide">
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
            YES! I Want The Sales.OS Launch Offer
          </span>
          <span className="text-[11px] sm:text-xs font-normal text-primary-foreground/90 mt-1">
            Access the launch price - 2 months free on the annual plan
          </span>
        </Link>
      </div>

      {/* 10. GUARANTEE SECTION */}
      <div className="mt-20 pt-10 text-center">
        <div className="inline-block w-40 h-0.5 bg-primary/40 mb-6"></div>
        <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-foreground leading-tight mb-2">
          Oh - and don't forget our{" "}
          <span className="underline decoration-primary decoration-4">crazy guarantee...</span>
        </h2>
        <div className="inline-block w-60 h-0.5 bg-primary/40 mb-10"></div>

        <div className="max-w-2xl mx-auto text-left space-y-4 text-base sm:text-lg leading-relaxed text-foreground bg-card/60 border border-border p-6 sm:p-8 rounded-xl shadow-lg">
          <p>
            We 100% guarantee you'll love{" "}
            <strong className="text-primary font-bold">Sales.OS</strong> - and your results - so
            much that if you follow the plan and don't get results, we'll give you a refund.
          </p>
          <p className="font-semibold text-foreground">Sound fair?</p>
          <div className="pt-2 text-center">
            <Link
              to="/checkout"
              className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-primary hover:underline"
            >
              Claim Your Risk-Free Guarantee on Step #2
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
