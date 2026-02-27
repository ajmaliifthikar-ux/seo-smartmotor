import { GoogleGenerativeAI } from '@google/generative-ai'
import { adminDb } from '@/lib/firebase-admin'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export interface SearchQuery {
    id?: string
    topic: string
    persona: string
    situation: string
    query: string
    intent: 'informational' | 'navigational' | 'commercial' | 'transactional'
    createdAt: Date
}

export class PersonaKeywordAgent {
    private model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    /**
     * Simulates various user personas and situations to generate hyper-realistic, 
     * conversational, and long-tail search queries.
     */
    async generateSituationalQueries(topic: string, count: number = 5): Promise<SearchQuery[]> {
        const prompt = `
        You are a master of human psychology and a method actor. 
        Topic: "${topic}" in Abu Dhabi/UAE.

        Your task is to invent ${count} distinct personas (e.g., stranded driver, busy executive, cost-conscious expat, car enthusiast) facing specific, urgent, or casual situations related to this topic.
        
        For each persona and situation, what EXACTLY do they type or voice-dictate into Google? 
        Do not give me generic SEO keywords. Give me the raw, unfiltered human search queries.

        Return ONLY a JSON array of objects with this exact structure:
        [
            {
                "persona": "Brief description of the person",
                "situation": "What is happening to them right now?",
                "query": "The exact search phrase they type",
                "intent": "informational" | "navigational" | "commercial" | "transactional"
            }
        ]
        `

        try {
            const result = await this.model.generateContent(prompt)
            const text = result.response.text().replace(/```json|```/g, '').trim()
            const generated: any[] = JSON.parse(text)

            const queries: SearchQuery[] = generated.map(g => ({
                topic,
                persona: g.persona,
                situation: g.situation,
                query: g.query,
                intent: g.intent,
                createdAt: new Date()
            }))

            await this.saveToDatabase(queries)
            return queries

        } catch (error) {
            console.error('Persona Agent Error:', error)
            return []
        }
    }

    /**
     * Saves the generated raw queries to the database for later mix-and-matching.
     */
    private async saveToDatabase(queries: SearchQuery[]) {
        if (!adminDb) {
            console.warn('[PersonaKeywordAgent] Firebase Admin DB not initialized. Simulating save.')
            return
        }

        try {
            const batch = adminDb.batch()
            const collectionRef = adminDb.collection('seo_situational_queries')

            queries.forEach(query => {
                const docRef = collectionRef.doc()
                batch.set(docRef, { ...query, id: docRef.id })
            })

            await batch.commit()
            console.log(`[PersonaKeywordAgent] Saved ${queries.length} situational queries to DB.`)
        } catch (error) {
            console.error('[PersonaKeywordAgent] DB Save Error:', error)
        }
    }

    /**
     * Fetches random mixed-and-matched queries from the database.
     */
    async getQueriesFromDatabase(limitCount: number = 3): Promise<SearchQuery[]> {
        if (!adminDb) return []
        try {
            // In a real scenario, we might want to do random sampling.
            // For now, we fetch the latest ones to process.
            const snapshot = await adminDb.collection('seo_situational_queries')
                .orderBy('createdAt', 'desc')
                .limit(limitCount)
                .get()
            
            return snapshot.docs.map(doc => doc.data() as SearchQuery)
        } catch (error) {
            console.error('[PersonaKeywordAgent] DB Fetch Error:', error)
            return []
        }
    }
}

export const personaKeywordAgent = new PersonaKeywordAgent()
