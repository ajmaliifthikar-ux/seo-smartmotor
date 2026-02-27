'use client'

import { usePresence } from '@/lib/hooks/use-presence'

export function PresenceSync() {
  usePresence()
  return null
}
