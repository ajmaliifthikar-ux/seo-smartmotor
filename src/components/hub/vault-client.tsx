'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, X, Zap, Target, Gauge, Scale, ExternalLink, ShieldCheck, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface Car {
  model: string
  slug: string
  year: string
  era: string
  origin: string
  engine: string
  power: string
  torque: string
  transmission: string
  driveType: string
  zeroToSixty: string
  topSpeed: string
  weight: string
  price: string
}

interface VaultClientProps {
  initialCars: Car[]
}

export function VaultClient({ initialCars }: VaultClientProps) {
  const [search, setSearch] = useState('')
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([])
  
  const selectedCars = useMemo(() => 
    initialCars.filter(c => selectedSlugs.includes(c.slug))
  , [selectedSlugs, initialCars])

  const availableCars = useMemo(() => 
    initialCars.filter(c => 
      c.model.toLowerCase().includes(search.toLowerCase()) && 
      !selectedSlugs.includes(c.slug)
    ).slice(0, 10)
  , [search, selectedSlugs, initialCars])

  const toggleCar = (slug: string) => {
    if (selectedSlugs.includes(slug)) {
      setSelectedSlugs(selectedSlugs.filter(s => s !== slug))
    } else if (selectedSlugs.length < 3) {
      setSelectedSlugs([...selectedSlugs, slug])
      setSearch('')
    }
  }

  return (
    <div className="space-y-16">
      {/* Search & Selector */}
      <div className="max-w-3xl mx-auto">
        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-red transition-colors" size={20} />
          <Input 
            placeholder="Search supercar models (e.g. SF90, Chiron, 911)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-20 pl-16 pr-6 bg-white border-gray-100 rounded-[2.5rem] font-bold text-xl text-brand-dark shadow-2xl focus:ring-2 focus:ring-brand-red/20 transition-all outline-none"
          />
          
          <AnimatePresence>
            {search.length > 1 && availableCars.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-4 bg-white border border-gray-100 rounded-[2.5rem] shadow-2xl p-4 z-50 overflow-hidden"
              >
                {availableCars.map((car) => (
                  <button
                    key={car.slug}
                    onClick={() => toggleCar(car.slug)}
                    className="w-full flex items-center justify-between p-6 rounded-2xl hover:bg-gray-50 transition-colors text-left group"
                  >
                    <div>
                      <p className="text-sm font-black text-brand-dark uppercase tracking-tighter">{car.model}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{car.era} &middot; {car.origin}</p>
                    </div>
                    <Plus size={18} className="text-gray-300 group-hover:text-brand-red transition-colors" />
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
        {selectedCars.map((car, i) => (
          <motion.div
            key={car.slug}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-brand-dark rounded-[3.5rem] p-10 relative overflow-hidden shadow-2xl border border-white/5 flex flex-col h-full"
          >
            <div className="absolute inset-0 carbon-fiber opacity-10" />
            
            {/* Header */}
            <div className="relative z-10 flex justify-between items-start mb-12">
              <div>
                <p className="text-brand-red text-[10px] font-black uppercase tracking-[0.3em] mb-2">{car.era}</p>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none">{car.model}</h3>
              </div>
              <button 
                onClick={() => toggleCar(car.slug)}
                className="p-3 rounded-full bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Spec List */}
            <div className="relative z-10 space-y-8 flex-1">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/30 mb-1">Engine</p>
                  <p className="text-sm font-bold text-white leading-tight">{car.engine}</p>
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/30 mb-1">Power</p>
                  <p className="text-sm font-bold text-brand-red italic">{car.power}</p>
                </div>
              </div>

              <div className="h-px bg-white/10 w-full" />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap size={14} className="text-brand-red" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">0-60 MPH</span>
                  </div>
                  <span className="text-lg font-black text-white italic">{car.zeroToSixty}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Gauge size={14} className="text-brand-red" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Top Speed</span>
                  </div>
                  <span className="text-lg font-black text-white italic">{car.topSpeed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Scale size={14} className="text-brand-red" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Weight</span>
                  </div>
                  <span className="text-lg font-black text-white italic">{car.weight}</span>
                </div>
              </div>
            </div>

            {/* Leyla's Smart Tip */}
            <div className="relative z-10 mt-12 p-6 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 rounded-full bg-brand-red flex items-center justify-center">
                  <ShieldCheck size={12} className="text-white" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-brand-red">Leyla&apos;s Smart Tip</span>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed font-medium">
                To maintain this {car.model}&apos;s peak performance in the UAE heat, we recommend our specialized diagnostics every 5,000 km.
              </p>
              <Link 
                href="/#booking"
                className="mt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white hover:text-brand-red transition-colors"
              >
                Secure Performance Inspection <ChevronRight size={10} />
              </Link>
            </div>
          </motion.div>
        ))}

        {selectedSlugs.length < 3 && (
          <div className="border-4 border-dashed border-gray-100 rounded-[3.5rem] flex flex-col items-center justify-center p-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-[2.5rem] bg-gray-50 flex items-center justify-center text-gray-200">
              <Plus size={40} />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-tighter text-brand-dark">Slot {selectedSlugs.length + 1} Available</p>
              <p className="text-xs text-gray-400 font-medium">Add a model above to begin engineering comparison.</p>
            </div>
          </div>
        )}
      </div>

      {/* Comparison Hook */}
      {selectedSlugs.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-12 bg-brand-red rounded-[4rem] flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl shadow-brand-red/20"
        >
          <div className="space-y-4 text-center lg:text-left text-white">
            <h3 className="text-3xl font-black uppercase tracking-tighter italic">
              Share this <span className="text-brand-dark">Engineering Brief</span>
            </h3>
            <p className="text-white/80 text-sm font-medium tracking-wide max-w-xl">
              A custom-compiled technical comparison generated by the Smart Motor Virtual Vault.
            </p>
          </div>
          <button className="px-10 py-5 bg-brand-dark text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:text-brand-dark transition-all shadow-2xl">
            Copy Comparison Link
          </button>
        </motion.div>
      )}
    </div>
  )
}
