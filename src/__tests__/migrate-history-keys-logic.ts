import { adminDb } from '@/lib/firebase-admin'

export async function migrateHistoryKeys() {
  const db = adminDb
  if (!db) {
    throw new Error('Database not initialized')
  }

  let successCount = 0
  let skipCount = 0
  let errorCount = 0

  try {
    // 1. Load all services and brands to build a slug -> ID mapping
    const servicesSnap = await db.collection('services').get()
    const brandsSnap = await db.collection('brands').get()

    const slugToIdMap: Record<string, string> = {}
    
    servicesSnap.docs.forEach((doc: any) => {
      const data = doc.data()
      if (data.slug) slugToIdMap[data.slug] = doc.id
    })
    
    brandsSnap.docs.forEach((doc: any) => {
      const data = doc.data()
      if (data.slug) slugToIdMap[data.slug] = doc.id
    })

    // 2. Load all content history
    const historySnap = await db.collection('contentHistory').get()
    
    console.log(`Checking ${historySnap.docs.length} history records for migration...`)

    for (const historyDoc of historySnap.docs) {
      const data = historyDoc.data()
      const { entityId, entityType } = data

      // Only migrate Service and Brand history
      if (entityType !== 'Service' && entityType !== 'Brand') {
        skipCount++
        continue
      }

      // Check if entityId matches a known slug
      const targetId = slugToIdMap[entityId]
      
      if (targetId && targetId !== entityId) {
        // Migrate slug to ID
        console.log(`Migrating ${entityType} history ${historyDoc.id}: ${entityId} -> ${targetId}`)
        try {
          await db.collection('contentHistory').doc(historyDoc.id).update({
            entityId: targetId
          })
          successCount++
        } catch (err) {
          console.error(`Failed to update history ${historyDoc.id}:`, err)
          errorCount++
        }
      } else {
        skipCount++
      }
    }

    return {
      successCount,
      skipCount,
      errorCount,
      total: historySnap.docs.length
    }
  } catch (error) {
    console.error('Migration fatal error:', error)
    throw error
  }
}
