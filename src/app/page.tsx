"use client";
import { agents } from "@/config/agents";
import { industries } from "@/config/industries";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

const howItWorks = [
  { step: 1, title: "Connect", desc: "Integrate your tools and data sources securely." },
  { step: 2, title: "Configure", desc: "Define policies, controls, and human-in-the-loop approvals." },
  { step: 3, title: "Automate", desc: "Deploy agents to orchestrate workflows with audit trails." },
  { step: 4, title: "Approve", desc: "Review, approve, and monitor every action with full transparency." },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full">
      {/* Animated Hero */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full flex flex-col items-center justify-center py-24 text-center bg-gradient-to-b from-black via-zinc-900 to-black"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
          Human-First AI Automation
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-zinc-300">
          Operators-AI augments people, not replaces jobs. Automate with trust, controls, and compliance.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/demo"><Button size="lg">Start Demo</Button></Link>
          <Link href="/waitlist"><Button variant="secondary" size="lg">Join Waitlist</Button></Link>
          <Link href="/contact"><Button variant="outline" size="lg">Contact Sales</Button></Link>
        </div>
      </motion.section>
      {/* Agent Catalog */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="w-full max-w-6xl mx-auto py-20 px-4"
        id="catalog"
      >
        <h2 className="text-3xl font-bold mb-8 text-primary">Agent Catalog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <Card key={agent.name} className="bg-accent p-6 rounded-lg shadow flex flex-col h-full">
              <h3 className="text-xl font-semibold mb-2">{agent.name}</h3>
              <p className="text-zinc-300 mb-2 flex-1">{agent.description}</p>
              <div className="text-xs text-zinc-400 mb-2">Best for: {agent.bestFor.join(", ")}</div>
              <ul className="text-xs text-zinc-400 mb-2">
                {agent.exampleTasks.map((t) => <li key={t}>• {t}</li>)}
              </ul>
            </Card>
          ))}
        </div>
      </motion.section>
      {/* Industries */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full max-w-6xl mx-auto py-20 px-4"
        id="industries"
      >
        <h2 className="text-3xl font-bold mb-8 text-primary">Industries</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {industries.map((ind) => (
            <Card key={ind.slug} className="bg-accent p-6 rounded-lg shadow hover:scale-105 transition">
              <Link href={`/industries/${ind.slug}`}> 
                <h3 className="text-xl font-semibold mb-2">{ind.name}</h3>
                <p className="text-sm text-zinc-400 mb-2">{ind.painPoints.join(", ")}</p>
                <div className="text-xs text-zinc-500">See workflows & agents →</div>
              </Link>
            </Card>
          ))}
        </div>
      </motion.section>
      {/* How it works */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="w-full max-w-4xl mx-auto py-20 px-4"
        id="how"
      >
        <h2 className="text-3xl font-bold mb-8 text-primary">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {howItWorks.map((step) => (
            <Card key={step.step} className="bg-accent p-6 rounded-lg shadow flex flex-col items-center">
              <div className="text-4xl font-bold text-primary mb-2">{step.step}</div>
              <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
              <p className="text-sm text-zinc-400 text-center">{step.desc}</p>
            </Card>
          ))}
        </div>
      </motion.section>
      {/* Trust & Security */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="w-full max-w-4xl mx-auto py-20 px-4"
        id="trust"
      >
        <h2 className="text-3xl font-bold mb-4 text-primary">Trust & Security</h2>
        <ul className="list-disc ml-6 text-zinc-300 space-y-2">
          <li>Encryption at rest/in transit</li>
          <li>RBAC, audit trails, approvals</li>
          <li>Secure SDLC: CI scanning, dependency checks</li>
          <li>Compliance-support features (not legal advice)</li>
        </ul>
        <Link href="/trust"><Button variant="secondary" className="mt-6">Learn More</Button></Link>
      </motion.section>
      {/* Human-first automation statement */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="w-full max-w-3xl mx-auto py-16 px-4 text-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-primary">Human-first automation</h2>
        <p className="text-lg text-zinc-300">We augment people, not replace jobs. Every workflow includes human-in-the-loop approvals, audit trails, and controls.</p>
      </motion.section>
    </main>
  );
}
