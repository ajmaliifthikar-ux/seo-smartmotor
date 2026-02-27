import { GoogleGenerativeAI } from '@google/generative-ai'
import { searchSwarmAgent, SearchResult } from '@/lib/agents/search-swarm'
import { swarmTools } from '@/lib/tools/swarm-tools'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export interface ReverseEngineeredData {
    query: string
    topResults: SearchResult[]
    rankingFactors: {
        relevance: string
        strength: string
        contentGaps: string[]
        psychologicalHooksUsed: string[]
        technicalWeaknesses: any[]
    }
    googleAlgorithmHypothesis: string
}

export class ReverseEngineeringAgent {
    private model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    /**
     * Takes a specific human query, fetches the top 10 SERP results via the Search Swarm, 
     * and reverse-engineers WHY Google chose them.
     */
    async analyzeQuery(query: string): Promise<ReverseEngineeredData | null> {
        console.log(`[ReverseEngineeringAgent] Initiating search for: "${query}"`)
        
        // 1. Fetch Top 10 results
        const results = await searchSwarmAgent.search(query, { maxResults: 10, country: 'AE' })
        
        if (!results || results.length === 0) {
            console.warn(`[ReverseEngineeringAgent] No search results found for: ${query}`)
            return null
        }

        // 2. Network Reconnaissance: Check competitor health/speed
        console.log(`[ReverseEngineeringAgent] Performing network reconnaissance on top competitors...`)
        const topCompetitors = results.slice(0, 5) // Check top 5 for speed/up-time
        const healthChecks = await Promise.all(
            topCompetitors.map(r => swarmTools.checkCompetitorHealth(r.url))
        )

        // 3. Reverse Engineer the SERP
        console.log(`[ReverseEngineeringAgent] Analyzing ${results.length} top listings to reverse-engineer ranking factors...`)
        const analysis = await this.reverseEngineerSERP(query, results, healthChecks)
        
        return {
            query,
            topResults: results,
            ...analysis,
            rankingFactors: {
                ...analysis.rankingFactors,
                technicalWeaknesses: healthChecks.filter(h => !h.isUp || parseInt(h.responseTime || '0') > 1000)
            }
        }
    }

    private async reverseEngineerSERP(query: string, results: SearchResult[], healthChecks: any[]) {
        const prompt = `
        You are a world-class Reverse Engineer of Search Engine Algorithms.
        
        We searched for the highly specific, situational query: "${query}"
        Here are the top results currently dominating the search engines:
        
        ${JSON.stringify(results, null, 2)}

        We also performed network reconnaissance on the top 5 competitors:
        ${JSON.stringify(healthChecks, null, 2)}
        
        YOUR TASK: Reverse engineer WHY these specific pages popped up. 
        Deconstruct their relevance, perceived domain strength, and the intent they fulfill.
        
        Analyze:
        1. Relevance: How exactly do their titles/snippets map to the user's hidden intent?
        2. Strength: What authority signals or brand dominance are likely keeping them there?
        3. Content Gaps: What are these top pages MISSING? (e.g., they lack pricing, lack empathy, lack direct booking).
        4. Psychological Hooks: What words are they using to drive CTR (Click-Through Rate)?
        5. Technical Gaps: Do any of them have slow response times or errors that we can exploit?
        6. Algorithm Hypothesis: A 1-sentence summary of what the Google Algorithm is currently prioritizing for this query.

        Return ONLY a JSON object:
        {
            "rankingFactors": {
                "relevance": "Detailed explanation...",
                "strength": "Detailed explanation...",
                "contentGaps": ["gap 1", "gap 2"],
                "psychologicalHooksUsed": ["hook 1", "hook 2"]
            },
            "googleAlgorithmHypothesis": "..."
        }
        `

        try {
            const result = await this.model.generateContent(prompt)
            const text = result.response.text().replace(/```json|```/g, '').trim()
            return JSON.parse(text)
        } catch (error) {
            console.error('[ReverseEngineeringAgent] Synthesis Error:', error)
            throw new Error('Failed to reverse engineer SERP')
        }
    }
}

export const reverseEngineeringAgent = new ReverseEngineeringAgent()
