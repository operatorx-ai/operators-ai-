# Operators-AI

World-class AI automation platform for human-first, compliant automation.

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Configure environment:**
   - Copy `.env.example` to `.env.local` and add your `OPENAI_API_KEY`.
3. **Run locally:**
   ```sh
   npm run dev
   ```

## Deployment

- Deploy to [Vercel](https://vercel.com/) for best experience.
- Set `OPENAI_API_KEY` in Vercel project settings.

## Tech Stack
- Next.js (App Router, TypeScript)
- TailwindCSS
- shadcn/ui (Radix)
- Framer Motion
- OpenAI API (server-side only)
- Zod, React Hook Form
- Vitest, Playwright
- GitHub Actions, CodeQL, Dependabot

## Notes
- All code is at repo root (no nested project folder).
- Insert your OpenAI API key in `.env.local`.
- No chat logs are stored by default (privacy-first).
- See `/src/config/` for pricing, industries, and agent catalog configs.

---

© 2026 Operators-AI. All rights reserved.
