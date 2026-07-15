import { NextResponse } from "next/server";
import sitemap from "@/app/sitemap";
import { siteUrl } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * IndexNow submitter. Pings the IndexNow endpoint (Bing, Yandex, Seznam,
 * Naver — Google does NOT participate) with every URL in our sitemap, so
 * new/changed pages get crawled without waiting on organic discovery.
 *
 * Triggered daily by the Vercel cron in vercel.json, and callable by hand
 * (open /api/indexnow) any time a page ships.
 *
 * The key is public by design — IndexNow verifies ownership by fetching the
 * matching file at keyLocation. To rotate: change KEY here AND rename
 * public/<KEY>.txt to match.
 */
const KEY = "a3f7c1e94b2d4856bc0e9f2a7d5163b8";
const ENDPOINT = "https://api.indexnow.org/indexnow";

export async function GET(req: Request) {
  // When CRON_SECRET is set, require it (Vercel cron sends it as a Bearer
  // header automatically); also accept ?token= for manual triggering.
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    const token = new URL(req.url).searchParams.get("token");
    if (auth !== `Bearer ${secret}` && token !== secret) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
  }

  const host = new URL(siteUrl).host;
  const urlList = sitemap().map((e) => String(e.url));
  const keyLocation = `${siteUrl}/${KEY}.txt`;

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host, key: KEY, keyLocation, urlList }),
    });
    // IndexNow returns 200/202 on success; the body is usually empty.
    return NextResponse.json({
      submitted: urlList.length,
      indexNowStatus: res.status,
      ok: res.ok,
    });
  } catch (err) {
    console.error("[indexnow] Submission failed:", err);
    return NextResponse.json({ error: "IndexNow submission failed." }, { status: 502 });
  }
}
