import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GET } from '../../app/api/user/loyalty/route'
import { NextRequest } from 'next/server'

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: vi.fn(() => ({ value: 'valid-session' }))
  }))
}))

vi.mock('@/lib/firestore-utils', () => ({
  getLoyaltyRecord: vi.fn().mockResolvedValue({ tier: 'Gold', points: 1500 })
}))

vi.mock('firebase-admin', () => ({
  default: {
    apps: [{}],
    auth: vi.fn(() => ({
      verifySessionCookie: vi.fn().mockResolvedValue({ uid: 'user-1' })
    }))
  }
}))

describe('User Loyalty API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('GET should return user loyalty record', async () => {
    const req = new NextRequest('http://localhost:3000/api/user/loyalty')
    const res = await GET(req)
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.tier).toBe('Gold')
    expect(data.points).toBe(1500)
  })
})
