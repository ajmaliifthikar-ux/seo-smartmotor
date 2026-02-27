import { NextRequest, NextResponse } from 'next/server';
import { updateVehicle, deleteVehicle } from '@/lib/firestore-utils';
import { cookies } from 'next/headers';
import admin from 'firebase-admin';

// Ensure Firebase Admin SDK is initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

export async function PUT(req: NextRequest, context: any) {
  try {
    const sessionCookie = (await cookies()).get('session')?.value || '';
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    const uid = decodedClaims.uid;
    const { vehicleId } = context.params;

    const updates = await req.json();

    await updateVehicle(uid, vehicleId, updates);
    return NextResponse.json({ message: 'Vehicle updated successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating vehicle:', error);
    return NextResponse.json({ error: 'Unauthorized or invalid session' }, { status: 401 });
  }
}

export async function DELETE(req: NextRequest, context: any) {
  try {
    const sessionCookie = (await cookies()).get('session')?.value || '';
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    const uid = decodedClaims.uid;
    const { vehicleId } = context.params;

    await deleteVehicle(uid, vehicleId);
    return NextResponse.json({ message: 'Vehicle deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting vehicle:', error);
    return NextResponse.json({ error: 'Unauthorized or invalid session' }, { status: 401 });
  }
}
