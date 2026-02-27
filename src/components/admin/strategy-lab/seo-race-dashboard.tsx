'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { TrendingUp, Target, Users, Zap, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Keyword {
  term: string
  volume: number
  difficulty: 'Low' | 'Medium' | 'High'
  trend: 'up' | 'down' | 'stable'
}

interface Competitor {
  name: string
  rank: number
  score: number
  updates: string
}

interface ActionItem {
  day: string
  action: string
  status: string
}

interface SeoRaceDashboardProps {
  data: {
    keywords: Keyword[]
    competitors: Competitor[]
    actionPlan?: ActionItem[]
  }
}

export function SeoRaceDashboard({ data }: SeoRaceDashboardProps) {
  const actionPlan = data.actionPlan || [
    { day: 'Day 1-2', action: 'Optimize H1/H2 for core service keywords', status: 'pending' },
    { day: 'Day 3', action: 'Deploy backlink outreach to local hubs', status: 'pending' },
    { day: 'Day 4-5', action: 'Internal link siloing for categories', status: 'pending' },
    { day: 'Day 6-7', action: 'Review SERP shift and adjust metadata', status: 'pending' }
  ]

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* 1. Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Organic Visibility', value: '74%', icon: TrendingUp, trend: '+12%', color: 'text-emerald-500' },
          { label: 'Keyword Gaps', value: '42', icon: Target, trend: '-5', color: 'text-[#A78BFA]' },
          { label: 'Competitor Updates', value: '12', icon: Users, trend: 'Active', color: 'text-amber-500' }
        ].map((stat) => (
          <div key={stat.label} className="bg-brand-charcoal border border-white/[0.08] rounded-3xl p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">{stat.label}</p>
                <h4 className="text-3xl font-black text-white">{stat.value}</h4>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className={cn("text-[10px] font-black uppercase tracking-widest", stat.color)}>{stat.trend}</span>
                  <span className="text-[8px] font-bold text-white/10 uppercase tracking-widest">This Month</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-brand-red/60 transition-colors">
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 2. Keyword Volume Chart */}
        <div className="lg:col-span-8 bg-brand-charcoal border border-white/[0.08] rounded-[2.5rem] p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight text-white italic">Keyword <span className="text-[#A78BFA]">Volume Audit</span></h3>
              <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em] mt-1">Real-time Search Potential</p>
            </div>
            <button className="text-[9px] font-black uppercase tracking-widest text-[#A78BFA] hover:underline">Full Analytics →</button>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.keywords}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis 
                  dataKey="term" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9, fontWeight: 900 }}
                  interval={0}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '10px', fontWeight: 'bold' }}
                />
                <Bar 
                  dataKey="volume" 
                  fill="#A78BFA" 
                  radius={[6, 6, 0, 0]} 
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Competitor Tracker */}
        <div className="lg:col-span-4 bg-brand-charcoal border border-white/[0.08] rounded-[2.5rem] p-8 shadow-2xl">
          <h3 className="text-lg font-black uppercase tracking-tight text-white italic mb-8">Competitor <span className="text-amber-500">Race</span></h3>
          <div className="space-y-6">
            {data.competitors.map((comp) => (
              <div key={comp.name} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-xs font-black text-white/20 group-hover:text-brand-red/60 transition-colors">
                  #{comp.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-black uppercase tracking-tight text-white">{comp.name}</p>
                    <span className="text-[10px] font-black text-emerald-500">{comp.score}/100</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${comp.score}%` }} />
                  </div>
                  <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mt-2 truncate">{comp.updates}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Actionable SEO Timeline */}
      <div className="bg-brand-charcoal border border-white/[0.08] rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#A78BFA] to-transparent" />
        
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-[#A78BFA]/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-[#A78BFA]" />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight text-white leading-none">SEO <span className="text-[#A78BFA]">Action Plan</span></h3>
            <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em] mt-1.5">7-Day Strategic Roadmap</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {actionPlan.map((item, i) => (
            <div key={item.day} className="relative group cursor-pointer">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#A78BFA]">{item.day}</span>
                <Calendar size={12} className="text-white/10 group-hover:text-[#A78BFA] transition-colors" />
              </div>
              <p className="text-xs font-bold text-white group-hover:text-white/80 leading-relaxed mb-4">{item.action}</p>
              <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", item.status === 'complete' ? 'bg-emerald-500' : 'bg-white/10')} />
                <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Status: {item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
