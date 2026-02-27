import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function synthesizeMarketReport(rawSearchData: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
  
  const prompt = `
    You are a PhD-level Business Strategy Consultant for Smart Motor, Abu Dhabi.
    Task: Generate a high-rigor Strategic Market Intelligence Report based on provided search data.
    
    Frameworks to apply:
    1. MECE Principle: Ensure all points are Mutually Exclusive and Collectively Exhaustive.
    2. Issue Trees: Deconstruct market challenges into root causes and strategic levers.
    3. Unit Economics focus: Highlight implications for LTV, CAC, and margin in the luxury segment.
    
    Data:
    ${rawSearchData}
    
    Structure:
    # EXECUTIVE STRATEGY OVERVIEW
    (High-level synthesis of the digital business realm)
    
    ## 1. MARKET TOPOLOGY & TRENDS (MECE Analysis)
    (Breakdown of the current landscape)
    
    ## 2. COMPETITIVE VULNERABILITIES & EDGE
    (Issue tree analysis of competitors vs Smart Motor)
    
    ## 3. STRATEGIC LEVERS & RECOMMENDATIONS
    (Data-driven, prioritized actions)
    
    Style: Technically authoritative, precise, and elite. Focus on UAE-specific luxury dynamics.
  `

  try {
    const result = await model.generateContent(prompt)
    return result.response.text()
  } catch (error) {
    console.error('Market synthesis error:', error)
    return "Failed to synthesize market report."
  }
}

/**
 * High-rigor Issue Tree generator for strategic deconstruction.
 */
export async function generateIssueTree(challenge: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
  
  const prompt = `
    You are a Strategic Management Consultant.
    Task: Deconstruct the following business challenge into a structured Issue Tree.
    Challenge: "${challenge}"
    
    Structure the output as a hierarchical list:
    - [Main Challenge]
      - [Root Cause 1 / Branch A]
        - [Sub-issue i]
        - [Sub-issue ii]
      - [Root Cause 2 / Branch B]
        - [Sub-issue iii]
    
    Apply the MECE principle (Mutually Exclusive, Collectively Exhaustive).
    Highlight "Strategic Levers" for each branch.
    Use markdown.
  `

  try {
    const result = await model.generateContent(prompt)
    return result.response.text()
  } catch (error) {
    console.error('Issue Tree generation error:', error)
    return "Failed to generate issue tree."
  }
}

export async function synthesizeSeoData(rawSearchData: string): Promise<{
  keywords: any[]
  competitors: any[]
  summary: string
  actionPlan: any[]
}> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
  
  const prompt = `
    You are an expert SEO Strategist for Smart Motor.
    Based on the following raw SERP and competitor data, extract structured SEO intelligence.
    
    Data:
    ${rawSearchData}
    
    Return ONLY a JSON object with the following structure:
    {
      "keywords": [{"term": "string", "volume": number, "difficulty": "Low|Medium|High", "trend": "up|down|stable"}],
      "competitors": [{"name": "string", "rank": number, "score": number, "updates": "string"}],
      "summary": "markdown string summarizing the SEO race",
      "actionPlan": [{"day": "string", "action": "string", "status": "pending"}]
    }
    
    Ensure the data is realistic and based on the provided search results.
  `

  try {
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    // Extract JSON from potential markdown blocks
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    return JSON.parse(jsonMatch ? jsonMatch[0] : text)
  } catch (error) {
    console.error('SEO synthesis error:', error)
    return {
      keywords: [],
      competitors: [],
      summary: "Failed to synthesize SEO data.",
      actionPlan: []
    }
  }
}

export async function generateSocialPost(params: {
  prompt: string,
  platform: string,
  tone: string
}): Promise<{ content: string, hashtags: string[] }> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
  
  const prompt = `
    You are an expert Social Media Manager for Smart Motor, a luxury car service center in Abu Dhabi.
    
    Task: Create an engaging social media post for ${params.platform.toUpperCase()}.
    Tone: ${params.tone} (Elite, Technical, Friendly, or Promotional).
    Instruction: ${params.prompt}
    
    Return ONLY a JSON object with the following structure:
    {
      "content": "The post text, including emojis where appropriate for the platform.",
      "hashtags": ["#Tag1", "#Tag2", "..."]
    }
    
    Keep the content professional, high-end, and specific to the UAE luxury automotive market.
  `

  try {
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    return JSON.parse(jsonMatch ? jsonMatch[0] : text)
  } catch (error) {
    console.error('Social generation error:', error)
    return {
      content: "Failed to generate social post content.",
      hashtags: ["#SmartMotor", "#AbuDhabi"]
    }
  }
}
