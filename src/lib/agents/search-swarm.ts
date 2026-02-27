import { GoogleGenerativeAI } from '@google/generative-ai'
import { searchPerplexity, PerplexitySearchResult } from '@/lib/perplexity'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
const SERP_API_KEY = process.env.SERP_API_KEY || ''

export interface SearchResult {
  engine: 'google' | 'bing' | 'duckduckgo' | 'perplexity'
  title: string
  url: string
  snippet?: string
}

export interface IntelligenceBrief {
  summary: string
  topSources: SearchResult[]
  marketInsights: string[]
  competitorObservations: string[]
}

const TIMEOUT_MS = 15000 // 15 seconds

const GOOGLE_CSE_ID = process.env.GOOGLE_CSE_ID || 'd4c8245a5414d418a'

/**
 * Search Swarm Agent
 * Orchestrates multi-engine searches and synthesizes results.
 */
export class SearchSwarmAgent {
  private model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

  /**
   * Performs a parallel multi-engine search with timeouts and error handling.
   */
  async search(query: string, options: { country?: string; maxResults?: number } = {}): Promise<SearchResult[]> {
    const { country = 'AE', maxResults = 5 } = options

    const engines: ('google' | 'bing' | 'duckduckgo' | 'google_custom_search')[] = [
      'google', 
      'bing', 
      'duckduckgo', 
      'google_custom_search'
    ]
    
    // 1. Trigger SerpAPI searches
    const serpTasks = engines.map(async (engine) => {
      if (!SERP_API_KEY) {
        console.warn(`[Search Swarm] SERP_API_KEY missing. Skipping ${engine} search.`)
        return []
      }
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)
      
      try {
        let url = `https://serpapi.com/search?q=${encodeURIComponent(query)}&engine=${engine}&location=Abu+Dhabi&api_key=${SERP_API_KEY}`
        
        // Add Custom Search Engine ID if using that engine
        if (engine === 'google_custom_search') {
          url += `&cx=${GOOGLE_CSE_ID}`
        }

        const response = await fetch(url, { signal: controller.signal })
        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`SerpAPI error! status: ${response.status}`)
        }

        const data = await response.json()
        const results = (data.organic_results || []).slice(0, maxResults)
        
        return results.map((r: any) => ({
          engine: engine === 'google_custom_search' ? 'google' : engine, // Map back to generic name for UI if needed, or keep specific
          title: r.title,
          url: r.link,
          snippet: r.snippet
        })) as SearchResult[]
      } catch (e: any) {
        clearTimeout(timeoutId)
        if (e.name === 'AbortError') {
           console.warn(`[Search Swarm] ${engine} search timed out after ${TIMEOUT_MS}ms`)
        } else {
           console.error(`[Search Swarm] ${engine} search failed:`, e.message)
        }
        return []
      }
    })

    // 2. Trigger Perplexity Search
    const perplexityTask = (async () => {
      if (!process.env.PERPLEXITY_API_KEY) {
        console.warn('[Search Swarm] PERPLEXITY_API_KEY missing. Skipping perplexity search.')
        return []
      }
      
      // We implement a timeout wrapper for perplexity SDK call
      return Promise.race([
        searchPerplexity({ query, maxResults, country }).then(results => 
          results.map(r => ({ ...r, engine: 'perplexity' } as SearchResult))
        ),
        new Promise<SearchResult[]>((_, reject) => 
          setTimeout(() => reject(new Error('Perplexity timeout')), TIMEOUT_MS)
        )
      ]).catch(e => {
        console.error(`[Search Swarm] Perplexity search failed or timed out:`, e.message)
        return []
      })
    })()

    // 3. Gather all results safely
    const allResults = await Promise.allSettled([...serpTasks, perplexityTask])
    
    return allResults
      .filter((result): result is PromiseFulfilledResult<SearchResult[]> => result.status === 'fulfilled')
      .flatMap(result => result.value)
  }

  /**
   * Synthesizes search results into a PhD-level Strategic Intelligence Brief.
   */
  async synthesize(query: string, results: SearchResult[]): Promise<IntelligenceBrief> {
    const defaultBrief: IntelligenceBrief = {
        summary: "Insufficient data retrieved to form a reliable market summary.",
        topSources: [],
        marketInsights: ["No insights could be generated due to lack of search data."],
        competitorObservations: []
    }

    if (!results || results.length === 0) {
      console.warn('[Search Swarm] No results to synthesize.')
      return defaultBrief
    }

    const prompt = `
      You are the Master Intelligence Agent for Smart Motor. 
      Analyze the following search results from Google, Bing, DuckDuckGo, and Perplexity for the query: "${query}".
      
      SEARCH DATA:
      ${JSON.stringify(results, null, 2)}
      
      Task:
      - Summarize the current market state for this query in Abu Dhabi/UAE.
      - Identify the top 3 authoritative sources.
      - Extract specific market insights (pricing, service gaps, customer expectations).
      - Note competitor strategies observed in snippets.
      
      Return ONLY a JSON object:
      {
        "summary": "...",
        "topSources": [...],
        "marketInsights": [...],
        "competitorObservations": [...]
      }
    `

    try {
      const result = await this.model.generateContent(prompt)
      const text = result.response.text().replace(/```json|```/g, '').trim()
      
      try {
        const brief = JSON.parse(text)
        return {
            summary: brief.summary || defaultBrief.summary,
            topSources: brief.topSources || [],
            marketInsights: brief.marketInsights || [],
            competitorObservations: brief.competitorObservations || []
        }
      } catch (parseError) {
          console.error('[Search Swarm] JSON Parse Error in Synthesis:', parseError, text)
          return defaultBrief
      }
    } catch (e: any) {
      console.error('[Search Swarm] Synthesis Error:', e.message)
      return defaultBrief
    }
  }

  /**
   * Full end-to-end intelligence cycle.
   */
  async runIntelligenceCycle(query: string): Promise<IntelligenceBrief> {
    console.log(`🔍 Search Swarm: Launching multi-engine reconnaissance for "${query}"...`)
    const results = await this.search(query)
    console.log(`✅ Search Swarm: Gathered ${results.length} results from 4 engines.`)
    const brief = await this.synthesize(query, results)
    console.log('📄 Search Swarm: Intelligence brief complete.')
    return brief
  }
}

export const searchSwarmAgent = new SearchSwarmAgent()
