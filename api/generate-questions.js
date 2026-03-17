export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
  if (!CLAUDE_API_KEY) {
    return res.status(500).json({ error: 'AI not configured. Contact admin.' });
  }

  try {
    const { examName, subject, topicName, syllabusTopics, existingQuestions, count } = req.body;

    if (!examName || !subject || !topicName) {
      return res.status(400).json({ error: 'examName, subject, topicName required' });
    }

    const numQs = Math.min(count || 10, 15);
    const syllabus = syllabusTopics || topicName;
    const existing = (existingQuestions || []).slice(0, 15).map(q => `- ${q.substring(0, 80)}`).join('\n');

    const prompt = `You are a senior ${examName} exam paper setter. Generate exactly ${numQs} MCQs for "${topicName}" in ${subject}.

SYLLABUS SUB-TOPICS TO COVER:
${syllabus}

STRICT RULES:
1. Questions MUST be at actual ${examName} exam standard
2. Cover different sub-topics from the syllabus above
3. Each question: 4 options, exactly 1 correct
4. "answer" = 0-indexed (0=A, 1=B, 2=C, 3=D)
5. Include 1-2 line explanation with the correct reasoning
6. Difficulty: 3 easy, 4 medium, 3 hard (for 10 Qs)
7. Include numerical problems where applicable
8. Do NOT repeat: ${existing ? '\n' + existing : 'none'}

FORMAT — respond with ONLY this JSON array, nothing else:
[{"question":"...","options":["...","...","...","..."],"answer":0,"explanation":"...","difficulty":"easy"}]`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic error:", response.status, errText);
      return res.status(500).json({ error: `AI service error (${response.status})` });
    }

    const data = await response.json();
    const text = (data.content || []).map(i => i.text || "").join("");
    const clean = text.replace(/```json|```/g, "").trim();

    let questions;
    try {
      questions = JSON.parse(clean);
    } catch {
      const match = clean.match(/\[[\s\S]*\]/);
      if (match) questions = JSON.parse(match[0]);
      else return res.status(500).json({ error: "Failed to parse response" });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(500).json({ error: "No questions generated" });
    }

    const validated = questions.map((q) => ({
      question: String(q.question || ""),
      options: Array.isArray(q.options) && q.options.length === 4 ? q.options.map(String) : ["A","B","C","D"],
      answer: typeof q.answer === 'number' && q.answer >= 0 && q.answer <= 3 ? q.answer : 0,
      explanation: String(q.explanation || ""),
      difficulty: ["easy", "medium", "hard"].includes(q.difficulty) ? q.difficulty : "medium",
    }));

    return res.status(200).json({ questions: validated });

  } catch (err) {
    console.error("Generate error:", err);
    return res.status(500).json({ error: "Server error. Please try again." });
  }
}
