import { NextResponse } from "next/server";

/* ─────────────────────────────────────────────
   Inquiry API — POST /api/inquiry
   Accepts leasing, sponsorship, booking, and
   press inquiries from the InquiryModal.
───────────────────────────────────────────── */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const INQUIRY_TYPES = ["leasing", "sponsorship", "booking", "press"] as const;
type InquiryType = (typeof INQUIRY_TYPES)[number];

type InquiryPayload = {
  type: InquiryType;
  name: string;
  email: string;
  company: string;
  role?: string;
  category?: string;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isString(v: unknown, max = 2000): v is string {
  return typeof v === "string" && v.trim().length > 0 && v.length <= max;
}

function validate(body: unknown):
  | { ok: true; data: InquiryPayload }
  | { ok: false; error: string; field?: keyof InquiryPayload } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }
  const b = body as Record<string, unknown>;

  if (typeof b.type !== "string" || !INQUIRY_TYPES.includes(b.type as InquiryType)) {
    return { ok: false, error: "Please choose an inquiry type.", field: "type" };
  }
  if (!isString(b.name, 120)) {
    return { ok: false, error: "Please enter your full name.", field: "name" };
  }
  if (!isString(b.email, 200) || !EMAIL_RE.test(b.email.trim())) {
    return { ok: false, error: "Please enter a valid email address.", field: "email" };
  }
  if (!isString(b.company, 160)) {
    return { ok: false, error: "Please enter your company or organization.", field: "company" };
  }
  if (!isString(b.message, 4000)) {
    return { ok: false, error: "Please include a short message.", field: "message" };
  }

  const data: InquiryPayload = {
    type: b.type as InquiryType,
    name: (b.name as string).trim(),
    email: (b.email as string).trim(),
    company: (b.company as string).trim(),
    role: isString(b.role, 160) ? (b.role as string).trim() : undefined,
    category: isString(b.category, 160) ? (b.category as string).trim() : undefined,
    message: (b.message as string).trim(),
  };

  return { ok: true, data };
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
    return NextResponse.json(
      { ok: false, error: result.error, field: result.field },
      { status: 400 },
    );
  }

  // Stub: log to server console. Swap with Resend / SMTP / CRM later.
  // eslint-disable-next-line no-console
  console.log("[inquiry]", {
    at: new Date().toISOString(),
    ...result.data,
  });

  // Small artificial delay makes the modal's loading state feel real
  // in dev without hurting prod — remove if undesired.
  await new Promise((r) => setTimeout(r, 400));

  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed. Use POST." },
    { status: 405 },
  );
}
