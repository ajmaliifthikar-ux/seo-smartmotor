import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GET } from '../../app/api/user/bookings/route'
import { NextRequest } from 'next/server'

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: vi.fn(() => ({ value: 'valid-session' }))
  }))
}))

const mockDocs = [
  { id: 'b1', data: () => ({ service: 'Oil Change' }) }
]

vi.mock('firebase-admin', () => ({
  default: {
    apps: [{}],
    auth: vi.fn(() => ({
      verifySessionCookie: vi.fn().mockResolvedValue({ uid: 'user-1' })
    })),
    firestore: vi.fn(() => ({
      collection: vi.fn(() => ({
        where: vi.fn().mockReturnThis(),
        orderBy: vi.fn().mockReturnThis(),
        get: vi.fn().mockResolvedValue({ docs: mockDocs })
      }))
    }))
  }
}))

describe('User Bookings API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('GET should return user bookings', async () => {
    const req = new NextRequest('http://localhost:3000/api/user/bookings')
    const res = await GET(req)
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data[0].service).toBe('Oil Change')
  })
})
