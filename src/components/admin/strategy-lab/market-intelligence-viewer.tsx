'use client'

import { FileText, Download, Share2, Printer, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MarketIntelligenceViewerProps {
  title?: string
  content: string
  date?: string
}

export function MarketIntelligenceViewer({
  title = "Market Intelligence Report",
  content,
  date = new Date().toLocaleDateString('en-AE', { dateStyle: 'long' })
}: MarketIntelligenceViewerProps) {
  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-brand-charcoal border border-white/[0.08] rounded-3xl border-dashed">
        <FileText className="w-12 h-12 text-white/10 mb-4" />
        <p className="text-sm font-bold text-white/20 uppercase tracking-widest">
          No intelligence data generated yet
        </p>
      </div>
    )
  }

  return (
    <div className="bg-brand-charcoal border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Report Header Bar */}
      <div className="px-8 py-4 border-b border-white/[0.06] bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#A78BFA]/20 flex items-center justify-center">
            <FileText className="w-4 h-4 text-[#A78BFA]" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-tight text-white leading-none">
              {title}
            </h3>
            <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-1">
              Generated on {date}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
            <Printer className="w-4 h-4" />
          </button>
          <button className="ml-2 px-4 py-2 bg-[#A78BFA] text-brand-dark rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.05] transition-all">
            Export
          </button>
        </div>
      </div>

      {/* Report Content */}
      <div className="flex-1 overflow-y-auto p-10 no-scrollbar bg-[url('/textures/paper-grain.png')] bg-repeat">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Cover Section */}
          <div className="border-b-4 border-[#A78BFA] pb-8">
            <div className="flex items-center gap-2 text-[#A78BFA] mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Smart Motor Intelligence</span>
              <div className="h-[1px] flex-1 bg-[#A78BFA]/20" />
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white leading-none mb-4">
              Strategic Market <br />
              <span className="text-[#A78BFA]">Intelligence Report</span>
            </h1>
            <p className="text-sm text-white/40 font-medium leading-relaxed max-w-lg">
              Proprietary analysis focusing on UAE automotive luxury segments, competitor movements, and emerging digital opportunities.
            </p>
          </div>

          {/* Actual Content (Parsed Markdown-ish) */}
          <div className="space-y-6 text-white/80 text-sm leading-relaxed font-medium">
            {content.split('\n').map((line, i) => {
              if (line.startsWith('# ')) {
                return <h2 key={i} className="text-2xl font-black text-white uppercase tracking-tight mt-10 mb-4">{line.replace('# ', '')}</h2>
              }
              if (line.startsWith('## ')) {
                return <h3 key={i} className="text-lg font-black text-white/90 uppercase tracking-tight mt-8 mb-3">{line.replace('## ', '')}</h3>
              }
              if (line.startsWith('- ')) {
                return (
                  <div key={i} className="flex gap-3 items-start pl-2">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#A78BFA] flex-shrink-0" />
                    <span>{line.replace('- ', '')}</span>
                  </div>
                )
              }
              if (line.trim() === '') return <div key={i} className="h-2" />
              return <p key={i}>{line}</p>
            })}
          </div>

          {/* Footer */}
          <div className="pt-20 pb-10 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
               <div className="h-[1px] w-12 bg-white/5" />
               <div className="w-2 h-2 rounded-full bg-white/10" />
               <div className="h-[1px] w-12 bg-white/5" />
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/10">
              Internal Classified Document • Smart Motor OS
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
