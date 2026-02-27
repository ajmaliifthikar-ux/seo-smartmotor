import { describe, it, expect, vi, beforeEach } from 'vitest'
import BrandPage from '../app/brand/[slug]/page'
import { adminGetAllBrands, adminGetAllServices } from '../lib/firebase-admin'
import { notFound } from 'next/navigation'

vi.mock('../lib/firebase-admin', () => ({
  adminGetAllBrands: vi.fn(),
  adminGetAllServices: vi.fn().mockResolvedValue([]),
}))

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => { throw new Error('NEXT_NOT_FOUND') }),
}))

// Mock components used in BrandPage
vi.mock('@/components/v2/layout/navbar', () => ({
  Navbar: () => 'navbar',
}))

vi.mock('@/components/v2/layout/footer', () => ({
  Footer: () => 'footer',
}))

describe('BrandPage Server Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('destructures and awaits params correctly', async () => {
    const mockBrands = [
      { name: 'Ferrari', slug: 'ferrari', description: 'F8, SF90', logoUrl: '/ferrari.png' }
    ]
    vi.mocked(adminGetAllBrands).mockResolvedValue(mockBrands as any)

    const params = Promise.resolve({ slug: 'ferrari' })
    const result = await BrandPage({ params })

    expect(adminGetAllBrands).toHaveBeenCalled()
    expect(result).toBeDefined()
  })

  it('calls notFound when brand is missing', async () => {
    vi.mocked(adminGetAllBrands).mockResolvedValue([])

    const params = Promise.resolve({ slug: 'unknown' })
    await expect(BrandPage({ params })).rejects.toThrow('NEXT_NOT_FOUND')

    expect(notFound).toHaveBeenCalled()
  })
})
