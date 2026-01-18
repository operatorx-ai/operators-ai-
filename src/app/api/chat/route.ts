import { NextRequest } from "next/server";
import { z } from "zod";

import { agents } from "@/config/agents";

const chatSchema = z.object({
  messages: z.array(z.object({ role: z.enum(["user", "assistant"]).default("user"), content: z.string().min(1).max(2000) })),
  mode: z.enum(["assistant", "agent"]).default("assistant"),
  agentId: z.string().optional(),
});

const RATE_LIMIT = 5; // 5 requests per minute per IP (simple in-memory, for demo)
const rateLimitMap = new Map<string, { count: number; last: number }>();

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const now = Date.now();
  const rl = rateLimitMap.get(ip) || { count: 0, last: now };
  if (now - rl.last > 60_000) {
    rl.count = 0;
    rl.last = now;
  }
  rl.count++;
  rateLimitMap.set(ip, rl);
  if (rl.count > RATE_LIMIT) {
    return new Response(JSON.stringify({ error: "Rate limit exceeded" }), { status: 429 });
  }

  let body;
  try {
    body = await req.json();
    chatSchema.parse(body);
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400 });
  }

  // --- OpenAI streaming ---
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "OpenAI API key not set" }), { status: 500 });
  }
  let systemPrompt =
    "You are Operators-AI. Always require human approval. Never give legal advice. Respond with clear, actionable steps and note that outputs are suggestions only.";
  if (body.mode === "agent" && body.agentId) {
    const agent = agents.find(a => a.id === body.agentId);
    if (agent) {
      systemPrompt = agent.systemPrompt;
    }
  }
  const messages = [
    { role: "system", content: systemPrompt },
    ...body.messages
  ];

  // Privacy-first: do not store chat logs by default. TODO: add opt-in logging hook here.

  const MODEL = process.env.OPENAI_MODEL ?? 'gpt-5';
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      stream: true
    })
  });

  if (!response.body) {
    return new Response(JSON.stringify({ error: "No response from OpenAI" }), { status: 500 });
  }

  // Stream OpenAI response to client
  return new Response(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache"
    }
  });
}
