import { describe, it, expect, vi, beforeEach } from 'vitest'
import { swarmOrchestrator } from '../lib/ai/swarm-orchestrator'
import { ga4Client } from '../lib/ga4'
import * as emailUtils from '../lib/email'

vi.mock('../lib/ga4', () => ({
  ga4Client: {
    detectAnomalies: vi.fn().mockResolvedValue(null)
  }
}))

vi.mock('../lib/gsc', () => ({
  gscClient: {
    getPerformance: vi.fn().mockResolvedValue([])
  }
}))

vi.mock('../lib/email', () => ({
  sendAdminNotification: vi.fn().mockResolvedValue({ success: true })
}))

vi.mock('../lib/firebase-admin', () => ({
  adminDb: {
    collection: vi.fn(() => ({
      add: vi.fn().mockResolvedValue({ id: 'alert-1' })
    }))
  }
}))

describe('SwarmOrchestrator', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should handle detected anomalies and notify admin', async () => {
    const mockAnomaly = {
      type: 'TRAFFIC_DROP',
      severity: 'CRITICAL',
      percentage: 45,
      avgSessions: 100,
      currentSessions: 55
    }
    
    vi.mocked(ga4Client.detectAnomalies).mockResolvedValueOnce(mockAnomaly)

    await swarmOrchestrator.runDailyAudit()

    expect(emailUtils.sendAdminNotification).toHaveBeenCalledWith(
      expect.stringContaining('TRAFFIC_DROP'),
      expect.stringContaining('Drop: 45%')
    )
  })
})
