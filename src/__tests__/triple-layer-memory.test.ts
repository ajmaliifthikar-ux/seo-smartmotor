import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TripleLayerMemory } from '../lib/ai-memory'
import redis from '../lib/redis'

// Mock dependencies
vi.mock('../lib/redis', () => ({
  default: {
    get: vi.fn().mockResolvedValue(null),
    setex: vi.fn().mockResolvedValue('OK'),
    zadd: vi.fn().mockResolvedValue(1),
    zrevrange: vi.fn().mockResolvedValue([]),
    del: vi.fn().mockResolvedValue(1),
    zrem: vi.fn().mockResolvedValue(1),
    smembers: vi.fn().mockResolvedValue([]),
    sadd: vi.fn().mockResolvedValue(1),
  }
}))

vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(function() {
    return {
      getGenerativeModel: vi.fn().mockImplementation(() => ({
        embedContent: vi.fn().mockResolvedValue({ embedding: { values: new Array(768).fill(0.1) } }),
        generateContent: vi.fn().mockResolvedValue({ response: { text: () => 'Mock Response' } })
      }))
    }
  })
}))

vi.mock('../lib/knowledge-base', () => ({
  knowledgeBase: {
    getRelevantKnowledge: vi.fn().mockResolvedValue('Mock Global Knowledge')
  }
}))

describe('TripleLayerMemory Multi-turn', () => {
  let memory: TripleLayerMemory
  let redisStore: Record<string, string> = {}

  beforeEach(() => {
    vi.clearAllMocks()
    memory = new TripleLayerMemory()
    redisStore = {}

    // Stateful mocks
    vi.mocked(redis.get).mockImplementation((async (key: any) => {
        return redisStore[key] || null
    }) as any)
    vi.mocked(redis.setex).mockImplementation((async (key: any, ttl: number, value: any) => {
        redisStore[key] = value
        return 'OK'
    }) as any)
  })

  it('should include user message in history before generating response', async () => {
    const userId = 'user123'
    const conversationId = 'conv1'
    const userMessage = 'Hello, I need help with my car.'

    await memory.getAIResponse(userId, conversationId, userMessage)

    // Verify addMessage was called for 'user' message
    // The key format is conversation:userId:conversationId
    const expectedKey = `conversation:${userId}:${conversationId}`
    
    // It should be called twice: once for user, once for assistant
    expect(redis.setex).toHaveBeenCalledTimes(2)
    
    // First call should include the user message
    const firstCallArgs = vi.mocked(redis.setex).mock.calls[0]
    expect(firstCallArgs[0]).toBe(expectedKey)
    const firstCallData = JSON.parse(firstCallArgs[2] as string)
    expect(firstCallData.messages[0]).toMatchObject({
      role: 'user',
      content: userMessage
    })

    // Second call should include both user and assistant messages
    const secondCallArgs = vi.mocked(redis.setex).mock.calls[1]
    const secondCallData = JSON.parse(secondCallArgs[2] as string)
    expect(secondCallData.messages).toHaveLength(2)
    expect(secondCallData.messages[1].role).toBe('assistant')
  })

  it('should maintain context across multiple calls', async () => {
    const userId = 'user123'
    const conversationId = 'conv1'
    const expectedKey = `conversation:${userId}:${conversationId}`
    
    // Turn 1
    await memory.getAIResponse(userId, conversationId, 'Message 1')

    // Turn 2
    await memory.getAIResponse(userId, conversationId, 'Message 2')

    // The last call for this conversation should have 4 messages
    const lastData = JSON.parse(redisStore[expectedKey])
    expect(lastData.messages).toHaveLength(4)
    expect(lastData.messages[0].content).toBe('Message 1')
    expect(lastData.messages[2].content).toBe('Message 2')
  })
})
