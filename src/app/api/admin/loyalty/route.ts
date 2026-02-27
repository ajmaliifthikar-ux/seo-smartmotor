import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';
import { cookies } from 'next/headers';
import { updateLoyaltyRecord, getLoyaltyRecord } from '@/lib/firestore-utils';
import { UserProfile } from '@/types/user'; // Import UserProfile

// Ensure Firebase Admin SDK is initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

export async function PUT(req: NextRequest) {
  try {
    const sessionCookie = (await cookies()).get('session')?.value || '';
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);

    // TODO: Implement admin role check here
    // if (!decodedClaims.admin) {
    //   return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
    // }

    const { uid, points, tier, adminId, reason } = await req.json();

    if (!uid || (!points && !tier)) {
      return NextResponse.json({ error: 'Missing user ID or loyalty update data' }, { status: 400 });
    }

    const updates: { points?: number; tier?: UserProfile['tier'] } = {};
    if (points !== undefined) updates.points = points;
    if (tier !== undefined) {
      const validTiers: UserProfile['tier'][] = ['bronze', 'silver', 'gold', 'platinum'];
      if (validTiers.includes(tier)) {
        updates.tier = tier;
      } else {
        return NextResponse.json({ error: 'Invalid loyalty tier provided' }, { status: 400 });
      }
    }

    await updateLoyaltyRecord(uid, updates as { points?: number; tier?: UserProfile['tier'] });

    // Implement audit logging for loyalty point adjustments
    await db.collection('audit_logs').add({
      action: 'loyalty_adjustment',
      targetUid: uid,
      changedBy: adminId || (decodedClaims.email || 'unknown_admin'),
      oldPoints: (await getLoyaltyRecord(uid))?.points, // Fetch old points for audit
      newPoints: points, // Assuming points is the new total
      oldTier: (await getLoyaltyRecord(uid))?.tier,
      newTier: tier,
      reason: reason || 'Admin adjustment',
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ message: 'Loyalty record updated and audited successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating loyalty record:', error);
    return NextResponse.json({ error: 'Unauthorized or internal server error' }, { status: 401 });
  }
}
