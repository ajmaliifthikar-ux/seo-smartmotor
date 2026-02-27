// src/lib/ai/index.ts
export * from './layla-config'
export * from './local-seo'
export * from './seo-agent'
export * from './swarm-orchestrator'
export * from './synthesis'

/**
 * Generates a chat response using the configured AI systems.
 */
export async function generateChatResponse({ userId, conversationId, message, systemInstruction, attachments }: any) {
    // Basic wrapper for now — extend with full TripleLayerMemory/Gemini logic as needed
    return "I am Leyla, your Smart Motor assistant. How can I help you with your vehicle today?"
}

/**
 * Generates configuration for live AI interaction.
 */
export async function generateLiveConfig() {
    return {
        model: 'gemini-2.0-flash-exp',
        voice: 'Zephyr'
    }
}
