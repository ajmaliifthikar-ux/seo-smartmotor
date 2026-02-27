# Implementation Plan: Agentic Admin OS - Full Functional Implementation

## Phase 1: Core Architecture & Basecamp Sync [checkpoint: 5599b58]
Goal: Establish the Triple-Layer Memory infrastructure and connect the Basecamp Roster to live Firestore data.

- [x] Task: Implement the `TripleLayerMemory` class in `src/lib/ai-memory.ts`. (3f51912)
    - [x] Write Tests: Verify isolation between Global, Specialist, and Personal Staff memory layers.
    - [x] Implement Feature: Develop logic for merging memory layers during prompt construction.
- [x] Task: Refactor `getAllUsers` and `mapRoleToDepartment` in `src/app/admin/basecamp/roster/page.tsx` for production. (a0c01d8)
    - [x] Write Tests: Verify Firestore data transformation and role-to-department mapping accuracy.
    - [x] Implement Feature: Connect Roster to real-time Firestore listeners for status updates.
- [x] Task: Build the "Employee Status" auto-sync system. (42e46d8)
    - [x] Write Tests: Verify user status changes to 'active' on login and 'away' after inactivity.
    - [x] Implement Feature: Develop a lightweight presence system using Firestore/Redis.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Core Architecture & Basecamp Sync' (Protocol in workflow.md)

## Phase 2: Strategy Lab - Deep Research & SEO Race [checkpoint: 029a0d8]
Goal: Replace agents with a Deep Research Console featuring shimmering text, progress rings, and a document viewer.

- [x] Task: Create the `DeepResearchConsole` component. (2ba0b2a)
    - [x] Write Tests: Verify shimmering text states and progress ring visibility during "Research" mode.
    - [x] Implement Feature: Build the UI with input field, Research trigger, and dynamic status updates.
- [x] Task: Implement the "Market Intelligence Document" generator. (5a18919)
    - [x] Write Tests: Verify document structure generation from Perplexity/Gemini output.
    - [x] Implement Feature: Develop the integrated Document Viewer for the Strategy Lab.
- [x] Task: Build the "SEO Race" dashboard. (8721a60)
    - [x] Write Tests: Verify rendering of keyword volume charts and competitor comparison cards.
    - [x] Implement Feature: Integrate live SERP tracking and create the actionable SEO timeline UI.
- [x] Task: Activate real-time synthesis loop for Strategy Lab. (81bfbd)
    - [x] Write Tests: Verify Perplexity web search result synthesis into structured internal reports.
    - [x] Implement Feature: Update `/api/ai/market-research` and `/api/ai/seo-intelligence` with production logic.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Strategy Lab - Deep Research & SEO Race' (Protocol in workflow.md) (029a0d8)

## Phase 3: Broadcasting - Integrated Planning Hub [checkpoint: 43e2010]
Goal: Combine Calendar, Content Studio, and Scheduler into a single functional department.

- [x] Task: Reorganize Sidebar and Route Structure. (5a9a7d9)
    - [x] Implement Feature: Move existing CMS tools to "Website CMS" and group Broadcasting tools.
- [x] Task: Enhance Content Studio with Instagram/Social Generator. (5ede7bc)
    - [x] Write Tests: Verify Gemini prompt generation for social posts.
    - [x] Implement Feature: Add "Sample Ideas" list (4-5 pre-loaded prompts) for rapid generation.
- [x] Task: Finalize the Planning Calendar. (d9e1d5c)
    - [x] Write Tests: Verify clicking a calendar day opens the correct content detail view.
    - [x] Implement Feature: Build the content card overlay (image preview + written description).
- [x] Task: Conductor - User Manual Verification 'Phase 3: Broadcasting - Integrated Planning Hub' (Protocol in workflow.md) (43e2010)

## Phase 4: Workbench & Operations HQ
Goal: Deploy the full-screen standalone Copilot and Multimodal operations.

- [x] Task: Implement Multimodal File Processing for the Workbench. (b1fac1d)
    - [x] Write Tests: Verify text extraction from PDF, CSV, and Excel using Gemini.
    - [x] Implement Feature: Develop backend to handle file uploads and visual intelligence.
- [x] Task: Build the "Draft Export" system for reports and content. (fecf04c)
    - [x] Write Tests: Verify generation of valid `.md` and `.txt` files from AI output.
    - [x] Implement Feature: Add "Download as Report" button to Workbench chat.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Workbench & Operations HQ' (Protocol in workflow.md)

## Phase 5: Full Analytics & Automation activation [checkpoint: cf041b2]
Goal: Replace dashboard mocks with live data and deploy proactive alerts.

- [x] Task: Integrate Live Conversion Intelligence and Revenue metrics. (23e14c5)
    - [x] Write Tests: Verify revenue calculation and booking success rates from live Firestore.
    - [x] Implement Feature: Update Dashboard StatCards with real-time performance data.
- [x] Task: Build the "Proactive Alert" autonomous notification system. (23e14c5)
    - [x] Write Tests: Verify alerts are triggered when market trends or traffic anomalies are detected.
    - [x] Implement Feature: Develop the background monitor and notification center logic.
- [x] Task: Conductor - User Manual Verification 'Phase 5: Full Analytics & Automation activation' (Protocol in workflow.md) (cf041b2)
