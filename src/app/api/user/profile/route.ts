import { NextRequest, NextResponse } from 'next/server';
import { getUserProfile, updateUserProfile } from '@/lib/firestore-utils';
import { cookies } from 'next/headers';
import admin from 'firebase-admin';

// Ensure Firebase Admin SDK is initialized
// This is already handled in auth-utils and firestore-utils, but good to ensure for standalone routes
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

    const userProfile = await getUserProfile(uid);
    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }
    return NextResponse.json(userProfile, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Unauthorized or invalid session' }, { status: 401 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const sessionCookie = (await cookies()).get('session')?.value || '';
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    const uid = decodedClaims.uid;

    const updates = await req.json();

    await updateUserProfile(uid, updates);
    return NextResponse.json({ message: 'User profile updated successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: 'Unauthorized or invalid session' }, { status: 401 });
  }
}
