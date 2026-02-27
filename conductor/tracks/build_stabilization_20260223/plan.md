# Plan: Systematic Build Stabilization & Zero-Defect Enforcement

## Phase 1: Module Resolution & Dead Code Purge
Goal: Fix the "Cannot find module" errors by correcting imports and removing dead references.

- [ ] Task: Audit and fix imports referencing `src/components/sections` (Legacy) -> `src/components/v2/sections`.
- [ ] Task: Remove all references to `src/app/api/auth` and `src/app/api/dev` in `next-env.d.ts` or `tsconfig` (if any).
- [ ] Task: Delete any remaining scripts in `scripts/` that import `@prisma/client`.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Module Resolution' (Protocol in workflow.md)

## Phase 2: Type Definition hardening
Goal: Ensure data flowing from Firestore to the UI is correctly typed.

- [ ] Task: Define strict interfaces for `Brand`, `Service`, and `BlogPost` in `src/types/index.ts` matching the new Firestore schema.
- [ ] Task: Update `src/lib/firebase-admin.ts` to cast Firestore results to these new interfaces.
- [ ] Task: Update `src/app/brand/[slug]/page.tsx` and `src/app/smart-tips/[slug]/page.tsx` to use the new types.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Type Safety' (Protocol in workflow.md)

## Phase 3: Component Prop Stabilization
Goal: Fix component-level type errors in the UI tree.

- [ ] Task: Fix type errors in `BookingForm`, `BrandCarousel`, and `Hero` components.
- [ ] Task: Resolve `param` type issues in `generateMetadata` and page components (Next.js 15+ strictness).
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Component Stability' (Protocol in workflow.md)

## Phase 4: Final Build Verification
Goal: Achieve the "Green Build".

- [ ] Task: Run `npx tsc --noEmit` and resolve any final stragglers.
- [ ] Task: Execute `npm run build` to verify production readiness.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Green Build' (Protocol in workflow.md)
