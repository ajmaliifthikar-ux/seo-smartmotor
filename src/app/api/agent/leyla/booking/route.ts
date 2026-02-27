import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'
import { z } from 'zod'

// Request validation
const bookingRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  carBrand: z.string().min(2),
  carModel: z.string().min(2),
  service: z.string().min(2),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  notes: z.string().optional(),
  sessionId: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const booking = bookingRequestSchema.parse(body)

    if (!adminDb) {
      throw new Error('Firebase Admin not initialized')
    }

    // Create booking in Firestore using Admin SDK
    const docRef = await adminDb.collection('bookings').add({
      ...booking,
      status: 'PENDING',
      createdAt: FieldValue.serverTimestamp(),
      createdFrom: 'leyla_agent',
      sessionId: booking.sessionId || 'unknown',
      reminders: {
        email: true,
        sms: false,
      },
    })

    // Generate confirmation message
    const confirmationMessage = `Perfect! I've booked your appointment for ${booking.carBrand} ${booking.carModel}. 
Here's your confirmation:
📍 Service: ${booking.service}
👤 Name: ${booking.name}
📧 Email: ${booking.email}
📱 Phone: ${booking.phone}
${booking.preferredDate ? `📅 Date: ${booking.preferredDate}` : ''}
${booking.preferredTime ? `⏰ Time: ${booking.preferredTime}` : ''}

We'll send you a confirmation email soon. Thank you for choosing Smart Motor! 🚗`

    return NextResponse.json({
      success: true,
      bookingId: docRef.id,
      message: confirmationMessage,
      bookingData: {
        id: docRef.id,
        ...booking,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Booking API error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid booking data',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create booking',
        message: "I'm sorry, I couldn't complete your booking. Please try again or contact us directly.",
      },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve booking confirmation
export async function GET(request: NextRequest) {
  try {
    const bookingId = request.nextUrl.searchParams.get('id')

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      )
    }

    // In production, fetch from Firestore
    return NextResponse.json({
      success: true,
      message: `Booking ${bookingId} confirmation sent to email`,
    })
  } catch (error) {
    console.error('Get booking error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve booking' },
      { status: 500 }
    )
  }
}
