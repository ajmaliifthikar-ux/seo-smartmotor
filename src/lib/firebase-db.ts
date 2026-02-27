import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  WriteBatch,
  writeBatch,
  QueryConstraint,
  getCountFromServer,
  addDoc, runTransaction, increment,
} from 'firebase/firestore'
import { initializeApp, getApps } from 'firebase/app'
import { Brand, Service, Booking, BlogPost } from '@/types'

// Initialize Firestore
const firebaseConfig = {
  apiKey: (process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '').trim(),
  authDomain: (process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '').trim(),
  projectId: (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '').trim(),
  storageBucket: (process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '').trim(),
  messagingSenderId: (process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '').trim(),
  appId: (process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '').trim(),
}

let dbInstance: ReturnType<typeof getFirestore> | null = null

function getSafeDb() {
  if (dbInstance) return dbInstance
  try {
    const apps = getApps()
    const app = apps.length > 0 ? apps[0] : initializeApp(firebaseConfig)
    dbInstance = getFirestore(app, 'smartmotordb')
    return dbInstance
  } catch (error) {
    console.error('Firebase DB Initialization Error:', error)
    return null
  }
}

export const db = getSafeDb()

// ─── OPTIMIZED COUNTS ───

export async function getCustomerCount(): Promise<number> {
  const db = getSafeDb()
  if (!db) return 0
  try {
    const q = query(collection(db, 'users'), where('role', '==', 'CUSTOMER'))
    const snapshot = await getCountFromServer(q)
    return snapshot.data().count
  } catch (error) {
    console.error('Error getting customer count:', error)
    return 0
  }
}

export async function getActiveBookingCount(): Promise<number> {
  const db = getSafeDb()
  if (!db) return 0
  try {
    const q = query(collection(db, 'bookings'), where('status', 'in', ['PENDING', 'CONFIRMED', 'LOCKED']))
    const snapshot = await getCountFromServer(q)
    return snapshot.data().count
  } catch (error) {
    console.error('Error getting booking count:', error)
    return 0
  }
}

// ─── USER MANAGEMENT ───

export async function getUser(userId: string) {
  const db = getSafeDb()
  if (!db) return null
  const docRef = doc(db, 'users', userId)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as any : null
}

export async function getUserByEmail(email: string) {
  const db = getSafeDb()
  if (!db) return null
  const q = query(collection(db, 'users'), where('email', '==', email.toLowerCase()))
  const snapshot = await getDocs(q)
  return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as any
}

export async function getAllUsers() {
  const db = getSafeDb()
  if (!db) return []
  const q = query(collection(db, 'users'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[]
}

export async function updateUser(userId: string, updates: Record<string, unknown>) {
  const db = getSafeDb()
  if (!db) return
  await updateDoc(doc(db, 'users', userId), { ...updates, updatedAt: Timestamp.now() })
}

// ─── BOOKING MANAGEMENT ───

export async function getAllBookings(): Promise<Booking[]> {
  const db = getSafeDb()
  if (!db) return []
  const snapshot = await getDocs(collection(db, 'bookings'))
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[]
}

export async function getBookingsByDate(date: Date) {
  const db = getSafeDb()
  if (!db) return []
  const start = new Date(date); start.setHours(0,0,0,0)
  const end = new Date(date); end.setHours(23,59,59,999)
  const q = query(collection(db, 'bookings'), where('date', '>=', Timestamp.fromDate(start)), where('date', '<=', Timestamp.fromDate(end)))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[]
}

export async function createBooking(data: Record<string, unknown>) {
  const db = getSafeDb()
  if (!db) return null

  // Run transaction to get a unique sequential booking reference
  const bookingRefNumber = await runTransaction(db, async (transaction) => {
    const seqDocRef = doc(db, 'system', 'booking_sequence');
    const seqDoc = await transaction.get(seqDocRef);
    
    let nextSeq = 10001; // Start at 10001 if doesn't exist
    if (seqDoc.exists()) {
      nextSeq = seqDoc.data().current + 1;
      transaction.update(seqDocRef, { current: nextSeq });
    } else {
      transaction.set(seqDocRef, { current: nextSeq });
    }
    
    return `SM-${nextSeq}`;
  });

  // Strip undefined values
  const cleanData = Object.entries(data).reduce((acc: Record<string, any>, [key, value]) => {
    if (value !== undefined) acc[key] = value;
    else acc[key] = null;
    return acc;
  }, {});

  const bookingData = { 
    ...cleanData, 
    bookingRef: bookingRefNumber,
    createdAt: Timestamp.now(), 
    updatedAt: Timestamp.now() 
  };
  
  const docRef = doc(collection(db, 'bookings'));
  await setDoc(docRef, bookingData);
  
  return { id: docRef.id, ...bookingData };
}

// ─── CONTENT MANAGEMENT ───

export async function getContent(id: string) {
  const db = getSafeDb()
  if (!db) return null
  const docSnap = await getDoc(doc(db, 'content', id))
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as any : null
}

export async function updateContent(id: string, data: Record<string, unknown>) {
  const db = getSafeDb()
  if (!db) return
  await updateDoc(doc(db, 'content', id), { ...data, updatedAt: Timestamp.now() })
}

export async function createContent(data: Record<string, unknown>) {
  const db = getSafeDb()
  if (!db) return
  const docRef = await addDoc(collection(db, 'content'), { ...data, createdAt: Timestamp.now(), updatedAt: Timestamp.now() })
  return docRef.id
}

export async function deleteContent(id: string) {
  const db = getSafeDb()
  if (!db) return
  await deleteDoc(doc(db, 'content', id))
}

export async function getAllPublishedContent(type?: string): Promise<BlogPost[]> {
  const db = getSafeDb()
  if (!db) return []
  let q = query(collection(db, 'content'), where('published', '==', true))
  if (type) q = query(q, where('type', '==', type))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[]
}

// ─── SERVICE & BRAND ───

export async function getService(id: string) {
  const db = getSafeDb()
  if (!db) return null
  const docSnap = await getDoc(doc(db, 'services', id))
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as any : null
}

export async function updateService(id: string, data: Record<string, unknown>) {
  const db = getSafeDb()
  if (!db) return
  await updateDoc(doc(db, 'services', id), { ...data, updatedAt: Timestamp.now() })
}

export async function createService(data: Record<string, unknown>) {
  const db = getSafeDb()
  if (!db) return
  const docRef = await addDoc(collection(db, 'services'), { ...data, active: true, createdAt: Timestamp.now() })
  return docRef.id
}

export async function getBrand(id: string) {
  const db = getSafeDb()
  if (!db) return null
  const docSnap = await getDoc(doc(db, 'brands', id))
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as any : null
}

export async function createBrand(data: Record<string, unknown>) {
  const db = getSafeDb()
  if (!db) return
  const docRef = await addDoc(collection(db, 'brands'), { ...data, createdAt: Timestamp.now() })
  return docRef.id
}

export async function updateBrand(id: string, data: Record<string, unknown>) {
  const db = getSafeDb()
  if (!db) return
  await updateDoc(doc(db, 'brands', id), { ...data, updatedAt: Timestamp.now() })
}

export async function deleteBrand(id: string) {
  const db = getSafeDb()
  if (!db) return
  await deleteDoc(doc(db, 'brands', id))
}

export async function getAllBrands(): Promise<Brand[]> {
  const db = getSafeDb()
  if (!db) return []
  const snapshot = await getDocs(query(collection(db, 'brands'), orderBy('name', 'asc')))
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[]
}

export async function getAllServices(): Promise<Service[]> {
  const db = getSafeDb()
  if (!db) return []
  const snapshot = await getDocs(query(collection(db, 'services'), where('active', '==', true)))
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[]
}

// ─── LOGGING & ANALYTICS ───

export async function createAuditLog(data: Record<string, unknown>) {
  const db = getSafeDb()
  if (!db) return
  await addDoc(collection(db, 'auditLogs'), { ...data, createdAt: Timestamp.now() })
}

export async function createAnalyticsLog(data: Record<string, unknown>) {
  const db = getSafeDb()
  if (!db) return
  await addDoc(collection(db, 'analyticsLogs'), { ...data, createdAt: Timestamp.now() })
}

export async function getAnalyticsLogs(limitCount: number = 100) {
  const db = getSafeDb()
  if (!db) return []
  const q = query(collection(db, 'analyticsLogs'), orderBy('createdAt', 'desc'), limit(limitCount))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[]
}

export async function createSEOReport(data: Record<string, unknown>) {
  const db = getSafeDb()
  if (!db) return
  const docRef = await addDoc(collection(db, 'seoReports'), { ...data, createdAt: Timestamp.now() })
  return docRef.id
}

export async function getAnalyticsByDateRange(start: Date, end: Date) {
  return { qrAnalytics: [], urlAnalytics: [], summary: { totalQRScans: 0, totalURLClicks: 0 } }
}

export async function getQRAnalyticsSummary() { return { totalQRCodes: 0, totalScans: 0, topQRCodes: [] } }
export async function getURLAnalyticsSummary() { return { totalURLs: 0, totalClicks: 0, topURLs: [] } }

// ─── BATCH OPERATIONS ───

export async function batchWrite(operations: (batch: WriteBatch) => void) {
  const db = getSafeDb()
  if (!db) return
  const batch = writeBatch(db)
  operations(batch)
  await batch.commit()
}

// ─── HISTORY ───

export async function createContentHistory(data: Record<string, unknown>) {
  const db = getSafeDb()
  if (!db) return
  await addDoc(collection(db, 'contentHistory'), { ...data, createdAt: Timestamp.now() })
}

export async function getContentHistoryById(id: string) {
  const db = getSafeDb()
  if (!db) return null
  const docSnap = await getDoc(doc(db, 'contentHistory', id))
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as any : null
}

export async function getAllContentHistory() {
  const db = getSafeDb()
  if (!db) return { audit: [], snapshots: [] }
  
  try {
    const auditSnap = await getDocs(query(collection(db, 'auditLogs'), orderBy('createdAt', 'desc'), limit(50)))
    const snapshotsSnap = await getDocs(query(collection(db, 'contentHistory'), orderBy('createdAt', 'desc'), limit(50)))
    
    return {
      audit: auditSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      snapshots: snapshotsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }
  } catch (error) {
    console.error('Error fetching content history:', error)
    return { audit: [], snapshots: [] }
  }
}
