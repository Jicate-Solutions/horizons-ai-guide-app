// Edge function: fetch-education-news
//
// Fetches RSS feeds from public education news sources and returns a
// merged, deduplicated, recency-sorted JSON list of news items.
//
// Why an edge function and not a direct browser fetch?
//   Browsers can't fetch external RSS due to CORS. Edge functions run
//   server-side and have no such restriction.
//
// Sources (all public RSS, no API keys, no auth):
//   - The Hindu / Education
//   - Times of India / Education
//   - Indian Express / Education
//
// These are general-India education feeds, not TN-specific (TNEA and TN
// Selection Committee do not publish RSS). They give students broader
// context: NEET dates announced, CBSE results out, AICTE notifications,
// scholarship deadlines etc. Useful background even though not always
// directly about TN counselling.
//
// Output shape:
//   { items: [{ title, link, source, publishedAt }, ...], fetchedAt }
//
// Failure mode:
//   If a source feed is down or malformed, that one is skipped — we still
//   return whatever the other sources gave us. If ALL sources fail, we
//   return { items: [], error: '...' } and the client falls back to its
//   hardcoded items, so the ticker never goes blank.

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NewsItem {
  title: string;
  link: string;
  source: string;
  publishedAt: string;
}

interface FeedSource {
  name: string;
  url: string;
}

const FEEDS: FeedSource[] = [
  { name: "The Hindu", url: "https://www.thehindu.com/education/feeder/default.rss" },
  { name: "Times of India", url: "https://timesofindia.indiatimes.com/rssfeeds/913168846.cms" },
  { name: "Indian Express", url: "https://indianexpress.com/section/education/feed/" },
];

/**
 * Minimal RSS parser. Pulls <item>...<title>X</title><link>Y</link>
 * <pubDate>Z</pubDate>... — handles both bare text and CDATA-wrapped
 * fields. Skips items missing a title or link.
 */
const parseRss = (xml: string, source: string): NewsItem[] => {
  const items: NewsItem[] = [];
  const itemBlocks = xml.match(/<item\b[^>]*>([\s\S]*?)<\/item>/gi) || [];

  for (const block of itemBlocks) {
    const titleMatch =
      block.match(/<title>\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*<\/title>/i) ||
      block.match(/<title>([\s\S]*?)<\/title>/i);
    const linkMatch = block.match(/<link>\s*([\s\S]*?)\s*<\/link>/i);
    const pubMatch = block.match(/<pubDate>\s*([\s\S]*?)\s*<\/pubDate>/i);

    if (!titleMatch || !linkMatch) continue;

    const title = titleMatch[1]
      .replace(/<[^>]+>/g, "") // strip any nested HTML
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .trim();
    const link = linkMatch[1].trim();
    const publishedAt = pubMatch ? new Date(pubMatch[1].trim()).toISOString() : new Date().toISOString();

    if (title && link) {
      items.push({ title, link, source, publishedAt });
    }
  }
  return items;
};

const fetchFeed = async (feed: FeedSource): Promise<NewsItem[]> => {
  try {
    // 8 second timeout — RSS feeds shouldn't be slower than that.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(feed.url, {
      signal: controller.signal,
      headers: { "User-Agent": "VazhikattiNewsBot/1.0 (education news ticker)" },
    });
    clearTimeout(timeout);
    if (!res.ok) {
      console.warn(`Feed ${feed.name} returned ${res.status}`);
      return [];
    }
    const xml = await res.text();
    return parseRss(xml, feed.name);
  } catch (err) {
    console.warn(`Feed ${feed.name} failed:`, (err as Error).message);
    return [];
  }
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Fan-out fetches in parallel so one slow source doesn't stall the rest.
    const results = await Promise.all(FEEDS.map(fetchFeed));
    let items = results.flat();

    // Dedupe by link (same article cross-posted on multiple feeds).
    const seen = new Set<string>();
    items = items.filter((it) => {
      if (seen.has(it.link)) return false;
      seen.add(it.link);
      return true;
    });

    // Filter to anything that looks education-relevant. The feeds are
    // already education-themed, but cross-posts and tangents slip in.
    // Light keyword filter rather than aggressive — keep more, not less.
    const allow = [
      "neet", "jee", "tnea", "counsel", "admission", "exam", "result",
      "ugc", "aicte", "cbse", "ncert", "college", "university", "school",
      "scholarship", "education", "student", "iit", "iim", "nit", "aiims",
      "tamil nadu", "tamilnadu", "engineering", "medical", "pharmacy",
      "nursing", "fee", "cutoff", "rank", "syllabus", "mock", "tn ",
    ];
    items = items.filter((it) => {
      const t = it.title.toLowerCase();
      return allow.some((kw) => t.includes(kw));
    });

    // Sort newest first.
    items.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    // Cap at 20 newest items so the ticker stays scannable.
    items = items.slice(0, 20);

    return new Response(
      JSON.stringify({ items, fetchedAt: new Date().toISOString() }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          // Edge cache 30 min: news feeds don't update faster than this.
          "Cache-Control": "public, max-age=1800",
        },
      },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        items: [],
        error: (err as Error).message,
        fetchedAt: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
