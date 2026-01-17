import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const differentiators = [
  "Policy engine + approvals",
  "Audit logs",
  "Least-privilege connectors",
  "Observability & rollback patterns"
];

export default function ProductPage() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-4">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-8 text-primary"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        What is Operators-AI?
      </motion.h1>
      <motion.p
        className="mb-8 text-lg text-zinc-300"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        Operators-AI is a multi-agent automation platform designed for human-first, compliant automation. We augment people, not replace jobs.
      </motion.p>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {differentiators.map((d) => (
          <Card key={d} className="bg-accent p-6 rounded-lg shadow text-lg font-semibold text-primary">
            {d}
          </Card>
        ))}
      </motion.div>
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-primary">Platform Architecture</h2>
        <div className="bg-accent p-6 rounded-lg shadow mb-4">
          <svg width="320" height="120" viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="40" width="80" height="40" rx="10" fill="#00FFD0" fillOpacity="0.15" />
            <text x="50" y="65" textAnchor="middle" fontSize="14" fill="#00FFD0">User</text>
            <rect x="120" y="20" width="80" height="80" rx="16" fill="#00FFD0" fillOpacity="0.15" />
            <text x="160" y="65" textAnchor="middle" fontSize="14" fill="#00FFD0">Operators-AI Agents</text>
            <rect x="230" y="40" width="80" height="40" rx="10" fill="#00FFD0" fillOpacity="0.15" />
            <text x="270" y="65" textAnchor="middle" fontSize="14" fill="#00FFD0">Integrations</text>
            <line x1="90" y1="60" x2="120" y2="60" stroke="#00FFD0" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="200" y1="60" x2="230" y2="60" stroke="#00FFD0" strokeWidth="2" markerEnd="url(#arrow)" />
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#00FFD0" />
              </marker>
            </defs>
          </svg>
        </div>
        <div className="text-xs text-zinc-400">Conceptual only. Not a system diagram.</div>
      </motion.div>
    </main>
  );
}
