import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';
import { cookies } from 'next/headers';

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

    // TODO: Implement admin role check here

    const snapshot = await db.collection('audit_logs').orderBy('timestamp', 'desc').limit(50).get();
    const logs = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            timestamp: data.timestamp ? data.timestamp.toDate().toLocaleString() : 'Unknown',
        };
    });

    return NextResponse.json(logs, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching admin audit logs:', error);
    return NextResponse.json({ error: 'Unauthorized or internal server error' }, { status: 401 });
  }
}
