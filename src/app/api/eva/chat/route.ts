import { NextResponse } from "next/server";

export const runtime = "nodejs";

function extractText(payload: any) {
  const output = Array.isArray(payload?.output) ? payload.output : [];
  for (const item of output) {
    if (typeof item?.content === "string") return item.content;
    if (Array.isArray(item?.content)) {
      const text = item.content.map((part: any) => part?.text || part?.content || "").filter(Boolean).join("\n");
      if (text) return text;
    }
  }
  const messages = Array.isArray(payload?.messages) ? payload.messages : [];
  const assistant = [...messages].reverse().find((message: any) => message?.role === "assistant");
  return assistant?.content || "";
}

export async function POST(request: Request) {
  const apiKey = process.env.VAPI_PRIVATE_API_KEY;
  const assistantId = process.env.VAPI_ASSISTANT_ID || process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
  if (!apiKey || !assistantId) {
    return NextResponse.json(
      { error: "Chat da Eva ainda não foi configurado no servidor." },
      { status: 503 },
    );
  }

  let body: { input?: string; previousChatId?: string; tenantId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const input = body.input?.trim();
  if (!input || input.length > 4000) {
    return NextResponse.json({ error: "Mensagem vazia ou longa demais." }, { status: 400 });
  }

  const response = await fetch("https://api.vapi.ai/chat", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      assistantId,
      input,
      ...(body.previousChatId ? { previousChatId: body.previousChatId } : {}),
      assistantOverrides: {
        variableValues: {
          tenantId: body.tenantId || "drtasks-site",
          channel: "website-text-fallback",
        },
      },
    }),
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    return NextResponse.json(
      { error: data?.message || data?.error || "Falha ao consultar a Eva." },
      { status: response.status },
    );
  }

  return NextResponse.json({
    chatId: data?.id,
    response: extractText(data),
  });
}
