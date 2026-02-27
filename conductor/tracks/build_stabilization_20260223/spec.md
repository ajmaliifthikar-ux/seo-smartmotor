# Specification: Systematic Build Stabilization & Zero-Defect Enforcement

## Overview
This track focuses on achieving a "Green Build" by systematically resolving the ~240 identified type errors and module resolution conflicts. It prioritizes the stability of the core platform (Brand, Service, Blog pages) and the integrity of the data processing scripts.

## Functional Requirements

### 1. Module Resolution Repair
- **Fix Broken Imports:** Identify and correct all imports pointing to archived files (e.g., `src/components/sections`, `src/app/api/auth`).
- **Path Mapping:** Ensure `tsconfig.json` paths align with the new file structure, specifically for `src/lib/firebase-client` and `src/lib/firebase-admin`.

### 2. Type Safety Enforcement
- **Page Props Validation:** Refactor `BrandPage`, `ServicePage`, and `BlogPostPage` to strictly type their `params` and data fetching results.
- **Firestore Data Typing:** Update `adminGetAllBrands`, `adminGetAllServices`, and `adminGetAllPublishedContent` to return strongly-typed interfaces matching the new Firestore schema.
- **Script Hygiene:** Remove or refactor any remaining scripts in `scripts/` that still reference `@prisma/client`.

### 3. Build Integrity
- **Production Build:** The ultimate success metric is a successful `npm run build` execution.
- **Zero "Any":** Reduce the usage of `any` in critical data paths to prevent runtime crashes.

## Acceptance Criteria
- [ ] `npx tsc --noEmit` returns zero errors.
- [ ] `npm run build` completes successfully.
- [ ] No imports reference files in `_junk_archive`.
- [ ] All critical pages (Home, Brand, Service, Blog) render without server errors.

## Out of Scope
- New feature development (strictly fix-only).
- UI design changes (unless required to fix a type error).
