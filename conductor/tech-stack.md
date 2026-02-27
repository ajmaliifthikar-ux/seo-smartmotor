# Tech Stack

## Core Application Layer
- **Framework:** Next.js 16.1.6 (App Router)
- **Language:** TypeScript 5+
- **Runtime:** Node.js 22+

## Data Layer
- **Database:** Firebase Firestore (NoSQL) - *Migrated from Postgres/Prisma*
- **ORM:** None (Direct Firestore SDK)
- **Cache/Memory:** Redis (Upstash)

## Authentication & Security
- **Auth:** Firebase Auth + Admin SDK
- **Session:** Unified Session Utility (Direct Firebase Token Cookies)
- **Hashing:** bcryptjs
- **2FA:** speakeasy + QRCode
- **Bot Protection:** reCAPTCHA v3

## AI & Intelligence
- **SDK:** Google Gemini SDK (gemini-2.0-flash, text-embedding-004)
- **Search:** Perplexity Sonar-Pro
- **Orchestration:** Multi-Agent Swarm (Swarm Orchestrator)
- **Agents:** Technical SEO Auditor, Local SEO Specialist, PhD Business Researcher
- **Intelligence Frameworks:** MECE, Issue Trees, Unit Economics Analysis

## Frontend & Design
- **Styling:** Tailwind CSS v4
- **Components:** Shadcn UI (Radix)
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Charts:** Recharts

## Infrastructure
- **Hosting:** Vercel
- **Email:** Resend + React Email
- **Validation:** Zod
