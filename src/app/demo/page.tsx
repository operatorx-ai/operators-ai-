"use client";

import { useState } from "react";
import { agents } from "@/config/agents";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const DemoChat = dynamic(() => import("./DemoChat"), { ssr: false });
import { DemoSignUpCTA } from "./DemoSignUpCTA";

const quickActions = [
  "Draft a vendor payment approval workflow",
  "Create a SOC2-ready access review checklist",
  "Generate an incident response runbook",
  "Summarize invoices and flag anomalies",
  "Write a customer support macro library"
];

export default function DemoPage() {
  const [mode, setMode] = useState("assistant");
  const [quickInput, setQuickInput] = useState("");
  const [selectedAgentId, setSelectedAgentId] = useState<string>(agents[0]?.id || "");
  const selectedAgent = agents.find(a => a.id === selectedAgentId);
  return (
    <main className="max-w-3xl mx-auto py-16 px-4">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-8 text-primary"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Interactive AI Demo
      </motion.h1>
      <Tabs value={mode} onValueChange={setMode} className="mb-8">
        <TabsList>
          <TabsTrigger value="assistant">Assistant</TabsTrigger>
          <TabsTrigger value="agent">Agent Mode</TabsTrigger>
        </TabsList>
      </Tabs>
      {mode === "agent" && (
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Select Agent</label>
          <Select value={selectedAgentId} onValueChange={setSelectedAgentId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose an agent" />
            </SelectTrigger>
            <SelectContent>
              {agents.map(agent => (
                <SelectItem key={agent.id} value={agent.id}>
                  {agent.name} <span className="text-xs text-muted-foreground">({agent.category})</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedAgent && (
            <div className="mt-2 p-3 bg-muted rounded">
              <div className="font-bold">{selectedAgent.name}</div>
              <div className="text-sm mb-1">{selectedAgent.description}</div>
              <div className="text-xs text-muted-foreground">Best for: {selectedAgent.bestFor.join(", ")}</div>
            </div>
          )}
        </div>
      )}
      <motion.div
        className="mb-8 flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        {quickActions.map((q) => (
          <Button
            key={q}
            variant="secondary"
            className="text-xs"
            onClick={() => setQuickInput(q)}
            aria-label={`Quick action: ${q}`}
          >
            {q}
          </Button>
        ))}
      </motion.div>
      <Card className="bg-accent p-6 rounded shadow text-center mb-4">
        <p className="mb-4">Demo outputs are suggestions; verify before action.</p>
        <DemoChat
          key={mode + selectedAgentId}
          mode={mode}
          quickInput={quickInput}
          setQuickInput={setQuickInput}
          agentId={mode === "agent" ? selectedAgentId : undefined}
        />
        <DemoSignUpCTA />
      </Card>
    </main>
  );
}
