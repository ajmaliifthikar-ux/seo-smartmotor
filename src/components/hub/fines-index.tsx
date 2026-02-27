'use client'

import { useState } from 'react'
import { Search, Info, AlertTriangle, ShieldCheck, Filter, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const FINES = [
  { id: 1, violation: 'Exceeding maximum speed limit by more than 80 km/h', fine: 3000, points: 23, impound: '60 days', category: 'Speeding' },
  { id: 2, violation: 'Exceeding maximum speed limit by more than 60 km/h', fine: 2000, points: 12, impound: '30 days', category: 'Speeding' },
  { id: 3, violation: 'Driving a vehicle without number plates', fine: 3000, points: 23, impound: '90 days', category: 'Registration' },
  { id: 4, violation: 'Driving a vehicle under the influence of alcohol', fine: 'Decided by court', points: 23, impound: '60 days', category: 'Safety' },
  { id: 5, violation: 'Using a handheld mobile phone while driving', fine: 800, points: 4, impound: 'None', category: 'Safety' },
  { id: 6, violation: 'Sudden swerving', fine: 1000, points: 4, impound: 'None', category: 'Safety' },
  { id: 7, violation: 'Window tinting exceeding permitted percentage', fine: 1500, points: 'None', impound: 'None', category: 'Regulations' },
  { id: 8, violation: 'Making modifications to the vehicle engine without a license', fine: 1000, points: 12, impound: '30 days', category: 'Regulations' },
  { id: 9, violation: 'Tailgating (Not leaving a safe distance)', fine: 400, points: 4, impound: 'None', category: 'Safety' },
  { id: 10, violation: 'Driving a noisy vehicle', fine: 2000, points: 12, impound: 'None', category: 'Regulations' },
]

export function FinesIndex() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActivePage] = useState('All')

  const categories = ['All', ...Array.from(new Set(FINES.map(f => f.category)))]

  const filtered = FINES.filter(f => {
    const matchesSearch = f.violation.toLowerCase().includes(search.toLowerCase()) || 
                          f.category.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'All' || f.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-10">
      {/* Search & Filter */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-red transition-colors" size={20} />
          <Input 
            placeholder="Search violations (e.g. Speeding, Tinting)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-16 pl-16 pr-6 bg-white border-gray-100 rounded-3xl font-bold text-brand-dark shadow-sm focus:ring-2 focus:ring-brand-red/20 transition-all outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar px-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActivePage(cat)}
              className={cn(
                "px-6 h-16 rounded-3xl font-black uppercase tracking-widest text-[10px] whitespace-nowrap transition-all shadow-sm",
                activeCategory === cat 
                  ? "bg-brand-dark text-white shadow-xl scale-105" 
                  : "bg-white text-gray-400 border border-gray-100 hover:border-brand-dark hover:text-brand-dark"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Index Grid */}
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode='popLayout'>
          {filtered.map((fine, i) => (
            <motion.div
              key={fine.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="group bg-white border border-gray-100 rounded-[2.5rem] p-8 hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
                <AlertTriangle size={120} />
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[8px] font-black uppercase tracking-widest bg-gray-50 text-gray-400 px-3 py-1 rounded-full border border-gray-100">
                      ID: #{fine.id.toString().padStart(3, '0')}
                    </span>
                    <span className="text-[8px] font-black uppercase tracking-widest bg-brand-red/5 text-brand-red px-3 py-1 rounded-full border border-brand-red/10">
                      {fine.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-brand-dark uppercase tracking-tighter leading-tight max-w-2xl">
                    {fine.violation}
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-8 lg:gap-12 border-t lg:border-t-0 lg:border-l border-gray-50 pt-6 lg:pt-0 lg:pl-12">
                  <div className="text-center lg:text-left">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Fine Amount</p>
                    <p className="text-xl font-black text-brand-dark italic uppercase">
                      {typeof fine.fine === 'number' ? `AED ${fine.fine}` : fine.fine}
                    </p>
                  </div>
                  <div className="text-center lg:text-left">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Black Points</p>
                    <p className="text-xl font-black text-brand-red italic">{fine.points}</p>
                  </div>
                  <div className="text-center lg:text-left">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Impound</p>
                    <p className="text-xl font-black text-brand-dark italic">{fine.impound}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-32 text-center space-y-6 bg-white border border-dashed border-gray-200 rounded-[3rem]">
            <Search className="w-16 h-16 text-gray-100 mx-auto" />
            <div>
              <p className="text-lg font-black text-brand-dark uppercase tracking-tighter italic">No violations found</p>
              <p className="text-sm text-gray-400 font-medium">Try searching for a different keyword or category.</p>
            </div>
          </div>
        )}
      </div>

      {/* Legal Disclaimer */}
      <div className="p-10 bg-gray-50 rounded-[3rem] border border-gray-100 flex items-start gap-6">
        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
          <Info className="text-gray-400" size={20} />
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-black uppercase tracking-widest text-brand-dark">Disclaimer & Accuracy</h4>
          <p className="text-xs text-gray-500 leading-relaxed font-medium">
            This index is maintained by the Smart Motor Autonomous Intelligence Swarm. While we strive for 100% accuracy, traffic laws in the UAE are subject to periodic updates by the Ministry of Interior. Always verify fines via the official Abu Dhabi Police or Dubai Police apps.
          </p>
        </div>
      </div>
    </div>
  )
}
