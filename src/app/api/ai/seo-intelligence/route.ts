import { NextResponse } from 'next/server'
import { searchWeb } from '@/lib/perplexity'
import { synthesizeSeoData } from '@/lib/ai/synthesis'

export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    
    // 1. Perform Technical SEO Search using Perplexity
    const seoPrompt = `Perform a deep SERP and competitor audit for the following topic/keyword: "${message}". 
    Identify the top ranking competitors, their keyword strategy, and content structure. 
    Focus on the UAE/Abu Dhabi market if applicable.`
    
    const searchResult = await searchWeb(seoPrompt)
    
    // 2. Synthesize into structured dashboard data and actionable plan
    const seoData = await synthesizeSeoData(searchResult.content)

    return NextResponse.json({
      ...seoData,
      metadata: {
        agent: 'SEO Intelligence (Perplexity + Gemini)',
        citations: searchResult.citations,
        timestamp: new Date().toISOString(),
        confidence: 0.95
      }
    })
  } catch (error) {
    console.error('SEO Intelligence Error:', error)
    return NextResponse.json({ error: 'Failed to process SEO intelligence' }, { status: 500 })
  }
}
