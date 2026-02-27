'use client'

import { useAuth } from '@/components/providers/AuthProvider'

/**
 * Compatibility wrapper for useAuth() to replace existing useFirebaseAuth() usages.
 */
export function useFirebaseAuth() {
  const { user, dbUser, loading, isAdmin } = useAuth()

  return { 
    user, 
    dbUser, 
    loading, 
    isAdmin 
  }
}
