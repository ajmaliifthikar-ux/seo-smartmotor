import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { signOut, getAuth } from 'firebase/auth';
import { firebaseConfig } from '@/lib/firebase-config';

export async function POST(req: NextRequest) {
  try {
    // Initialize Firebase only when needed
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const auth = getAuth(app);

    await signOut(auth);
    return NextResponse.json({ message: 'User logged out successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
