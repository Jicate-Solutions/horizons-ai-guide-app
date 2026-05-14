import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// ─────────────────────────────────────────────────────────────────────────────
// CAREER PREDICTOR — narrative layer
// ─────────────────────────────────────────────────────────────────────────────
// IMPORTANT ARCHITECTURE NOTE:
// The match scores, roadmaps, reality-check figures and 90-day plans are NO
// LONGER produced here. They are computed deterministically on the client by
// the scoring engine (src/lib/careerScoring.ts) from curated, inspectable data
// (src/data/careerPathways.ts).
//
// This function does ONE job: take those already-decided, verified facts and
// write a warm, personalised narrative around them — the encouraging,
// human-sounding paragraph a counsellor would say. It must NEVER invent or
// change a number. If the AI is unavailable, the app still works fully; the
// narrative is a presentation enhancement, not the source of truth.
// ─────────────────────────────────────────────────────────────────────────────

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface MatchSummary {
  title: string;
  score: number;
  band: string;
  headline: string;
  topComponent?: string;
  watchOut?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Expected payload from the client (post scoring-engine run):
    //   groupCode, stream, expectedPercentage, topPriorities (string[]),
    //   interests (string[]), matches (MatchSummary[] — top 3)
    const {
      groupCode = "",
      stream = "",
      expectedPercentage,
      topPriorities = [],
      interests = [],
      matches = [],
    }: {
      groupCode?: string;
      stream?: string;
      expectedPercentage?: number;
      topPriorities?: string[];
      interests?: string[];
      matches?: MatchSummary[];
    } = body;

    // Defensive: if no matches were sent, there is nothing to narrate.
    if (!Array.isArray(matches) || matches.length === 0) {
      return new Response(
        JSON.stringify({
          narrative:
            "Your results below are based on a transparent scoring of your answers. Open any career to see exactly how its match score was calculated, the step-by-step roadmap, and your personalised 90-day plan.",
          perCareer: {},
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    // If the AI key is missing, gracefully return a clean non-AI narrative.
    // The app is fully functional without this — by design.
    if (!LOVABLE_API_KEY) {
      const top = matches[0];
      return new Response(
        JSON.stringify({
          narrative: `Based on your answers, "${top.title}" came out as your strongest match at ${top.score}%. ${top.headline} Every score below is calculated from your inputs — tap "See the calculation" on any career to check the maths yourself.`,
          perCareer: {},
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const matchList = matches
      .slice(0, 3)
      .map(
        (m, i) =>
          `${i + 1}. ${m.title} — match ${m.score}% (${m.band}). Key reason: ${m.headline}${
            m.watchOut ? ` Watch-out: ${m.watchOut}` : ""
          }`,
      )
      .join("\n");

    const systemPrompt = `You are a warm, honest career counsellor for a Tamil Nadu 12th-standard student. You are given results that have ALREADY been calculated by a transparent scoring engine. Your ONLY job is to write the encouraging, human narrative around these fixed facts.

ABSOLUTE RULES:
- NEVER invent, change, or contradict any match score, career name, or fact you are given. The numbers are final.
- NEVER add salary figures, cutoffs, or statistics — those are shown separately from verified data.
- Do NOT claim the student "will" succeed or give guarantees. Be encouraging but honest.
- Acknowledge the top match, briefly explain in plain words why it fits this specific student, and gently note that the lower matches are still real options.
- Keep a calm, respectful, parent-friendly tone. No hype, no emojis, no exclamation overload.
- Write for a student who may be the first in their family to go to college.
- 'narrative': 2-3 short sentences, overall and personal.
- 'perCareer': for EACH career title given, one single encouraging-but-honest sentence (max 25 words) that connects it to this student's profile.`;

    const userPrompt = `STUDENT PROFILE (already analysed):
- TN 12th group: ${groupCode || "not specified"} (stream: ${stream || "not specified"})
- Expected board %: ${expectedPercentage ?? "not specified"}
- Top priorities they ranked: ${topPriorities.length ? topPriorities.join(", ") : "not specified"}
- Interests they picked: ${interests.length ? interests.join(", ") : "not specified"}

CALCULATED RESULTS (these are FINAL — narrate, do not change):
${matchList}

Write the narrative and per-career sentences. Remember: you are explaining results that already exist, in a warm and honest voice.`;

    const tools = [
      {
        type: "function",
        function: {
          name: "provide_narrative",
          description:
            "Provide a warm, honest narrative around already-calculated career results.",
          parameters: {
            type: "object",
            properties: {
              narrative: {
                type: "string",
                description:
                  "2-3 short sentences: warm, honest overall summary personalised to this student.",
              },
              perCareer: {
                type: "array",
                description: "One entry per career title provided.",
                items: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      description: "Exact career title as given.",
                    },
                    note: {
                      type: "string",
                      description:
                        "One encouraging-but-honest sentence (max 25 words) connecting this career to the student.",
                    },
                  },
                  required: ["title", "note"],
                },
              },
            },
            required: ["narrative", "perCareer"],
          },
        },
      },
    ];

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          tools,
          tool_choice: {
            type: "function",
            function: { name: "provide_narrative" },
          },
        }),
      },
    );

    if (!response.ok) {
      // On rate-limit / credit issues, degrade gracefully — the client already
      // has the full deterministic result; it just won't get the AI prose.
      if (response.status === 429 || response.status === 402) {
        const top = matches[0];
        return new Response(
          JSON.stringify({
            narrative: `Your strongest match is "${top.title}" at ${top.score}%. ${top.headline} Every score below is calculated from your own answers — open any career to see the full breakdown.`,
            perCareer: {},
            degraded: true,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (toolCall?.function?.arguments) {
      const parsed = JSON.parse(toolCall.function.arguments);
      // Normalise perCareer into a title -> note map for easy client lookup.
      const perCareerMap: Record<string, string> = {};
      if (Array.isArray(parsed.perCareer)) {
        for (const entry of parsed.perCareer) {
          if (entry?.title && entry?.note) {
            perCareerMap[entry.title] = entry.note;
          }
        }
      }
      return new Response(
        JSON.stringify({
          narrative: parsed.narrative ?? "",
          perCareer: perCareerMap,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Fallback if the model returned plain content instead of a tool call.
    const content = data.choices?.[0]?.message?.content;
    return new Response(
      JSON.stringify({
        narrative:
          typeof content === "string" && content.length > 0
            ? content
            : `Your strongest match is "${matches[0].title}" at ${matches[0].score}%. Open any career below to see how its score was calculated.`,
        perCareer: {},
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Career predictor narrative error:", error);
    // Even on a hard error, return a usable narrative so the UI never breaks.
    return new Response(
      JSON.stringify({
        narrative:
          "Your results below are calculated transparently from your answers. Open any career to see the exact score breakdown, roadmap, and your 90-day plan.",
        perCareer: {},
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
