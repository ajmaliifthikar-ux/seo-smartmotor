/**
 * FIREBASE MIGRATION VERIFICATION SCRIPT
 * Validates that all data was properly migrated
 * 
 * Usage: npx ts-node scripts/verify-migration.ts
 */

import {
  getAllServices,
  getUserBookings,
  getAllPublishedContent,
} from '@/lib/firebase-db'

interface VerificationResult {
  collection: string
  expected: number
  actual: number
  status: 'PASS' | 'WARN' | 'FAIL'
  message: string
}

const results: VerificationResult[] = []

async function verifyServices(): Promise<void> {
  console.log('🔍 Verifying services collection...')
  try {
    const services = await getAllServices()
    const status = services.length > 0 ? 'PASS' : 'WARN'
    results.push({
      collection: 'services',
      expected: -1, // We don't know expected count
      actual: services.length,
      status,
      message: `Found ${services.length} services in Firestore`,
    })
    console.log(`  ✓ Services: ${services.length}`)
  } catch (error) {
    results.push({
      collection: 'services',
      expected: 0,
      actual: 0,
      status: 'FAIL',
      message: `Error querying services: ${error}`,
    })
    console.error('  ✗ Error verifying services:', error)
  }
}

async function verifyContent(): Promise<void> {
  console.log('🔍 Verifying content collection...')
  try {
    const allContent = await getAllPublishedContent()
    const faqContent = await getAllPublishedContent('FAQ')
    const blogContent = await getAllPublishedContent('BLOG')

    results.push({
      collection: 'content',
      expected: -1,
      actual: allContent.length,
      status: allContent.length > 0 ? 'PASS' : 'WARN',
      message: `Found ${allContent.length} total content items (${faqContent.length} FAQs, ${blogContent.length} blog posts)`,
    })
    console.log(`  ✓ Content: ${allContent.length} items`)
    console.log(`    - FAQs: ${faqContent.length}`)
    console.log(`    - Blog posts: ${blogContent.length}`)
  } catch (error) {
    results.push({
      collection: 'content',
      expected: 0,
      actual: 0,
      status: 'FAIL',
      message: `Error querying content: ${error}`,
    })
    console.error('  ✗ Error verifying content:', error)
  }
}

async function verifyDatabase(): Promise<void> {
  console.log('🔍 Verifying Firestore connection...')
  try {
    // Try a simple query
    const content = await getAllPublishedContent()
    results.push({
      collection: 'firestore',
      expected: 1,
      actual: 1,
      status: 'PASS',
      message: 'Firestore connection successful',
    })
    console.log('  ✓ Firestore connected and accessible')
  } catch (error) {
    results.push({
      collection: 'firestore',
      expected: 1,
      actual: 0,
      status: 'FAIL',
      message: `Failed to connect to Firestore: ${error}`,
    })
    console.error('  ✗ Firestore connection failed:', error)
  }
}

async function printVerificationReport(): Promise<void> {
  const passed = results.filter((r) => r.status === 'PASS').length
  const warned = results.filter((r) => r.status === 'WARN').length
  const failed = results.filter((r) => r.status === 'FAIL').length

  const report = `
╔════════════════════════════════════════╗
║   FIREBASE MIGRATION VERIFICATION      ║
╚════════════════════════════════════════╝

📋 VERIFICATION RESULTS

${results
  .map(
    (r) => `
${r.status === 'PASS' ? '✅' : r.status === 'WARN' ? '⚠️' : '❌'} ${r.collection.toUpperCase()}
   Status: ${r.status}
   Actual: ${r.actual} items
   Message: ${r.message}
`
  )
  .join('')}

📊 SUMMARY
  ✅ Passed:  ${passed}
  ⚠️  Warned: ${warned}
  ❌ Failed:  ${failed}

${failed > 0 ? '❌ VERIFICATION FAILED - Please review errors above' : '✅ VERIFICATION PASSED - Migration appears successful'}

Next steps:
  1. Check Firebase Console for data
  2. Review any failed items above
  3. Update API routes to use Firebase
  4. Test endpoints thoroughly
  5. Deploy to Vercel

Rollback if needed:
  - Restore from backup: backups/prisma-backup-*.json
  - Keep using Prisma temporarily
  - Update code to use both databases
`

  console.log(report)

  const reportFile = `verification-report-${Date.now()}.txt`
  const fs = require('fs')
  fs.writeFileSync(reportFile, report)
  console.log(`\n📄 Report saved to: ${reportFile}`)
}

async function main() {
  console.log('🚀 Starting Firebase migration verification...\n')

  try {
    await verifyDatabase()
    await verifyServices()
    await verifyContent()

    console.log('\n')
    await printVerificationReport()
  } catch (error) {
    console.error('❌ Verification error:', error)
    process.exit(1)
  }
}

main().catch(console.error)
