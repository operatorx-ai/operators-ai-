"use client";
import React, { useState } from "react";

type Decision = {
  suggestedAction: string;
  confidence: number;
  needsHumanApproval: boolean;
  rationale: string;
};

export default function DecisionSSEDemo({ defaultAgentId }: { defaultAgentId?: string }) {
  const [prompt, setPrompt] = useState("Summarize the top priorities for today");
  const [agentId, setAgentId] = useState(defaultAgentId || "");
  const [decision, setDecision] = useState<Decision | null>(null);
  const [streamText, setStreamText] = useState("");
  const [running, setRunning] = useState(false);

  async function start() {
    setDecision(null);
    setStreamText("");
    setRunning(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: prompt }], mode: agentId ? "agent" : "assistant", agentId: agentId || undefined })
    });
    if (!res.body) {
      setRunning(false);
      setStreamText("No response body");
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    // SSE-style parser for the stream
    function processBuffer() {
      // split by double-newline (SSE event boundary)
      const parts = buffer.split("\n\n");
      // leave last partial in buffer
      buffer = parts.pop() || "";
      for (const part of parts) {
        const lines = part.split(/\r?\n/);
        let ev = "message";
        let data = "";
        for (const l of lines) {
          if (l.startsWith("event:")) ev = l.replace(/^event:\s*/, "").trim();
          else if (l.startsWith("data:")) data += l.replace(/^data:\s*/, "").trim();
        }
        if (ev === "decision") {
          try {
            const parsed = JSON.parse(data);
            setDecision(parsed);
          } catch (e) {
            // ignore
          }
        } else {
          // append to stream text for other events (assistant content)
          setStreamText(s => s + data);
        }
      }
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      processBuffer();
    }

    // final parse
    buffer += decoder.decode();
    processBuffer();
    setRunning(false);
  }

  return (
    <div className="p-4 border rounded-md bg-surface">
      <h3 className="font-semibold mb-2">Decision SSE Demo</h3>
      <div className="mb-2">
        <label className="block text-sm">Agent ID (optional)</label>
        <input className="w-full" value={agentId} onChange={e => setAgentId(e.target.value)} placeholder="e.g. cfo-financeops" />
      </div>
      <div className="mb-2">
        <label className="block text-sm">Prompt</label>
        <textarea className="w-full" rows={3} value={prompt} onChange={e => setPrompt(e.target.value)} />
      </div>
      <div className="flex gap-2 mb-4">
        <button className="btn btn-primary" onClick={start} disabled={running}>Run</button>
        <button className="btn" onClick={() => { setPrompt(""); setStreamText(""); setDecision(null); }}>Reset</button>
      </div>

      <div className="mb-3">
        <strong>Decision</strong>
        <div className="mt-1 p-2 bg-muted rounded">{decision ? (
          <pre className="text-xs">{JSON.stringify(decision, null, 2)}</pre>
        ) : <span className="text-xs text-muted-foreground">No decision yet</span>}</div>
      </div>

      <div>
        <strong>Assistant stream</strong>
        <div className="mt-1 p-2 bg-muted rounded min-h-[80px]"><pre className="whitespace-pre-wrap">{streamText || (running ? 'Streaming...' : 'No content')}</pre></div>
      </div>
    </div>
  );
}
