import { NextResponse } from "next/server";

/* ─────────────────────────────────────────────
   AI Sales Pitch Generator — POST /api/generate-pitch
   Uses Google Gemini 2.5 Flash to generate a personalized,
   editorial-quality sales pitch for a brand considering
   American Dream as a flagship destination.
───────────────────────────────────────────── */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type GenerateRequest = {
  brandName: string;
};

type PitchResult = {
  headline: string;
  audienceMatch: number;
  projectedRevenue: string;
  annualVisitors: string;
  pitch: string;
  recommendedZone: string;
  zoneNote: string;
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
  return { ok: true, data: { brandName: b.brandName as string } };
}

const SYSTEM_PROMPT = `You are a senior real estate strategist at American Dream — a 3 million sq ft luxury shopping and entertainment destination in the Meadowlands, NJ. Your job is to write personalized, editorial-quality sales pitches for brands considering a flagship at American Dream.

CONTEXT — American Dream:
- 60M annual visitors, 18M from the New York metro
- 450+ stores including Hermès, Saint Laurent, Tiffany, Gucci, Louis Vuitton
- 5 zones: Luxury Wing (north concourse), Modern Retail (east), Dining Hall, Entertainment (Big SNOW indoor mountain, water park, DreamWorks), Events (18,000-seat arena, Performing Arts Center)
- The most affluent and aspirational shopper base in the tri-state area
- Avg household income of luxury wing visitors: $185K+

OUTPUT FORMAT — Return ONLY valid JSON, nothing else, no markdown fences:
{
  "headline": "A 6-10 word editorial headline for this brand. Use poetic language. Example for Gucci: 'Where Italian heritage meets American ambition.'",
  "audienceMatch": <integer between 82 and 98 — calibrate to brand fit>,
  "projectedRevenue": "$X.XM" (annual revenue projection in millions, realistic for category),
  "annualVisitors": "XM" or "XXXK" (the foot traffic this brand's audience represents at American Dream),
  "pitch": "A single paragraph, 60-80 words, written in the voice of a luxury brand strategist. No fluff. Concrete. Speak directly to the brand's growth opportunity. Reference real American Dream features. Use 1-2 specific brand references for context.",
  "recommendedZone": "Specific zone — e.g. 'Luxury Wing — North Concourse' or 'Modern Retail — East Atrium'",
  "zoneNote": "One short sentence explaining the placement — e.g. 'Adjacent to Saint Laurent. 2,400 sq ft, prime sightline from main entrance.'"
}

Tone: confident, refined, expensive. Like Vogue Business or Robb Report editorial. No clichés. No emoji. No exclamation marks.`;

async function callGemini(brandName: string): Promise<PitchResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not configured");

  const userPrompt = `Brand: ${brandName.trim()}\n\nWrite the personalized pitch as JSON.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
        generationConfig: {
          temperature: 0.85,
          maxOutputTokens: 2048,
          responseMimeType: "application/json",
        },
      }),
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Gemini API error: ${response.status} — ${text}`);
  }

  const data = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty response from Gemini");

  // Strip any code fences just in case
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "");

  const parsed = JSON.parse(cleaned) as PitchResult;
  return parsed;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed JSON." },
      { status: 400 },
    );
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 400 },
    );
  }

  try {
    const pitch = await callGemini(result.data.brandName);
    console.log(`[pitch] Generated for ${result.data.brandName}`);
    return NextResponse.json({ ok: true, pitch });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[pitch] Error:", msg);
    return NextResponse.json(
      { ok: false, error: "Failed to generate pitch" },
      { status: 502 },
    );
  }
}

export function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed. Use POST." },
    { status: 405 },
  );
}
