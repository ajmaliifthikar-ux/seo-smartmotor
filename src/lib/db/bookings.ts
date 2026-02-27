import { adminDb } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';
import { z } from 'zod';

// Legacy Booking Schema - kept for backwards compatibility during migration if needed
export const LegacyBookingSchema = z.object({
  userId: z.string().optional(),
  guestName: z.string().optional(),
  guestEmail: z.string().email().optional(),
  guestPhone: z.string().optional(),
  vehicleBrand: z.string().optional(),
  vehicleModel: z.string().optional(),
  serviceId: z.string(),
  date: z.date(),
  slot: z.string(),
  notes: z.string().optional(),
  status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']).default('PENDING'),
});

// New V2 Booking Schema
export const BookingSchemaV2 = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Invalid phone number'),
  brand: z.string().min(1, 'Please select a brand'),
  model: z.string().min(1, 'Please select a model'),
  year: z.string().min(4, 'Please select a year'),
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  date: z.date(),
  time: z.string(),
  notes: z.string().optional(),
  bookingRef: z.string(),
  status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']).default('PENDING'),
});

export async function createBookingV2(data: z.infer<typeof BookingSchemaV2>) {
  const firestore = adminDb;
  if (!firestore) throw new Error('Database not initialized');
  const bookingsRef = firestore.collection('bookings_v2');

  return firestore.runTransaction(async (transaction) => {
    // Generate new doc reference
    const newBookingRef = bookingsRef.doc();
    const timestamp = Timestamp.now();
    const bookingData = {
      ...data,
      date: Timestamp.fromDate(data.date), // Store as Firestore Timestamp
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    transaction.set(newBookingRef, bookingData);
    return { id: newBookingRef.id, ...bookingData };
  });
}

export async function getBookingByRef(bookingRef: string) {
  const firestore = adminDb;
  if (!firestore) throw new Error('Database not initialized');
  
  const snapshot = await firestore.collection('bookings_v2').where('bookingRef', '==', bookingRef).limit(1).get();
  if (snapshot.empty) return null;
  
  const doc = snapshot.docs[0];
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    date: data.date.toDate().toISOString(),
    createdAt: data.createdAt.toDate().toISOString(),
    updatedAt: data.updatedAt.toDate().toISOString()
  };
}

export async function updateBookingStatus(bookingRef: string, status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED') {
  const firestore = adminDb;
  if (!firestore) throw new Error('Database not initialized');
  
  const snapshot = await firestore.collection('bookings_v2').where('bookingRef', '==', bookingRef).limit(1).get();
  if (snapshot.empty) throw new Error('Booking not found');
  
  const docRef = snapshot.docs[0].ref;
  await docRef.update({
    status,
    updatedAt: Timestamp.now()
  });
  
  return true;
}

// Keep the old createBooking around if it's imported elsewhere, but it's basically deprecated
export async function createBooking(data: z.infer<typeof LegacyBookingSchema>) {
  const firestore = adminDb;
  if (!firestore) throw new Error('Database not initialized');
  const bookingsRef = firestore.collection('bookings');

  return firestore.runTransaction(async (transaction) => {
    const startOfDay = new Date(data.date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(data.date);
    endOfDay.setHours(23, 59, 59, 999);

    const query = bookingsRef
      .where('date', '>=', Timestamp.fromDate(startOfDay))
      .where('date', '<=', Timestamp.fromDate(endOfDay))
      .where('slot', '==', data.slot);

    const snapshot = await transaction.get(query);
    if (!snapshot.empty) throw new Error('Slot already booked');

    const newBookingRef = bookingsRef.doc();
    const timestamp = Timestamp.now();
    const bookingData = {
      ...data,
      date: Timestamp.fromDate(data.date),
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    transaction.set(newBookingRef, bookingData);
    return { id: newBookingRef.id, ...bookingData };
  });
}
