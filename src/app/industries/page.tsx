"use client";
import { industries, sectors } from "@/config/industries";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Link from "next/link";

import dynamic from "next/dynamic";
const IndustriesCatalog = dynamic(() => import("./IndustriesCatalog"), { ssr: false });

export default function IndustriesPage() {
  return <IndustriesCatalog />;
}
