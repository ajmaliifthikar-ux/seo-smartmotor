import { NextRequest, NextResponse } from 'next/server';
import { getLoyaltyRecord } from '@/lib/firestore-utils';
import { cookies } from 'next/headers';
import admin from 'firebase-admin';

// Ensure Firebase Admin SDK is initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = (await cookies()).get('session')?.value || '';
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    const uid = decodedClaims.uid;

    const loyaltyRecord = await getLoyaltyRecord(uid);
    if (!loyaltyRecord) {
      return NextResponse.json({ error: 'Loyalty record not found' }, { status: 404 });
    }
    return NextResponse.json(loyaltyRecord, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching loyalty record:', error);
    return NextResponse.json({ error: 'Unauthorized or invalid session' }, { status: 401 });
  }
}
