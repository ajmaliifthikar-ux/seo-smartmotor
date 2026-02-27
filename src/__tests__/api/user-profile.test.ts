import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GET, PUT } from '../../app/api/user/profile/route'
import { NextRequest } from 'next/server'

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: vi.fn(() => ({ value: 'valid-session' }))
  }))
}))

vi.mock('@/lib/firestore-utils', () => ({
  getUserProfile: vi.fn().mockResolvedValue({ id: 'user-1', name: 'Test User' }),
  updateUserProfile: vi.fn().mockResolvedValue(true)
}))

vi.mock('firebase-admin', () => ({
  default: {
    apps: [{}],
    auth: vi.fn(() => ({
      verifySessionCookie: vi.fn().mockResolvedValue({ uid: 'user-1' })
    }))
  }
}))

describe('User Profile API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('GET should return user profile if session is valid', async () => {
    const req = new NextRequest('http://localhost:3000/api/user/profile')
    const res = await GET(req)
    
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.name).toBe('Test User')
  })

  it('PUT should update user profile if session is valid', async () => {
    const req = new NextRequest('http://localhost:3000/api/user/profile', {
      method: 'PUT',
      body: JSON.stringify({ name: 'Updated Name' })
    })
    const res = await PUT(req)
    
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.message).toBe('User profile updated successfully')
  })
})
