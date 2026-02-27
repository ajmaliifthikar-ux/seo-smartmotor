'use client'

import { WorkbenchChat } from '@/components/admin/workbench/workbench-chat'
import { Cpu, Search, Layers, Download, Trash2, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function WorkbenchPage() {
  return (
    <div className="flex h-[calc(100vh-2rem)] overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0E0E0E] shadow-2xl relative">
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#34D399]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-white/[0.06] relative z-10">
        <header className="px-8 py-6 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#34D399]/20 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-[#34D399]" />
            </div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tight text-white leading-none">
                AI <span className="text-[#34D399]">Workbench</span>
              </h1>
              <p className="text-[9px] text-white/30 font-bold uppercase tracking-[0.3em] mt-1.5 leading-none">
                Multimodal Copilot v2.0
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
               <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Active Connection</span>
             </div>
          </div>
        </header>

        <div className="flex-1 min-h-0 relative">
          <WorkbenchChat />
        </div>
      </div>

      {/* Context Sidebar (Temporary / Current Files) */}
      <aside className="hidden lg:flex flex-col w-80 flex-shrink-0 bg-[#0A0A0A]/50 backdrop-blur-3xl relative z-10">
        <div className="p-6 border-b border-white/[0.06]">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Session Context</h3>
          <p className="text-[11px] font-bold text-white/70">Operation: Market Intelligence Audit</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
          {/* Active Context Items */}
          <section>
            <h4 className="text-[9px] font-black uppercase tracking-widest text-[#34D399] mb-4 flex items-center gap-2">
              <Layers className="w-3 h-3" /> Loaded Documents
            </h4>
            <div className="space-y-3">
              {[
                { name: 'market_audit_uae.pdf', type: 'PDF' },
                { name: 'competitor_prices.xlsx', type: 'XLSX' }
              ].map(file => (
                <div key={file.name} className="group p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-white/80 truncate">{file.name}</span>
                    <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-white/5 text-white/30">{file.type}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-white/30 hover:text-white"><Download size={12} /></button>
                    <button className="text-white/30 hover:text-red-500"><Trash2 size={12} /></button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h4 className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-4 flex items-center gap-2">
              <Search className="w-3 h-3" /> Recent Searches
            </h4>
            <div className="space-y-2">
              {['luxury car prices 2026', 'seo trends dubai'].map(search => (
                <div key={search} className="text-[10px] font-medium text-white/50 hover:text-[#34D399] cursor-pointer transition-colors flex items-center gap-2">
                   <Globe className="w-2.5 h-2.5" /> {search}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="p-6 border-t border-white/[0.06]">
          <button className="w-full py-3 rounded-xl bg-white/[0.04] border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/60 hover:bg-white/10 hover:text-white transition-all">
            Clear Context
          </button>
        </div>
      </aside>
    </div>
  )
}
