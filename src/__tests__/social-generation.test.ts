import { describe, it, expect, vi } from 'vitest'
import { generateSocialPost } from '../lib/ai/synthesis'

vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(function() {
    return {
      getGenerativeModel: vi.fn().mockImplementation(() => ({
        generateContent: vi.fn().mockResolvedValue({ 
          response: { text: () => '{"content": "Awesome car service post", "hashtags": ["#SmartMotor"]}' } 
        })
      }))
    }
  })
}))

describe('Social Content Generation', () => {
  it('should generate a social post using Gemini', async () => {
    const result = await generateSocialPost({
      prompt: 'Check out our new wheels',
      platform: 'instagram',
      tone: 'Elite'
    })

    expect(result.content).toBeDefined()
    expect(Array.isArray(result.hashtags)).toBe(true)
    expect(result.hashtags).toContain('#SmartMotor')
  })
})
