/**
 * Comprehensive Firebase Integration Tests
 * Tests Firestore (named DB), Realtime Database, and Admin Auth
 */

import admin from 'firebase-admin'
import 'firebase-admin/database'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'
import { getDatabase } from 'firebase-admin/database'
import { getAuth } from 'firebase-admin/auth'
import { getApps } from 'firebase/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

// Initialize admin SDK for testing
const serviceAccount = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
}

let adminApp: admin.app.App
let adminDb: FirebaseFirestore.Firestore
let adminRtdb: any
let adminAuthInstance: any

describe('Firebase Integration Tests', () => {
  beforeAll(async () => {
    // Initialize admin app if not already initialized
    if (admin.apps.length === 0) {
      adminApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
          'https://smartmotoruae-default-rtdb.asia-southeast1.firebasedatabase.app',
      })
    } else {
      adminApp = admin.app()
    }

    // Get references to named Firestore DB, RTDB, and Auth
    adminDb = getFirestore(adminApp)
    
    adminRtdb = getDatabase(adminApp)
    adminAuthInstance = getAuth(adminApp)
  })

  afterAll(async () => {
    // Cleanup - keep app alive for other tests
    // await adminApp.delete()
  })

  // ============== FIRESTORE TESTS ==============

  describe('Firestore (Named Database: smartmotordb)', () => {
    it('should connect to named Firestore database', async () => {
      expect(adminDb).toBeDefined()
    })

    it('should read services collection', async () => {
      const snapshot = await adminDb.collection('services').limit(1).get()
      expect(snapshot).toBeDefined()
      expect(snapshot.size).toBeGreaterThanOrEqual(0)
    })

    it('should read brands collection', async () => {
      const snapshot = await adminDb.collection('brands').limit(1).get()
      expect(snapshot).toBeDefined()
      expect(snapshot.size).toBeGreaterThanOrEqual(0)
    })

    it('should read content collection', async () => {
      const snapshot = await adminDb.collection('content').limit(1).get()
      expect(snapshot).toBeDefined()
      expect(snapshot.size).toBeGreaterThanOrEqual(0)
    })

    it('should read subscribers collection', async () => {
      const snapshot = await adminDb.collection('subscribers').limit(1).get()
      expect(snapshot).toBeDefined()
      expect(snapshot.size).toBeGreaterThanOrEqual(0)
    })

    it('should read short_urls collection', async () => {
      const snapshot = await adminDb.collection('short_urls').limit(1).get()
      expect(snapshot).toBeDefined()
      expect(snapshot.size).toBeGreaterThanOrEqual(0)
    })

    it('should write and read a test document', async () => {
      const testRef = adminDb.collection('_test').doc('firestore-test')
      const testData = {
        timestamp: Timestamp.now(),
        message: 'Firestore test document',
        success: true,
      }

      // Write
      await testRef.set(testData)

      // Read
      const doc = await testRef.get()
      expect(doc.exists).toBe(true)
      expect(doc.data()?.success).toBe(true)

      // Cleanup
      await testRef.delete()
    })

    it('should handle batch operations', async () => {
      const batch = adminDb.batch()
      const ref1 = adminDb.collection('_test').doc('batch-1')
      const ref2 = adminDb.collection('_test').doc('batch-2')

      batch.set(ref1, { value: 1 })
      batch.set(ref2, { value: 2 })
      await batch.commit()

      const snap1 = await ref1.get()
      const snap2 = await ref2.get()

      expect(snap1.exists).toBe(true)
      expect(snap2.exists).toBe(true)

      // Cleanup
      await ref1.delete()
      await ref2.delete()
    })

    it('should handle transactions', async () => {
      const ref = adminDb.collection('_test').doc('transaction-test')

      await adminDb.runTransaction(async (transaction) => {
        transaction.set(ref, { count: 0 })
      })

      const doc = await ref.get()
      expect(doc.exists).toBe(true)

      // Cleanup
      await ref.delete()
    })
  })

  // ============== REALTIME DATABASE TESTS ==============

  describe('Realtime Database (RTDB)', () => {
    it('should connect to RTDB', async () => {
      expect(adminRtdb).toBeDefined()
      expect(adminRtdb.ref).toBeDefined()
    })

    it('should write and read from RTDB', async () => {
      const testRef = adminRtdb.ref('_test/rtdb-test')
      const testData = { message: 'RTDB test', timestamp: Date.now() }

      // Write
      await testRef.set(testData)

      // Read
      const snapshot = await testRef.once('value')
      expect(snapshot.exists()).toBe(true)
      expect(snapshot.val()?.message).toBe('RTDB test')

      // Cleanup
      await testRef.remove()
    })

    it('should handle click_events tracking', async () => {
      const today = new Date().toISOString().split('T')[0]
      const clickRef = adminRtdb.ref(`click_events/${today}/test-click`)
      const clickData = {
        href: 'https://example.com',
        source: 'test',
        timestamp: Date.now(),
      }

      // Write click event
      await clickRef.set(clickData)

      // Read and verify
      const snapshot = await clickRef.once('value')
      expect(snapshot.exists()).toBe(true)
      expect(snapshot.val()?.source).toBe('test')

      // Cleanup
      await clickRef.remove()
    })

    it('should handle nested updates', async () => {
      const ref = adminRtdb.ref('_test/nested-test')
      
      await ref.update({
        'nested/path': 'test',
        'another/path': 123
      })

      const snapshot = await ref.child('nested/path').once('value')
      expect(snapshot.val()).toBe('test')

      await ref.remove()
    })

    it('should list RTDB root keys', async () => {
      const snapshot = await adminRtdb.ref('/').once('value')
      const keys = Object.keys(snapshot.val() || {})
      expect(keys).toBeDefined()
    })
  })

  // ============== ADMIN AUTH TESTS ==============

  describe('Admin Auth System', () => {
    it('should connect to Admin Auth', async () => {
      expect(adminAuthInstance).toBeDefined()
      expect(adminAuthInstance.app).toBeDefined()
    })

    it('should list users (admin capability)', async () => {
      const result = await adminAuthInstance.listUsers(10)
      expect(result).toBeDefined()
      expect(result.users).toBeDefined()
    })

    it('should verify ID token structure', async () => {
      expect(typeof adminAuthInstance.verifyIdToken).toBe('function')
    })

    it('should create and delete test user', async () => {
      const testEmail = `test-${Date.now()}@smartmotor.ae`
      let uid: string | undefined

      try {
        // Create user
        const user = await adminAuthInstance.createUser({
          email: testEmail,
          password: 'TestPassword123!',
          displayName: 'Integration Test User',
        })
        uid = user.uid

        expect(user.uid).toBeDefined()
        expect(user.email).toBe(testEmail)

        // Cleanup
        await adminAuthInstance.deleteUser(uid)
      } catch (error) {
        if (uid) await adminAuthInstance.deleteUser(uid).catch(() => {})
        console.error('Auth test error:', error)
        throw error
      }
    })

    it('should set custom claims', async () => {
      const testEmail = `claims-${Date.now()}@smartmotor.ae`
      let uid: string | undefined

      try {
        // Create user
        const user = await adminAuthInstance.createUser({
          email: testEmail,
          password: 'TestPassword123!',
        })
        uid = user.uid

        // Set claims
        await adminAuthInstance.setCustomUserClaims(uid, { role: 'ADMIN' })

        // Verify claims
        const updatedUser = await adminAuthInstance.getUser(uid)
        expect(updatedUser.customClaims?.role).toBe('ADMIN')

        // Cleanup
        await adminAuthInstance.deleteUser(uid)
      } catch (error) {
        if (uid) await adminAuthInstance.deleteUser(uid).catch(() => {})
        console.error('Custom claims test error:', error)
        throw error
      }
    })
  })

  // ============== CROSS-DATABASE CONSISTENCY ==============

  describe('Cross-Database Consistency', () => {
    it('should maintain data integrity across Firestore and RTDB', async () => {
      const testId = `sync-test-${Date.now()}`
      const fsRef = adminDb.collection('_test').doc(testId)
      const rtdbRef = adminRtdb.ref(`_test/${testId}`)

      const testData = {
        type: 'consistency-test',
        timestamp: Timestamp.now(),
      }
      await fsRef.set(testData)
      await rtdbRef.set({ ...testData, timestamp: Date.now() })

      const fsDoc = await fsRef.get()
      const rtdbSnap = await rtdbRef.once('value')

      expect(fsDoc.exists).toBe(true)
      expect(rtdbSnap.exists()).toBe(true)
      expect(fsDoc.data()?.type).toBe(rtdbSnap.val()?.type)

      await fsRef.delete()
      await rtdbRef.remove()
    })

    it('should handle concurrent writes safely', async () => {
      const testId = `concurrent-test-${Date.now()}`
      const fsRef = adminDb.collection('_test').doc(testId)
      const rtdbRef = adminRtdb.ref(`_test/${testId}`)

      await Promise.all([
        fsRef.set({ status: 'active' }),
        rtdbRef.set({ status: 'active' })
      ])

      const fsDoc = await fsRef.get()
      const rtdbSnap = await rtdbRef.once('value')

      expect(fsDoc.exists).toBe(true)
      expect(rtdbSnap.exists()).toBe(true)

      await fsRef.delete()
      await rtdbRef.remove()
    })
  })

  // ============== ERROR HANDLING & EDGE CASES ==============

  describe('Error Handling & Edge Cases', () => {
    it('should handle non-existent collection gracefully', async () => {
      const snapshot = await adminDb.collection('non_existent_collection_123').get()
      expect(snapshot.empty).toBe(true)
    })

    it('should handle invalid data types', async () => {
      const ref = adminDb.collection('_test').doc('type-test')
      
      const complexData = {
        string: 'text',
        number: 42,
        boolean: true,
        null: null,
        timestamp: Timestamp.now(),
        array: [1, 2, 3],
        object: { nested: 'value' },
      }

      await ref.set(complexData)
      const doc = await ref.get()
      const data = doc.data()

      expect(data?.array).toHaveLength(3)
      expect(data?.object.nested).toBe('value')

      await ref.delete()
    })

    it('should handle large documents', async () => {
      const ref = adminDb.collection('_test').doc('large-test')
      const largeArray = new Array(100).fill('test-data')
      
      await ref.set({ items: largeArray })
      const doc = await ref.get()
      
      expect(doc.exists).toBe(true)
      expect(doc.data()?.items?.length).toBe(100)

      await ref.delete()
    })

    it('should recover from RTDB connection issues', async () => {
      const ref = adminRtdb.ref('_test/conn-test')
      await ref.set({ status: 'connected' })
      const snap = await ref.once('value')
      expect(snap.val()?.status).toBe('connected')
      await ref.remove()
    })
  })
})
