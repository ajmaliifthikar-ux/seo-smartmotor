# Specification: Systematic Codebase Audit & Technical Debt Cleanup

## Overview
This track aims to optimize the Smart Motor codebase by identifying and removing unused files, consolidating conflicting technical implementations, and purging redundant boilerplate. The goal is to achieve a lean, high-performance architecture with "zero breakage" through continuous build validation.

## Functional Requirements

### 1. File System Sanitization
- **Purge Obsolete Files:** Automatically detect and move `.bak`, `.tmp`, `.old`, and manual "copy" files (e.g., `theme copy/`) to a root `/_junk_archive/` folder.
- **Root Cleanup:** Remove temporary icons and transient files from the root directory (e.g., `icons_list.tmp`, `professional_investment_email.png`).

### 2. Technical Conflict Consolidation
- **Firebase Unification:** Consolidate `src/lib/firebase.ts` and `src/lib/firebase-client.ts`. Ensure all client-side components use a single, optimized entry point.
- **Provider Pruning:** Scan `src/components/providers/` and `src/app/layout.tsx` to remove any remaining NextAuth remnants or unused context providers.

### 3. Component & Route Audit
- **Dead Route Removal:** Identify and remove unused API routes or page routes (e.g., `src/app/api/auth/create-test-user`).
- **Unused Component Scan:** Use dependency tracking to identify components in `src/components/` that are no longer imported anywhere in the application.

### 4. Safety & Verification (Zero Breakage)
- **Safeguard Archiving:** Instead of immediate deletion, all "suspected junk" must be moved to `/_junk_archive/`.
- **Continuous Validation:** Execute `npm run build` (or `tsc`) after every atomic cleanup operation to ensure no circular dependencies or broken imports are introduced.

## Acceptance Criteria
- [ ] No `.bak` or `.tmp` files remaining in `src/`.
- [ ] Firebase client logic consolidated into a single file.
- [ ] Unused providers removed from the root layout.
- [ ] `npm run build` completes successfully with zero type errors.

## Out of Scope
- Refactoring active business logic (cleanup only).
- Significant UI redesigns.
