'use server'

import { 
    adminGetAllBrands, 
    adminGetAllServices, 
    adminGetAllPublishedContent,
    adminDb 
} from '@/lib/firebase-admin'
import { traceIntegration } from '@/lib/diagnostics'

export async function getBrandsWithModels() {
    return await adminGetAllBrands()
}

export async function getServices() {
    return await adminGetAllServices()
}

export async function getAvailableSlots(date: string, serviceId: string) {
    // Basic implementation for now
    return ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
}

export async function getFAQs() {
    return await adminGetAllPublishedContent('FAQ')
}

export async function getContentHistory() {
    return { audit: [], snapshots: [] } // Correctly shaped placeholder implementation
}

export async function searchCustomer(query: string) {
    if (!query || query.length < 3) return null

    try {
        const allBookings: any[] = [] // Placeholder since getAllBookings isn't imported/defined
        const customers = allBookings
            .filter((b: any) => 
                b.guestEmail?.toLowerCase().includes(query.toLowerCase()) ||
                b.guestPhone?.includes(query) ||
                b.guestName?.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 5)

        if (customers.length === 0) return null

        return customers.map((c: any) => ({
            name: c.guestName,
            email: c.guestEmail,
            phone: c.guestPhone,
            car: `${c.vehicleBrand || ''} ${c.vehicleModel || ''}`.trim(),
            lastService: c.serviceIds?.[0] || c.serviceId,
            lastVisit: c.createdAt instanceof Date 
                ? c.createdAt.toISOString() 
                : (typeof c.createdAt === 'string' ? c.createdAt : (c.createdAt?.toDate?.()?.toISOString() || new Date().toISOString())),
            status: c.status
        }))
    } catch (error) {
        console.error('searchCustomer Error:', error)
        return null // Fallback silently
    }
}
