"use client";
import React from "react";
import { industries, sectors } from "@/config/industries";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function IndustriesCatalog() {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("");
  // Defensive: filter out industries with invalid sectorId
  const validSectorIds = new Set(sectors.map(s => s.id));
  const allIndustries = industries.filter(i => validSectorIds.has(i.sectorId));
  const filtered = allIndustries.filter((i) => {
    const q = query.toLowerCase();
    const matchesQuery =
      i.name.toLowerCase().includes(q) ||
      i.summary.toLowerCase().includes(q) ||
      i.keywords.some((k) => k.toLowerCase().includes(q)) ||
      i.painPoints.some((p) => p.toLowerCase().includes(q));
    const matchesSector = !sector || i.sectorId === sector;
    return matchesQuery && matchesSector;
  });
  return (
    <main className="max-w-5xl mx-auto py-16 px-4">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-8 text-primary"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Industry Catalog
      </motion.h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search industries, keywords, or pain points..."
          className="max-w-md"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <select
          title="Sector"
          aria-label="Sector"
          className="border rounded px-3 py-2 bg-card text-card-foreground"
          value={sector}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSector(e.target.value)}
        >
          <option value="">All Sectors</option>
          {sectors.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-2 text-xs text-muted-foreground">{allIndustries.length} total industries</div>
      <div className="mb-4 text-sm text-muted-foreground">{filtered.length} results</div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        {filtered.map((ind) => (
          <Link key={ind.slug} href={`/industries/${ind.slug}`}>
            <Card className="bg-card text-card-foreground p-6 rounded-lg shadow hover:scale-105 transition h-full border border-border">
              <h2 className="text-2xl font-semibold mb-2">{ind.name}</h2>
              <div className="mb-2 flex flex-wrap gap-1">
                {ind.keywords.slice(0, 6).map((kw) => (
                  <span key={kw} className="inline-block bg-muted text-muted-foreground px-2 py-0.5 rounded text-xs border border-border">{kw}</span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{ind.summary}</p>
              <div className="text-xs text-muted-foreground">See workflows & agents →</div>
            </Card>
          </Link>
        ))}
        {filtered.length === 0 && <div className="col-span-3 text-muted-foreground">No industries found.</div>}
      </motion.div>
    </main>
  );
}