import { NextRequest, NextResponse } from "next/server";

const BREVO_LIST_ID = 5;
const BREVO_BASE = "https://api.brevo.com/v3";

// Ensures a custom text attribute exists in Brevo (safe to call on every request —
// Brevo returns 400 if it already exists, which we simply ignore).
async function ensureAttribute(apiKey: string, name: string) {
  await fetch(`${BREVO_BASE}/contacts/attributes/normal/${name}`, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({ type: "text" }),
  });
  // Intentionally ignore the response — 400 = already exists, which is fine.
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });
  }

  let body: { name?: string; email?: string; phone?: string; service?: string; note?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, service, note } = body;

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  // Create custom attributes if they don't already exist (idempotent).
  await Promise.all([
    ensureAttribute(apiKey, "SERVICE"),
    ensureAttribute(apiKey, "NOTE"),
  ]);

  const payload = {
    email,
    attributes: {
      FIRSTNAME: name,
      SMS: phone ?? "",
      SERVICE: service ?? "",
      NOTE: note ?? "",
    },
    listIds: [BREVO_LIST_ID],
    updateEnabled: true,
  };

  try {
    const res = await fetch(`${BREVO_BASE}/contacts`, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("[Brevo] contact creation failed:", err);
      return NextResponse.json(
        { error: "Could not save contact. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Brevo] network error:", err);
    return NextResponse.json(
      { error: "Network error. Please try again." },
      { status: 502 }
    );
  }
}
