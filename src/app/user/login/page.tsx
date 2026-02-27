'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {
  auth,
  googleProvider,
  twitterProvider,
  appleProvider,
  signInWithProvider,
} from '@/lib/firebase-client'
import { toast } from 'sonner'
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react'

// ─── Social button SVG assets ─────────────────────────────────────────────────

function PasskeyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function exchangeTokenAndRedirect(
  idToken: string,
  router: ReturnType<typeof useRouter>
) {
  const res = await fetch('/api/user/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error ?? 'Session creation failed')
  }
  const data = await res.json()
  // Admin users get routed to the admin panel
  const isAdmin = data.role === 'ADMIN'
  router.push(isAdmin ? '/admin' : '/user/dashboard')
  router.refresh()
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UserLoginPage() {
  const router = useRouter()

  // Check for unauthorized error in URL
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('UNAUTHORIZED')) {
      toast.error('Session expired. Please sign in again.')
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState<string | null>(null) // provider name or 'email'

  // ─── Social sign-in ────────────────────────────────────────────────────────

  const handleSocialSignIn = async (
    providerKey: 'google' | 'twitter' | 'apple'
  ) => {
    const providerMap = {
      google: googleProvider,
      twitter: twitterProvider,
      apple: appleProvider,
    }
    setLoading(providerKey)
    try {
      const credential = await signInWithProvider(providerMap[providerKey])
      const idToken = await credential.user.getIdToken()
      await exchangeTokenAndRedirect(idToken, router)
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Sign-in failed. Please try again.'
      if (!message.includes('popup-closed')) {
        toast.error(message)
      }
    } finally {
      setLoading(null)
    }
  }

  // ─── Email sign-in ─────────────────────────────────────────────────────────

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading('email')
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password)
      const idToken = await credential.user.getIdToken()
      await exchangeTokenAndRedirect(idToken, router)
    } catch (err: unknown) {
      const msg =
        err instanceof Error && 'code' in err
          ? (err as { code: string }).code === 'auth/invalid-credential'
            ? 'Incorrect email or password.'
            : err.message
          : 'Sign-in failed. Please try again.'
      toast.error(msg)
    } finally {
      setLoading(null)
    }
  }

  const isLoading = loading !== null

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background accents */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full bg-brand-red/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-dark/5 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md z-10"
      >
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-3xl rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/50 overflow-hidden">
          {/* Header strip */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-50" />

          <div className="px-10 pt-12 pb-12">
            {/* Branding */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 mb-4">
                <span className="text-4xl font-black uppercase tracking-tighter text-brand-red italic">
                  Smart
                </span>
                <span className="text-4xl font-black uppercase tracking-tighter text-brand-dark italic">
                  Motor
                </span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
                Concierge Access Portal
              </p>
            </div>

            {/* Social sign-in buttons */}
            <div className="space-y-3 mb-8">
              {/* Google */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSocialSignIn('google')}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-2xl border border-black/5 bg-white text-brand-dark text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
              >
                {loading === 'google' ? (
                  <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                ) : (
                  <GoogleIcon />
                )}
                Continue with Google
              </motion.button>

              {/* Apple */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSocialSignIn('apple')}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-2xl bg-brand-dark text-white text-xs font-black uppercase tracking-widest hover:bg-black transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-xl carbon-fiber"
              >
                {loading === 'apple' ? (
                  <Loader2 className="w-5 h-5 animate-spin text-white/60" />
                ) : (
                  <AppleIcon />
                )}
                Continue with Apple
              </motion.button>
            </div>

            {/* Divider */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center text-[10px]">
                <span className="bg-white/0 px-4 text-gray-300 font-black uppercase tracking-widest">
                  Secure Login
                </span>
              </div>
            </div>

            {/* Email / password form */}
            <form onSubmit={handleEmailSignIn} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Security ID</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-brand-red transition-colors" />
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-4 rounded-2xl border-0 bg-brand-bg/50 ring-1 ring-inset ring-gray-100 text-sm font-bold text-brand-dark placeholder-gray-300 focus:ring-2 focus:ring-brand-dark focus:bg-white transition-all outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Access Key</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-brand-red transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-11 pr-12 py-4 rounded-2xl border-0 bg-brand-bg/50 ring-1 ring-inset ring-gray-100 text-sm font-bold text-brand-dark placeholder-gray-300 focus:ring-2 focus:ring-brand-dark focus:bg-white transition-all outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-brand-dark transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-5 rounded-2xl bg-brand-red text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#cc1f25] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-xl shadow-brand-red/20"
              >
                {loading === 'email' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Establish Session
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Footer link */}
            <div className="text-center mt-8">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                New to Smart Motor?{' '}
                <Link
                  href="/user/register"
                  className="text-brand-red hover:underline transition-all ml-1"
                >
                  Create Identity
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Tagline below card */}
        <p className="text-center text-[9px] font-black text-gray-300 mt-8 uppercase tracking-[0.4em]">
          Precision Engineering • Bespoke Service • Est. 2009
        </p>
      </motion.div>
    </div>
  )
}
