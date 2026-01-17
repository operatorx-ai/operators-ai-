"use client";
import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function DemoChat({ mode, quickInput, setQuickInput }: { mode: string; quickInput?: string; setQuickInput?: (v: string) => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  // If quickInput is set, fill input and send
  if (quickInput && setQuickInput) {
    setTimeout(() => {
      setInput(quickInput);
      setQuickInput("");
    }, 0);
  }

  const sendMessage = async (content: string) => {
    setLoading(true);
    setError(null);
    const newMessages = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setInput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, mode }),
      });
      if (!res.body) throw new Error("No response body");
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Error");
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
          ...msgs.filter((m, i) => i !== msgs.length - 1 || m.role !== "assistant"),
          { role: "assistant", content: aiMsg },
        ]);
      }
      setLoading(false);
    } catch (e: any) {
      setError(e.message || "Unknown error");
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        ref={chatRef}
        className="mb-4 p-4 bg-muted rounded h-64 overflow-y-auto border"
        style={{ minHeight: 200 }}
        tabIndex={0}
        aria-label="Chat history"
      >
        {messages.length === 0 && (
          <div className="text-gray-400 text-center">No messages yet.</div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "text-right" : "text-left"}>
            <span className={msg.role === "user" ? "font-semibold" : "text-primary font-semibold"}>
              {msg.role === "user" ? "You" : "AI"}:
            </span>{" "}
            <span>{msg.content}</span>
          </div>
        ))}
      </div>
      <form
        className="flex gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!input.trim() || loading) return;
          await sendMessage(input.trim());
        }}
        aria-label="Send a message"
      >
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
          minLength={1}
          maxLength={2000}
          required
          aria-label="Message input"
        />
        <Button type="submit" disabled={loading || !input.trim()} aria-label="Send message">
          {loading ? "Sending..." : "Send"}
        </Button>
      </form>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}
