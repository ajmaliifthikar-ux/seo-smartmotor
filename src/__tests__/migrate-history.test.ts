import { describe, it, expect, vi, beforeEach } from 'vitest'
import { migrateHistoryKeys } from './migrate-history-keys-logic'

// Mock firebase-admin
vi.mock('@/lib/firebase-admin', () => ({
  adminDb: {
    collection: vi.fn()
  }
}))

import { adminDb } from '@/lib/firebase-admin'

describe('migrateHistoryKeys', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should correctly map slug-based entityId to document id', async () => {
    const mockHistory = [
      { id: 'h1', entityId: 'oil-change', entityType: 'Service' },
      { id: 'h2', entityId: 'porsche', entityType: 'Brand' }
    ]

    const mockServices = [
      { id: 's1', slug: 'oil-change' }
    ]

    const mockBrands = [
      { id: 'b1', slug: 'porsche' }
    ]

    const updateMock = vi.fn()
    const docMock = vi.fn(() => ({ update: updateMock }))
    const collectionMock = (adminDb as any).collection as any
    
    collectionMock.mockImplementation((name: string) => {
      if (name === 'contentHistory') {
        return { 
          get: () => ({ docs: mockHistory.map(h => ({ id: h.id, data: () => h })) }),
          doc: docMock
        }
      }
      if (name === 'services') {
        return { 
          get: () => ({ docs: mockServices.map(s => ({ id: s.id, data: () => s })) })
        }
      }
      if (name === 'brands') {
        return { 
          get: () => ({ docs: mockBrands.map(b => ({ id: b.id, data: () => b })) })
        }
      }
      return { get: () => ({ docs: [] }) }
    })

    const result = await migrateHistoryKeys()

    expect(result.successCount).toBe(2)
    expect(updateMock).toHaveBeenCalledWith({ entityId: 's1' })
    expect(updateMock).toHaveBeenCalledWith({ entityId: 'b1' })
  })

  it('should not update if entityId is already an ID (not found in slugs)', async () => {
     const mockHistory = [
      { id: 'h1', entityId: 'already-id', entityType: 'Service' }
    ]

    const updateMock = vi.fn()
    const docMock = vi.fn(() => ({ update: updateMock }))
    const collectionMock = (adminDb as any).collection as any
    
    collectionMock.mockImplementation((name: string) => {
      if (name === 'contentHistory') {
        return { 
          get: () => ({ docs: mockHistory.map(h => ({ id: h.id, data: () => h })) }),
          doc: docMock
        }
      }
      return { get: () => ({ docs: [] }) }
    })

    const result = await migrateHistoryKeys()

    expect(result.successCount).toBe(0)
    expect(updateMock).not.toHaveBeenCalled()
  })
})
