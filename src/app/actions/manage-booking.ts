'use server'

import { updateBookingStatus as dbUpdateStatus } from '@/lib/db/bookings'
import { revalidatePath } from 'next/cache'

export async function updateBookingStatus(bookingRef: string, status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED') {
    try {
        await dbUpdateStatus(bookingRef, status)
        revalidatePath(`/booking/${bookingRef}`)
        return { success: true }
    } catch (error: any) {
        console.error('Update booking error:', error)
        return { success: false, message: 'Failed to update booking status.' }
    }
}
