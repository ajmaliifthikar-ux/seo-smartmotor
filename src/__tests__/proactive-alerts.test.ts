import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { monitorLocalReviews } from '../lib/ai/local-seo'
import { adminDb } from '../lib/firebase-admin'

vi.mock('../lib/firebase-admin', () => ({
  adminDb: {
    collection: vi.fn(() => ({
      add: vi.fn().mockResolvedValue({ id: 'alert-1' })
    }))
  }
}))

describe('Local SEO Monitoring', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    vi.clearAllMocks()
    process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true })
    } as any)
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  it('should trigger alert and log to DB if low rating detected', async () => {
    const result = await monitorLocalReviews()
    
    expect(result.alerted).toBe(true)
    expect(global.fetch).toHaveBeenCalled()
    expect(adminDb!.collection).toHaveBeenCalledWith('localSeoAlerts')
  })
})
