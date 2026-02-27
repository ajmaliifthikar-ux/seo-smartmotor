import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { SeoRaceDashboard } from '../components/admin/strategy-lab/seo-race-dashboard'

// Mock Recharts
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  BarChart: ({ children }: any) => <div>{children}</div>,
  Bar: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  Tooltip: () => <div />,
  CartesianGrid: () => <div />,
}))

describe('SeoRaceDashboard', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render the keyword volume section and competitor cards', () => {
    const data = {
      keywords: [{ term: 'luxury-keyword', volume: 1200, difficulty: 'High' as const, trend: 'up' as const }],
      competitors: [{ name: 'Apex Auto', rank: 1, score: 88, updates: 'New Blog Post' }]
    }
    render(<SeoRaceDashboard data={data} />)
    
    expect(screen.getAllByText(/Keyword/i)).toBeDefined()
    expect(screen.getByText(/Volume Audit/i)).toBeDefined()
    expect(screen.getByText('Apex Auto')).toBeDefined()
    expect(screen.getByText(/Action Plan/i)).toBeDefined()
  })
})
