

import type { Metadata } from "next";
import Link from "next/link";
import { ClerkProvider } from "@clerk/nextjs";
import { OrganizationSwitcher } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Operators-AI",
  description: "AI agents + automation for every industry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground">
        <ClerkProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-64px)]">{children}</main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Operators-AI
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/product" className="hover:text-primary">
            Product
          </Link>
          <Link href="/industries" className="hover:text-primary">
            Industries
          </Link>
          <Link href="/pricing" className="hover:text-primary">
            Pricing
          </Link>
          <Link href="/demo" className="hover:text-primary">
            Demo
          </Link>
          <Link href="/trust" className="hover:text-primary">
            Trust
          </Link>
          <Link href="/blog" className="hover:text-primary">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-primary">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <OrganizationSwitcher />
          <Link
            href="/waitlist"
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Join Waitlist
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Operators-AI. All rights reserved.
      </div>
    </footer>
  );
}
