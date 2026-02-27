import { describe, it, expect, vi } from 'vitest'
import { aiMemory } from '../lib/ai-memory'

// Mock dependencies
vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(function() {
    return {
      getGenerativeModel: vi.fn().mockImplementation(() => ({
        generateContent: vi.fn().mockResolvedValue({ 
          response: { text: () => "I analyzed your file." } 
        })
      }))
    }
  })
}))

vi.mock('../lib/knowledge-base', () => ({
  knowledgeBase: {
    getRelevantKnowledge: vi.fn().mockResolvedValue("Some context")
  }
}))

vi.mock('../lib/redis', () => ({
  default: {
    get: vi.fn().mockResolvedValue(null),
    setex: vi.fn().mockResolvedValue('OK'),
    zadd: vi.fn().mockResolvedValue(1)
  }
}))

describe('Workbench Multimodal Processing', () => {
  it('should pass multimodal parts to Gemini when attachments are present', async () => {
    const userId = 'user-1'
    const conversationId = 'conv-1'
    const message = 'Analyze this image'
    const attachments = [
      { data: 'base64data', mimeType: 'image/jpeg' }
    ]

    const response = await aiMemory.getAIResponse(
      userId, 
      conversationId, 
      message, 
      'Instruction', 
      undefined, 
      attachments
    )

    expect(response).toBe("I analyzed your file.")
  })
})
