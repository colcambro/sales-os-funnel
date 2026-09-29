import { BASE_PATH } from "../lib/base-path";

export function MeetFoundersSection() {
  return (
    <section className="pt-2 pb-10 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section kicker + headline */}
      <div className="text-center mb-8">
        <p className="text-xs sm:text-sm font-heading font-bold uppercase tracking-widest text-primary mb-2">
          Meet The Operators Behind Sales.OS
        </p>
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground leading-[1.15] max-w-3xl mx-auto">
          Built By Two People Who've Actually Done It - Not Just Taught It
        </h2>
      </div>

      {/* Calum + Colin photos, side by side */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-8">
        <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl bg-card aspect-[4/5]">
          <img
            src="https://vibe.filesafe.space/1789478637864975309/attachments/5684070f-d4f3-49eb-b960-c8ec1ee2bfe8.jpg"
            alt="Calum White — Co-Founder of Sales.OS"
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
            <p className="font-heading font-bold text-sm sm:text-base text-white leading-tight">
              Calum White
            </p>
            <p className="text-[10px] sm:text-xs text-white/80 uppercase tracking-wide">
              Co-Founder
            </p>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl bg-card aspect-[4/5]">
          <img
            src={`${BASE_PATH}/images/colin-campbell-photo.jpg`}
            alt="Colin Campbell — Head of Education, Sales.OS"
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
            <p className="font-heading font-bold text-sm sm:text-base text-white leading-tight">
              Colin Campbell
            </p>
            <p className="text-[10px] sm:text-xs text-white/80 uppercase tracking-wide">
              Head of Education
            </p>
          </div>
        </div>
      </div>

      {/* Origin story */}
      <div className="max-w-3xl mx-auto mb-10 text-sm sm:text-base text-secondary leading-relaxed text-center">
        <p>
          Calum and Colin met in March 2025, when Calum joined Colin as a guest on his podcast,
          CamBro Conversations. It didn't take long to realize they thought about sales, scaling,
          frameworks and coaching in almost exactly the same way - and that together, they could
          change how sales professionals and business owners actually sell and scale. That
          conversation became Sales.OS.
        </p>
      </div>

      {/* Two sub-bios, side by side on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {/* Calum White sub-bio */}
        <div className="space-y-4">
          <h3 className="font-heading font-bold text-lg sm:text-xl text-primary leading-snug">
            "From Leasing Broker To Building A 700+ Person Team In The World's Most Exciting Real
            Estate Market"
          </h3>
          <div className="space-y-4 text-sm sm:text-base text-foreground leading-relaxed">
            <p>
              Calum White knows the Dubai real estate industry from the ground up. Before building
              White & Co, he worked across virtually every level of the job - leasing broker, sales
              broker, off-plan agent, team leader. He's made the calls, chased the listings, handled
              the viewings, negotiated the deals and managed the people.
            </p>
            <p>
              In 2021, Calum launched White & Co Real Estate with just eight people. Today the
              company has grown to a team of more than 700, turning over $100 Million a year - and
              along the way, he's helped develop hundreds of brokers using the sales systems,
              standards and processes he built.
            </p>
          </div>
        </div>

        {/* Colin Campbell sub-bio */}
        <div className="space-y-4">
          <h3 className="font-heading font-bold text-lg sm:text-xl text-primary leading-snug">
            "From Junior BDM To £9.3M In Additional Revenue For 125+ Businesses, Across Every
            Industry"
          </h3>
          <div className="space-y-4 text-sm sm:text-base text-foreground leading-relaxed">
            <p>
              Colin spent a decade in UK B2B sales, working up from Junior BDM to Sales Director and
              Head of Sales - and built his reputation winning cold business, the hardest kind to
              win.
            </p>
            <p>
              Frustrated by how little real training he was ever given, he started building his own
              frameworks and processes to fill the gap. That thinking became CamBro Conversations, a
              podcast now ranked in the top 1% globally - and business owners listening started
              asking him to train their own sales teams.
            </p>
            <p>
              In the last two years alone, Colin has worked directly with 125+ business owners and
              their sales teams, generating more than £9.3M in additional revenue for their
              businesses.
            </p>
          </div>
        </div>
      </div>

      {/* Closing synthesis line */}
      <p className="font-heading font-bold text-primary text-base sm:text-lg text-center max-w-3xl mx-auto mt-10 leading-relaxed">
        Between them: one built a 700-person team in the world's most exciting real estate market,
        the other has done it again and again across totally different industries. And no matter
        what you sell, or who you sell it to, the fundamentals of becoming a high-performing
        operator don't change.
      </p>
    </section>
  );
}
