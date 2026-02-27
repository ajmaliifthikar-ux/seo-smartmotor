import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { runProactiveChecks } from '@/lib/notifications'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    if (!adminDb) throw new Error('DB not initialized')

    // 1. Run proactive checks (Autonomous Agent Logic)
    await runProactiveChecks()

    // 2. Fetch recent notifications
    const snapshot = await adminDb.collection('notifications')
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get()

    const notifications = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data()
    }))

    return NextResponse.json(notifications)
  } catch (error) {
    console.error('Notifications API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 })
  }
}
