import { GoogleGenerativeAI } from '@google/generative-ai'
import { ReverseEngineeredData } from './reverse-engineer-agent'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export interface DominationStrategy {
    queryTarget: string
    theGeniusOutthought: string
    contentFormat: string
    interactiveElement: string
    psychologicalHook: string
    titleTag: string
    technicalEdge?: string
}

export class StrategyGeniusAgent {
    private model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    /**
     * Takes the reverse-engineered data and creates an out-of-the-box, 
     * 10x better "Genius" strategy to dominate the SERP.
     */
    async formulateDominationPlan(data: ReverseEngineeredData, marketingInsights?: any): Promise<DominationStrategy> {
        console.log(`[StrategyGeniusAgent] Formulating 10x domination plan for: "${data.query}"`)

        const prompt = `
        You are the ultimate SEO Mastermind and Innovator. You do not do "normal" SEO. You build category-defining, 10x experiences.
        
        We want to dominate the search query: "${data.query}"
        
        Here is the reverse-engineered analysis of why the current competitors are ranking:
        ${JSON.stringify({
            hypothesis: data.googleAlgorithmHypothesis,
            gaps: data.rankingFactors.contentGaps,
            competitorHooks: data.rankingFactors.psychologicalHooksUsed,
            technicalWeaknesses: data.rankingFactors.technicalWeaknesses
        }, null, 2)}

        Additional Marketing Intelligence (Supermetrics):
        ${JSON.stringify(marketingInsights, null, 2)}
        
        YOUR TASK: Invent a "Genius Way" to outthink them. 
        Do not just suggest "write a better blog post". 
        Suggest a unique tool, an interactive calculator, a hyper-specific local guide, a database, or a psychological framework that makes our page the UNDISPUTED king of this SERP.

        Analyze their technical weaknesses (e.g., if they are slow, we must be instant).

        Return ONLY a JSON object:
        {
            "queryTarget": "${data.query}",
            "theGeniusOutthought": "Explain the radical, out-of-the-box concept that will destroy competitors.",
            "contentFormat": "What exact format should this take?",
            "interactiveElement": "What can the user click/do that competitors don't have?",
            "psychologicalHook": "What emotional lever are we pulling that competitors missed?",
            "titleTag": "The ultimate, irresistible 60-character SEO title.",
            "technicalEdge": "How we win on performance/infrastructure."
        }
        `

        try {
            const result = await this.model.generateContent(prompt)
            const text = result.response.text().replace(/```json|```/g, '').trim()
            return JSON.parse(text) as DominationStrategy
        } catch (error) {
            console.error('[StrategyGeniusAgent] Strategy Formulation Error:', error)
            throw new Error('Failed to formulate domination strategy')
        }
    }
}

export const strategyGeniusAgent = new StrategyGeniusAgent()
