import { cookies } from 'next/headers'
import { adminAuth } from './firebase-admin'

export async function getUserSession() {
    const cookieStore = await cookies()
    const token = cookieStore.get('user-token')?.value
    if (!token || !adminAuth) return null
    try {
        const decoded = await adminAuth.verifyIdToken(token)
        return decoded
    } catch {
        return null
    }
}
