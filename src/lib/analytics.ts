'use server'

import { createAnalyticsLog, getAnalyticsLogs } from './firebase-db'
import { headers } from 'next/headers'

export type AnalyticsEventType = 'page_view' | 'click' | 'conversion' | 'lead' | 'FAQ_VIEW'

export interface LogEventParams {
    eventType: AnalyticsEventType
    resource?: string
    metadata?: any
}

export async function logEvent({ eventType, resource, metadata }: LogEventParams) {
    try {
        const headerList = await headers()
        const userAgent = headerList.get('user-agent') || 'unknown'

        const isMobile = /mobile/i.test(userAgent)
        const device = isMobile ? 'mobile' : 'desktop'

        let browser = 'other'
        if (userAgent.includes('Chrome')) browser = 'Chrome'
        else if (userAgent.includes('Safari')) browser = 'Safari'
        else if (userAgent.includes('Firefox')) browser = 'Firefox'
        else if (userAgent.includes('Edge')) browser = 'Edge'

        const emirate = headerList.get('x-vercel-ip-country-region') || 'Abu Dhabi'
        const city = headerList.get('x-vercel-ip-city') || 'Musaffah'

        await createAnalyticsLog({
            eventType,
            resource,
            emirate,
            city,
            device,
            browser,
            metadata: metadata || {},
        })
    } catch (error) {
        console.error('Failed to log analytics event:', error)
    }
}

export async function getHeatmapData() {
    try {
        const logs = await getAnalyticsLogs(500)
        const emirateCounts: Record<string, number> = {}
        
        logs.forEach((log: any) => {
            if (log.emirate) {
                emirateCounts[log.emirate] = (emirateCounts[log.emirate] || 0) + 1
            }
        })

        return Object.entries(emirateCounts).map(([emirate, count]) => ({
            emirate,
            count
        }))
    } catch (error) {
        console.error('getHeatmapData Error:', error)
        return []
    }
}

export async function getTrafficTrends() {
    try {
        const logs = await getAnalyticsLogs(500)
        const dailyCounts: Record<string, number> = {}
        
        // Last 7 days
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

        logs.forEach((log: any) => {
            try {
                const createdAtDate = log.createdAt?.toDate?.() || new Date(log.createdAt)
                const date = createdAtDate.toISOString().split('T')[0]
                if (createdAtDate >= sevenDaysAgo) {
                    dailyCounts[date] = (dailyCounts[date] || 0) + 1
                }
            } catch (innerErr) {
                // Ignore logs with invalid dates
            }
        })

        return Object.entries(dailyCounts)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([date, count]) => ({
                date,
                count
            }))
    } catch (error) {
        console.error('getTrafficTrends Error:', error)
        return []
    }
}

/**
 * Live Conversion Intelligence
 */
export async function getBookingIntelligence() {
    const { getAllBookings, getAnalyticsLogs } = await import('./firebase-db')
    
    try {
        const [bookings, logs] = await Promise.all([
            getAllBookings(),
            getAnalyticsLogs(1000)
        ])

        const totalBookings = bookings.length
        const totalViews = logs.filter((l: any) => l.eventType === 'page_view').length
        
        // Conversion Rate: Bookings / Unique page views (simplified)
        const conversionRate = totalViews > 0 ? (totalBookings / totalViews) * 100 : 0
        
        // Revenue calculation
        const completedBookings = bookings.filter(b => b.status === 'completed' || (b.status as string) === 'COMPLETED')
        const totalRevenue = completedBookings.reduce((sum, b) => sum + ((b as any).totalPrice || (b as any).totalAmount || 0), 0)
        const avgValue = completedBookings.length > 0 ? totalRevenue / completedBookings.length : 0

        // Status Distribution
        const distribution = {
            PENDING: bookings.filter(b => b.status === 'pending' || (b.status as string) === 'PENDING').length,
            CONFIRMED: bookings.filter(b => b.status === 'confirmed' || (b.status as string) === 'CONFIRMED').length,
            COMPLETED: bookings.filter(b => b.status === 'completed' || (b.status as string) === 'COMPLETED').length,
            CANCELLED: bookings.filter(b => b.status === 'cancelled' || (b.status as string) === 'CANCELLED').length,
        }

        return {
            conversionRate: conversionRate.toFixed(1),
            totalRevenue,
            avgValue,
            distribution,
            totalBookings
        }
    } catch (error) {
        console.error('Booking Intelligence Error:', error)
        return null
    }
}
