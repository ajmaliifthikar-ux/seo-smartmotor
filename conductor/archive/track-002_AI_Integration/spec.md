# Specification: Phase 2: AI Integration

## Goal
Leyla is live with Voice capabilities, and the AI-powered Content Engine is operational.

## Deliverables
1.  **Leyla Voice Mode:**
    *   Dedicated page `/leyla` with immersive UI.
    *   Native Audio streaming using `gemini-2.5-flash-native-audio-preview`.
    *   "Call" interface (Mic toggle, Waveform visualization).
2.  **Content Studio (`/admin/studio`):**
    *   UI for selecting content type (Blog, Social, Email).
    *   AI Drafting Agent (`gemini-2.5-flash`) that generates content based on "Brand Tone".
    *   Editor for human review and publishing.
3.  **Knowledge Base Sync:**
    *   Ensure FAQ edits in CMS update Leyla's system prompt context (or Vector DB if needed later).

## Exit Criteria
- Customers can talk to Leyla via voice on the website.
- Admins can generate a blog post draft in < 1 minute.
