import { adminAuth } from '../src/lib/firebase-admin'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function setupAdmin() {
  const email = 'admin@smartmotor.ae'
  const password = 'SmartMotorAdmin2026!'
  const displayName = 'Smart Motor Admin'

  console.log(`Setting up admin user: ${email}`)

  try {
    // 1. Check if user exists in Firebase
    let userRecord;
    try {
      userRecord = await adminAuth.getUserByEmail(email)
      console.log('User already exists in Firebase. Updating password...')
      await adminAuth.updateUser(userRecord.uid, {
        password: password,
        displayName: displayName
      })
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        console.log('Creating new user in Firebase...')
        userRecord = await adminAuth.createUser({
          email,
          password,
          displayName,
          emailVerified: true
        })
      } else {
        throw error
      }
    }

    // 2. Set custom claims in Firebase (optional but good practice)
    await adminAuth.setCustomUserClaims(userRecord.uid, { role: 'ADMIN' })
    console.log('Firebase custom claims set to ADMIN.')

    // 3. Sync to Prisma
    const hashedPassword = await bcrypt.hash(password, 10)
    const dbUser = await prisma.user.upsert({
      where: { email },
      update: {
        role: 'ADMIN',
        name: displayName,
        password: hashedPassword
      },
      create: {
        email,
        name: displayName,
        role: 'ADMIN',
        password: hashedPassword
      }
    })

    console.log('Admin user synced to Prisma database.')
    console.log('\n--- ADMIN CREDENTIALS ---')
    console.log(`Email: ${email}`)
    console.log(`Password: ${password}`)
    console.log('--------------------------\n')

  } catch (error) {
    console.error('Error setting up admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

setupAdmin()
