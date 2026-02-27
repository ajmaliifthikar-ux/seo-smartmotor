import { adminDb } from './firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

export type NotificationType = 'MARKET_SHIFT' | 'TRAFFIC_ANOMALY' | 'CONVERSION_ALERT' | 'SYSTEM'

export interface Notification {
  id?: string
  type: NotificationType
  title: string
  message: string
  severity: 'low' | 'medium' | 'high'
  read: boolean
  createdAt: any
  link?: string
}

/**
 * Create a new notification in Firestore
 */
export async function createNotification(data: Omit<Notification, 'id' | 'createdAt' | 'read'>) {
  if (!adminDb) return null
  
  try {
    const docRef = await adminDb.collection('notifications').add({
      ...data,
      read: false,
      createdAt: FieldValue.serverTimestamp()
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating notification:', error)
    return null
  }
}

/**
 * Run autonomous checks for platform anomalies
 */
export async function runProactiveChecks() {
  const { getTrafficTrends, getBookingIntelligence } = await import('./analytics')
  const traffic = await getTrafficTrends()
  const intelligence = await getBookingIntelligence()

  const alerts = []

  // 1. Check for Traffic Anomalies (e.g., > 50% drop compared to average)
  if (traffic.length > 3) {
    const counts = traffic.map(t => t.count)
    const avg = counts.slice(0, -1).reduce((a, b) => a + b, 0) / (counts.length - 1)
    const latest = counts[counts.length - 1]
    
    if (latest > avg * 1.5) {
      alerts.push({
        type: 'TRAFFIC_ANOMALY' as NotificationType,
        title: 'Traffic Spike Detected',
        message: `Inbound traffic is ${Math.round((latest/avg - 1) * 100)}% above average. Check active campaigns.`,
        severity: 'medium' as const,
        link: '/admin/analytics'
      })
    }
  }

  // 2. Check for Conversion Dips
  if (intelligence && parseFloat(intelligence.conversionRate) < 2.0) {
    alerts.push({
      type: 'CONVERSION_ALERT' as NotificationType,
      title: 'Low Conversion Warning',
      message: `Platform conversion rate has dropped to ${intelligence.conversionRate}%. Review booking funnel.`,
      severity: 'high' as const,
      link: '/admin/dashboard'
    })
  }

  // Create notifications for detected alerts
  for (const alert of alerts) {
    await createNotification(alert)
  }

  return alerts
}
