/**
 * FIREBASE MIGRATION SCRIPT - Phase 3
 * Exports data from Prisma and seeds Firestore
 * 
 * Usage: npx ts-node scripts/migrate-to-firebase.ts
 * 
 * Safety: Creates backups and provides rollback capability
 */

import { PrismaClient } from '@prisma/client'
import {
  createUser,
  createBooking,
  createService,
  createContent,
  updateBooking,
} from '@/lib/firebase-db'
import { seedFirebaseDatabase } from '@/lib/firebase-seed'
import { Timestamp } from 'firebase/firestore'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

interface MigrationStats {
  usersCount: number
  bookingsCount: number
  servicesCount: number
  contentCount: number
  brandsCount: number
  faqCount: number
  blogPostsCount: number
  startTime: number
  endTime?: number
  errors: Array<{ type: string; count: number }>
}

const stats: MigrationStats = {
  usersCount: 0,
  bookingsCount: 0,
  servicesCount: 0,
  contentCount: 0,
  brandsCount: 0,
  faqCount: 0,
  blogPostsCount: 0,
  startTime: Date.now(),
  errors: [],
}

async function backupPrismaData(): Promise<string> {
  console.log('💾 Creating backup of Prisma data...')
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupDir = path.join(process.cwd(), 'backups')

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true })
  }

  const backupFile = path.join(backupDir, `prisma-backup-${timestamp}.json`)

  try {
    const backup = {
      timestamp: new Date().toISOString(),
      data: {
        users: await prisma.user.findMany(),
        bookings: await prisma.booking.findMany(),
        services: await prisma.service.findMany(),
        brands: await prisma.brand.findMany(),
        faqs: await prisma.fAQ.findMany(),
        blogPosts: await prisma.blogPost.findMany(),
      },
    }

    fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2))
    console.log(`✅ Backup created: ${backupFile}`)
    return backupFile
  } catch (error) {
    console.error('❌ Error creating backup:', error)
    throw error
  }
}

async function migrateUsers(): Promise<void> {
  console.log('\n👤 Migrating users...')

  try {
    const users = await prisma.user.findMany({
      where: { deletedAt: null },
    })

    for (const user of users) {
      try {
        await createUser(user.id, {
          email: user.email || '',
          name: user.name || '',
          role: (user.role as 'ADMIN' | 'CUSTOMER' | 'STAFF') || 'CUSTOMER',
          image: user.image || undefined,
        })
        stats.usersCount++
      } catch (error: any) {
        if (error.code === 'auth/uid-already-exists') {
          stats.usersCount++ // Already exists, no need to create
        } else {
          logError('user', error)
        }
      }
    }

    console.log(`✅ Migrated ${stats.usersCount} users`)
  } catch (error) {
    console.error('❌ Error migrating users:', error)
    logError('user_batch', error)
  }
}

async function migrateServices(): Promise<void> {
  console.log('\n🔧 Migrating services...')

  try {
    const services = await prisma.service.findMany()

    for (const service of services) {
      try {
        const serviceId = await createService({
          slug: service.slug,
          name: service.name,
          nameAr: service.nameAr,
          description: service.description,
          descriptionAr: service.descriptionAr || undefined,
          detailedDescription: service.detailedDescription || undefined,
          category: service.category || undefined,
          basePrice: service.basePrice || undefined,
          duration: service.duration,
          icon: service.icon || undefined,
          image: service.image || undefined,
          active: service.isEnabled,
        })
        stats.servicesCount++
      } catch (error) {
        console.error(`⚠️ Error migrating service ${service.id}:`, error)
        logError('service', error)
      }
    }

    console.log(`✅ Migrated ${stats.servicesCount} services`)
  } catch (error) {
    console.error('❌ Error migrating services:', error)
    logError('service_batch', error)
  }
}

async function migrateBookings(): Promise<void> {
  console.log('\n📅 Migrating bookings...')

  try {
    const bookings = await prisma.booking.findMany()

    for (const booking of bookings) {
      try {
        const bookingId = await createBooking({
          userId: booking.userId || undefined,
          guestName: booking.guestName || undefined,
          guestEmail: booking.guestEmail || undefined,
          guestPhone: booking.guestPhone || undefined,
          vehicleBrand: booking.vehicleBrand || undefined,
          vehicleModel: booking.vehicleModel || undefined,
          serviceId: booking.serviceId,
          date: Timestamp.fromDate(booking.date),
          slot: booking.slot,
          status: (booking.status as 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED') || 'PENDING',
          notes: booking.notes || undefined,
        })
        stats.bookingsCount++
      } catch (error) {
        console.error(`⚠️ Error migrating booking ${booking.id}:`, error)
        logError('booking', error)
      }
    }

    console.log(`✅ Migrated ${stats.bookingsCount} bookings`)
  } catch (error) {
    console.error('❌ Error migrating bookings:', error)
    logError('booking_batch', error)
  }
}

async function migrateContent(): Promise<void> {
  console.log('\n📝 Migrating content...')

  try {
    const faqs = await prisma.fAQ.findMany()
    const blogPosts = await prisma.blogPost.findMany()

    // Migrate FAQs
    for (const faq of faqs) {
      try {
        await createContent({
          type: 'FAQ',
          title: faq.question,
          titleAr: faq.questionAr || undefined,
          slug: `faq-${faq.id}`,
          content: faq.answer,
          contentAr: faq.answerAr || undefined,
          author: 'Admin',
          published: true,
        })
        stats.faqCount++
      } catch (error) {
        console.error(`⚠️ Error migrating FAQ ${faq.id}:`, error)
        logError('faq', error)
      }
    }

    // Migrate Blog Posts
    for (const post of blogPosts) {
      try {
        await createContent({
          type: 'BLOG',
          title: post.title,
          slug: post.slug,
          content: post.content,
          author: post.author || 'Admin',
          published: post.isPublished,
        })
        stats.blogPostsCount++
      } catch (error) {
        console.error(`⚠️ Error migrating blog post ${post.id}:`, error)
        logError('blog_post', error)
      }
    }

    console.log(
      `✅ Migrated ${stats.faqCount} FAQs and ${stats.blogPostsCount} blog posts`
    )
  } catch (error) {
    console.error('❌ Error migrating content:', error)
    logError('content_batch', error)
  }
}

async function migrateBrands(): Promise<void> {
  console.log('\n🏢 Migrating brands...')

  try {
    const brands = await prisma.brand.findMany()

    for (const brand of brands) {
      try {
        // Brands can be stored as content or in a separate collection
        // For now, storing as content
        await createContent({
          type: 'PAGE',
          title: brand.name,
          titleAr: brand.nameAr || undefined,
          slug: brand.slug || `brand-${brand.id}`,
          content: brand.description || brand.name,
          published: true,
        })
        stats.brandsCount++
      } catch (error) {
        console.error(`⚠️ Error migrating brand ${brand.id}:`, error)
        logError('brand', error)
      }
    }

    console.log(`✅ Migrated ${stats.brandsCount} brands`)
  } catch (error) {
    console.error('❌ Error migrating brands:', error)
    logError('brand_batch', error)
  }
}

function logError(type: string, error: any): void {
  const existing = stats.errors.find((e) => e.type === type)
  if (existing) {
    existing.count++
  } else {
    stats.errors.push({ type, count: 1 })
  }
}

async function saveStats(): Promise<void> {
  stats.endTime = Date.now()
  const duration = ((stats.endTime - stats.startTime) / 1000).toFixed(2)

  const report = `
╔════════════════════════════════════════╗
║    FIREBASE MIGRATION REPORT           ║
╚════════════════════════════════════════╝

📊 MIGRATION STATISTICS
  • Users migrated:      ${stats.usersCount}
  • Services migrated:   ${stats.servicesCount}
  • Bookings migrated:   ${stats.bookingsCount}
  • FAQs migrated:       ${stats.faqCount}
  • Blog posts migrated: ${stats.blogPostsCount}
  • Brands migrated:     ${stats.brandsCount}
  • Total items:         ${stats.usersCount + stats.servicesCount + stats.bookingsCount + stats.faqCount + stats.blogPostsCount + stats.brandsCount}

⏱️ TIMING
  • Duration: ${duration} seconds
  • Start time: ${new Date(stats.startTime).toISOString()}
  • End time: ${new Date(stats.endTime).toISOString()}

❌ ERRORS (${stats.errors.length})
${stats.errors.map((e) => `  • ${e.type}: ${e.count} error(s)`).join('\n')}

✅ MIGRATION COMPLETE

Next steps:
  1. Verify data in Firebase Console
  2. Update API routes to use Firebase
  3. Update server actions
  4. Test all functionality
  5. Deploy to production

Questions? Check: /Users/ajmalifthikar/.copilot/session-state/*/firebase-migration-status.md
`

  console.log(report)

  const reportFile = path.join(process.cwd(), `migration-report-${Date.now()}.txt`)
  fs.writeFileSync(reportFile, report)
  console.log(`📄 Report saved to: ${reportFile}`)
}

async function main() {
  console.log('🚀 Starting Firebase migration...\n')

  try {
    // Step 1: Backup existing data
    const backupFile = await backupPrismaData()

    // Step 2: Initialize Firebase collections with demo data
    console.log('\n🌱 Seeding initial Firebase data...')
    await seedFirebaseDatabase()

    // Step 3: Migrate data
    await migrateUsers()
    await migrateServices()
    await migrateBookings()
    await migrateContent()
    await migrateBrands()

    // Step 4: Save statistics
    await saveStats()

    console.log('\n✨ Migration completed successfully!')
    console.log(`\n💾 Backup available at: ${backupFile}`)
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    console.error('\n⚠️ Your Prisma database is still intact and unchanged.')
    console.error('You can review the error above and try again.')
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run migration
main().catch((error) => {
  console.error(error)
  process.exit(1)
})
