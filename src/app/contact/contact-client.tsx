'use client'

import dynamic from 'next/dynamic'

export const GoogleMapView = dynamic(
    () => import('@/components/admin/analytics/google-map-view').then(mod => mod.GoogleMapView),
    { ssr: false }
)
