# Implementation Plan: Full-Site Audit & Customer Portal (full-site-audit-portal_20260224)

## Phase 1: Full-Site Audit & Discovery
- [x] **Task: Automated Visual Audit**
    - [x] Create a Playwright script to navigate all routes (Home, Services, About, Admin, Auth).
    - [x] Capture full-page screenshots at 3 viewports (Mobile, Tablet, Desktop).
    - [x] Generate a visual report identifying layout shifts or spacing inconsistencies.
- [x] **Task: Accessibility & Visibility Audit (Site-Wide)**
    - [x] Run Axe-core scans on all unique templates.
    - [x] Manually verify contrast for custom components (cards, badges, buttons) across all sections.
    - [x] Audit keyboard focus indicators and navigation order on non-homepage views.

## Phase 2: Customer Portal Foundation
- [x] **Task: Auth Configuration & UI**
    - [x] Set up Firebase Auth providers for Google and Apple (if not already configured).
    - [x] Implement/Refine Login and Signup pages following the "Luxury" design pattern.
    - [x] Create the Customer Dashboard shell (`/dashboard`) with navigation and profile overview.
- [x] **Task: Functional Auth Integration**
    - [x] Implement Google Sign-In and Apple Sign-In logic.
    - [x] Implement traditional email/password registration and validation.
    - [x] Add session management and protected route middleware for the portal.

## Phase 3: Consistency Fixes & Refinement
- [x] **Task: UI Consistency Cleanup**
    - [x] Standardize border radii, shadows, and hover effects across all sections identified in Phase 1.
    - [x] Fix any accessibility violations found in Phase 1 (site-wide).
    - [x] Synchronize heading levels and typography weights across modules.
- [x] **Task: Final Visual Polish**
    - [x] Apply "Smart Red" accents and "Primary Black" backgrounds consistently.
    - [x] Refine the Booking flow steps to match the portal's aesthetic.

## Phase 4: Verification
- [x] **Task: Final Regression Audit**
    - [x] Re-run screenshots to verify fixes.
    - [x] Manual walkthrough of the full Customer journey (Register -> Login -> Dashboard -> Book).
- [x] **Task: Final Review & Sync**
    - [x] Update project documentation to reflect new portal structure.
    - [x] Ensure all code adheres to Google Style Guides.

## Phase: Review Fixes
- [x] Task: Apply review suggestions db222e0
