import admin from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

if (!admin.apps.length) {
  const projectId = (process.env.FIREBASE_PROJECT_ID || '').trim()
  const clientEmail = (process.env.FIREBASE_CLIENT_EMAIL || '').trim()
  const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n').trim()

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  })
}

const db = getFirestore(admin.app(), 'smartmotordb')

async function check() {
  const services = await db.collection('services').get()
  const brands = await db.collection('brands').get()
  
  console.log('--- DIAGNOSTIC RESULTS ---')
  console.log('Project ID:', process.env.FIREBASE_PROJECT_ID)
  console.log('Services Count:', services.size)
  console.log('Brands Count:', brands.size)
  
  if (services.size > 0) {
    console.log('First Service:', services.docs[0].data())
  }
  if (brands.size > 0) {
    console.log('First Brand:', brands.docs[0].data())
  }
}

check().catch(console.error)
