"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const DemoChat = dynamic(() => import("./DemoChat"), { ssr: false });

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
        <DemoChat key={mode} mode={mode} quickInput={quickInput} setQuickInput={setQuickInput} />
      </Card>
    </main>
  );
}
