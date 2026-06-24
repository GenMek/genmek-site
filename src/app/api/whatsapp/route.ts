import { NextResponse, type NextRequest } from "next/server";
import { Redis } from "@upstash/redis";
import { WHATSAPP_NUMBERS, WHATSAPP_MESSAGE, whatsappUrl } from "@/lib/site";

// Always run at request time — the counter must increment on every click.
export const dynamic = "force-dynamic";

const COUNTER_KEY = "genmek:lead_rr_counter";

// Vercel's Upstash (ex-"Vercel KV") integration injects KV_* vars; a plain
// Upstash integration injects UPSTASH_*. Support both so it "just works".
const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = url && token ? new Redis({ url, token }) : null;

// Best-effort fallback for local dev when Redis isn't configured. Single
// instance only — NOT exact under serverless scale, hence the warning below.
let memoryCounter = 0;

/**
 * Returns the 0-based index of the number this lead should be routed to.
 * `INCR` is atomic in Redis, so concurrent clicks never collide: each gets a
 * unique, monotonically increasing number. Lead 1 → index 0 (A),
 * Lead 2 → index 1 (B), Lead 3 → index 0 (A), …
 */
async function nextNumberIndex(): Promise<number> {
  if (redis) {
    const n = await redis.incr(COUNTER_KEY);
    return (n - 1) % WHATSAPP_NUMBERS.length;
  }
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "[whatsapp] Redis não configurado — usando contador em memória (não persistente). " +
        "Defina KV_REST_API_URL/KV_REST_API_TOKEN para produção.",
    );
  }
  memoryCounter += 1;
  return (memoryCounter - 1) % WHATSAPP_NUMBERS.length;
}

export async function GET(request: NextRequest) {
  const message =
    request.nextUrl.searchParams.get("m")?.trim() || WHATSAPP_MESSAGE;

  const index = await nextNumberIndex();
  const number = WHATSAPP_NUMBERS[index];

  return NextResponse.redirect(whatsappUrl(number, message), { status: 302 });
}
