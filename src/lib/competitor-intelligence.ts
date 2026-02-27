import { synthesizeSeoData } from './ai/synthesis'

const SERP_API_KEY = process.env.SERP_API_KEY || ''

/**
 * Competitor Intelligence Agent
 * Tracks rankings and content shifts of competitors.
 */
export class CompetitorIntelligenceAgent {
  /**
   * Performs a competitor audit for a specific keyword.
   */
  async auditCompetitor(keyword: string) {
    if (!SERP_API_KEY) {
      console.warn('CompetitorIntelligenceAgent: Missing SERP_API_KEY. Falling back to mock.')
      return this.getMockData(keyword)
    }

    try {
      const response = await fetch(
        `https://serpapi.com/search?q=${encodeURIComponent(keyword)}&location=Abu+Dhabi&api_key=${SERP_API_KEY}`
      )
      const rawData = await response.json()
      
      // Synthesize into structured intelligence
      const seoIntelligence = await synthesizeSeoData(JSON.stringify(rawData))
      return seoIntelligence
    } catch (error) {
      console.error('Competitor Audit Error:', error)
      return this.getMockData(keyword)
    }
  }

  private getMockData(keyword: string) {
    return {
      keywords: [{ term: keyword, volume: 1200, difficulty: 'Medium', trend: 'up' }],
      competitors: [
        { name: 'QuickFit Auto', rank: 1, score: 88, updates: 'New blog post on ceramic coating' },
        { name: 'Saba Motors', rank: 3, score: 74, updates: 'Price drop on full service' }
      ],
      summary: `Competitive landscape for "${keyword}" is shifting towards specialized detailing services.`,
      actionPlan: [{ day: '1-2', action: `Optimize metadata for ${keyword}`, status: 'pending' }]
    }
  }
}

export const competitorAgent = new CompetitorIntelligenceAgent()
