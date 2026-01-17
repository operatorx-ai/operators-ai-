import "../styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Operators-AI: Human-First Automation Platform",
  description: "Premium AI automation platform with human-in-the-loop, audit trails, and controls."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
