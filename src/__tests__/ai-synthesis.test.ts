import { describe, it, expect, vi } from 'vitest'
import { synthesizeMarketReport } from '../lib/ai/synthesis'

// Correct class mock for Vitest
vi.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: vi.fn().mockImplementation(function() {
      return {
        getGenerativeModel: vi.fn().mockImplementation(() => ({
          generateContent: vi.fn().mockResolvedValue({
            response: {
              text: () => `# EXECUTIVE STRATEGY OVERVIEW\n## 1. MARKET TOPOLOGY & TRENDS (MECE Analysis)\n## 2. COMPETITIVE VULNERABILITIES & EDGE\n## 3. STRATEGIC LEVERS & RECOMMENDATIONS`
            }
          })
        }))
      }
    })
  }
})

describe('Business Research Agent Synthesis', () => {
  it('should generate a report with PhD-level strategic sections', async () => {
    const rawData = "Some raw market data about Abu Dhabi car repairs"
    const report = await synthesizeMarketReport(rawData)
    
    expect(report).toContain('EXECUTIVE STRATEGY OVERVIEW')
    expect(report).toContain('MARKET TOPOLOGY & TRENDS (MECE Analysis)')
    expect(report).toContain('COMPETITIVE VULNERABILITIES & EDGE')
    expect(report).toContain('STRATEGIC LEVERS & RECOMMENDATIONS')
  })
})