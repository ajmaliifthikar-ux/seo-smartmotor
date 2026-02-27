import { adminDb } from '@/lib/firebase-admin';
import { z } from 'zod';

export const ServiceSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string(),
  priceMin: z.number(),
  priceMax: z.number().optional(),
  duration: z.number(),
  icon: z.string().optional(),
  isActive: z.boolean().default(true),
});

export async function getAllServices() {
  const firestore = adminDb;
  if (!firestore) return [];
  const snapshot = await firestore.collection('services')
    .where('active', '==', true)
    .orderBy('sortOrder', 'asc')
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
