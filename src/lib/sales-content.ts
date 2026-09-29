import type { LucideIcon } from "lucide-react";
import {
  FileSpreadsheet,
  LineChart,
  Video,
  Users2,
  BrainCircuit,
  ClipboardCheck,
} from "lucide-react";

export interface IncludedDeliverable {
  title: string;
  desc: string;
  icon: LucideIcon;
}

// Full testimonial grid content (locked copy doc, section 13). These are real
// client quotes, not filmed video testimonials — there's no duration/result
// stat data for these, so the card shape is name + role/company + quote +
// an optional photo (falls back to an initials avatar when there's no
// headshot). See src/routes/index.tsx's "FULL-WIDTH BLACK VIDEO TESTIMONIALS
// SECTION" for how these render.
export interface VideoTestimonial {
  name: string;
  role: string;
  quote: string;
  image?: string;
}

export interface ThirtyDayPillar {
  title: string;
  desc: string;
}

export const INCLUDED_ITEMS: IncludedDeliverable[] = [
  {
    title: "The S.OS Bottleneck Calculator",
    desc: "Plug in your last 30 days of numbers and instantly identify where your sales process is leaking, and what you need to fix first.",
    icon: LineChart,
  },
  {
    title: "Meeting Follow-Up Builder",
    desc: "Build a clear, professional follow-up after every meeting, so opportunities stop going quiet and start moving toward a decision.",
    icon: ClipboardCheck,
  },
  {
    title: "The AFTERS Framework Value Planner",
    desc: "Plan and present the real value of your offer using the AFTERS framework, so the value lands before you ever get to price.",
    icon: FileSpreadsheet,
  },
  {
    title: "APAC Objection Handler Planner",
    desc: "Prepare for and handle the objections that actually come up, using the APAC framework instead of improvising in the moment.",
    icon: Video,
  },
  {
    title: "Sales Graveyard Diagnostic",
    desc: "Find out where deals are quietly dying in your pipeline, and diagnose exactly what's killing them before they disappear for good.",
    icon: BrainCircuit,
  },
  {
    title: "Sales Playbook",
    desc: "A complete, repeatable playbook covering prospecting, discovery, positioning value, objections and closing, so you always know what to do next.",
    icon: Users2,
  },
];

// Full testimonial grid (10 cards, locked copy doc section 13). Local photo
// paths are used for the headshots we have (Adam Sinclair, Taylor McDonald,
// Nick McNally, Dave Lewis, Luis Guarin — see public/images/), plus Gary's
// G33 Media logo. All are re-compressed JPEGs (resized to a 500px max
// dimension) regardless of their original format, so every path below ends
// in .jpg even where the source was a .png/.webp. The rest render as
// text-forward cards with an initials-avatar fallback (see index.tsx).
// Quotes 1, 3, 4, 6, 7 carry light wording edits per the client's
// instruction (workshop -> coaching, some Colin -> SOS) — flagged in the
// draft doc as worth a final read before shipping since they're edits to
// real people's own words.
export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    name: "Gary",
    role: "Founder, G33 Media",
    quote:
      "SOS was a great help in changing that. He tailored my 1-2-1 session to how a video production company actually wins work, rather than giving me a copy paste beat for beat sales script.",
    image: "/images/g33-media-logo.jpg",
  },
  {
    name: "Sami Eric",
    role: "Business Development Manager, Aegis Energy",
    quote:
      "Results wise - my pipeline is bigger, I'm getting more connections on LinkedIn, followers are up by about 600 after 2 months work.",
  },
  {
    name: "Lewis Mitchell",
    role: "Healthcare Partner, Shield Healthcare Solutions / WPA",
    quote:
      "We recently took part in sales coaching with SOS for our private medical insurance company, and the experience was extremely valuable from start to finish. Following the coaching, our account manager successfully closed two sales - his first two sales.",
  },
  {
    name: "Bren McKirdy",
    role: "Founder, One Wellness",
    quote:
      "I'd describe the coaching as practical, tailored and immediately actionable. Within just five days, we'd made back the investment organically, without spending a penny on paid ads.",
  },
  {
    name: "Adam Ormesher",
    role: "Student Lettings",
    quote:
      "Loads of value and your understanding of student market 100% made everything really relevant... 50 rooms let in Liverpool already this week.",
  },
  {
    name: "Luis Guarin",
    role: "Prime Property Auctions",
    quote:
      "SOS's sales training with the team at Prime was truly transformative. His approach provided our team with the confidence and motivation needed to put their knowledge into action.",
    image: "/images/luis-guarin-photo.jpg",
  },
  {
    name: "Jamie Gemmill",
    role: "Managing Director, We Love Your Projects",
    quote:
      "Working with Colin Campbell has been a game-changer for both me and my team. After the coaching, there was a noticeable lift in the energy and drive across the team.",
  },
  {
    name: "Dave Lewis",
    role: "Biograph London",
    quote:
      "We've worked together now for the last 8 months and you've really improved my confidence in communicating, and helped develop a repeatable process for successfully taking on new clients. In the last 6 weeks alone, we've doubled the clients we look after, and the business's revenue.",
    image: "/images/dave-lewis-photo.jpg",
  },
  {
    name: "Tony",
    role: "Broker / System Testimonial",
    quote:
      "Using these training modules and systems have been a gamechanger. Every possible thing you need is at your fingertips.",
    image: "/images/tony-photo.jpg",
  },
  {
    name: "Hannah",
    role: "Broker / System Testimonial",
    quote:
      "The SOS Method has helped me grow so fast in this industry and stay consistent. It's a game changer.",
    image: "/images/hannah-photo.jpg",
  },
];

export const THIRTY_DAY_PILLARS: ThirtyDayPillar[] = [
  {
    title: "Know Exactly Where Your Performance Is Breaking Down",
    desc: "Use the Bottleneck Calculator and your real numbers to identify where opportunities are leaking from your pipeline, so you know what to fix instead of simply doing more random activity.",
  },
  {
    title: "Know The Numbers That Actually Drive Your Results",
    desc: "Track the numbers behind your calls, meetings, proposals and deals, giving you a clear picture of what's working, what's not and where to focus next.",
  },
  {
    title: "Build A Repeatable Prospecting System",
    desc: "Stop relying entirely on inbound and referrals - learn how to create your own opportunities and build a pipeline that doesn't disappear when the leads slow down.",
  },
  {
    title: "Become Better At The Conversations That Make You Money",
    desc: "Learn the frameworks for prospecting, discovery, positioning value, objections and negotiation - real-world role-play recordings are added to the video library as you go, so you know what to say and how to say it.",
  },
  {
    title: "Turn More Of The Opportunities You Already Have Into Deals",
    desc: "Improve how you qualify, run discovery calls, follow up and present your offer - because sometimes you don't need more leads, you need to convert the ones you've already got.",
  },
  {
    title: "Operate With A System, Not Hope",
    desc: "Structure your week around the activities that actually move your numbers, diagnose whether you need MORE, BETTER or NEW, and build the skills, volume and process required to become a consistently high-performing operator.",
  },
];
