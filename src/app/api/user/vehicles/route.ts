import { NextRequest, NextResponse } from 'next/server';
import { addVehicle, getVehicles } from '@/lib/firestore-utils';
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

    const vehicles = await getVehicles(uid);
    return NextResponse.json(vehicles, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching vehicles:', error);
    return NextResponse.json({ error: 'Unauthorized or invalid session' }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const sessionCookie = (await cookies()).get('session')?.value || '';
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    const uid = decodedClaims.uid;

    const vehicleData = await req.json();
    const newVehicle = await addVehicle(uid, vehicleData);
    return NextResponse.json(newVehicle, { status: 201 });
  } catch (error: any) {
    console.error('Error adding vehicle:', error);
    return NextResponse.json({ error: 'Unauthorized or invalid session' }, { status: 401 });
  }
}
