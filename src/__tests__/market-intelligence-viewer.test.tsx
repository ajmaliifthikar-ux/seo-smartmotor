import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { MarketIntelligenceViewer } from '../components/admin/strategy-lab/market-intelligence-viewer'

describe('MarketIntelligenceViewer', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render the document title and content', () => {
    const content = '# Market Report\nThis is a test report.'
    render(<MarketIntelligenceViewer content={content} title="Abu Dhabi Market 2026" />)
    
    expect(screen.getByText('Abu Dhabi Market 2026')).toBeDefined()
    expect(screen.getByText('Market Report')).toBeDefined()
    expect(screen.getByText('This is a test report.')).toBeDefined()
  })

  it('should show placeholder when no content is provided', () => {
    render(<MarketIntelligenceViewer content="" />)
    expect(screen.getByText(/No intelligence data generated yet/i)).toBeDefined()
  })
})
