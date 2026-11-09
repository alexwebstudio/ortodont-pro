import { NextResponse } from "next/server";
import { site } from "@/content/site";
import { leadSchema } from "@/lib/validation";

const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  for (const [key, entry] of hits) {
    if (entry.reset < now) hits.delete(key);
  }
  const entry = hits.get(ip);
  if (!entry) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Заполненная ловушка: отвечаем успехом, чтобы бот не перебирал варианты.
  if ("website" in body && body.website) {
    return NextResponse.json({ ok: true });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("[lead] Заявка не отправлена: TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID не заданы");
    return NextResponse.json({ ok: true, delivered: false });
  }

  const { name, phone, service, time } = parsed.data;
  const text = [`Новая заявка, ${site.brand}`, `Имя: ${name}`, `Телефон: ${phone}`, `Услуга: ${service}`, `Время: ${time || "не указано"}`].join("\n");

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Telegram: ${response.status}`);
  } catch (error) {
    console.error("[lead]", error instanceof Error ? error.message : "Ошибка отправки");
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
