# Plan: Phase 2: AI Integration

## Phase 2.1: Leyla Voice Mode (Frontend)
- [ ] [GEMINI] Create `/leyla` page layout (Immersive, dark mode default).
- [ ] [GEMINI] Implement `AudioRecorder` and `AudioPlayer` components using Web Audio API.
- [ ] [GEMINI] Create "Waveform" visualizer (Framer Motion).

## Phase 2.2: Native Audio Integration (Backend)
- [ ] [CLAUDE] Implement `src/app/actions/voice-chat.ts` to handle audio streaming.
- [ ] [CLAUDE] Connect to `gemini-2.5-flash-native-audio-preview` via Google GenAI SDK.
- [ ] [CLAUDE] Handle bi-directional streaming (WebSocket or chunked HTTP response).

## Phase 2.3: Content Studio (Admin)
- [ ] [GEMINI] Build `/admin/studio` layout (Options grid: Blog, Social, Email).
- [ ] [GEMINI] Implement "Drafting Interface" (Prompt input, Tone selector, Output preview).
- [ ] [CLAUDE] Create `ContentAgent` (`src/lib/agents/content.ts`) to generate text.
- [ ] [GEMINI] Connect "Publish" button to Firestore (`src/lib/db/content.ts`).

## Phase 2.4: Knowledge Sync
- [ ] [CLAUDE] Ensure `agent-leyla.ts` pulls dynamic FAQ data from Firestore on every session start.

## Phase: Review Fixes
- [x] Task: Apply review suggestions f856a7f
