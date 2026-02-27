import { NextRequest, NextResponse } from 'next/server';
import { createGoogleWalletPass } from '@/lib/wallet/google-wallet';

export async function POST(req: NextRequest) {
  try {
    const bookingDetails = await req.json();
    console.log('API: Generating Google Wallet Pass for:', bookingDetails.bookingRef);

    if (!bookingDetails || !bookingDetails.bookingRef) {
      console.warn('API: Missing booking details in request body');
      return NextResponse.json({ error: 'Missing booking details' }, { status: 400 });
    }

    const passUrl = await createGoogleWalletPass({
      bookingRef: bookingDetails.bookingRef,
      customerName: bookingDetails.customerName || bookingDetails.fullName || 'Valued Customer',
      vehicle: bookingDetails.vehicle || 'Your Vehicle',
      date: bookingDetails.date || 'TBD',
      time: bookingDetails.time || 'TBD',
      services: bookingDetails.services || ['Service Appointment'],
    });

    return NextResponse.json({ passUrl });
  } catch (error: any) {
    console.error('Google Wallet Pass generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate Google Wallet pass', details: error.message },
      { status: 500 }
    );
  }
}
