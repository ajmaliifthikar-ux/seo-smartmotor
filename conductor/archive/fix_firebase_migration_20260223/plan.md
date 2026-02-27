# Plan: Fix Firebase Migration Vulnerabilities & Theme Issues

## Phase 1: Security and Authentication Fixes
- [x] Task: Remove hardcoded `GEMINI_API_KEY` from `src/lib/ai-memory.ts` and set it to load from `process.env.GEMINI_API_KEY`.
- [x] Task: Refactor `src/auth.ts` to remove hardcoded admin emails. Implement a check that verifies the `role` field in the Firestore `users` collection is set to `ADMIN`.
- [x] Task: Fix the infinite recursion in `src/actions/cms-actions.ts` by calling the `updateBrand` utility instead of the action itself.
- [x] Task: Write tests to verify the new `auth.ts` role-based access logic.

## Phase 2: AI Logic and Memory Correctness
- [x] Task: Update `TripleLayerMemory` in `src/lib/ai-memory.ts` to call `addMessage` for the user's current message before generating an AI response.
- [x] Task: Refactor `src/lib/firebase-admin.ts` to remove unsafe non-null assertions and handle initialization failures gracefully.
- [x] Task: Write tests for `TripleLayerMemory` to verify that multi-turn conversation context is correctly persisted in the history.

## Phase 3: Performance, Reliability, and Cleanup
- [x] Task: Implement `useEffect` cleanup in `src/hooks/use-audio-streamer.ts` to stop media tracks and close the `AudioContext`.
- [x] Task: Refactor error handling in `src/lib/rate-limit.ts` to propagate specific Redis errors instead of a generic message.
- [x] Task: Write tests for `useAudioStreamer` to verify that cleanup is triggered on component unmount (using mocks).

## Phase 4: Final Verification
- [x] Task: Run all new and existing tests to ensure no regressions.
- [x] Task: Verify the \"Fixes\" in a local development environment.
- [x] Task: Perform a final code audit to ensure no new secrets or bugs were introduced.
- [x] Task: Conductor - User Manual Verification 'Final Verification' (Protocol in workflow.md)
