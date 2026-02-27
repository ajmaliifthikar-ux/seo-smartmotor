'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

// Lazy load the map component to avoid performance hit on initial load
const GoogleMapView = dynamic(
  () => import('@/components/admin/analytics/google-map-view').then(mod => mod.GoogleMapView),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-3xl animate-pulse min-h-[400px]">
        <div className="flex flex-col items-center gap-4 text-gray-400">
          <MapPin className="w-8 h-8 opacity-50" />
          <span className="text-sm font-black uppercase tracking-widest">Loading Map...</span>
        </div>
      </div>
    )
  }
)

export function LocationMapSection() {
  // Dummy data to pass into the map
  const mockData = [
    { emirate: 'Abu Dhabi', count: 42 },
    { emirate: 'Dubai', count: 12 },
    { emirate: 'Sharjah', count: 5 }
  ]

  return (
    <section className="py-24 bg-white relative border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase">
              <span className="text-brand-red block mb-2">Find Us</span>
              in Musaffah
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
              We are strategically located in the heart of Abu Dhabi's automotive hub, providing world-class repair services directly to your doorstep.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-brand-red/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-brand-red" />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest mb-1">Smart Motor Center</h3>
                  <p className="text-gray-500">M9, Musaffah Industrial Area<br/>Abu Dhabi, UAE</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-[600px] mx-auto lg:ml-auto"
          >
            {/* Wrapper to control map aspect ratio and styling */}
            <div className="p-4 bg-gray-50 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50">
              <GoogleMapView data={mockData} title="Smart Motor HQ" showPulse={false} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
