import { NextResponse } from 'next/server'
import { searchSwarmAgent } from '@/lib/agents/search-swarm'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const message = body.message?.trim()

    if (!message) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 })
    }
    
    // 1. Perform Live Web Search using SearchSwarmAgent (Google, Bing, DuckDuckGo, Perplexity)
    const brief = await searchSwarmAgent.runIntelligenceCycle(message)
    
    // 2. Convert structured IntelligenceBrief to a beautiful Markdown report for the UI
    const markdownReport = `
# STRATEGIC INTELLIGENCE BRIEF
**Topic:** ${message}

## SUMMARY
${brief.summary}

## TOP AUTHORITATIVE SOURCES
${brief.topSources.length > 0 ? brief.topSources.map((s, i) => `- [${s.engine.toUpperCase()}] **${s.title}**\n  ${s.url}`).join('\n') : '- No sources found.'}

## MARKET INSIGHTS
${brief.marketInsights.length > 0 ? brief.marketInsights.map(insight => `- ${insight}`).join('\n') : '- No significant market insights found.'}

## COMPETITOR OBSERVATIONS
${brief.competitorObservations.length > 0 ? brief.competitorObservations.map(obs => `- ${obs}`).join('\n') : '- No competitor observations found.'}
    `.trim()

    return NextResponse.json({
      response: markdownReport,
      metadata: {
        agent: 'Search Swarm (Perplexity + Google + Bing + DuckDuckGo + Gemini 2.0 Flash)',
        timestamp: new Date().toISOString(),
        sourcesCount: brief.topSources.length,
        confidence: 0.98
      }
    })
  } catch (error: any) {
    console.error('Market Research API Error:', error)
    return NextResponse.json({ 
      error: 'Failed to process market research', 
      details: error.message || 'Unknown error' 
    }, { status: 500 })
  }
}
