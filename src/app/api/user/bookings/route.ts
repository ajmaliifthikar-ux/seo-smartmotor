import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import admin from 'firebase-admin';

// Ensure Firebase Admin SDK is initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = (await cookies()).get('session')?.value || '';
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    const uid = decodedClaims.uid;

    // Fetch bookings for the authenticated user
    const bookingsSnapshot = await db.collection('bookings').where('userId', '==', uid).orderBy('date', 'desc').get();
    const bookings = bookingsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(bookings, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching user bookings:', error);
    return NextResponse.json({ error: 'Unauthorized or invalid session' }, { status: 401 });
  }
}
