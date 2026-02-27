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
    // if (!decodedClaims.admin) {
    //   return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
    // }

    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get('search');
    const limit = Number(searchParams.get('limit')) || 10;
    const offset = Number(searchParams.get('offset')) || 0;

    let usersQuery: admin.firestore.Query = db.collection('users').orderBy('createdAt', 'desc');

    if (searchTerm) {
      // Basic search by fullName or email (case-insensitive, starts-with)
      // Firestore doesn't support full-text search directly, so this is a basic prefix match.
      // For advanced search, consider a dedicated search service (e.g., Algolia, ElasticSearch).
      const lowerSearchTerm = searchTerm.toLowerCase();
      usersQuery = usersQuery
        .where('fullName', '>=', lowerSearchTerm)
        .where('fullName', '<=', lowerSearchTerm + '\uf8ff')
        .limit(limit)
        .offset(offset);
        // Note: For email search, you'd need a separate query or a client-side filter after fetching.
    }
    
    // Add pagination
    if (offset > 0) {
        usersQuery = usersQuery.startAfter(offset)
    }
    usersQuery = usersQuery.limit(limit)

    const snapshot = await usersQuery.get();
    const users = snapshot.docs.map(doc => doc.data());

    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching admin customers:', error);
    return NextResponse.json({ error: 'Unauthorized or internal server error' }, { status: 401 });
  }
}
