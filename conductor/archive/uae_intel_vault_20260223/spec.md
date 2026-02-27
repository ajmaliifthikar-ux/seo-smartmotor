# Specification: UAE Automotive Intelligence Portal & Engineering Vault

## Overview
This track establishes Smart Motor as the primary UAE automotive authority by deploying two major SEO "magnets": the **UAE Driver's Hub** (Traffic Fines, Regulations, Safety) and the **Supercar Engineering Vault** (Comparison Tool). It also finalizes the synchronization of all existing brand, service, and blog data.

## Functional Requirements

### 1. Data Synchronization & Seeding (The Engine)
- **Script Repair:** Refactor existing seeding scripts to use `tsx` and implement the **Upsert by Slug** strategy.
- **Blog Integration:** Seed all 8 "Smart Tips" blog posts to the `/blog` collection.
- **Brand/Service Logic:** Sync 18 luxury brands and 9 detailed services with hierarchical package data.
- **Supercar Knowledge:** Parse `Luxury-Supercars-Guide.md` into a new `car_knowledge` Firestore collection.

### 2. UAE Driver's Intelligence Hub (SEO Hub)
- **Traffic Fines Index:** A dedicated, searchable interface for UAE/Abu Dhabi traffic violations.
- **Regulations Guide:** Detailed content pages for window tinting laws, modified exhaust rules, and vehicle import procedures.
- **Summer Safety Hub:** Guidance on UAE-specific heat protection, AC maintenance, and coolant health.
- **AI Refresh Logic:** Enable the SEO Swarm to periodically verify and update these rules from official UAE digital sources.

### 3. Supercar Engineering Vault (The Magnet)
- **Comparison Engine:** A side-by-side spec-card interface allowing users to select 2-3 models from the `car_knowledge` collection.
- **Technical Cards:** Display Power, Torque, 0-60, and Top Speed in a carbon-fiber themed layout.
- **Conversion Loop:** Integrate "Leyla's Smart Tip" within comparison cards, linking users to relevant services (e.g., Engine Diagnostics for a Ferrari SF90).

### 4. UI/UX & Branding
- **Footer Entry:** Add a minimalist, high-contrast link: `[ VIRTUAL ENGINEERING VAULT ]`.
- **Portal Aesthetic:** Maintain the "Smart Motor Gold Standard" (Glassmorphism, Primary Black, Smart Red).

## Acceptance Criteria
- [ ] All 8 blogs, 9 services, and 18 brands live without duplicates.
- [ ] Supercar comparison tool functional with side-by-side spec cards.
- [ ] Driver's Hub pages indexed and reachable via footer.
- [ ] All pages handle SEO keywords: "Abu Dhabi traffic fines", "UAE tinting laws", etc.

## Out of Scope
- Direct API integration with MOI/Police for fine checking (content is informative only).
- Supercar booking/sales (platform remains service-focused).
