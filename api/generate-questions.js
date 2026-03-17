export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
  if (!CLAUDE_API_KEY) {
    return res.status(500).json({ error: 'AI not configured. Add CLAUDE_API_KEY in Vercel settings.' });
  }

  try {
    const { examName, subject, topicName, existingQuestions, count } = req.body;

    if (!examName || !subject || !topicName) {
      return res.status(400).json({ error: 'examName, subject, topicName required' });
    }

    const numQs = Math.min(count || 10, 15);

    const prompt = `You are an expert ${examName} exam question setter for ${subject} - ${topicName}.

Generate exactly ${numQs} NEW multiple-choice questions for "${topicName}" in ${subject} for ${examName}.

RULES:
- Questions must be at the actual ${examName} exam difficulty level
- Mix difficulty: 30% easy, 40% medium, 30% hard
- Each question has exactly 4 options, only 1 correct
- "answer" field = 0-indexed integer (0=first option, 1=second, 2=third, 3=fourth)
- Include a clear 1-2 sentence explanation for the correct answer
- Cover different sub-concepts within ${topicName}
- Do NOT repeat any of these existing questions:
${(existingQuestions || []).slice(0, 20).map(q => q.substring(0, 100)).join('\n')}

Respond ONLY with a valid JSON array. No markdown, no backticks, no text before or after:
[{"question":"...","options":["A","B","C","D"],"answer":0,"explanation":"...","difficulty":"easy"}]`;

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
      console.error("Anthropic API error:", response.status, errText);
      return res.status(500).json({ error: `API error: ${response.status}` });
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
      else return res.status(500).json({ error: "Failed to parse AI response" });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(500).json({ error: "No questions generated" });
    }

    // Validate and clean each question
    const validated = questions.map((q, idx) => ({
      question: String(q.question || ""),
      options: Array.isArray(q.options) && q.options.length === 4 ? q.options.map(String) : ["A", "B", "C", "D"],
      answer: typeof q.answer === 'number' && q.answer >= 0 && q.answer <= 3 ? q.answer : 0,
      explanation: String(q.explanation || ""),
      difficulty: ["easy", "medium", "hard"].includes(q.difficulty) ? q.difficulty : "medium",
    }));

    return res.status(200).json({ questions: validated });

  } catch (err) {
    console.error("Generate questions error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
