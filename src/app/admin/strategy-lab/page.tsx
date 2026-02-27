'use client'

import { Brain, Search, FileSearch, BarChart3, TrendingUp, Globe, Target } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function StrategyLabHubPage() {
  const tools = [
    {
      title: 'Market Searcher',
      description: 'AI intelligence agent for real-time market trends, competitor scanning, and growth opportunities.',
      icon: Search,
      href: '/admin/strategy-lab/market',
      color: 'bg-violet-500',
      status: 'Online'
    },
    {
      title: 'SEO Intelligence',
      description: 'Deep SEO audit agent. Analyzes keyword gaps, SERP rankings, and local search visibility.',
      icon: FileSearch,
      href: '/admin/strategy-lab/seo',
      color: 'bg-sky-500',
      status: 'Online'
    },
    {
      title: 'Deep Analytics',
      description: 'Comprehensive business metrics, conversion tracking, and user behavior visualizations.',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-emerald-500',
      status: 'Live'
    }
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-white">
          Strategy <span className="text-[#A78BFA]">Lab</span>
        </h1>
        <p className="text-xs text-white/40 font-bold uppercase tracking-[0.3em] mt-1">
          PhD-Level Business Intelligence & Research Swarm
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.title}
            href={tool.href}
            className="group relative overflow-hidden bg-brand-charcoal border border-white/[0.08] rounded-3xl p-8 hover:border-[#A78BFA]/40 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#A78BFA]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-center justify-between mb-6">
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-3",
                tool.color
              )}>
                <tool.icon className="w-7 h-7 text-white" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full animate-pulse",
                  tool.status === 'Live' ? 'bg-emerald-500' : 'bg-[#A78BFA]'
                )} />
                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">{tool.status}</span>
              </div>
            </div>

            <h2 className="text-xl font-black uppercase tracking-tight text-white mb-2">
              {tool.title}
            </h2>
            <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
              {tool.description}
            </p>

            <div className="mt-8 flex items-center text-[#A78BFA] text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
              Launch Agent →
            </div>
          </Link>
        ))}
      </div>

      {/* Lab Highlights */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-brand-charcoal border border-white/[0.08] rounded-3xl p-8">
           <h3 className="text-[10px] font-black uppercase tracking-widest text-[#A78BFA] mb-6 flex items-center gap-2">
             <Globe className="w-3 h-3" /> Global Insights
           </h3>
           <div className="space-y-4">
             {[
               { label: 'Market Sentiment', value: 'Positive (+14%)', trend: 'up' },
               { label: 'Competitive Density', value: 'Medium-High', trend: 'stable' },
               { label: 'SEO Authority Score', value: '74/100', trend: 'up' }
             ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">{item.label}</span>
                  <span className="text-xs font-black text-white">{item.value}</span>
                </div>
             ))}
           </div>
        </div>

        <div className="bg-brand-charcoal border border-white/[0.08] rounded-3xl p-8">
           <h3 className="text-[10px] font-black uppercase tracking-widest text-[#A78BFA] mb-6 flex items-center gap-2">
             <Target className="w-3 h-3" /> Growth Opportunities
           </h3>
           <div className="space-y-4">
              <p className="text-[11px] text-white/50 leading-relaxed">
                Our <span className="text-white font-bold">Market Searcher</span> has identified a 15% uptick in luxury ceramic coating demand in Abu Dhabi. Recommend prioritizing the "Ceramic vs PPF" blog content.
              </p>
              <button className="text-[10px] font-black uppercase tracking-widest text-[#A78BFA] hover:underline">
                Generate SEO Brief →
              </button>
           </div>
        </div>
      </div>
    </div>
  )
}
