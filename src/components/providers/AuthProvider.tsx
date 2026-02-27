'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'
import { auth } from '@/lib/firebase-client'
import { getUser } from '@/lib/firebase-db'
import { User } from '@/types'

interface AuthContextType {
  user: FirebaseUser | null
  dbUser: User | null
  loading: boolean
  isAdmin: boolean
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  dbUser: null,
  loading: true,
  isAdmin: false,
  refresh: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [dbUser, setDbUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    if (user) {
      const data = await getUser(user.uid)
      setDbUser(data)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      
      if (firebaseUser) {
        // Sync with session API to set cookies for server components/middleware
        try {
          const idToken = await firebaseUser.getIdToken()
          await fetch('/api/user/session', {
            method: 'POST',
            body: JSON.stringify({ idToken }),
            headers: { 'Content-Type': 'application/json' }
          })
          
          const data = await getUser(firebaseUser.uid)
          setDbUser(data)
        } catch (error) {
          console.error('AuthProvider session sync error:', error)
        }
      } else {
        setDbUser(null)
        // Clear session cookies
        await fetch('/api/user/session', { method: 'DELETE' })
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const isAdmin = dbUser?.role === 'admin'

  return (
    <AuthContext.Provider value={{ user, dbUser, loading, isAdmin, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
