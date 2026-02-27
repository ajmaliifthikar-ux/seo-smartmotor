'use client'

import { usePathname } from 'next/navigation'
import { EmergencyFAB } from '@/components/ui/emergency-fab'

export function GlobalFAB() {
    const pathname = usePathname()
    
    // Do not show on admin routes, auth routes, or the dedicated leyla page
    if (pathname?.startsWith('/admin') || pathname?.startsWith('/auth') || pathname === '/leyla') {
        return null
    }

    return <EmergencyFAB />
}
