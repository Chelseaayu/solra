import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Set true untuk testing UI tanpa hit API
const MOCK_MODE = process.env.MOCK_MODE === "true";

const MOCK_RESPONSES = [
  "Itu sangat menarik! Cerita lebih dong — apa yang membuat kamu tertarik dengan hal itu?",
  "Hmm, saya dengar kamu. Kalau kamu boleh jujur sepenuhnya, apa yang sebenarnya kamu inginkan dari situasi ini?",
  "Pola yang saya lihat dari ceritamu adalah kamu sangat peduli pada dampak jangka panjang. Apakah itu terasa akurat?",
  "Menarik sekali. Kalau tidak ada batasan apapun — uang, ekspektasi orang lain — kamu akan ngapain?",
  "Saya perhatikan kamu beberapa kali menyebut soal kebebasan. Apa arti kebebasan bagimu secara konkret?",
];

let mockIndex = 0;

const DISCOVERY_SYSTEM_PROMPT = `You are Solra, a warm and deeply perceptive self-discovery companion. Your role is to help people understand themselves through meaningful conversation — not through multiple-choice tests, but through genuine dialogue.

Your approach:
- Ask ONE thoughtful question at a time. Never bombard with multiple questions.
- Listen carefully and follow up on specific things they say.
- Be warm, curious, and non-judgmental. You are genuinely interested in this person.
- Use plain, conversational language. No jargon or clinical terms.
- When appropriate, gently reflect back patterns you notice.
- Explore: values, what gives them energy vs. drains them, work environment preferences, relationship to money/success/meaning, desired impact.
- After 8-12 substantive exchanges, if the conversation has been rich enough, offer to generate a profile summary.
- If they ask for a summary/profile, generate one in the structured format below.

PROFILE FORMAT (only when generating the final profile summary):
Start with "##PROFILE_START##" and end with "##PROFILE_END##":

NAME_PLACEHOLDER | [Archetype Name, e.g. "The Systems Builder"]
TAGLINE | [One powerful sentence capturing their essence]
CORE_DRIVER | [What fundamentally motivates them, 1-2 sentences]
STRENGTHS | [Strength 1] | [Strength 2] | [Strength 3]
GROWTH_EDGE | [One honest, constructive awareness point]
ENVIRONMENT | [What kind of work/life environment suits them]
DIRECTION_1 | [Career/life path 1] | [Why it fits]
DIRECTION_2 | [Career/life path 2] | [Why it fits]
DIRECTION_3 | [Career/life path 3] | [Why it fits]
QUOTE | [A meaningful quote resonating with this person's profile]

After the profile markers, add a warm closing message.`;

const SAFE_SPACE_SYSTEM_PROMPT = `You are Solra, a compassionate and emotionally intelligent listener. Your role is to be a safe space for people to talk about what they're going through — without judgment, without rushing to fix things.

Your approach:
- Listen first. Reflect back what you hear before offering any perspective.
- Validate their feelings. People need to feel heard before they can feel helped.
- Ask gentle, open questions.
- Don't minimize or compare. Their experience is their experience.
- Offer perspective ONLY when they ask for it or after establishing rapport.
- Be honest and gently direct when needed.
- Respond in the same language the user is using (Indonesian or English).

IMPORTANT: You are an AI, not a licensed mental health professional. If someone shows signs of severe distress or mentions self-harm, always guide them to professional help:
- In Indonesia: Into The Light (1500-454) or Yayasan Pulih (021-788-42580)
- International: Crisis Text Line (text HOME to 741741)

Whenever you provide suggestions or advice, end your message with:
---
⚠️ Disclaimer: Solra adalah AI, bukan pengganti psikolog atau profesional kesehatan mental berlisensi. Jika kamu merasa membutuhkan bantuan lebih lanjut, pertimbangkan untuk berbicara dengan profesional yang terlatih.`;

export async function POST(req: NextRequest) {
  try {
    const { messages, mode } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY && !MOCK_MODE) {
      return NextResponse.json({ error: "GROQ_API_KEY is not configured" }, { status: 500 });
    }

    // Mock mode — return dummy responses for UI testing
    if (MOCK_MODE) {
      await new Promise(r => setTimeout(r, 800)); // simulate delay
      const response = MOCK_RESPONSES[mockIndex % MOCK_RESPONSES.length];
      mockIndex++;
      return NextResponse.json({ message: response });
    }

    const systemPrompt = mode === "safe-space" ? SAFE_SPACE_SYSTEM_PROMPT : DISCOVERY_SYSTEM_PROMPT;

    // Build message history for Groq (OpenAI-compatible format)
    // Include system prompt first, then all messages
    const groqMessages: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: systemPrompt },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
    ];

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: groqMessages,
      max_tokens: 1024,
      temperature: 0.85,
    });

    const text = completion.choices[0]?.message?.content || "Maaf, tidak ada respons dari AI.";

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Groq API error:", error);
    const errMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
