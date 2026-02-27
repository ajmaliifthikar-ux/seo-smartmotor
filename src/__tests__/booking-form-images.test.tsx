import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BookingForm } from '@/components/v2/sections/booking-form'
import { getBrandsWithModels, getServices } from '@/app/actions'
import React from 'react'

vi.mock('@/lib/language-context', () => ({
  useLanguage: () => ({ isRTL: false, language: 'en' }),
}))

vi.mock('@/app/actions', () => ({
  getBrandsWithModels: vi.fn(),
  getServices: vi.fn(),
  getAvailableSlots: vi.fn(),
}))

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

describe('BookingForm Images', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should display brand images and handle errors', async () => {
    const mockBrands = [
      { id: '1', name: 'Ferrari', logoFile: 'ferrari.png', models: ['F8'] }
    ]
    const mockServices = [
      { id: 's1', name: 'Oil Change', description: 'Fast oil change', duration: '1h' }
    ]
    
    vi.mocked(getBrandsWithModels).mockResolvedValue(mockBrands as any)
    vi.mocked(getServices).mockResolvedValue(mockServices as any)

    render(<BookingForm />)

    // 1. Wait for data to load
    await waitFor(() => expect(screen.queryByText(/Optimizing Engine/i)).toBeNull())

    // 2. Step 1: Select Service
    const serviceBtns = await screen.findAllByText(/Oil Change/i)
    fireEvent.click(serviceBtns[0])
    
    const nextBtn = screen.getByText(/Continue/i)
    fireEvent.click(nextBtn)

    // 3. Step 2: Check Brand Image
    const img = await screen.findByAltText('Ferrari') as HTMLImageElement
    expect(img).toBeDefined()
    expect(img.src).toContain('ferrari.png')
  })
})
