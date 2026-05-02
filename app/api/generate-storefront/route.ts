import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STOREFRONTS = {
  "luxury-gold":
    "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1777473262/Luxury_Gold_hexdme.jpg",
  "minimal-white":
    "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1777473262/Minimal_White_d0dl9e.jpg",
  "classic-black":
    "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1777473262/Classic_Black_igr6vn.jpg",
  "warm-bronze":
    "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1777473262/Warm_Bronze_aftixq.jpg",
  "modern-retail":
    "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto/v1777473261/Modern_Retail_mymgrm.jpg",
};

type GenerateRequest = {
  brandName: string;
};

function validate(body: unknown):
  | { ok: true; data: GenerateRequest }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }
  const b = body as Record<string, unknown>;

  if (typeof b.brandName !== "string" || b.brandName.trim().length === 0) {
    return { ok: false, error: "Invalid brand name." };
  }

  return {
    ok: true,
    data: {
      brandName: b.brandName as string,
    },
  };
}

function getTemplateForBrand(brandName: string): string {
  const lower = brandName.toLowerCase();

  // Sportswear & athletic brands → Modern Retail
  if (
    lower.includes("nike") ||
    lower.includes("adidas") ||
    lower.includes("puma") ||
    lower.includes("polo") ||
    lower.includes("under armour") ||
    lower.includes("reebok")
  ) {
    return STOREFRONTS["modern-retail"];
  }

  // Tech & electronics → Minimal White
  if (
    lower.includes("apple") ||
    lower.includes("samsung") ||
    lower.includes("sony") ||
    lower.includes("microsoft") ||
    lower.includes("google")
  ) {
    return STOREFRONTS["minimal-white"];
  }

  // Watches & jewelry → Luxury Gold
  if (
    lower.includes("rolex") ||
    lower.includes("cartier") ||
    lower.includes("tiffany") ||
    lower.includes("patek philippe") ||
    lower.includes("omega")
  ) {
    return STOREFRONTS["luxury-gold"];
  }

  // Luxury fashion & high-end brands → Warm Bronze
  if (
    lower.includes("gucci") ||
    lower.includes("prada") ||
    lower.includes("versace") ||
    lower.includes("chanel") ||
    lower.includes("dior") ||
    lower.includes("louis vuitton") ||
    lower.includes("hermès")
  ) {
    return STOREFRONTS["warm-bronze"];
  }

  // Default to Classic Black for unknown brands
  return STOREFRONTS["classic-black"];
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed JSON." }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  const { brandName } = result.data;

  try {
    const imageUrl = getTemplateForBrand(brandName);
    console.log(`[storefront] Selected template for ${brandName}: ${imageUrl}`);
    return NextResponse.json({ ok: true, imageUrl });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[storefront] Error:", msg);

    return NextResponse.json(
      { ok: false, error: "Failed to select storefront" },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed. Use POST." },
    { status: 405 },
  );
}
