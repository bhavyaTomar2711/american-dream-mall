import type { InquiryType } from "@/components/InquiryModal";

/* ─────────────────────────────────────────────
   VENUE DATA
   One source of truth for all /venues pages.
   Images are reused from the homepage EventsSection
   so the commercial module pulls from the same
   asset pipeline already tuned by Cloudinary.
───────────────────────────────────────────── */

export type VenueSlug =
  | "arena"
  | "performing-arts"
  | "expo"
  | "private-events";

export type VenueSpec = {
  value: string;
  label: string;
  foot?: string;
};

export type VenueInclusion = {
  title: string;
  body: string;
};

export type VenuePastEvent = {
  year: string;
  title: string;
  note: string;
};

export type Venue = {
  slug: VenueSlug;
  label: string; // "The Arena"
  eyebrow: string; // "Arena"
  index: string; // "01"
  inquiryType: InquiryType;
  inquiryCategory: string; // pre-selects the InquiryModal category
  hero: {
    src: string;
    headline: string;
    headlineAccent?: string;
    subhead: string;
  };
  intro: string;
  specs: VenueSpec[];
  production: VenueInclusion[];
  past: VenuePastEvent[];
  bookCtaLabel: string; // "Book the Arena"
};

export const VENUES: Record<VenueSlug, Venue> = {
  arena: {
    slug: "arena",
    label: "The Arena",
    eyebrow: "The Arena",
    index: "01",
    inquiryType: "booking",
    inquiryCategory: "Concert / Live",
    hero: {
      src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776191272/pexels-jibarofoto-18482996_ivrrqm.jpg",
      headline: "18,000 seats.",
      headlineAccent: "One electric night.",
      subhead:
        "A column-free bowl engineered for arena tours, championship fights, and televised spectacle. Broadcast-ready, rigging-dense, acoustically tuned.",
    },
    intro:
      "The Arena is the northeast's only purpose-built 18,000-seat venue inside a mixed-use destination. Artists load in at 6 AM, the audience is already shopping by noon, and doors open at 7 into a crowd that's been on-property for hours. No commute to the show. No commute home. A captive audience before a single ticket is scanned.",
    specs: [
      { value: "18,000", label: "Concert Capacity", foot: "End-stage, GA + seated" },
      { value: "15,500", label: "Sport Capacity", foot: "NBA / NHL spec" },
      { value: "60,000 lb", label: "Rigging Load", foot: "Overhead grid, certified" },
      { value: "24 hr", label: "Load-in to Doors", foot: "Full turnover window" },
    ],
    production: [
      {
        title: "PA & broadcast infrastructure",
        body: "L-Acoustics K2 permanent rig, 64-channel monitor world, broadcast truck uplink on dock, iso-feed to NBC affiliates.",
      },
      {
        title: "Lighting & video",
        body: "Full MA3 lighting system, 40×22 ft center-hung IMAG, LED ribbon on every deck, automated rigging points above every seat section.",
      },
      {
        title: "Backline & crew",
        body: "House crew of 48 certified technicians, union-ready stagehand pool, full backline from Drum Workshop and Meinl, green room suites for headliner + support.",
      },
    ],
    past: [
      { year: "2025", title: "Billie Eilish · Tour residency", note: "6 sold-out nights" },
      { year: "2025", title: "UFC 304", note: "PPV broadcast, sold out" },
      { year: "2024", title: "Drake × J. Cole", note: "Co-headline, 2 nights" },
      { year: "2024", title: "NBA G-League Finals", note: "ESPN broadcast" },
      { year: "2024", title: "Grammy Nominations Concert", note: "CBS live special" },
      { year: "2023", title: "WWE Royal Rumble Warm-up", note: "Regional special" },
    ],
    bookCtaLabel: "Book the Arena",
  },

  "performing-arts": {
    slug: "performing-arts",
    label: "The Playhouse",
    eyebrow: "Performing Arts",
    index: "02",
    inquiryType: "booking",
    inquiryCategory: "Private Event",
    hero: {
      src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776191273/pexels-prime-cinematics-1005175-2057274_qdqc1d.jpg",
      headline: "Broadway caliber.",
      headlineAccent: "Every seat a best seat.",
      subhead:
        "A 1,200-seat proscenium house with a full fly system, orchestra pit, and the intimacy that makes every performance feel private.",
    },
    intro:
      "The Playhouse is a working, working-class theater in spec and a world-class theater in finish. Every production that's loaded in — from national Broadway tours to immersive residencies — has reported the same thing: the sightlines from row 30 are the sightlines from row 3. That is the design brief. No compromised seat, no apology row.",
    specs: [
      { value: "1,200", label: "Proscenium Seats", foot: "Continental orchestra + balcony" },
      { value: "60 ft", label: "Proscenium Width", foot: "42 ft depth, 45 ft fly" },
      { value: "28", label: "Line Sets", foot: "Double-purchase counterweight" },
      { value: "4 + 2", label: "Dressing Rooms", foot: "Stars, chorus, green room" },
    ],
    production: [
      {
        title: "Stage & fly system",
        body: "28 line sets with double-purchase counterweight, 45-ft grid, orchestra pit that elevates for 24 musicians, modular apron extensions.",
      },
      {
        title: "Acoustics",
        body: "Variable acoustic curtains tuned for music, spoken word, and amplified concert. Meyer line arrays house-left and house-right, proscenium fills, balcony rail.",
      },
      {
        title: "Artist experience",
        body: "Four private dressing rooms + two chorus rooms, full scene shop on load-in level, dedicated freight elevator to stage, private stage door and VIP entry.",
      },
    ],
    past: [
      { year: "2025", title: "Hamilton · US Tour", note: "6-week residency" },
      { year: "2024", title: "Cirque du Soleil · DRAWN", note: "Season-long run" },
      { year: "2024", title: "The Lion King · Limited", note: "8-show engagement" },
      { year: "2023", title: "Tony Nominees Showcase", note: "Industry invitational" },
    ],
    bookCtaLabel: "Book the Playhouse",
  },

  expo: {
    slug: "expo",
    label: "The Expo",
    eyebrow: "Expo & Conventions",
    index: "03",
    inquiryType: "booking",
    inquiryCategory: "Trade Show / Expo",
    hero: {
      src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776266297/make_an_image_202604152047_nq20en.jpg",
      headline: "30,000 ft²",
      headlineAccent: "of possibility.",
      subhead:
        "Column-free exhibition floor, trade-show-grade infrastructure, and a built-in audience the size of a trade-show attendee list — every single day.",
    },
    intro:
      "The Expo is where industries convene. Built as a single column-free hall with power, data, and loading from either end, it's been the quiet engine behind some of the northeast's most high-production brand moments. If you've seen a booth, keynote, or car reveal from this zip code, it was probably here.",
    specs: [
      { value: "30,000 ft²", label: "Column-Free Floor", foot: "Single span, no pillars" },
      { value: "2", label: "Loading Dock Bays", foot: "Drive-in capable" },
      { value: "400 A", label: "Available Power", foot: "Distributed, 3-phase" },
      { value: "10,000", label: "Concurrent WiFi", foot: "6GHz tri-band mesh" },
    ],
    production: [
      {
        title: "Power, data, and rigging",
        body: "400-amp 3-phase distributed power, fiber drops at every 20-ft grid intersection, 40,000 lb ceiling rigging capacity, projection mapping from house positions.",
      },
      {
        title: "Logistics",
        body: "Two 12×14 loading dock bays with drive-in access, marshalling yard for 40 trucks, FIFO inventory run by on-site warehouse ops, freight elevators to every floor.",
      },
      {
        title: "Attendee experience",
        body: "Private registration pavilion, VIP lounges, coat-check and valet, branded signage program, seamless RFID wristband integration with on-property amenities.",
      },
    ],
    past: [
      { year: "2025", title: "NY Auto Show · NJ Preview", note: "All manufacturers" },
      { year: "2024", title: "Comic Con NJ", note: "45K attendees, 3 days" },
      { year: "2024", title: "Shopify Edition NY", note: "Keynote + 80-booth floor" },
      { year: "2023", title: "TechCrunch Disrupt East", note: "Regional showcase" },
    ],
    bookCtaLabel: "Book the Expo",
  },

  "private-events": {
    slug: "private-events",
    label: "The Pavilion",
    eyebrow: "Private Events",
    index: "04",
    inquiryType: "booking",
    inquiryCategory: "Private Event",
    hero: {
      src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776191274/make_it_again_202604142348_ruouug.jpg",
      headline: "Your guest list,",
      headlineAccent: "our playground.",
      subhead:
        "Bespoke entertaining with chef's kitchen, full bar program, private entry, and discreet valet — for the nights that end up in the press, and the ones that don't.",
    },
    intro:
      "The Pavilion is the part of American Dream the public doesn't see. A private-entry, chef-staffed entertaining space used for brand premieres, private dinners, and the quiet corporate offsites that happen while forty million other people are shopping elsewhere in the building. You can hear every word of conversation. You cannot hear the mall.",
    specs: [
      { value: "400", label: "Cocktail Capacity", foot: "Standing, flowing service" },
      { value: "200", label: "Seated Capacity", foot: "Rounds of 10, long tables" },
      { value: "8,400 ft²", label: "Private Floor", foot: "Plus 2,000 ft² outdoor" },
      { value: "Yes", label: "Chef's Kitchen", foot: "Full brigade, private chef on staff" },
    ],
    production: [
      {
        title: "The room",
        body: "Private street-level entry with valet, a chef's kitchen with private entrance for the brigade, a 60-ft outdoor terrace overlooking the atrium, and motorized blackout for daytime cinema.",
      },
      {
        title: "The menu",
        body: "Dedicated executive chef with four Michelin-listed kitchens on the CV. Custom menus per event, full wine program curated from our cellar, private mixologist for bar builds.",
      },
      {
        title: "The details",
        body: "Concierge coordination from contract to thank-you-note. Private security detail. NDA-bound service team for guest privacy. Seamless ingress from valet to room in under two minutes.",
      },
    ],
    past: [
      { year: "2025", title: "Dior × Vogue · Fall preview", note: "Invite-only, 180 guests" },
      { year: "2025", title: "Netflix · Series premiere", note: "Talent dinner + screening" },
      { year: "2024", title: "BlackRock Summit NY", note: "Two-day corporate offsite" },
      { year: "2024", title: "Rolex 75th Anniversary", note: "Global press moment" },
    ],
    bookCtaLabel: "Book the Pavilion",
  },
};

export const VENUE_ORDER: VenueSlug[] = [
  "arena",
  "performing-arts",
  "expo",
  "private-events",
];
