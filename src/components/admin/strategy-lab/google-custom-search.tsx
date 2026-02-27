'use client'

import { useEffect } from 'react'
import { Search } from 'lucide-react'

export function GoogleCustomSearch() {
  useEffect(() => {
    // Dynamically load the Google CSE script
    const script = document.createElement('script')
    script.src = 'https://cse.google.com/cse.js?cx=d4c8245a5414d418a'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup script if component unmounts
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="bg-brand-charcoal border border-white/[0.08] rounded-3xl p-8 overflow-hidden shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
          <Search className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-tight text-white leading-none">
            Manual Search Reconnaissance
          </h3>
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1">
            Google Custom Search Engine Integrated
          </p>
        </div>
      </div>

      <div className="min-h-[200px] w-full bg-white/5 rounded-2xl p-4">
        {/* Google CSE Injection Point */}
        <div className="gcse-search"></div>
      </div>
      
      <div className="mt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/10">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Live Google Index Connection Active
      </div>
    </div>
  )
}
