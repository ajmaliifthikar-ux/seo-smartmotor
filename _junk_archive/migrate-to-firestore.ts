import { PrismaClient } from '@prisma/client'
import admin from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

// Initialize Prisma
const prisma = new PrismaClient()

// Initialize Firebase Admin
if (!admin.apps.length) {
  const projectId = (process.env.FIREBASE_PROJECT_ID || '').trim()
  const clientEmail = (process.env.FIREBASE_CLIENT_EMAIL || '').trim()
  // Use split/join to avoid regex literal parsing issues in some environments
  const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').split('\\n').join('\n').trim()

  if (!projectId || !clientEmail || !privateKey) {
    console.error('❌ Firebase Admin: Missing required env vars')
    process.exit(1)
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  })
}

const db = getFirestore(admin.app(), 'smartmotordb')

async function migrate() {
  console.log('🚀 Starting Catalog Migration to Firestore...')

  // 1. Migrate Brands
  const brands = await prisma.brand.findMany()
  console.log(`📦 Found ${brands.length} brands in SQLite.`)

  for (const brand of brands) {
    const brandRef = db.collection('brands').doc(brand.id)
    await brandRef.set({
      ...brand,
      createdAt: admin.firestore.Timestamp.fromDate(brand.createdAt),
      updatedAt: admin.firestore.Timestamp.fromDate(brand.updatedAt),
    }, { merge: true })
    console.log(`✅ Migrated Brand: ${brand.name}`)
  }

  // 2. Migrate Services
  const services = await prisma.service.findMany()
  console.log(`📦 Found ${services.length} services in SQLite.`)

  for (const service of services) {
    const serviceRef = db.collection('services').doc(service.id)
    await serviceRef.set({
      ...service,
      active: service.isEnabled,
      createdAt: admin.firestore.Timestamp.fromDate(service.createdAt),
      updatedAt: admin.firestore.Timestamp.fromDate(service.updatedAt),
    }, { merge: true })
    console.log(`✅ Migrated Service: ${service.name}`)
  }

  console.log('✨ Migration Complete!')
}

migrate()
  .catch((e) => {
    console.error('❌ Migration failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
