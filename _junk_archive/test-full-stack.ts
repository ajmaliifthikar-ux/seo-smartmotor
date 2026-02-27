import { PrismaClient } from '@prisma/client'
import admin from 'firebase-admin'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { config } from 'dotenv'
import path from 'path'

config({ path: path.resolve(process.cwd(), '.env.local') })

async function runAudit() {
  console.log('🧐 Starting Full-Stack Systematic Audit...\n')

  // 1. Database Audit
  console.log('Step 1: Database (GreenGeeks)...')
  const prisma = new PrismaClient()
  try {
    const brandCount = await prisma.brand.count()
    console.log('✅ DATABASE WORKING. Found ' + brandCount + ' brands.')
  } catch (e: any) {
    console.log('❌ DATABASE FAILED: ' + e.message)
  } finally {
    await prisma.$disconnect()
  }

  // 2. Firebase Alignment Audit
  console.log('\nStep 2: Firebase Project Alignment...')
  try {
    const clientProjId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    const adminProjId = process.env.FIREBASE_PROJECT_ID
    
    console.log('- Client Project: ' + clientProjId)
    console.log('- Admin Project: ' + adminProjId)
    
    if (clientProjId !== adminProjId) {
      console.log('❌ MISMATCH DETECTED!')
    } else {
      console.log('✅ Projects align.')
    }

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
        } as any)
      })
    }
    const user = await admin.auth().getUserByEmail('admin@smartmotor.ae')
    console.log('✅ Admin SDK Working. Found user: ' + user.uid)
  } catch (e: any) {
    console.log('❌ FIREBASE ADMIN SDK FAILED: ' + e.message)
  }

  // 3. Gemini Audit
  console.log('\nStep 3: Gemini AI...')
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
    const res = await model.generateContent('ping')
    console.log('✅ GEMINI WORKING')
  } catch (e: any) {
    console.log('❌ GEMINI FAILED: ' + e.message)
  }

  process.exit(0)
}

runAudit()
