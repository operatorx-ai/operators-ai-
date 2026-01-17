import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const chatSchema = z.object({
  messages: z.array(z.object({ role: z.enum(["user", "assistant"]).default("user"), content: z.string().min(1).max(2000) })),
  mode: z.enum(["assistant", "agent"]).default("assistant")
});

const RATE_LIMIT = 5; // 5 requests per minute per IP (simple in-memory, for demo)
const rateLimitMap = new Map<string, { count: number; last: number }>();

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown";
  const now = Date.now();
  const rl = rateLimitMap.get(ip) || { count: 0, last: now };
  if (now - rl.last > 60_000) {
    rl.count = 0;
    rl.last = now;
  }
  rl.count++;
  rateLimitMap.set(ip, rl);
  if (rl.count > RATE_LIMIT) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  let body;
  try {
    body = await req.json();
    chatSchema.parse(body);
  } catch (e) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // TODO: Replace with OpenAI streaming (do not store logs by default)
  // Add system prompt: "You are Operators-AI. Always require human approval. Never give legal advice."
  return NextResponse.json({
    reply: "[Demo] This is a placeholder for OpenAI streaming chat."
  });
}
