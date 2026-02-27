import redis from './redis'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// Types
export interface Message {
    role: 'user' | 'assistant' | 'system'
    content: string
    timestamp: number
}

export interface ConversationContext {
    userId: string
    conversationId: string
    messages: Message[]
    metadata?: Record<string, any>
    lastUpdated: number
}

/**
 * Triple-Layer AI Memory Architecture
 * 1. Global Brain: Shared company/market knowledge
 * 2. Specialist Memory: Isolated technical context for specific agents
 * 3. Personal Staff Memory: Individual history/preferences for employees
 */
export class TripleLayerMemory {
    private readonly TTL = 7 * 24 * 60 * 60 // 7 days
    private inMemoryCache: Map<string, string> = new Map()

    /**
     * Layer 3: Store PERSONAL conversation message
     */
    async addMessage(
        userId: string,
        conversationId: string,
        role: 'user' | 'assistant',
        content: string,
        metadata?: Record<string, any>
    ): Promise<void> {
        const message: Message = {
            role,
            content,
            timestamp: Date.now(),
        }

        const key = `conversation:${userId}:${conversationId}`

        try {
            const existingData = await redis.get(key).catch(() => null)
            const conversation: ConversationContext = existingData
                ? JSON.parse(existingData)
                : {
                    userId,
                    conversationId,
                    messages: [],
                    metadata: metadata || {},
                    lastUpdated: Date.now(),
                }

            conversation.messages.push(message)
            conversation.lastUpdated = Date.now()

            await redis.setex(key, this.TTL, JSON.stringify(conversation)).catch(() => {})
            await redis.zadd(`user:${userId}:conversations`, Date.now(), conversationId).catch(() => {})
        } catch (e) {
            console.warn('⚠️ Redis Error - Falling back to memory')
            const localData = this.inMemoryCache.get(key)
            const conversation = localData ? JSON.parse(localData) : { messages: [] }
            conversation.messages.push(message)
            this.inMemoryCache.set(key, JSON.stringify(conversation))
        }
    }

    /**
     * Layer 2: Store SPECIALIST technical context
     */
    async storeSpecialistContext(
        agentId: string,
        contextId: string,
        text: string,
        metadata?: Record<string, any>
    ): Promise<void> {
        const key = `specialist:${agentId}:${contextId}`
        const data = {
            text,
            metadata: metadata || {},
            timestamp: Date.now()
        }
        await redis.setex(key, this.TTL, JSON.stringify(data)).catch(() => {
            this.inMemoryCache.set(key, JSON.stringify(data))
        })
    }

    /**
     * Layer 2: Retrieve SPECIALIST context
     */
    async getSpecialistContext(agentId: string, limit: number = 5): Promise<string> {
        // For simplicity, we search keys. In production, use vector search (Layer 2)
        // Here we just fetch recent specialist data for that agent
        const pattern = `specialist:${agentId}:*`
        // Simplified: return a placeholder if no vector search implemented yet
        return "" 
    }

    /**
     * Get conversation history (Personal Layer)
     */
    async getConversation(
        userId: string,
        conversationId: string
    ): Promise<ConversationContext | null> {
        const key = `conversation:${userId}:${conversationId}`
        try {
            const data = await redis.get(key).catch(() => null)
            if (data) return JSON.parse(data)
            const local = this.inMemoryCache.get(key)
            return local ? JSON.parse(local) : null
        } catch {
            const local = this.inMemoryCache.get(key)
            return local ? JSON.parse(local) : null
        }
    }

    /**
     * Generate embeddings for semantic search
     */
    async generateEmbedding(text: string): Promise<number[]> {
        try {
            const model = genAI.getGenerativeModel({ model: 'text-embedding-004' })
            const result = await model.embedContent(text)
            return result.embedding.values
        } catch (error) {
            console.error('Embedding generation error:', error)
            return new Array(768).fill(0)
        }
    }

    /**
     * Get conversation history summary
     */
    async getConversationSummary(
        userId: string,
        conversationId: string,
        limit: number = 10
    ): Promise<Message[]> {
        const conversation = await this.getConversation(userId, conversationId)
        return conversation?.messages.slice(-limit) || []
    }

    /**
     * Store semantic context (Layer 2/3 hybrid)
     */
    async storeContext(
        userId: string,
        contextId: string,
        text: string,
        metadata?: Record<string, any>
    ): Promise<void> {
        const key = `context:${userId}:${contextId}`
        const data = {
            text,
            metadata: metadata || {},
            timestamp: Date.now()
        }
        await redis.setex(key, this.TTL, JSON.stringify(data)).catch(() => {
            this.inMemoryCache.set(key, JSON.stringify(data))
        })
    }

    /**
     * Search similar contexts (placeholder for vector search)
     */
    async searchSimilarContexts(
        userId: string,
        query: string,
        limit: number = 5
    ): Promise<Array<{ text: string, metadata: any }>> {
        // Implementation of vector search would go here
        // For now, return empty as a safe fallback
        return []
    }

    /**
     * Get AI response by merging Triple-Layer context
     */
    async getAIResponse(
        userId: string,
        conversationId: string,
        userMessage: string,
        systemInstruction?: string,
        agentId?: string, // Optional Specialist context
        attachments?: Array<{ data: string, mimeType: string }>
    ): Promise<string> {
        const { knowledgeBase } = await import('./knowledge-base')

        // Add user message to history
        await this.addMessage(userId, conversationId, 'user', userMessage)

        // 1. GLOBAL LAYER: Shared Company Knowledge
        const globalKnowledge = await knowledgeBase.getRelevantKnowledge(userMessage, 3)

        // 2. SPECIALIST LAYER: Agent-specific technical data
        let specialistContext = ""
        if (agentId) {
            specialistContext = await this.getSpecialistContext(agentId)
        }

        // 3. PERSONAL LAYER: Individual history
        const personalHistory = await this.getConversation(userId, conversationId)
        const historyText = personalHistory?.messages.slice(-10)
            .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
            .join('\n') || "No previous history."

        const currentTime = new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai', dateStyle: 'full', timeStyle: 'short' })
        
        const prompt = `
# SYSTEM DIRECTIVE
${systemInstruction || 'You are an elite AI assistant for Smart Motor.'}
Current local time: ${currentTime}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LAYER 1: GLOBAL KNOWLEDGE (Shared)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${globalKnowledge}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LAYER 2: SPECIALIST CONTEXT (Isolated - Agent: ${agentId || 'General'})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${specialistContext || 'No specific technical context provided.'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LAYER 3: PERSONAL STAFF HISTORY (Individual - User: ${userId})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${historyText}

User Query: ${userMessage}
`

        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
            
            let result
            if (attachments && attachments.length > 0) {
                const parts = [
                    { text: prompt },
                    ...attachments.map(a => ({
                        inlineData: {
                            data: a.data,
                            mimeType: a.mimeType
                        }
                    }))
                ]
                result = await model.generateContent(parts)
            } else {
                result = await model.generateContent(prompt)
            }

            const response = result.response.text()

            // Store in personal memory
            await this.addMessage(userId, conversationId, 'assistant', response)

            return response
        } catch (error) {
            console.error('TripleLayerMemory Error:', error)
            return 'I encountered a technical sync issue. Please try again.'
        }
    }

    // ... other utility methods (getUserConversations, clearConversation, etc.)
}

// Export singleton
export const aiMemory = new TripleLayerMemory()
