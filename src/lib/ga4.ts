import { BetaAnalyticsDataClient } from '@google-analytics/data'

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID || ''
const CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL
const PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

/**
 * Google Analytics 4 API Wrapper
 */
export class GA4Client {
  private client = new BetaAnalyticsDataClient({
    credentials: {
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    },
  })

  /**
   * Fetches traffic overview for the last 30 days.
   */
  async getTrafficOverview() {
    try {
      const [response] = await this.client.runReport({
        property: `properties/${GA4_PROPERTY_ID}`,
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'date' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'sessions' },
          { name: 'conversions' },
        ],
      })

      return response.rows?.map(row => ({
        date: row.dimensionValues?.[0].value,
        users: parseInt(row.metricValues?.[0].value || '0'),
        sessions: parseInt(row.metricValues?.[1].value || '0'),
        conversions: parseInt(row.metricValues?.[2].value || '0'),
      })) || []
    } catch (error) {
      console.error('GA4 Traffic Fetch Error:', error)
      return []
    }
  }

  /**
   * Checks for traffic anomalies (e.g., sharp drops).
   */
  async detectAnomalies() {
    const data = await this.getTrafficOverview()
    if (data.length < 7) return null

    const recent = data.slice(-1)[0]
    const previousWeek = data.slice(-8, -1)
    const avgSessions = previousWeek.reduce((acc, curr) => acc + curr.sessions, 0) / 7

    const drop = (avgSessions - recent.sessions) / avgSessions
    if (drop > 0.3) {
      return {
        type: 'TRAFFIC_DROP',
        severity: drop > 0.5 ? 'CRITICAL' : 'WARNING',
        percentage: Math.round(drop * 100),
        avgSessions,
        currentSessions: recent.sessions,
      }
    }

    return null
  }
}

export const ga4Client = new GA4Client()
