/**
 * Resolves a working chat backend at runtime.
 *
 * The chat has two possible servers behind it:
 *   1. /api/career-chat        — Vercel serverless route, uses CLAUDE_API_KEY.
 *   2. Supabase Edge Function  — `career-chat`, uses LOVABLE_API_KEY
 *                                 (same key that already powers the working
 *                                 AI Career Predictor).
 *
 * If the Vercel route is misconfigured (missing key) we silently fall back
 * to the Supabase function on the next call, so the chat stays live.
 *
 * Both endpoints accept { messages: [{ role, content }, ...] } and stream
 * back text/event-stream with OpenAI-style {choices:[{delta:{content}}]}
 * chunks, so the existing parser in AIChatModal / CareerChat works
 * unchanged for either source.
 */

const VERCEL_ENDPOINT = '/api/career-chat';

const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_PUBLISHABLE_KEY =
  (import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

const SUPABASE_ENDPOINT = SUPABASE_URL
  ? `${SUPABASE_URL}/functions/v1/career-chat`
  : '';

type Backend = 'vercel' | 'supabase';

// Remember which backend worked in this browser session so we don't waste
// a roundtrip on a broken one for every message.
let preferredBackend: Backend | null = null;

function callBackend(backend: Backend, messages: { role: string; content: string }[]) {
  if (backend === 'vercel') {
    return fetch(VERCEL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
  }
  return fetch(SUPABASE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_PUBLISHABLE_KEY ?? '',
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY ?? ''}`,
    },
    body: JSON.stringify({ messages }),
  });
}

/**
 * POSTs the conversation and returns the first response whose body is a
 * working SSE stream (HTTP 2xx + text/event-stream). Throws if neither
 * backend is reachable.
 */
export async function streamChatBackend(
  messages: { role: string; content: string }[],
): Promise<Response> {
  const order: Backend[] =
    preferredBackend === 'supabase' && SUPABASE_ENDPOINT
      ? ['supabase', 'vercel']
      : SUPABASE_ENDPOINT
        ? ['vercel', 'supabase']
        : ['vercel'];

  let lastErr: unknown = null;
  for (const backend of order) {
    try {
      const resp = await callBackend(backend, messages);
      const ct = resp.headers.get('content-type') || '';
      if (resp.ok && ct.includes('text/event-stream') && resp.body) {
        preferredBackend = backend;
        return resp;
      }
      // not usable — record and try next
      lastErr = new Error(`${backend} backend returned status ${resp.status}`);
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr ?? new Error('No chat backend reachable');
}
