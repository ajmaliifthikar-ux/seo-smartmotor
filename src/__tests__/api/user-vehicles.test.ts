import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GET, POST } from '../../app/api/user/vehicles/route'
import { NextRequest } from 'next/server'

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: vi.fn(() => ({ value: 'valid-session' }))
  }))
}))

vi.mock('@/lib/firestore-utils', () => ({
  getVehicles: vi.fn().mockResolvedValue([{ id: 'v1', make: 'Toyota' }]),
  addVehicle: vi.fn().mockResolvedValue('new-id')
}))

vi.mock('firebase-admin', () => ({
  default: {
    apps: [{}],
    auth: vi.fn(() => ({
      verifySessionCookie: vi.fn().mockResolvedValue({ uid: 'user-1' })
    }))
  }
}))

describe('User Vehicles API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('GET should return user vehicles', async () => {
    const req = new NextRequest('http://localhost:3000/api/user/vehicles')
    const res = await GET(req)
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data[0].make).toBe('Toyota')
  })

  it('POST should add a user vehicle', async () => {
    const req = new NextRequest('http://localhost:3000/api/user/vehicles', {
      method: 'POST',
      body: JSON.stringify({ make: 'Honda' })
    })
    const res = await POST(req)
    expect(res.status).toBe(201)
  })
})
