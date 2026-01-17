"use client";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";

const trustLinks = [
  { href: "/trust/security", label: "Security" },
  { href: "/trust/privacy", label: "Privacy" },
  { href: "/trust/compliance", label: "Compliance" },
];

export default function TrustCenter() {
  return (
    <main className="max-w-3xl mx-auto py-16 px-4">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-8 text-primary"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Trust Center
      </motion.h1>
      <motion.ul
        className="list-disc ml-6 space-y-2 text-zinc-300 mb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <li>Security-by-design: encryption at rest/in transit, RBAC, audit trails, approvals</li>
        <li>Privacy-first: no chat logs stored by default</li>
        <li>Compliance-support: audit logs, controls, FedRAMP path language (not a certification)</li>
        <li>Secure SDLC: CI scanning, dependency checks</li>
      </motion.ul>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {trustLinks.map((l) => (
          <Link key={l.href} href={l.href}>
            <Card className="bg-accent p-6 rounded-lg shadow text-center hover:scale-105 transition text-primary font-semibold">
              {l.label}
            </Card>
          </Link>
        ))}
      </motion.div>
    </main>
  );
}
