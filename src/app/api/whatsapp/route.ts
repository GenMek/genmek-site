import { NextResponse, type NextRequest } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { WHATSAPP_NUMBERS, WHATSAPP_MESSAGE, whatsappUrl } from "@/lib/site";

// Always run at request time — the counter must increment on every click.
export const dynamic = "force-dynamic";

const COUNTER_KEY = "genmek:lead_rr_counter";

// Cap the prefilled message length so a crafted URL can't bloat the redirect.
const MAX_MESSAGE_LEN = 600;

// Vercel's Upstash (ex-"Vercel KV") integration injects KV_* vars; a plain
// Upstash integration injects UPSTASH_*. Support both so it "just works".
const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = url && token ? new Redis({ url, token }) : null;

// Abuse guard: when Redis is available, throttle per-IP so the endpoint can't
// be hammered to burn Upstash quota or skew the round-robin counter.
// 20 requests / 10s per IP is generous for real users, harsh for scripts.
const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, "10 s"),
      prefix: "genmek:whatsapp_rl",
      analytics: false,
    })
  : null;

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

/** Best-effort client IP from the proxy chain (Vercel sets x-forwarded-for). */
function clientIp(request: NextRequest): string {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "anonymous";
}

export async function GET(request: NextRequest) {
  if (ratelimit) {
    const { success } = await ratelimit.limit(clientIp(request));
    if (!success) {
      return new NextResponse("Too many requests", { status: 429 });
    }
  }

  const raw = request.nextUrl.searchParams.get("m")?.trim();
  const message =
    raw && raw.length > 0 ? raw.slice(0, MAX_MESSAGE_LEN) : WHATSAPP_MESSAGE;

  const index = await nextNumberIndex();
  const number = WHATSAPP_NUMBERS[index];

  return NextResponse.redirect(whatsappUrl(number, message), { status: 302 });
}
