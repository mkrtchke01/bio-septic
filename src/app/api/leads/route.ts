import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  // TODO: подключить CRM, Telegram Bot API или почтовый сервис.
  // Не логируйте персональные данные в production.
  return NextResponse.json({ ok: true, received: Boolean(body?.phone) });
}
