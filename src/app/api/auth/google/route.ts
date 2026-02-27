import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken, createOrUpdateUser, createSessionCookie } from '@/lib/auth-utils';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json({ error: 'ID token not provided' }, { status: 400 });
    }

    // Verify the ID token using Firebase Admin SDK
    const decodedToken = await verifyIdToken(idToken);

    const uid = decodedToken.uid;
    const email = decodedToken.email || '';
    const displayName = decodedToken.name || '';

    // Create or update user in Firebase Auth and Firestore
    await createOrUpdateUser(uid, email, displayName);

    // Create a session cookie
    const sessionCookie = await createSessionCookie(idToken);

    // Set the session cookie in the response headers
    (await cookies()).set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 5, // 5 days
      path: '/',
    });

    return NextResponse.json({ message: 'Logged in successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Google Sign-In error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
