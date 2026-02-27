'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Truck, Wrench, Sparkles, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function PromoPop() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Show after a short delay
    const timer = setTimeout(() => {
      if (!isDismissed) setIsVisible(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [isDismissed])

  const dismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 left-6 z-[100] pointer-events-none w-full max-w-[360px]">
          {/* Liquified Morphing Card */}
          <motion.div
            initial={{ 
              y: 100,
              x: -50,
              scale: 0.3, 
              opacity: 0, 
              rotate: -15,
              borderRadius: "100%",
              filter: "blur(10px) brightness(1.5)"
            }}
            animate={{ 
              y: 0,
              x: 0,
              scale: 1, 
              opacity: 1, 
              rotate: 0,
              borderRadius: "32px",
              filter: "blur(0px) brightness(1)",
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 18,
                mass: 1.2
              }
            }}
            exit={{ 
              y: 50,
              scale: 0.5, 
              opacity: 0, 
              rotate: 10,
              borderRadius: "100%",
              filter: "blur(15px)",
              transition: { duration: 0.4, ease: "backIn" }
            }}
            className="relative w-full bg-white shadow-[0_24px_48px_rgba(0,0,0,0.15)] pointer-events-auto overflow-hidden border-2 border-brand-red/20 p-6 flex flex-col items-center text-center"
            style={{
              animation: 'breathing 5s ease-in-out infinite'
            }}
          >
            <style jsx global>{`
              @keyframes breathing {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.03); }
              }
            `}</style>

            {/* Close Button */}
            <button 
              onClick={dismiss}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-gray-50 text-gray-400 hover:bg-brand-red hover:text-white transition-all z-20 shadow-sm"
            >
              <X size={16} />
            </button>

            {/* Top Layout: Icon & Title Row */}
            <div className="flex items-center gap-4 w-full mb-4">
              <motion.div
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 8, -8, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-14 h-14 bg-brand-red rounded-2xl flex items-center justify-center text-white shadow-lg relative shrink-0"
              >
                <Truck size={28} strokeWidth={2.5} />
                <motion.div 
                  animate={{ scale: [1, 1.4, 1], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 text-[#FFD700]"
                >
                  <Sparkles size={16} fill="currentColor" />
                </motion.div>
              </motion.div>

              <div className="text-left">
                <motion.h2 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-2xl font-[1000] text-brand-dark uppercase tracking-tighter leading-none"
                >
                  FREE <span className="text-brand-red italic underline decoration-wavy decoration-[#FFD700]/50 underline-offset-4">PICKUP</span>
                </motion.h2>
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-red/60">Limited Time Offer</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 font-bold text-sm mb-5 leading-tight text-left w-full">
              Get free doorstep pickup, drop & a <span className="text-brand-dark font-black">50-point health inspection</span> at zero cost.
            </p>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full"
            >
              <Button
                onClick={() => {
                  const el = document.getElementById('booking')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                  dismiss()
                }}
                className="w-full bg-brand-dark text-white rounded-xl py-6 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-brand-red transition-all group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Claim Voucher <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              </Button>
            </motion.div>

            {/* Trust Tags */}
            <div className="mt-4 flex items-center justify-between w-full text-[8px] font-black uppercase tracking-widest text-gray-400 border-t border-gray-100 pt-3">
               <div className="flex items-center gap-1"><MapPin size={10} /> Abu Dhabi</div>
               <div className="flex items-center gap-1"><Wrench size={10} /> Certified</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function ChevronRight({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  )
}
