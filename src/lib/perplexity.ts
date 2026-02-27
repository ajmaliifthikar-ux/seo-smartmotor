import { OpenAI } from 'openai'
import Perplexity from '@perplexity-ai/perplexity_ai'

// Initialize OpenAI client pointing to Perplexity API for Chat/Sonar models
const perplexityChatClient = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY || '',
  baseURL: 'https://api.perplexity.ai',
})

// Initialize official Perplexity SDK for structured Search API
const perplexitySearchClient = new Perplexity({
  apiKey: process.env.PERPLEXITY_API_KEY || '',
})

export interface PerplexityResponse {
  content: string
  citations: string[]
}

export interface PerplexitySearchResult {
  title: string
  url: string
  snippet?: string
}

/**
 * Perform a web search with AI-generated summary using Sonar models.
 */
export async function searchWeb(
  query: string,
  model: 'sonar-pro' | 'sonar' = 'sonar-pro'
): Promise<PerplexityResponse> {
  if (!process.env.PERPLEXITY_API_KEY) {
    console.warn('PERPLEXITY_API_KEY not found. Returning mock response.')
    return {
      content: "I'm unable to access live web data at the moment because the PERPLEXITY_API_KEY is missing. Please check your environment configuration.",
      citations: []
    }
  }

  try {
    const response = await perplexityChatClient.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'system',
          content: 'You are an expert market researcher and business intelligence analyst. Provide detailed, data-backed answers with citations.',
        },
        {
          role: 'user',
          content: query,
        },
      ],
      stream: false,
    })

    const choice = response.choices[0]
    
    return {
      content: choice.message.content || 'No response generated.',
      // @ts-ignore - Perplexity returns citations in the top-level response object, but OpenAI types don't know that
      citations: response.citations || [] 
    }
  } catch (error) {
    console.error('Perplexity API Error:', error)
    throw new Error('Failed to perform web search')
  }
}

/**
 * Perform a structured web search using the official Perplexity Search API.
 * This returns ranked search results instead of a text summary.
 * FALLBACK: If Search API is unauthorized (401), falls back to Chat API (Sonar).
 */
export async function searchPerplexity(params: {
  query: string
  maxResults?: number
  country?: string
  maxTokens?: number
  maxTokensPerPage?: number
}): Promise<PerplexitySearchResult[]> {
  if (!process.env.PERPLEXITY_API_KEY) {
    console.warn('PERPLEXITY_API_KEY not found. Returning empty results.')
    return []
  }

  try {
    const search = await perplexitySearchClient.search.create({
      query: params.query,
      // @ts-ignore
      max_results: params.maxResults || 10,
      country: params.country || 'AE',
      // @ts-ignore
      max_tokens: params.maxTokens || 25000,
      // @ts-ignore
      max_tokens_per_page: params.maxTokensPerPage || 2048,
    })

    // @ts-ignore
    return (search.results || []).map((result: any) => ({
      title: result.title,
      url: result.url,
      snippet: result.snippet
    }))
  } catch (error: any) {
    // If 401, the key is likely a Chat API key, not a Search API key.
    if (error.status === 401) {
      console.warn('[Perplexity] Search API unauthorized. Falling back to Sonar Chat API...')
      try {
        const chatResult = await searchWeb(params.query, 'sonar-pro')
        // Transform citations into Search Results
        return chatResult.citations.map((url, i) => ({
          title: `Research Source ${i + 1}`,
          url: url,
          snippet: chatResult.content.substring(0, 200) + '...'
        }))
      } catch (chatError) {
        console.error('[Perplexity] Fallback Chat API also failed:', chatError)
        return []
      }
    }
    
    console.error('Perplexity Search API Error:', error)
    return []
  }
}
