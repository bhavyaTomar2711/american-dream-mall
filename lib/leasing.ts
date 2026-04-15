import type { InquiryType } from "@/components/InquiryModal";

/* ─────────────────────────────────────────────
   LEASING CATEGORY DATA
   One source of truth for all /leasing pages.
   Add a new category = add one entry here.
───────────────────────────────────────────── */

export type LeasingSlug = "luxury" | "retail" | "dining" | "popup";

export type LeasingSpace = {
  name: string;
  sqft: string;
  floor: string;
  availability: string;
  status: "Available Now" | "Coming Soon" | "Last Remaining" | "Reserved";
  adjacency: string;
};

export type LeasingCategory = {
  slug: LeasingSlug;
  label: string;
  eyebrow: string;
  index: string; // "01", "02" — editorial ornament
  inquiryCategory: string; // value passed into InquiryModal category select
  inquiryType: InquiryType; // which modal tab to open
  accent: string; // hex gold/color for subtle category tinting
  hero: {
    src: string;
    headline: string;
    headlineAccent?: string;
    subhead: string;
  };
  intro: string;
  pitch: Array<{
    title: string;
    body: string;
  }>;
  numbers: Array<{
    value: string;
    label: string;
    foot?: string;
  }>;
  tenants: Array<{
    name: string;
    tag?: string;
    /** Optional logo URL (SVG or PNG, Cloudinary or external).
     *  Cloudinary logos automatically get white backgrounds stripped. */
    logo?: string;
    /** When true, force the logo to monochrome white via CSS filter.
     *  Use for brands whose native identity is black/dark and would
     *  disappear on the dark card (LV, Saint Laurent, Balenciaga, etc).
     *  Default: false — preserves native brand colors. */
    invertLogo?: boolean;
  }>;
  spaces: LeasingSpace[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
};

/* ─────────────────────────────────────────────
   Category definitions
───────────────────────────────────────────── */

export const LEASING: Record<LeasingSlug, LeasingCategory> = {
  luxury: {
    slug: "luxury",
    label: "Luxury Flagships",
    eyebrow: "Luxury",
    index: "01",
    inquiryCategory: "Luxury Flagship",
    inquiryType: "leasing",
    accent: "#C9A96E",
    hero: {
      src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776272292/Luxury_hero___202604152227_vta9sw.jpg",
      headline: "The vault of the",
      headlineAccent: "eastern seaboard.",
      subhead:
        "Private suites, flagship footprints, and a concentration of high-net-worth traffic unmatched outside Manhattan.",
    },
    intro:
      "The Luxury Wing is designed as a destination within the destination — concierge-managed entries, curated adjacencies, and dwell patterns that resemble a five-star hotel more than a shopping center. Brands that open here do not compete with the internet. They host it.",
    pitch: [
      {
        title: "Flagship-scale footprints",
        body: "Spaces range from 3,400 to 12,000 sqft with dual-entry options, private appointment suites, and mezzanine builds. Engineered from the slab up for maison-grade finishes.",
      },
      {
        title: "The densest luxury catchment outside Manhattan",
        body: "34% of our annual audience sits in households above $250K. Weekday afternoons skew HNW; weekend mornings capture the destination crowd. You're not choosing one — you're getting both.",
      },
      {
        title: "Adjacencies that compound",
        body: "Every luxury tenant lifts its neighbors. Our leasing team curates the wing like a collection — so a customer who came for a watch leaves having met three brands they didn't know they needed.",
      },
    ],
    numbers: [
      { value: "$248K", label: "Avg. HH Income", foot: "Luxury Wing catchment" },
      { value: "4.2 hr", label: "Avg. Dwell Time", foot: "2.8× mall average" },
      { value: "68%", label: "Repeat Visits", foot: "Within 90 days" },
      { value: "$1,840", label: "Avg. Transaction", foot: "Luxury tenants, Q4" },
    ],
    tenants: [
      {
        name: "Hermès",
        tag: "Flagship",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776273940/hermes-1_uapbyl.svg",
      },
      {
        name: "Louis Vuitton",
        tag: "Flagship",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776273940/louis-vuitton-1_iauflg.svg",
        invertLogo: true,
      },
      {
        name: "Cartier",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776274608/cartier-2_kdvbmi.svg",
      },
      {
        name: "Tiffany & Co.",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776274608/tiffany-co_bejnoa.svg",
      },
      {
        name: "Burberry",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776274607/burberry-1_fhz0oh.svg",
        invertLogo: true,
      },
      {
        name: "Gucci",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776274607/gucci_get9av.svg",
        invertLogo: true,
      },
      {
        name: "Saint Laurent",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776274925/id4Ca2Eofs_1776274911875_iglkgh.svg",
        invertLogo: true,
      },
      {
        name: "Balenciaga",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776274607/balenciaga-logo_loebmi.svg",
        invertLogo: true,
      },
    ],
    spaces: [
      {
        name: "The Atelier",
        sqft: "8,400 sqft",
        floor: "Level 2, Luxury Wing",
        availability: "Ready Q3",
        status: "Available Now",
        adjacency: "Adjacent to Hermès, Cartier",
      },
      {
        name: "Private Salon 01",
        sqft: "3,200 sqft",
        floor: "Level 3, North Corridor",
        availability: "Move-in Q2",
        status: "Last Remaining",
        adjacency: "Facing concierge lounge",
      },
      {
        name: "East Pavilion",
        sqft: "12,000 sqft",
        floor: "Ground, dual-entrance",
        availability: "Ready Q4",
        status: "Available Now",
        adjacency: "Valet arrival, atrium frontage",
      },
      {
        name: "Corner Flagship",
        sqft: "6,800 sqft",
        floor: "Level 1, South",
        availability: "Build-out Q2",
        status: "Coming Soon",
        adjacency: "Three-sided glass, fountain view",
      },
    ],
    testimonial: {
      quote:
        "The dwell time inside American Dream is unlike any of our NYC flagships. Customers come, stay, come back. It's become a living room for the brand.",
      author: "VP, Retail Experience",
      role: "European luxury house",
    },
  },

  retail: {
    slug: "retail",
    label: "Retail & Flagships",
    eyebrow: "Retail",
    index: "02",
    inquiryCategory: "Retail",
    inquiryType: "leasing",
    accent: "#E8A87C",
    hero: {
      src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776272372/Retail_hero___202604152229_khq7rm.jpg",
      headline: "40 million reasons",
      headlineAccent: "to plant your flag.",
      subhead:
        "The foot traffic of a top-ten US airport. The dwell behavior of a destination resort. Your flagship, properly sized.",
    },
    intro:
      "Retail here is not a box with a door. It is a media channel with a checkout — built for brands that want a physical statement with digital-scale measurement. Every square foot is engineered to convert traffic into story.",
    pitch: [
      {
        title: "Flagship formats, mid-tier accessibility",
        body: "Footprints from 1,800 to 15,000 sqft across five connected retail districts. Every tenant gets a facade, not an alley — and adjacencies are planned, not random.",
      },
      {
        title: "Foot traffic that compounds",
        body: "40 million annual visitors is the headline. The inside number: 62% of visitors browse three or more non-planned stores per visit. Passive traffic becomes revenue.",
      },
      {
        title: "Operational infrastructure, included",
        body: "Staff transit, waste, storage, delivery bays, integrated WMS for on-site inventory — all run by the property. You ship your brand. We run the building.",
      },
    ],
    numbers: [
      { value: "40M+", label: "Annual Visitors", foot: "Trending +8% YoY" },
      { value: "85%", label: "Lease Renewal Rate", foot: "Industry avg: 62%" },
      { value: "$164", label: "Avg. Transaction", foot: "Across retail districts" },
      { value: "62%", label: "Cross-store Visits", foot: "Per shopper, per visit" },
    ],
    tenants: [
      {
        name: "H&M",
        tag: "Flagship",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776275159/h-m_yolrnx.svg",
      },
      {
        name: "Uniqlo",
        tag: "Flagship",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776275158/uniqlo_zyseqi.svg",
      },
      {
        name: "Hugo Boss",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776275157/hugo-boss_gxiupy.svg",
      },
      {
        name: "Armani Exchange",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776275157/armani-exchange_ps9vo2.svg",
      },
      {
        name: "Bath & Body Works",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776275156/bath-body-works-logo_rkurvu.svg",
      },
      {
        name: "Sephora",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776275156/sephora-logo_eo55uw.svg",
      },
      {
        name: "Lululemon",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776275156/lululemon-1_feefk7.svg",
      },
      {
        name: "Nike",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776275432/nike-4-2_adzsmb.svg",
      },
    ],
    spaces: [
      {
        name: "Atrium Flagship",
        sqft: "12,000 sqft",
        floor: "Level 1, Main Atrium",
        availability: "Ready Q2",
        status: "Available Now",
        adjacency: "Atrium frontage, central fountain",
      },
      {
        name: "The Crossroads",
        sqft: "4,600 sqft",
        floor: "Level 2, East × North",
        availability: "Move-in Q3",
        status: "Available Now",
        adjacency: "Corner, two main corridors",
      },
      {
        name: "Courtside Box",
        sqft: "2,200 sqft",
        floor: "Level 1, Entertainment",
        availability: "Immediate",
        status: "Last Remaining",
        adjacency: "Adjacent to main arena lobby",
      },
      {
        name: "The Promenade",
        sqft: "6,400 sqft",
        floor: "Level 2, Luxury gateway",
        availability: "Build-out Q3",
        status: "Coming Soon",
        adjacency: "Transition to Luxury Wing",
      },
    ],
    testimonial: {
      quote:
        "We projected 300 units a day. We clear 500 on weekends and doubled our online traffic in NJ. This isn't a mall — it's a media channel with a checkout.",
      author: "Chief Commercial Officer",
      role: "DTC apparel brand",
    },
  },

  dining: {
    slug: "dining",
    label: "Dining & F&B",
    eyebrow: "Dining",
    index: "03",
    inquiryCategory: "Dining & F&B",
    inquiryType: "leasing",
    accent: "#D4A574",
    hero: {
      src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776272438/Dining_hero___202604152230_vfzy0n.jpg",
      headline: "Where appetite",
      headlineAccent: "becomes occasion.",
      subhead:
        "Not a food court. A dining floor engineered for 180-cover services, chef-driven menus, and the audience to fill every seat on a Tuesday.",
    },
    intro:
      "American Dream's F&B program is intentionally small and intentionally deep. Fewer concepts, better concepts — each sized for the dwell profile of a destination, not a commuter stop. We build kitchens to chef-authored specs and back them with an audience that stays for dinner, not a snack.",
    pitch: [
      {
        title: "Dwell time is the business model",
        body: "Average visitor dwell is 4.2 hours. That's breakfast, shopping, lunch, entertainment, dinner. You're not competing for a 45-minute mall lunch — you're sitting inside an all-day eating occasion.",
      },
      {
        title: "Kitchens built to chef spec",
        body: "Ventilation, plumbing, walk-ins, and exhaust capacity engineered to support chef-driven menus. We'll build to spec, or you move in turnkey. Vented kitchens available on every floor.",
      },
      {
        title: "Entertainment adjacency lifts every cover",
        body: "Concerts, shows, family attractions — the traffic that comes for the event stays for the meal. Tenants in entertainment-adjacent spaces see 2.3× weekend ticket averages.",
      },
    ],
    numbers: [
      { value: "4.2 hr", label: "Avg. Visitor Dwell", foot: "All-day eating window" },
      { value: "$84", label: "Avg. F&B Ticket", foot: "Full-service restaurants" },
      { value: "2.3×", label: "Weekend Lift", foot: "Entertainment adjacency" },
      { value: "180", label: "Avg. Peak Covers", foot: "Per service, full-service" },
    ],
    tenants: [
      {
        name: "Nobu",
        tag: "Flagship",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776276458/nobu-restaurants_gqgwsp.svg",
      },
      {
        name: "Eataly",
        tag: "Flagship",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776276458/Eataly_-_logo__Italy__2004_l754h2.svg",
      },
      {
        name: "Din Tai Fung",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776276458/idAO4KqfjM_1776276250734_efgyli.png",
      },
      {
        name: "Shake Shack",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776276456/Shake_Shack_logo_mprpjy.svg",
      },
      {
        name: "Sweetgreen",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776276459/Sweetgreen_idKMAPW1_Z_0_goof86.svg",
      },
      {
        name: "Salt & Straw",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776276569/Saltandstraw_idgl_hcGwV_1_eqn3v9.svg",
      },
      {
        name: "Blue Bottle Coffee",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776276455/blue-bottle-coffee-logo_plltgz.svg",
      },
      {
        name: "Pret A Manger",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776276455/pretamanger-logo_clgqbm.svg",
      },
    ],
    spaces: [
      {
        name: "The Rooftop",
        sqft: "6,200 sqft",
        floor: "Level 3, Skyline",
        availability: "Build-out Q3",
        status: "Available Now",
        adjacency: "Private deck, skyline view, full bar",
      },
      {
        name: "Chef's Counter",
        sqft: "1,800 sqft",
        floor: "Level 2, Dining Row",
        availability: "Immediate",
        status: "Last Remaining",
        adjacency: "24-seat chef's counter configuration",
      },
      {
        name: "The Grand Room",
        sqft: "4,400 sqft",
        floor: "Level 1, Atrium",
        availability: "Ready Q2",
        status: "Available Now",
        adjacency: "Atrium facing, private dining room",
      },
      {
        name: "Grab & Go Corner",
        sqft: "900 sqft",
        floor: "Level 2, Transit Hub",
        availability: "Immediate",
        status: "Available Now",
        adjacency: "Facing main escalator bank",
      },
    ],
    testimonial: {
      quote:
        "Sunday dinner service hits 180 covers. I've been in the game twenty years and I've never seen a retail property deliver restaurant numbers. It's a real dining room that happens to sit inside a destination.",
      author: "Chef / Owner",
      role: "Michelin-listed restaurant group",
    },
  },

  popup: {
    slug: "popup",
    label: "Pop-up & Activations",
    eyebrow: "Pop-up",
    index: "04",
    inquiryCategory: "Pop-up / Short-term",
    inquiryType: "leasing",
    accent: "#B59578",
    hero: {
      src: "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1776272490/Pop-up_hero___202604152231_myp3cb.jpg",
      headline: "Launch here.",
      headlineAccent: "Launch everywhere.",
      subhead:
        "Turnkey experiential spaces with a built-in audience of forty million — and the content machine to turn a 30-day activation into a year of press.",
    },
    intro:
      "Pop-ups at American Dream aren't a square in a corridor. They're curated moments inside the largest daily audience in the retail east coast — engineered for social velocity. Plug in, turn it on, walk away with a case study. We run the infrastructure. You run the brand.",
    pitch: [
      {
        title: "Spaces sized for the content, not the floor plan",
        body: "From 400 sqft kiosks to full 8,000 sqft atrium takeovers — every pop-up space is lit, powered, branded-ready, and shaped like a camera angle. Every corner is a backdrop.",
      },
      {
        title: "Audience delivered on day one",
        body: "200+ brand activations per year and a property that plans against them. Your activation shows up inside our app, our signage, our social — the audience knows to come before doors open.",
      },
      {
        title: "Fast in, fast out",
        body: "30-day, 90-day, and seasonal windows. Plug-and-play power, digital signage, staffing templates, and a build team that ships in 72 hours. Market-to-market in a week.",
      },
    ],
    numbers: [
      { value: "200+", label: "Activations / Year", foot: "Across 14 activation zones" },
      { value: "84M", label: "Social Impressions", foot: "Avg. per 30-day run" },
      { value: "72 hr", label: "Build-in Speed", foot: "From contract to doors-open" },
      { value: "68%", label: "Brand Repeat Rate", foot: "Book a second within 12 months" },
    ],
    tenants: [
      {
        name: "Glossier",
        tag: "Past",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776275750/glossier-1_w6ee4i.svg",
      },
      {
        name: "Netflix",
        tag: "Past",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776275749/netflix-3_gmeplb.svg",
      },
      {
        name: "Prime Video",
        tag: "Past",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776275748/amazon-prime-video-1_dyifok.svg",
      },
      {
        name: "Dior Beauty",
        tag: "Past",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776275747/dior_mjuay2.svg",
      },
      {
        name: "Savage × Fenty",
        tag: "Past",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776275746/fenty-beauty_g3ia3f.svg",
      },
      {
        name: "Warner Bros",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776275745/warner-bros_cqgme3.svg",
      },
      {
        name: "Uniqlo U",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776275744/uniqlo_1_tpl5ox.svg",
      },
      {
        name: "Refinery29",
        logo: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776275966/refinery29-seeklogo_fpp9n1.svg",
      },
    ],
    spaces: [
      {
        name: "The Atrium Stage",
        sqft: "8,000 sqft",
        floor: "Level 1, Central Atrium",
        availability: "Rolling windows",
        status: "Available Now",
        adjacency: "3-story ceiling, projection-ready",
      },
      {
        name: "The Cube",
        sqft: "1,200 sqft",
        floor: "Level 2, Luxury gateway",
        availability: "Q2 windows open",
        status: "Last Remaining",
        adjacency: "4-sided glass, LED ceiling",
      },
      {
        name: "Window Flagship",
        sqft: "2,400 sqft",
        floor: "Level 1, Main Corridor",
        availability: "30–90 day windows",
        status: "Available Now",
        adjacency: "50ft storefront, motion-tracked glass",
      },
      {
        name: "The Kiosk Row",
        sqft: "400–800 sqft",
        floor: "Level 1, Transit Hub",
        availability: "Weekly windows",
        status: "Available Now",
        adjacency: "High-traffic chokepoint",
      },
    ],
    testimonial: {
      quote:
        "We activated for 30 days and walked out with 84 million impressions and a six-figure CRM pickup. The space is a content set that happens to sell things. We've already rebooked for fall.",
      author: "Head of Brand",
      role: "Global beauty brand",
    },
  },
};

export const LEASING_ORDER: LeasingSlug[] = ["luxury", "retail", "dining", "popup"];
