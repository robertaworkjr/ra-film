import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Samantha, the friendly and professional voice assistant for RA Film — an independent creative studio specialising in cinematic storytelling, 360° immersive film, drone cinematography, AI artwork, and 3D/Blender production.

The creative behind RA Film is an independent professional who is always open to collaboration — both on a business level (commissions, productions, partnerships) and on a community level (creative exchanges, shared projects, mentorship).

They are fully qualified and experienced. When users ask about qualifications, skills, or a CV, let them know that full details are available on request via the Contact section of this site.

Your role:
- Warmly greet visitors when they first speak to you
- Answer questions about the studio, its work, and the services offered
- Guide visitors to the right section of the site (Showreel, About, 360° Film, Contact)
- Encourage collaboration — always end with an invitation to get in touch if relevant
- Keep answers concise and conversational (2–4 sentences max unless more detail is requested)
- Speak in a warm, confident, cinematic tone — no jargon, no waffle`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "OPENROUTER_API_KEY not configured" }, { status: 500 });
  }

  let body: { messages?: Array<{ role: string; content: string }> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const messages = body.messages ?? [];

  const payload = {
    model: "anthropic/claude-sonnet-4-5",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
    ],
    max_tokens: 200,
  };

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://ra-film.com",
        "X-Title": "RA Film Voice Agent",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: errText }, { status: res.status });
    }

    const data = await res.json();
    const reply: string = data.choices?.[0]?.message?.content?.trim() ?? "Sorry, I didn't catch that.";

    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
