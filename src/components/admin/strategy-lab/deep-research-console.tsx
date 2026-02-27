'use client'

import { useState, useEffect } from 'react'
import { Search, Loader2, Cpu, Globe, BarChart3, Target } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DeepResearchConsoleProps {
  onResearch: (query: string) => void
  isResearching?: boolean
  statusText?: string
  statusMessages?: string[]
}

const DEFAULT_STATUS_MESSAGES = [
  'Initializing research swarm...',
  'Scanning UAE luxury car market trends...',
  'Analyzing competitor digital footprints...',
  'Extracting keyword opportunities...',
  'Synthesizing actionable intelligence...',
  'Structuring comprehensive report...'
]

export function DeepResearchConsole({
  onResearch,
  isResearching = false,
  statusText,
  statusMessages = DEFAULT_STATUS_MESSAGES
}: DeepResearchConsoleProps) {
  const [query, setQuery] = useState('')
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0)

  // Cycle status messages when researching
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isResearching) {
      interval = setInterval(() => {
        setCurrentStatusIndex((prev) => (prev + 1) % statusMessages.length)
      }, 3000)
    } else {
      setCurrentStatusIndex(0)
    }
    return () => clearInterval(interval)
  }, [isResearching, statusMessages.length])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() && !isResearching) {
      onResearch(query)
    }
  }

  const activeStatus = statusText || statusMessages[currentStatusIndex]

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12">
      {/* Input Section */}
      <div className="relative group">
        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="absolute inset-0 bg-[#A78BFA]/5 blur-3xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
          
          <div className="relative bg-brand-charcoal border border-white/[0.08] rounded-3xl p-2 focus-within:border-[#A78BFA]/40 transition-all shadow-2xl">
            <div className="flex items-center gap-4 px-4">
              <Search className="w-6 h-6 text-white/20 group-focus-within:text-[#A78BFA] transition-colors" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter research parameters (e.g. 'Abu Dhabi luxury ceramic coating market 2026')..."
                disabled={isResearching}
                className="flex-1 bg-transparent border-0 py-6 text-xl text-white placeholder:text-white/10 focus:ring-0 outline-none"
              />
              <button
                type="submit"
                disabled={isResearching || !query.trim()}
                className={cn(
                  "px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl",
                  query.trim() && !isResearching
                    ? "bg-[#A78BFA] text-brand-dark hover:scale-[1.02] active:scale-[0.98]"
                    : "bg-white/5 text-white/10 cursor-not-allowed"
                )}
              >
                {isResearching ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Deep Research"
                )}
              </button>
            </div>
          </div>
        </form>
        
        {/* Sample Ideas */}
        {!isResearching && (
          <div className="mt-6 flex flex-wrap items-center gap-3 px-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Sample Ideas:</span>
            {[
              'Competitor SEO Audit',
              'Market Expansion Plan',
              'Product Launch Strategy',
              'Social Media Roadmap'
            ].map(idea => (
              <button
                key={idea}
                onClick={() => setQuery(idea)}
                className="text-[10px] font-bold text-white/40 hover:text-[#A78BFA] px-3 py-1.5 rounded-full bg-white/5 border border-white/5 hover:border-[#A78BFA]/20 transition-all"
              >
                {idea}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Researching State */}
      {isResearching && (
        <div className="flex flex-col items-center justify-center py-20 relative">
          {/* Animated Background Icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <Globe className="absolute top-0 left-1/4 w-12 h-12 text-[#A78BFA]/5 animate-pulse" style={{ animationDelay: '0s' }} />
             <BarChart3 className="absolute bottom-10 right-1/4 w-16 h-16 text-[#A78BFA]/5 animate-pulse" style={{ animationDelay: '1s' }} />
             <Target className="absolute top-1/2 right-10 w-10 h-10 text-[#A78BFA]/5 animate-pulse" style={{ animationDelay: '2s' }} />
             <Cpu className="absolute bottom-0 left-10 w-14 h-14 text-[#A78BFA]/5 animate-pulse" style={{ animationDelay: '1.5s' }} />
          </div>

          <div className="relative z-10 space-y-10 flex flex-col items-center">
            {/* High-End Progress Ring */}
            <div className="relative">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  className="text-white/[0.03]"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  strokeDasharray="364.4"
                  strokeDashoffset="182.2"
                  className="text-[#A78BFA] animate-[spin_4s_linear_infinite]"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="transparent"
                  strokeDasharray="314"
                  strokeDashoffset="157"
                  className="text-[#A78BFA]/30 animate-[spin_6s_linear_infinite_reverse]"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#A78BFA]/10 flex items-center justify-center shadow-inner">
                  <Search className="w-8 h-8 text-[#A78BFA] animate-pulse" />
                </div>
              </div>
            </div>

            <div className="text-center space-y-3">
              <h3 className="text-2xl font-black uppercase tracking-tight text-white animate-pulse shimmer">
                {activeStatus}
              </h3>
              <div className="flex items-center justify-center gap-3">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/10" />
                <p className="text-[10px] font-black text-[#A78BFA] uppercase tracking-[0.4em]">
                  Agentic Swarm Activated
                </p>
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/10" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

