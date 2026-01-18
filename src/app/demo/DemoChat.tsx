"use client";
import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Role = 'user' | 'assistant';
type Message = {
  role: Role;
  content: string;
};

import { agents } from "@/config/agents";

type DemoChatProps = {
  mode: string;
  quickInput?: string;
  setQuickInput?: (v: string) => void;
  agentId?: string;
};

export default function DemoChat({ mode, quickInput, setQuickInput, agentId }: DemoChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  // If quickInput is set, fill input and send

  // If quickInput is set, fill input and send
  if (quickInput && setQuickInput && !loading && !input) {
    setTimeout(() => {
      setInput(quickInput);
      sendMessage(quickInput);
      setQuickInput("");
    }, 0);
  }

  const sendMessage = async (content: string) => {
    setLoading(true);
    setError(null);
    const newMessages: Message[] = [...messages, { role: 'user' as const, content }];
    setMessages(newMessages);
    setInput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, mode, agentId }),
      });
      if (!res.body) throw new Error("No response body");
      if (!res.ok) {
        // Try to parse error JSON, fallback to generic
        let userMsg = "OpenAI key is missing/invalid or the server rejected the request.";
        try {
          const err = await res.json();
          if (err && (err.error || err.message)) {
            userMsg = "OpenAI key is missing/invalid or the server rejected the request.";
          }
        } catch {}
        setError(userMsg);
        setLoading(false);
        return;
      }
      let aiMsg = "";
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        aiMsg += decoder.decode(value, { stream: true });
        setMessages((msgs) => [
          ...msgs.filter((m, i) => i !== msgs.length - 1 || m.role !== 'assistant'),
          { role: 'assistant' as const, content: aiMsg },
        ]);
      }
      setLoading(false);
    } catch (e: any) {
      setError("Network error or server unavailable.");
      setLoading(false);
    }
  };
  return (
    <div>
      <div
        ref={chatRef}
        className="mb-4 p-4 bg-card text-card-foreground rounded-lg h-64 overflow-y-auto border border-border shadow-sm"
        style={{ minHeight: 200 }}
        tabIndex={0}
        aria-label="Chat history"
      >
        {messages.length === 0 && (
          <div className="text-muted-foreground text-sm">No messages yet. Try a prompt!</div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? "text-right mb-2" : "text-left mb-2"}>
            <span className={m.role === 'user' ? "inline-block bg-primary text-primary-foreground px-3 py-2 rounded-lg" : "inline-block bg-muted text-muted-foreground px-3 py-2 rounded-lg border border-border"}>
              {m.content}
            </span>
          </div>
        ))}
      </div>
      {error && (
        <div className="mb-4 p-3 bg-red-900/80 text-red-200 rounded border border-red-700 text-sm">
          <div>{error}</div>
          <div className="mt-2 text-xs text-red-300">
            To fix: Set <span className="font-mono">OPENAI_API_KEY</span> in <span className="font-mono">.env.local</span> and restart <span className="font-mono">npm run dev</span>.<br />
            Get a key at <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer" className="underline">OpenAI</a>.
          </div>
        </div>
      )}
      <form
        className="flex gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!input.trim() || loading) return;
          await sendMessage(input);
        }}
      >
        <Textarea
          className="flex-1 min-h-[40px] max-h-32 resize-y bg-card text-card-foreground border border-border"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
          aria-label="Chat input"
        />
        <Button type="submit" disabled={loading || !input.trim()} className="h-10 px-6">
          {loading ? "..." : "Send"}
        </Button>
      </form>
    </div>
  );
}
