'use client'

import { useEffect } from 'react'
import { updateUser } from '@/lib/firebase-db'
import { useAuth } from '@/components/providers/AuthProvider'

/**
 * Hook to manage user presence (Active/Away)
 */
export function usePresence() {
  const { user } = useAuth()
  const userId = user?.uid

  useEffect(() => {
    if (!userId) return

    // 1. Set status to ACTIVE on mount
    const setStatus = async (status: 'active' | 'away' | 'busy') => {
      try {
        await updateUser(userId, { status } as any)
      } catch (error) {
        console.error('Failed to update presence:', error)
      }
    }

    setStatus('active')

    // 2. Handle inactivity (Away)
    let awayTimeout: NodeJS.Timeout
    const resetTimer = () => {
      clearTimeout(awayTimeout)
      // If was away, set back to active
      // In a real app, we'd check current status before updating
      awayTimeout = setTimeout(() => setStatus('away'), 5 * 60 * 1000) // 5 minutes
    }

    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart']
    activityEvents.forEach(event => document.addEventListener(event, resetTimer))

    resetTimer()

    // 3. Set status to AWAY or OFFLINE on unmount
    return () => {
      activityEvents.forEach(event => document.removeEventListener(event, resetTimer))
      clearTimeout(awayTimeout)
      // Note: In serverless, this might not always fire reliably on tab close
      // but it's a good best-effort.
      setStatus('away')
    }
  }, [userId])
}
