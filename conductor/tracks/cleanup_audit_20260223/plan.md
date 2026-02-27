# Plan: Systematic Codebase Audit & Technical Debt Cleanup

## Phase 1: Global File Sanitization
Goal: Clear the tree of obvious junk and non-source files.

- [ ] Task: Create `/_junk_archive/` and move root-level transient files (`*.png`, `*.html`, `*.tmp`).
- [ ] Task: Recursively find and move all `.bak`, `.old`, and `.copy` files to the archive.
- [ ] Task: Perform a "Continuous Build Check" (`npx tsc`) to ensure no essential files were misidentified.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: File Sanitization' (Protocol in workflow.md)

## Phase 2: Technical Consolidation (Firebase & Providers)
Goal: Unify core technical implementations and remove redundant boilerplate.

- [ ] Task: Analyze imports for `src/lib/firebase.ts` vs `src/lib/firebase-client.ts`.
- [ ] Task: Consolidate into `src/lib/firebase-client.ts` and update all relative imports.
- [ ] Task: Scan `src/components/providers/` for unused contexts and remove from `src/app/layout.tsx`.
- [ ] Task: Run full `npm run build` to verify architecture integrity.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Tech Consolidation' (Protocol in workflow.md)

## Phase 3: Route & Component Pruning
Goal: Strip away dead routes and orphaned UI components.

- [ ] Task: Identify and remove dead API routes (e.g., NextAuth remnants).
- [ ] Task: Run a dependency scan to find components in `src/components/` with zero inbound imports.
- [ ] Task: Move identified unused components to the junk archive.
- [ ] Task: Perform "Final Build Validation" to guarantee zero breakage.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Route/Component Pruning' (Protocol in workflow.md)

## Phase 4: Final Cleanup & Removal
Goal: Permanently remove the junk archive after user confirmation.

- [ ] Task: Present the contents of `/_junk_archive/` to the user for final approval.
- [ ] Task: Permanently delete the archive folder.
- [ ] Task: Final project build and type-check.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Verification' (Protocol in workflow.md)
