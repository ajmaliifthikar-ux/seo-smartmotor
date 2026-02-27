import { personaKeywordAgent } from './persona-agent'
import { reverseEngineeringAgent } from './reverse-engineer-agent'
import { strategyGeniusAgent, DominationStrategy } from './strategy-genius-agent'
import { swarmTools } from '@/lib/tools/swarm-tools'

export interface SeoDominationReport {
    topic: string
    situationalQueriesGenerated: number
    strategies: DominationStrategy[]
    deepScrapeResults?: any
    marketingIntelligence?: any
}

/**
 * The Master Orchestrator for the SEO Domination Pipeline.
 * 
 * Enhanced Flow:
 * 1. Persona Agent creates situational queries.
 * 2. Deep Recon: Apify scrapes SERP for the broad topic.
 * 3. Marketing Intel: Supermetrics pulls channel-specific data.
 * 4. Reverse Engineer: For each situational query, analyze top 10 & tech health.
 * 5. Strategy Genius: Create 10x plans integrating all the above data.
 */
export class SeoDominationOrchestrator {
    
    async runPipeline(topic: string): Promise<SeoDominationReport> {
        console.log(`
👑 [SEO Domination] Initiating Enhanced Pipeline for: "${topic}"`)

        // 1. Parallel Intel Gathering
        console.log(`
🧠 Gathering Multi-Platform Intelligence...`)
        const [queries, deepScrape, marketingIntel] = await Promise.all([
            personaKeywordAgent.generateSituationalQueries(topic, 3),
            swarmTools.scrapeDeepSerp(topic), // Apify Deep Scrape
            swarmTools.fetchMarketingInsights('google_ads') // Supermetrics Intel
        ])
        
        if (!queries || queries.length === 0) {
            throw new Error('Failed to generate persona queries.')
        }

        console.log(`Generated ${queries.length} situational queries. Deep scrape complete.`)

        // 2. Process each query through reverse engineering and strategy formulation
        const strategies: DominationStrategy[] = []

        for (const q of queries) {
            console.log(`
🕵️‍♂️ Reverse Engineering SERP & Network Health for: "${q.query}"...`)
            const reverseEngineeredData = await reverseEngineeringAgent.analyzeQuery(q.query)

            if (reverseEngineeredData) {
                console.log(`
🚀 Formulating 10x Genius Strategy using all intelligence channels...`)
                const strategy = await strategyGeniusAgent.formulateDominationPlan(
                    reverseEngineeredData, 
                    marketingIntel
                )
                strategies.push(strategy)
            }
        }

        console.log(`
✅ [SEO Domination] Enhanced Pipeline Complete.`)

        return {
            topic,
            situationalQueriesGenerated: queries.length,
            strategies,
            deepScrapeResults: deepScrape,
            marketingIntelligence: marketingIntel
        }
    }
}

export const seoDominationOrchestrator = new SeoDominationOrchestrator()
