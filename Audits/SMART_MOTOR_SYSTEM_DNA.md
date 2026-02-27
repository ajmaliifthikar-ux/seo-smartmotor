# Smart Motor Platform: System DNA & Replication Blueprint
**Version:** 2.0 (The Origin File)
**Purpose:** This document serves as the absolute, 1:1 technical heartbeat and architectural DNA of the Smart Motor Platform. It contains the exact specifications, folder structures, database schemas, and AI prompts required to perfectly recreate or understand this application from scratch.

---

## 1. Technical Stack DNA (The Exact Build)

If you are cloning this project, you must use the following exact technologies and versions to maintain parity.

*   **Core Framework:** Next.js 14/15 (App Router explicitly).
*   **Language:** TypeScript (Strict mode enabled).
*   **Database ORM:** Prisma Client (`prisma`, `sqlite` for dev, `postgresql` for production).
*   **Styling Engine:** Tailwind CSS + Shadcn UI components.
*   **Memory/Cache:** Redis (via `ioredis` with `lazyConnect` for Vercel serverless compatibility).
*   **Authentication:** Firebase Auth (Admin SDK for backend route protection).
*   **AI Providers:** 
    *   Google Gemini SDK (`@google/genai` for native audio, `@google/generative-ai` for standard REST calls).
    *   Perplexity API (via standard OpenAI SDK format `https://api.perplexity.ai`).

---

## 2. Directory Structure DNA (The Skeleton)

The application is structured using a strict Next.js App Router paradigm. Do not deviate from this layout.

```text
/smartmotorlatest
├── prisma/                  # Database
│   ├── schema.prisma        # The absolute source of truth for the database
│   └── dev.db               # Local SQLite database
├── src/
│   ├── app/                 # Next.js App Router (All Pages & APIs)
│   │   ├── (company)/       # Public marketing pages (Home, About, Services)
│   │   ├── admin/           # The Admin OS (Protected routes)
│   │   ├── api/             # Backend API routes (REST endpoints)
│   │   ├── auth/            # Firebase login pages
│   │   └── leyla/           # The public AI voice assistant page
│   ├── components/          # Reusable UI (React)
│   │   ├── admin/           # Admin-specific components (Dashboards, Sidebar)
│   │   ├── ui/              # Shadcn UI base components (Buttons, Cards)
│   │   └── ...              # Marketing components
│   ├── hooks/               # Custom React hooks (e.g., use-gemini-live.ts)
│   └── lib/                 # The Middleware & AI Brain
│       ├── agents/          # Individual AI Agent logic
│       ├── ai-memory.ts     # The Triple-Layer Redis Memory system
│       ├── firebase-db.ts   # Firebase Admin integrations
│       ├── perplexity.ts    # Live web search integrations
│       ├── prisma.ts        # Database client singleton
│       └── tools/           # Function Calling tools (e.g., calendar-tools.ts)
```

---

## 3. Database Schema DNA (The Data Vault)

The database is managed by Prisma. Below are the critical, non-negotiable models that must exist for the system to function.

*   **User & Auth:** `User`, `Account`, `Session` (Handles standard identity).
*   **Operations:**
    *   `Booking`: Links a `userId`, `serviceId`, `date`, `slot`, and `vehicleBrand`. Status defaults to "PENDING". Must have `@@unique([date, slot])` to prevent double-booking at the database level.
    *   `Service`: Contains `slug`, `basePrice`, `duration`.
    *   `Brand`: Stores luxury car data (`logoUrl`, `heroImage`).
*   **Content Management (CMS):**
    *   `BlogPost`, `FAQ`, `ContentBlock`, `Article`. These tables allow the AI or human admins to generate and store website text without code deploys.
*   **AI & Telemetry:**
    *   `IntegrationTrace`: Logs every API call to Gemini/Redis for debugging.
    *   `AIUsageLog`: Tracks token usage and costs per user/action.
    *   `SEOReport`: Stores historical data of the SEO Swarm runs.

---

## 4. The Admin OS DNA (The Control Center)

The `/admin` route is protected by `src/middleware.ts` which checks for a `firebase-token` cookie before redirecting to Firebase Admin SDK validation. It is structured into 6 specific "Departments" located in `src/components/admin/admin-sidebar.tsx`:

1.  **Dashboard (`/admin/dashboard`)**: The metrics overview.
2.  **Strategy Lab (`/admin/strategy-lab`)**:
    *   `/market`: The **Market Searcher**. Uses `<DeepResearchConsole />` to hit `/api/ai/market-research`.
    *   `/seo`: The **SEO Intelligence Swarm**. Uses `<SeoRaceDashboard />`.
3.  **Broadcasting (`/admin/studio`, `/admin/social-media`)**: Content generation.
4.  **Workbench (`/admin/workbench`)**: Agent testing and prompt engineering.
5.  **Website CMS (`/admin/website-cms`)**: Direct database editing for `ContentBlock` and `BlogPost`.
6.  **Basecamp (`/admin/basecamp`)**: Team and operations management.

---

## 5. The AI Agents DNA (The Digital Brain)

To recreate the AI functionality, you must implement the exact models and prompt structures.

### A. Leyla (The Voice/Text Assistant)
*   **Location:** `src/lib/agent-leyla.ts` & `src/lib/gemini-native-audio.ts`
*   **Model:** `gemini-2.5-flash-native-audio-preview-12-2025` (Requires WebSocket for client-side audio streaming).
*   **System Prompt DNA:** "You are Leyla, a 28-year-old automotive sales specialist at Smart Motor UAE. Use car emojis. Arabic-influenced English. Use the NATO phonetic alphabet to verify spellings."
*   **State Machine:** Must follow 4 strict phases: 1. Greeting -> 2. Info Collection -> 3. Verification (NATO) -> 4. Booking.

### B. The Booking Coordinator
*   **Location:** `src/lib/agents/booking/coordinator.ts`
*   **Model:** `gemini-3.0-flash-preview`
*   **Function Calling:** Must be provided with the `checkAvailability` tool. 
*   **Logic:** Intercepts date requests, queries the Prisma `Booking` table for `date/slot`, and returns either a confirmation or alternate suggestions back to Leyla.

### C. Triple-Layer Memory System
*   **Location:** `src/lib/ai-memory.ts` (Powered by Redis).
*   **Layer 1 (Global Brain):** Static company data (Opening hours: 9 AM - 6 PM, pricing).
*   **Layer 2 (Specialist):** Task-specific memory for internal admin agents.
*   **Layer 3 (Personal):** Isolated `userId` hashes. Expires strictly after 7 days (`TTL = 7 * 24 * 60 * 60`).

### D. Live Market Research Engine
*   **Location:** `src/app/api/ai/market-research/route.ts` & `src/lib/perplexity.ts`
*   **Execution Flow:**
    1.  User submits query in Admin OS.
    2.  `searchWeb(query)` fires to `api.perplexity.ai` using model `sonar-pro` to scrape live internet data and citations.
    3.  Raw Perplexity data is passed to `synthesizeMarketReport()` which uses `gemini-2.0-flash` to format the data into Markdown (Executive Summary, Market Trends, Recommendations).

### E. SEO Swarm Intelligence
*   **Location:** `src/lib/agents/seo/swarm/master-agent.ts`
*   **Execution Flow:** A Master Orchestrator (`gemini-2.0-flash`) triggers specialized sub-prompts for Technical Audit, Content Optimization, and Competitor Analysis, synthesizing them into a prioritized JSON object.

---

## 6. UI & Brand DNA

To ensure the application *looks* identical, you must follow the exact CSS variables found in `src/app/globals.css` and `tailwind.config.ts`.

*   **Primary Accent (The Smart Motor Red):** `#E62329`
*   **Dark Mode Background:** `#0A0A0A` (Charcoal)
*   **Typography:** Strict adherence to high-contrast readability. Light backgrounds *must* force dark text (`--color-text-primary: #121212`).
*   **Textures:** The luxury aesthetic relies on the `.carbon-fiber` CSS class, a complex linear-gradient generating a 3D carbon weave background for specific cards and hero sections.

---
**End of Blueprint.** With this document, any senior engineering team can rebuild the exact Smart Motor platform architecture, database, and AI integrations with zero deviation from the original source.