"use client";
import { industries } from "@/config/industries";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function IndustriesPage() {
  const [query, setQuery] = useState("");
  const filtered = industries.filter((i) =>
    i.name.toLowerCase().includes(query.toLowerCase()) ||
    i.painPoints.some((p) => p.toLowerCase().includes(query.toLowerCase()))
  );
  return (
    <main className="max-w-5xl mx-auto py-16 px-4">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-8 text-primary"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Industries
      </motion.h1>
      <Input
        placeholder="Search industries or pain points..."
        className="mb-8 max-w-md"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        {filtered.map((ind) => (
          <Link key={ind.slug} href={`/industries/${ind.slug}`}>
            <Card className="bg-accent p-6 rounded-lg shadow hover:scale-105 transition h-full">
              <h2 className="text-2xl font-semibold mb-2">{ind.name}</h2>
              <p className="text-sm text-zinc-400 mb-2">{ind.painPoints.join(", ")}</p>
              <div className="text-xs text-zinc-500">See workflows & agents →</div>
            </Card>
          </Link>
        ))}
        {filtered.length === 0 && <div className="col-span-3 text-zinc-500">No industries found.</div>}
      </motion.div>
    </main>
  );
}
