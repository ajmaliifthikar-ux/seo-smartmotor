# Specification: Fix Firebase Migration Vulnerabilities & Theme Issues

## Overview
This track addresses the critical security vulnerabilities, logical bugs, and performance issues identified in the recent code review of the Firebase migration and Smart Motor theme update.

## Functional Requirements
- **Security Fixes**:
    - Remove hardcoded `GEMINI_API_KEY` from `src/lib/ai-memory.ts` and ensure it's exclusively pulled from environment variables.
    - Remove hardcoded admin emails from `src/auth.ts`. Implement a check that verifies the `role` field in the Firestore `users` collection is set to `ADMIN`.
- **Logic & Correctness**:
    - Fix the infinite recursion in `src/actions/cms-actions.ts` where `updateBrandAction` calls itself instead of `updateBrand`.
    - Fix the `TripleLayerMemory` in `src/lib/ai-memory.ts` to correctly record the user's message in history before generating a response.
    - Fix unsafe non-null assertions in `src/lib/firebase-admin.ts` to prevent potential runtime crashes if Firebase fails to initialize.
- **Performance & Reliability**:
    - Add `useEffect` cleanup to `src/hooks/use-audio-streamer.ts` to properly stop microphone tracks and close the `AudioContext`.
    - Improve error handling in `src/lib/rate-limit.ts` to propagate specific Redis errors instead of a generic message.

## Testing Requirements
- **New Unit Tests**:
    - Add tests for `TripleLayerMemory` to verify multi-turn conversation history persistence.
    - Add tests for `useAudioStreamer` (mocking MediaRecorder/AudioContext) to verify cleanup on unmount.
    - Add tests for `auth.ts` logic to verify the Firestore role check.

## Acceptance Criteria
- [ ] No hardcoded secrets in the codebase.
- [ ] Admin access restricted to users with `role: ADMIN` in Firestore.
- [ ] Brand updates succeed without stack overflow errors.
- [ ] Conversations maintain context across multiple turns.
- [ ] Microphone turns off correctly when the audio hook unmounts.
- [ ] Unit tests pass for all modified modules.

## Out of Scope
- Migrating other SQL-based tables not yet addressed in the initial Firebase PR.
- Redesigning the `EmergencyFAB` or `AIChatPanel` UI (fixes only).
