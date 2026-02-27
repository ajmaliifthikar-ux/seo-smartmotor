# Plan: Phase 1: Foundation (Finalization & Swarm Alignment)

## Phase 1.1: Firebase Core Verification
- [ ] [GEMINI] Audit `src/lib/firebase.ts` and `src/lib/firebase-admin.ts` for correct configuration.
- [ ] [GEMINI] Verify environment variables for Firebase (Project ID, Client Email, Private Key).
- [ ] [GEMINI] Ensure `next.config.js` allows Firebase domains for images.

## Phase 1.2: Database Implementation (Firestore)
- [ ] [GEMINI] Convert Prisma Schema (`User`, `Booking`, `Service`) to Firestore Security Rules.
- [ ] [GEMINI] Implement Firestore data access layer (DAL) in `src/lib/db/`.
- [ ] [CLAUDE] Migrate any existing mock data to Firestore (using `scripts/migrate-to-firebase.ts` if needed).

## Phase 1.3: Logic Implementation (Real API)
- [ ] [CLAUDE] Refactor `src/app/actions` to use real Firestore calls (replace mocks).
- [ ] [CLAUDE] Implement `BookingCoordinator` agent with full database persistence.
- [ ] [CLAUDE] Implement `generateContent` action with real Gemini API call.

## Phase 1.4: Frontend Integration
- [ ] [GEMINI] connect Booking Flow UI (Screens 1-4) to real Server Actions.
- [ ] [GEMINI] Verify Authentication flow (Login/Signup/Profile) works with Firebase Auth.

## Phase 1.5: Deployment Check
- [ ] [GEMINI] Verify Vercel build configuration (`vercel.json`).
- [ ] [GEMINI] Run full build (`npm run build`) to ensure type safety.
