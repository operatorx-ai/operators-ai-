
import { NextRequest } from "next/server";
import { z } from "zod";
import { agents } from "@/config/agents";
// Simple in-memory LRU cache for dev/demo
const LRU = require('lru-cache');
const cache = new LRU({ max: 100, ttl: 1000 * 60 * 60 * 6 }); // 6h TTL

const chatSchema = z.object({
  messages: z.array(z.object({ role: z.enum(["user", "assistant"]).default("user"), content: z.string().min(1).max(2000) })),
  mode: z.enum(["assistant", "agent"]).default("assistant"),
  agentId: z.string().optional(),
  fastMode: z.boolean().optional(),
  expand: z.boolean().optional(),
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

  // Caching for quick actions (only if single user message, not expand)
  const isQuickAction = body.messages.length === 1 && !body.expand;
  const cacheKey = isQuickAction
    ? JSON.stringify({ agentId: body.agentId, mode: body.mode, prompt: body.messages[0].content, fastMode: body.fastMode })
    : null;
  if (isQuickAction && cache.has(cacheKey)) {
    const cached = cache.get(cacheKey);
    return new Response(cached.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "X-Cached": "1",
        "Cache-Control": "no-cache"
      }
    });
  }

  // --- OpenAI streaming ---
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "OpenAI API key not set" }), { status: 500 });
  }

  // Fast/Deep mode selection
  const FAST_MODEL = process.env.OPENAI_MODEL_FAST || 'gpt-5-mini';
  const DEEP_MODEL = process.env.OPENAI_MODEL_DEEP || 'gpt-5';
  const fastMode = body.fastMode !== false; // default true
  const model = fastMode ? FAST_MODEL : DEEP_MODEL;
  const maxTokens = fastMode ? 300 : 1200;

  let systemPrompt =
    "You are Operators-AI. Always require human approval. Never give legal advice. Respond with clear, actionable steps and note that outputs are suggestions only.";
  if (body.mode === "agent" && body.agentId) {
    const agent = agents.find(a => a.id === body.agentId);
    if (agent) {
      systemPrompt = agent.systemPrompt;
    }
  }
  // Enforce concise style for fast mode
  if (fastMode) {
    systemPrompt += "\n\nAnswer in 6 bullets or less, 120 words max, unless user asks for detail. Be concise.";
  }
  const messages = [
    { role: "system", content: systemPrompt },
    ...body.messages
  ];

  // Privacy-first: do not store chat logs by default. TODO: add opt-in logging hook here.


  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
      max_tokens: maxTokens
    })
  });

  if (!response.body) {
    return new Response(JSON.stringify({ error: "No response from OpenAI" }), { status: 500 });
  }

  // Stream OpenAI response to client, and cache if quick action
  const stream = response.body;
  if (isQuickAction) {
    // Buffer the stream for cache, but also stream to client
    const { PassThrough } = require('stream');
    const pt = new PassThrough();
    const chunks: Buffer[] = [];
    stream.on('data', (chunk: Buffer) => {
      pt.write(chunk);
      chunks.push(chunk);
    });
    stream.on('end', () => {
      pt.end();
      cache.set(cacheKey, { body: Buffer.concat(chunks) });
    });
    return new Response(pt, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache"
      }
    });
  }
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache"
    }
  });
}
