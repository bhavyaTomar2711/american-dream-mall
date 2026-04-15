import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { VENUES, VENUE_ORDER, type VenueSlug } from "@/lib/venues";
import VenueHero from "@/components/venues/VenueHero";
import VenueIntro from "@/components/venues/VenueIntro";
import VenueSpecs from "@/components/venues/VenueSpecs";
import VenueProduction from "@/components/venues/VenueProduction";
import VenuePast from "@/components/venues/VenuePast";
import VenueCTA from "@/components/venues/VenueCTA";

/* ─────────────────────────────────────────────
   Prerender the 4 known venue paths at build
───────────────────────────────────────────── */
export async function generateStaticParams() {
  return VENUE_ORDER.map((slug) => ({ venue: slug }));
}

// Only the 4 slugs in VENUE_ORDER are valid — 404 anything else
export const dynamicParams = false;

function isValidSlug(s: string): s is VenueSlug {
  return (VENUE_ORDER as readonly string[]).includes(s);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ venue: string }>;
}): Promise<Metadata> {
  const { venue } = await params;
  if (!isValidSlug(venue)) return {};
  const v = VENUES[venue];
  const title = `${v.label} — Venues at American Dream`;
  return {
    title,
    description: v.hero.subhead,
    openGraph: {
      title,
      description: v.hero.subhead,
      url: `/venues/${v.slug}`,
      images: [
        {
          url: v.hero.src,
          width: 1600,
          height: 900,
          alt: v.label,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: v.hero.subhead,
      images: [v.hero.src],
    },
  };
}

export default async function VenuePage({
  params,
}: {
  params: Promise<{ venue: string }>;
}) {
  const { venue } = await params;
  if (!isValidSlug(venue)) notFound();

  const v = VENUES[venue];

  return (
    <>
      <VenueHero venue={v} />
      <VenueIntro venue={v} />
      <VenueSpecs venue={v} />
      <VenueProduction venue={v} />
      <VenuePast venue={v} />
      <VenueCTA venue={v} />
    </>
  );
}
