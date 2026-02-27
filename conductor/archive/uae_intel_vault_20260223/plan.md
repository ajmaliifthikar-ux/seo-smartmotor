# Plan: UAE Automotive Intelligence Portal & Engineering Vault

## Phase 1: Data Engine Synchronization & Seeding
Goal: Finalize all core data ingestion using the "Upsert by Slug" strategy.

- [x] Task: Refactor `scripts/seed-blogs.mjs`, `seed-services-detailed.ts`, and `seed-brands-with-services.ts` to use slugs as Document IDs.
    - [x] Write Tests: Verify no duplicate documents are created upon multiple runs.
    - [x] Implement Feature: Execute scripts using `tsx` to sync 8 blogs, 9 services, and 18 brands.
- [x] Task: Implement the `car_knowledge` collection parser.
    - [x] Write Tests: Verify `Luxury-Supercars-Guide.md` is parsed correctly into structured JSON.
    - [x] Implement Feature: Seed 100+ supercar models into Firestore.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Data Synchronization' (Protocol in workflow.md)

## Phase 2: UAE Driver's Intelligence Hub
Goal: Build the informational SEO surface for UAE regulations.

- [x] Task: Scaffold the Hub directory structure and dynamic routes (`/hub/[category]/[slug]`).
    - [x] Write Tests: Verify routing and layout consistency with "Gold Standard" branding.
    - [x] Implement Feature: Create high-fidelity pages for Traffic Fines, Window Tinting, and Exhaust Rules.
- [x] Task: Implement the Traffic Fines Search Engine.
    - [x] Write Tests: Verify search filtering by violation type and Emirate.
    - [x] Implement Feature: Build the glassy, searchable index UI.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Driver Hub Deployment' (Protocol in workflow.md)

## Phase 3: Supercar Engineering Vault
Goal: Deploy the technical comparison tool to attract luxury enthusiasts.

- [x] Task: Build the "Engineering Vault" Comparison Interface.
    - [x] Write Tests: Verify side-by-side spec rendering for up to 3 cars.
    - [x] Implement Feature: Create the carbon-fiber themed comparison tool at `/vault/compare`.
- [x] Task: Implement the "Smart Tip" Conversion Loop.
    - [x] Write Tests: Verify relevant service links appear based on car type (e.g. Italian -> Specialist Oil Change).
    - [x] Implement Feature: Integrate Leyla's recommendations into the technical cards.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Vault Implementation' (Protocol in workflow.md)

## Phase 4: SEO Automation & Global Polish
Goal: Connect the Hub to the SEO Swarm and finalize the entry points.

- [x] Task: Implement Footer Entry Points and Meta-Tag Optimization.
    - [x] Write Tests: Verify SEO tags for specific UAE keywords (e.g. "Abu Dhabi fine check").
    - [x] Implement Feature: Add `[ VIRTUAL ENGINEERING VAULT ]` and `[ DRIVER HUB ]` to footer.
- [x] Task: Automate Hub Refresh via SEO Swarm.
    - [x] Write Tests: Verify Swarm can detect "stale" rule data.
    - [x] Implement Feature: Deploy background job for periodic UAE rule verification.
- [x] Task: Conductor - User Manual Verification 'Phase 4: Global Deployment' (Protocol in workflow.md)
