'use client'

import { useState } from 'react'
import { DeepResearchConsole } from '@/components/admin/strategy-lab/deep-research-console'
import { SeoRaceDashboard } from '@/components/admin/strategy-lab/seo-race-dashboard'
import { FileSearch } from 'lucide-react'

export default function SEOIntelligencePage() {
  const [isResearching, setIsResearching] = useState(false)
  const [seoData, setSeoData] = useState<any | null>(null)

  const handleResearch = async (query: string) => {
    setIsResearching(true)
    setSeoData(null)
    
    try {
      const response = await fetch('/api/ai/seo-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      })

      if (!response.ok) throw new Error('SEO Audit failed')

      const data = await response.json()
      setSeoData(data)
    } catch (error) {
      console.error('SEO research error:', error)
    } finally {
      setIsResearching(false)
    }
  }

  return (
    <div className="p-8 space-y-12 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#A78BFA]/20 flex items-center justify-center">
          <FileSearch className="w-6 h-6 text-[#A78BFA]" />
        </div>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-white leading-none">
            SEO <span className="text-[#A78BFA]">Intelligence</span>
          </h1>
          <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mt-2">
            The Digital SEO Race Dashboard
          </p>
        </div>
      </div>

      <DeepResearchConsole 
        onResearch={handleResearch} 
        isResearching={isResearching}
        statusMessages={[
          'Scanning Google SERP results...',
          'Identifying competitor keyword clusters...',
          'Mapping backlink authority gaps...',
          'Analyzing on-page structure...',
          'Calculating SEO difficulty scores...',
          'Generating actionable roadmap...'
        ]}
      />

      {seoData && (
        <div className="mt-12">
          <SeoRaceDashboard data={seoData} />
        </div>
      )}
    </div>
  )
}
