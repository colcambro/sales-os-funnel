import type { LucideIcon } from "lucide-react";
import { BASE_PATH } from "./base-path";
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
// Nick McNally, Dave Lewis, Luis Guarin, Tony, Hannah, Gary McLellan, Sami
// Eric, Adam Ormesher, Jamie Gemmill — see public/images/), plus Lewis
// Mitchell's Shield Healthcare Solutions logo. Bren McKirdy has no photo yet
// and renders with the initials-avatar fallback (see index.tsx). All photos
// are re-compressed JPEGs (resized to a 500px max dimension) regardless of
// their original format, so every path below ends in .jpg even where the
// source was a .png/.webp.
// Client-requested copy edits (2026-09-29) applied to Tony, Sami Eric, Bren
// McKirdy, Hannah, Dave Lewis, Lewis Mitchell, Adam Ormesher and Jamie
// Gemmill's quotes — see git history for the prior wording if needed.
// Further client-requested edits (2026-09-29, second pass): Gary's full name
// (Gary McLellan) and a real photo replacing the G33 Media logo; Lewis
// Mitchell's title changed to Director of Shield Healthcare Solutions Ltd;
// Sami Eric's title changed to Head of Business Development, Aegis Energy;
// real photos added for Sami Eric, Adam Ormesher and Jamie Gemmill.
// Third pass (2026-09-29): new testimonial added for Jordan Cherrie, Director
// of Renew Vision Management, with a real photo.
// Fourth pass (2026-09-29): Tony and Hannah given full names/titles (Tony
// Mann, Hannah Pryde — both Real Estate Broker), replacing the placeholder
// "Broker / System Testimonial" role.
export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    name: "Gary McLellan",
    role: "Founder, G33 Media",
    quote:
      "SOS was a great help in changing my reliance on referrals and inbound. I could immediately apply the coaching to how a video production company actually wins work, rather than an overly generic copy paste beat for beat sales script. I now confidently book meetings with outreach then run discovery meetings with the LETS structure.",
    image: `${BASE_PATH}/images/gary-mclellan-photo.jpg`,
  },
  {
    name: "Sami Eric",
    role: "Head of Business Development, Aegis Energy",
    quote:
      "Results wise - my pipeline is bigger, I'm getting more connections on LinkedIn and inbound, while I've got confidence booking meetings with cold calling at last.",
    image: `${BASE_PATH}/images/sami-eric-photo.jpg`,
  },
  {
    name: "Lewis Mitchell",
    role: "Director of Shield Healthcare Solutions Ltd",
    quote:
      "I had high expectations and they've been surpassed. We finally have a process from cold to client. The lesson on setting up reliable referrals generated sales after one afternoon of emails. And best of all, our new account manager successfully closed two sales this week - his first two sales.",
    image: `${BASE_PATH}/images/lewis-mitchell-photo.png`,
  },
  {
    name: "Bren McKirdy",
    role: "Founder, One Wellness",
    quote:
      "I'd describe the coaching as practical, tailored and immediately actionable. Within just five days, we'd made back the annual investment organically by 10x, without spending a penny on paid ads.",
    image: `${BASE_PATH}/images/bren-mckirdy-photo.jpg`,
  },
  {
    name: "Adam Ormesher",
    role: "Student Lettings",
    quote:
      "Loads of value and the understanding of how to apply the sale training to our student market 100% made everything really relevant... 50 rooms let in Liverpool already this week.",
    image: `${BASE_PATH}/images/adam-ormesher-photo.jpg`,
  },
  {
    name: "Luis Guarin",
    role: "Prime Property Auctions",
    quote:
      "SOS's sales training with the team at Prime was truly transformative. His approach provided our team with the confidence and motivation needed to put their knowledge into action.",
    image: `${BASE_PATH}/images/luis-guarin-photo.jpg`,
  },
  {
    name: "Jamie Gemmill",
    role: "Managing Director, We Love Your Projects",
    quote:
      "Working with Colin Campbell and SOS has been a game-changer for both me and my team. After the coaching, there was a noticeable lift in the energy and drive across the team.",
    image: `${BASE_PATH}/images/jamie-gemmill-photo.jpg`,
  },
  {
    name: "Dave Lewis",
    role: "Biograph London",
    quote:
      "I've used Colin's sales system for the last 8 months and you've really improved my confidence in communicating, and helped develop a repeatable process for successfully taking on new clients. In the last 6 weeks alone, we've doubled the clients we look after, and the business's revenue.",
    image: `${BASE_PATH}/images/dave-lewis-photo.jpg`,
  },
  {
    name: "Tony Mann",
    role: "Real Estate Broker",
    quote:
      "Using the training modules and the system has been a gamechanger. Every possible thing you need is at your fingertips for prospecting and more.",
    image: `${BASE_PATH}/images/tony-photo.jpg`,
  },
  {
    name: "Hannah Pryde",
    role: "Real Estate Broker",
    quote:
      "The SOS Method has helped me grow so much faster in this industry and stay consistent. I've just had my biggest and best year after 3 years in real estate.",
    image: `${BASE_PATH}/images/hannah-photo.jpg`,
  },
  {
    name: "Jordan Cherrie",
    role: "Director, Renew Vision Management",
    quote:
      "I had grown the business to over £700K a year but relied heavily on referrals and word of mouth, using the sales system I grew my pipeline and finally crossed the £1M a year mark. My confidence in outreach, discovery meetings, and closing cold business has totally transformed how I can grow my business.",
    image: `${BASE_PATH}/images/jordan-cherrie-photo.jpg`,
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
