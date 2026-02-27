import admin from 'firebase-admin';
import { createUserProfile, createLoyaltyRecord } from '@/lib/firestore-utils';

// Ensure Firebase Admin SDK is initialized
// This should ideally use environment variables in production
// For a Next.js API route, it's generally initialized once at the entry point or in a global utility.
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const authAdmin = admin.auth();

export async function verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
  return authAdmin.verifyIdToken(idToken);
}

export async function createOrUpdateUser(uid: string, email: string, displayName: string): Promise<admin.auth.UserRecord> {
  try {
    const userRecord = await authAdmin.getUser(uid);
    // User exists, update display name if changed
    if (userRecord.displayName !== displayName) {
      await authAdmin.updateUser(uid, { displayName });
    }
    return userRecord;
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      // User does not exist, create a new user
      const newUserRecord = await authAdmin.createUser({
        uid,
        email,
        displayName,
        emailVerified: true, // Assuming tokens from Google/Apple are verified
      });
      // Create user profile and loyalty record in Firestore
      await createUserProfile(uid, email, displayName);
      await createLoyaltyRecord(uid);
      return newUserRecord;
    }
    throw error;
  }
}

export async function createSessionCookie(idToken: string): Promise<string> {
  // Set session expiration to 5 days. The maximum is 2 weeks.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  return authAdmin.createSessionCookie(idToken, { expiresIn });
}

export async function revokeSessionCookie(sessionCookie: string): Promise<void> {
  const decodedClaims = await authAdmin.verifySessionCookie(sessionCookie);
  await authAdmin.revokeRefreshTokens(decodedClaims.sub);
}
