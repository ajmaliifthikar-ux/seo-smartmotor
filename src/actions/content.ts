'use server'

import { adminDb, getServerSession } from "@/lib/firebase-admin"
import { revalidatePath } from "next/cache"
import { Timestamp } from "firebase-admin/firestore"

/**
 * Updates a content block and creates an audit trail.
 */
export async function updateContentWithAudit(key: string, newValue: string, entityType: string = 'ContentBlock') {
  const session = await getServerSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const firestore = adminDb
  if (!firestore) throw new Error("Database not initialized")
  
  const blockRef = firestore.collection('contentBlocks').doc(key)
  const auditRef = firestore.collection('contentAudit').doc()

  await firestore.runTransaction(async (transaction) => {
    const blockDoc = await transaction.get(blockRef)
    if (!blockDoc.exists) throw new Error(`Content block ${key} not found`)

    const previousValue = blockDoc.data()?.value

    // 1. Update block
    transaction.update(blockRef, { 
        value: newValue, 
        updatedAt: Timestamp.now() 
    })

    // 2. Create Audit
    transaction.set(auditRef, {
      key,
      entityType,
      previousValue,
      newValue,
      updatedBy: session.user.id,
      timestamp: Timestamp.now()
    })
  })

  revalidatePath('/')
  return { success: true }
}

/**
 * Creates a snapshot of the current content state for versioning.
 */
export async function createContentSnapshot(key: string, entityType: string = 'ContentBlock', snapshotLabel?: string) {
  const session = await getServerSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const firestore = adminDb
  if (!firestore) throw new Error("Database not initialized")

  const blockDoc = await firestore.collection('contentBlocks').doc(key).get()
  if (!blockDoc.exists) throw new Error(`Content block ${key} not found`)

  await firestore.collection('contentHistory').add({
    key,
    entityType,
    snapshot: JSON.stringify(blockDoc.data()),
    versionLabel: snapshotLabel,
    createdBy: session.user.id,
    createdAt: Timestamp.now()
  })

  return { success: true }
}

/**
 * Restores content to a previous version from history.
 */
export async function restoreContentSnapshot(historyId: string) {
  const session = await getServerSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const firestore = adminDb
  if (!firestore) throw new Error("Database not initialized")

  const historyRef = firestore.collection('contentHistory').doc(historyId)
  const historyDoc = await historyRef.get()

  if (!historyDoc.exists) throw new Error("History record not found")

  const historyData = historyDoc.data()!
  const snapshotData = JSON.parse(historyData.snapshot)
  const targetKey = historyData.key

  const blockRef = firestore.collection('contentBlocks').doc(targetKey)
  const auditRef = firestore.collection('contentAudit').doc()

  await firestore.runTransaction(async (transaction) => {
    const currentBlock = await transaction.get(blockRef)
    const previousValue = currentBlock.exists ? currentBlock.data()?.value : ''

    // 1. Restore block
    transaction.update(blockRef, { 
        value: snapshotData.value,
        updatedAt: Timestamp.now()
    })

    // 2. Log Audit
    transaction.set(auditRef, {
      key: targetKey,
      entityType: historyData.entityType,
      previousValue,
      newValue: snapshotData.value,
      updatedBy: session.user.id,
      timestamp: Timestamp.now(),
      action: 'RESTORE_SNAPSHOT'
    })
  })

  revalidatePath('/')
  return { success: true }
}

