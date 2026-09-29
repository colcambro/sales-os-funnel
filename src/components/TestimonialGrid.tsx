import { BASE_PATH } from "../lib/base-path";

export const CHECKOUT_TESTIMONIALS = [
  {
    name: "Adam Sinclair",
    role: "Managing Director, Sterling Sinclair Group",
    quote:
      "SOS added much-needed structure to our daily operations and gave my team the exact tools they needed to hit their revenue targets.",
    image: `${BASE_PATH}/images/adam-sinclair-photo.jpg`,
  },
  {
    name: "Taylor McDonald",
    role: "1st Seed Property",
    quote:
      "I was able to take what we'd learned and apply it in real time to close £8,000 worth of sales by the time we'd finished the programme.",
    image: `${BASE_PATH}/images/taylor-mcdonald-photo.jpg`,
  },
  {
    name: "Nick McNally",
    role: "Founder, Luxury Kitchen Design",
    quote: "Today's sales coaching with SOS was a game-changer for our team.",
    image: `${BASE_PATH}/images/nick-mcnally-photo.jpg`,
  },
];

export function TestimonialCard({
  name,
  role,
  quote,
  image,
  zoom,
}: {
  name: string;
  role?: string;
  quote: string;
  image?: string;
  zoom?: string;
}) {
  return (
    <div className="p-5 rounded-2xl bg-card border border-border flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full border-2 border-primary/30 overflow-hidden mb-3 bg-accent flex items-center justify-center shrink-0 shadow-md">
        {image ? (
          <img src={image} alt={name} className={`w-full h-full object-cover ${zoom ?? ""}`} />
        ) : (
          <span className="text-accent-foreground font-bold text-base">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        )}
      </div>
      <p className="text-sm text-foreground leading-relaxed italic">"{quote}"</p>
      <p className="text-xs font-bold text-primary mt-2 uppercase tracking-wide">{name}</p>
      {role ? (
        <p className="text-[11px] text-secondary font-medium mt-0.5">{role}</p>
      ) : null}
    </div>
  );
}

export function TestimonialGrid({
  items,
}: {
  items: { name: string; role?: string; quote: string; image?: string; zoom?: string }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((t) => (
        <TestimonialCard key={t.name} {...t} />
      ))}
    </div>
  );
}
