import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  LEASING,
  LEASING_ORDER,
  type LeasingSlug,
} from "@/lib/leasing";
import CategoryHero from "@/components/leasing/CategoryHero";
import CategoryIntro from "@/components/leasing/CategoryIntro";
import CategoryPitch from "@/components/leasing/CategoryPitch";
import CategoryNumbers from "@/components/leasing/CategoryNumbers";
import CategoryTenants from "@/components/leasing/CategoryTenants";
import CategorySpaces from "@/components/leasing/CategorySpaces";
import CategoryTestimonial from "@/components/leasing/CategoryTestimonial";
import CategoryCTA from "@/components/leasing/CategoryCTA";

/* ─────────────────────────────────────────────
   Prerender the 4 known category paths at build
───────────────────────────────────────────── */
export async function generateStaticParams() {
  return LEASING_ORDER.map((slug) => ({ category: slug }));
}

// Only the 4 slugs in LEASING_ORDER are valid — 404 anything else
export const dynamicParams = false;

function isValidSlug(s: string): s is LeasingSlug {
  return (LEASING_ORDER as readonly string[]).includes(s);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!isValidSlug(category)) return {};
  const cat = LEASING[category];
  const title = `${cat.label} — Leasing at American Dream`;
  return {
    title,
    description: cat.hero.subhead,
    openGraph: {
      title,
      description: cat.hero.subhead,
      url: `/leasing/${cat.slug}`,
      images: [
        {
          url: cat.hero.src,
          width: 1600,
          height: 900,
          alt: cat.label,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: cat.hero.subhead,
      images: [cat.hero.src],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isValidSlug(category)) notFound();

  const cat = LEASING[category];

  return (
    <>
      <CategoryHero cat={cat} />
      <CategoryIntro cat={cat} />
      <CategoryPitch cat={cat} />
      <CategoryNumbers cat={cat} />
      <CategoryTenants cat={cat} />
      <CategorySpaces cat={cat} />
      <CategoryTestimonial cat={cat} />
      <CategoryCTA cat={cat} />
    </>
  );
}
