import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const endpoint = process.env.EVA_LEAD_ENDPOINT;
  const token = process.env.EVA_BACKEND_TOKEN;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  if (!endpoint) {
    // UX can be validated before the CRM endpoint is available without pretending the lead was persisted.
    return NextResponse.json({ accepted: false, configured: false }, { status: 503 });
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text().catch(() => "");
    return NextResponse.json({ error: message || "Falha ao registrar lead." }, { status: 502 });
  }

  return NextResponse.json({ accepted: true });
}
