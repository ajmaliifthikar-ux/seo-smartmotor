# Track Specification: Agentic Admin OS - Full Functional Implementation

## 1. Overview
This track transforms the existing mocked Admin Panel into a fully functional, high-fidelity **Agentic OS** with five distinct departments. The goal is to move from static UI components to a live, data-driven ecosystem powered by **Firestore**, **Perplexity**, and **Gemini 2.0 Flash**.

## 2. Functional Requirements

### 2.1 5-Department Architecture & UI/UX Refinements
- **Dashboard (Control Center):** Real-time KPI widgets and a "Quick Actions" grid for agentic tasks.
- **Strategy Lab (Intelligence HQ):** 
    - **Deep Research Console:** Replaces simple chatbots with a technical input + "Deep Research" trigger.
    - **Live Feedback:** Shimmering dynamic status updates (e.g., "Analyzing SERP trends...", "Fetching competitor data...") and circular progress rings.
    - **SEO Intelligence (The SEO Race):** Dashboard of keyword cards, volume charts, competitor tracking, and an actionable timeline/roadmap.
    - **Market Searcher:** Generates comprehensive "Market Intelligence Documents" viewable in an integrated document viewer.
    - **Full Analytics:** Deep metrics, conversion tracking, and SERP visibility widgets.
- **Broadcasting (Content HQ):**
    - **Integrated Planning Hub:** Combines the Calendar, Scheduler, and AI Generator.
    - **Content Studio:** Instagram/Social post generator (powered by Gemini) with pre-loaded "Sample Ideas" for rapid demo.
    - **Functional Calendar:** Clicking a day reveals the scheduled content card (images + written descriptions).
- **Workbench (Operations HQ):**
    - **Standalone Copilot:** A full-screen "Gemini-style" web app interface.
    - **Persona:** Speaks specifically for Smart Motor (technical, informative, elite).
    - **Multimodal:** Supports file analysis (PDF/CSV/Excel) and visual intelligence.
    - **Draft Exporting:** Generate and download structured reports directly from chat.
- **Website CMS (New Section):**
    - Moved existing Service Catalog and Brand profiles here for isolated content management.
- **Basecamp (People HQ):**
    - **Team Roster:** Live Firestore-backed directory with employee profiles and status sync.
    - **Office HQ:** Centralized knowledge base and operational alerts.

### 2.2 AI Memory Architecture (Triple-Layer)
- **Global Brain:** Shared company knowledge, brand voice, and real-time market insights.
- **Specialist Memory:** Isolated technical context for specific agents (e.g., SEO technical logs).
- **Personal Staff Memory:** Individual interaction history and preferences for each logged-in employee.

### 2.3 Operational Automation
- **One-Click Approval:** Workflow for human-in-the-loop execution of AI-generated content or actions.
- **Proactive Alerts:** Autonomous notifications triggered by market shifts or performance anomalies.
- **Real-time Status Sync:** Automatic "Employee Status" (Active/Busy) based on platform activity.

### 2.4 Live Analytics Integration
- **Traffic & Heatmaps:** Real-time user engagement tracking (GA4 + Internal logs).
- **Conversion Intelligence:** Live revenue and booking performance metrics from Firestore.
- **AI Efficiency Tracker:** Monitoring agent performance, task success, and token costs.

## 3. Technical Requirements
- **Database:** Migrate all remaining mocked entities to **Firestore** (`smartmotordb`).
- **AI APIs:** Implement production-ready integration for **Perplexity (Sonar Pro)** and **Gemini 2.0 Flash**.
- **Real-time Engine:** Utilize Firestore listeners for live status updates and dashboard metrics.
- **Security:** Maintain RBAC (Role-Based Access Control) for sensitive departments like Strategy Lab and Basecamp.

## 4. Acceptance Criteria
- All 5 departments are accessible and functional with live (non-mocked) data.
- AI Agents successfully perform live web searches and analyze uploaded documents.
- The Team Roster accurately reflects the Firestore `users` collection.
- Dashboards update in real-time without requiring manual page refreshes.
- Proactive alerts are successfully delivered based on pre-defined logic.

## 5. Out of Scope
- Integration with 3rd-party social media APIs for *direct* posting (execution will be handled via internal "Approved" status for now).
- Advanced employee payroll or financial accounting modules.
