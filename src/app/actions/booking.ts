'use server'

import { createBookingV2, createBooking, LegacyBookingSchema } from '@/lib/db/bookings'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { sendV2BookingConfirmation, sendAdminNotification } from '@/lib/email'

// Schema for input validation
const bookingFormSchemaV2 = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    brand: z.string().min(1),
    model: z.string().min(1),
    year: z.string().min(4),
    services: z.array(z.string()).min(1),
    date: z.string(),
    time: z.string(),
    notes: z.string().optional(),
})

export type BookingState = {
    message: string
    success: boolean
    bookingRef?: string
}

export async function submitV2Booking(data: z.infer<typeof bookingFormSchemaV2>): Promise<BookingState> {
    const result = bookingFormSchemaV2.safeParse(data)

    if (!result.success) {
        return { success: false, message: 'Invalid data provided' }
    }

    const validData = result.data
    const bookingDate = new Date(validData.date)
    
    // Generate unique reference SM-XXXXXX
    const bookingRef = `SM-${Math.floor(100000 + Math.random() * 900000)}`

    try {
        await createBookingV2({
            fullName: validData.fullName,
            email: validData.email,
            phone: validData.phone,
            brand: validData.brand,
            model: validData.model,
            year: validData.year,
            services: validData.services,
            date: bookingDate,
            time: validData.time,
            notes: validData.notes,
            bookingRef: bookingRef,
            status: 'PENDING',
        })

        // We only attempt to send emails, but we don't let it crash the booking
        try {
            // Send Email Confirmation
            await sendV2BookingConfirmation(validData.email, {
                bookingRef,
                customerName: validData.fullName,
                services: validData.services,
                vehicle: `${validData.year} ${validData.brand} ${validData.model}`,
                date: validData.date,
                time: validData.time
            })

            // Notify Admin
            await sendAdminNotification(
                `New Booking: ${bookingRef}`,
                `A new booking has been received from ${validData.fullName} for a ${validData.year} ${validData.brand} ${validData.model}.<br/>
                Date: ${validData.date} at ${validData.time}<br/>
                Services: ${validData.services.join(', ')}<br/>
                Phone: ${validData.phone}<br/>
                Email: ${validData.email}`
            )
        } catch(emailErr) {
            console.error("Email sending failed but booking succeeded", emailErr)
        }

        revalidatePath('/admin')
        return { success: true, message: 'Slot reserved successfully!', bookingRef }

    } catch (error: any) {
        console.error('Booking error:', error)
        return { success: false, message: 'System error. Please try again.' }
    }
}

// Keep the old bookSlot for backwards compatibility if it's used elsewhere
export async function bookSlot(prevState: BookingState | null, formData: FormData): Promise<BookingState> {
    const rawData = {
        serviceId: formData.get('serviceId'),
        date: formData.get('date'),
        slot: formData.get('slot'),
        userId: formData.get('userId'),
        guestName: formData.get('guestName'),
        guestEmail: formData.get('guestEmail'),
        guestPhone: formData.get('guestPhone'),
        notes: formData.get('notes'),
    }

    try {
        const data = LegacyBookingSchema.parse({
            ...rawData,
            date: new Date(rawData.date as string),
        });

        await createBooking(data)

        revalidatePath('/admin')
        return { success: true, message: 'Slot reserved successfully!' }

    } catch (error: any) {
        console.error('Booking error:', error)
        if (error.message === 'Slot already booked') {
            return { success: false, message: 'This slot has already been taken.' }
        }
        return { success: false, message: 'System error. Please try again.' }
    }
}
