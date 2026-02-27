import admin from 'firebase-admin';
import {
  UserProfile,
  Vehicle
} from '@/types/user';

// Initialize Firebase Admin SDK (ensure this is done only once)
// In a production environment, use environment variables for credentials.
// Example: FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL, FIREBASE_PROJECT_ID
// Or load from a service account JSON file, but ensure it's kept secure.
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    // projectId: process.env.FIREBASE_PROJECT_ID, // Use if applicationDefault() doesn't pick it up
  });
}

const db = admin.firestore();

const usersCollection = db.collection('users');
const loyaltyCollection = db.collection('loyalty'); // New loyalty collection

// --- User Profile Management ---

export async function createUserProfile(uid: string, email: string, fullName: string): Promise<UserProfile> {
  const newUser: UserProfile = {
    uid,
    email,
    fullName,
    loyaltyPoints: 0,
    tier: 'bronze',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await usersCollection.doc(uid).set(newUser);
  return newUser;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const doc = await usersCollection.doc(uid).get();
  if (doc.exists) {
    return doc.data() as UserProfile;
  }
  return null;
}

export async function updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
  await usersCollection.doc(uid).update({
    ...updates,
    updatedAt: new Date(),
  });
}

// --- Vehicle Management (Sub-collection under User) ---

export async function addVehicle(uid: string, vehicleData: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vehicle> {
  const vehiclesSubCollection = usersCollection.doc(uid).collection('vehicles');
  const newVehicle: Vehicle = {
    id: vehiclesSubCollection.doc().id, // Generate a new ID for the vehicle
    ...vehicleData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await vehiclesSubCollection.doc(newVehicle.id).set(newVehicle);
  return newVehicle;
}

export async function getVehicles(uid: string): Promise<Vehicle[]> {
  const vehiclesSubCollection = usersCollection.doc(uid).collection('vehicles');
  const snapshot = await vehiclesSubCollection.get();
  return snapshot.docs.map(doc => doc.data() as Vehicle);
}

export async function updateVehicle(uid: string, vehicleId: string, updates: Partial<Vehicle>): Promise<void> {
  const vehiclesSubCollection = usersCollection.doc(uid).collection('vehicles');
  await vehiclesSubCollection.doc(vehicleId).update({
    ...updates,
    updatedAt: new Date(),
  });
}

export async function deleteVehicle(uid: string, vehicleId: string): Promise<void> {
  const vehiclesSubCollection = usersCollection.doc(uid).collection('vehicles');
  await vehiclesSubCollection.doc(vehicleId).delete();
}

// --- Loyalty Management (New Collection) ---

// Function to create a loyalty record (e.g., when a user is created)
export async function createLoyaltyRecord(uid: string, initialPoints: number = 0): Promise<void> {
  await loyaltyCollection.doc(uid).set({
    uid,
    points: initialPoints,
    tier: 'bronze',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

// Function to get loyalty information
export async function getLoyaltyRecord(uid: string): Promise<any | null> {
  const doc = await loyaltyCollection.doc(uid).get();
  if (doc.exists) {
    return doc.data();
  }
  return null;
}

// Function to update loyalty points and tier
export async function updateLoyaltyRecord(uid: string, updates: {
  points?: number;
  tier?: 'bronze' | 'silver' | 'gold' | 'platinum';
}): Promise<void> {
  await loyaltyCollection.doc(uid).update({
    ...updates,
    updatedAt: new Date(),
  });
}
