'use client'

import { useState } from 'react'
import { DeepResearchConsole } from '@/components/admin/strategy-lab/deep-research-console'
import { MarketIntelligenceViewer } from '@/components/admin/strategy-lab/market-intelligence-viewer'
import { GoogleCustomSearch } from '@/components/admin/strategy-lab/google-custom-search'
import { Globe } from 'lucide-react'
import { toast } from 'sonner'

export default function MarketSearcherPage() {
  const [isResearching, setIsResearching] = useState(false)
  const [reportContent, setReportContent] = useState<string | null>(null)
  const [statusText, setStatusText] = useState('')

  const handleResearch = async (query: string) => {
    setIsResearching(true)
    setReportContent(null)
    setStatusText('Deploying Search Swarm...')
    
    try {
      const response = await fetch('/api/ai/market-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process market research')
      }

      setReportContent(data.response)
      toast.success('Market Intelligence Brief generated successfully.')
    } catch (error: any) {
      console.error('Market research error:', error)
      toast.error(error.message || 'An unexpected error occurred during research.')
    } finally {
      setIsResearching(false)
      setStatusText('')
    }
  }

  return (
    <div className="p-8 space-y-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#A78BFA]/20 flex items-center justify-center">
          <Globe className="w-6 h-6 text-[#A78BFA]" />
        </div>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-white leading-none">
            Market <span className="text-[#A78BFA]">Searcher</span>
          </h1>
          <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mt-2">
            Advanced Competitive Reconnaissance
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DeepResearchConsole 
          onResearch={handleResearch} 
          isResearching={isResearching}
          statusText={statusText}
        />
        <GoogleCustomSearch />
      </div>

      {reportContent && (
        <div className="mt-12 h-[800px]">
          <MarketIntelligenceViewer content={reportContent} />
        </div>
      )}
    </div>
  )
}
