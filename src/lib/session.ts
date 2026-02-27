import { getServerSession } from './firebase-admin'

export async function getAdminSession() {
    const session = await getServerSession()
    if (session?.user?.role === 'ADMIN') return session.user
    return null
}

export async function requireAdmin() {
    const user = await getAdminSession()
    if (!user) {
        throw new Error('Unauthorized')
    }
    return user
}
