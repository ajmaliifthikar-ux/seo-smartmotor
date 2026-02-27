'use client'

import { useState } from 'react'
import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Location {
    key: string
    location: { lat: number; lng: number }
    name: string
    count: number
}

// Abu Dhabi Center
const ABU_DHABI_CENTER = { lat: 24.4539, lng: 54.3773 }

const MINIMAL_MAP_STYLE = [
    {
        "elementType": "geometry",
        "stylers": [{ "color": "#f5f5f5" }]
    },
    {
        "elementType": "labels.icon",
        "stylers": [{ "visibility": "off" }]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#616161" }]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#f5f5f5" }]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#bdbdbd" }]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{ "color": "#eeeeee" }]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{ "color": "#e5e5e5" }]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#9e9e9e" }]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{ "color": "#ffffff" }]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{ "color": "#dadada" }]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#616161" }]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#9e9e9e" }]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{ "color": "#e5e5e5" }]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{ "color": "#eeeeee" }]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#c9c9c9" }]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#9e9e9e" }]
    }
]

export function GoogleMapView({ 
    data, 
    title = "Live Operations Map", 
    showPulse = true,
    className
}: { 
    data: any[], 
    title?: string, 
    showPulse?: boolean,
    className?: string
}) {
    // Transform your emirate data to approximate lat/lng for visualization
    // In a real app, you'd use actual branch coordinates
    const locations: Location[] = [
        { key: 'abudhabi', location: { lat: 24.4539, lng: 54.3773 }, name: 'Abu Dhabi HQ', count: data.find(d => d.emirate === 'Abu Dhabi')?.count || 0 },
        { key: 'dubai', location: { lat: 25.2048, lng: 55.2708 }, name: 'Dubai Branch', count: data.find(d => d.emirate === 'Dubai')?.count || 0 },
        { key: 'sharjah', location: { lat: 25.3463, lng: 55.4209 }, name: 'Sharjah Hub', count: data.find(d => d.emirate === 'Sharjah')?.count || 0 },
    ]

    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)

    return (
        <div className={cn("relative w-full bg-gray-50 overflow-hidden", className || "aspect-square max-w-[500px] mx-auto rounded-3xl border border-gray-100 shadow-inner")}>
             <div className="absolute top-6 left-6 z-10">
                <h3 className="text-sm font-black uppercase tracking-widest text-brand-dark flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                    {showPulse && <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />}
                    {title}
                </h3>
            </div>

            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                <Map
                    defaultCenter={ABU_DHABI_CENTER}
                    defaultZoom={11}
                    styles={MINIMAL_MAP_STYLE}
                    mapId="smart-motor-v2-map"
                    gestureHandling={'cooperative'}
                    disableDefaultUI={true}
                    className="w-full h-full"
                >
                    {locations.map((loc) => (
                        <AdvancedMarker
                            key={loc.key}
                            position={loc.location}
                            onClick={() => setSelectedLocation(loc)}
                        >
                            <div className="relative flex items-center justify-center">
                                {/* Uber-style ripple/pulse */}
                                <div className="absolute w-10 h-10 bg-brand-red/20 rounded-full animate-ping" />
                                <div className="relative w-4 h-4 bg-brand-red border-2 border-white rounded-full shadow-lg" />
                                
                                {loc.count > 0 && (
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brand-dark text-white text-[9px] font-black px-2 py-1 rounded-md whitespace-nowrap shadow-xl">
                                        {loc.count} ACTIVE
                                    </div>
                                )}
                            </div>
                        </AdvancedMarker>
                    ))}

                    {selectedLocation && (
                        <InfoWindow
                            position={selectedLocation.location}
                            onCloseClick={() => setSelectedLocation(null)}
                        >
                            <div className="p-2 min-w-[150px]">
                                <h4 className="font-bold text-gray-900">{selectedLocation.name}</h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    Active Visitors: <span className="font-bold text-brand-red">{selectedLocation.count}</span>
                                </p>
                                <button className="mt-2 text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-gray-700 w-full transition-colors">
                                    View Details
                                </button>
                            </div>
                        </InfoWindow>
                    )}
                </Map>
            </APIProvider>

            {/* Overlay Gradient for seamless dashboard integration */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
        </div>
    )
}
