
import "../styles/globals.css";
import type { ReactNode } from "react";
import Link from "next/link";
import { ClerkProvider } from "@clerk/nextjs";
import { WorkspaceProvider } from "@/lib/workspace";

export const metadata = {
  title: "Operators-AI: Human-First Automation Platform",
  description: "Premium AI automation platform with human-in-the-loop, audit trails, and controls."
};

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-accent flex items-center justify-between px-6 py-3">
      <Link href="/" className="text-2xl font-bold tracking-tight text-primary">Operators-AI</Link>
      <div className="flex gap-6 text-sm font-medium">
        <Link href="/product" className="hover:text-primary focus-visible:outline focus-visible:outline-2">Product</Link>
        <Link href="/industries" className="hover:text-primary focus-visible:outline focus-visible:outline-2">Industries</Link>
        <Link href="/pricing" className="hover:text-primary focus-visible:outline focus-visible:outline-2">Pricing</Link>
        <Link href="/demo" className="hover:text-primary focus-visible:outline focus-visible:outline-2">Demo</Link>
        <Link href="/trust" className="hover:text-primary focus-visible:outline focus-visible:outline-2">Trust</Link>
        <Link href="/blog" className="hover:text-primary focus-visible:outline focus-visible:outline-2">Blog</Link>
        <Link href="/contact" className="hover:text-primary focus-visible:outline focus-visible:outline-2">Contact</Link>
      </div>
      <Link href="/waitlist" className="bg-primary text-black px-4 py-2 rounded font-semibold hover:scale-105 transition focus-visible:outline focus-visible:outline-2">Join Waitlist</Link>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-accent py-8 mt-16 text-center text-xs text-gray-500 bg-black/80">
      <div className="mb-2">&copy; {new Date().getFullYear()} Operators-AI. All rights reserved.</div>
      <div className="flex justify-center gap-4">
        <Link href="/trust">Trust Center</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/contact">Contact</Link>
        <a href="https://x.com/operatorsai" target="_blank" rel="noopener noreferrer">X</a>
        <a href="https://linkedin.com/company/operatorsai" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <WorkspaceProvider>
        <html lang="en" className="dark" suppressHydrationWarning>
          <body className="min-h-screen bg-background text-foreground font-sans antialiased">
            <Nav />
            <div className="min-h-[80vh]">{children}</div>
            <Footer />
          </body>
        </html>
      </WorkspaceProvider>
    </ClerkProvider>
  );
}
