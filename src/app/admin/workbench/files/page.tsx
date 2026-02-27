'use client'

import { Layers, FilePlus, FileSearch, Trash2, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileItem {
  id: string
  name: string
  type: string
  size: string
  date: string
  status: 'synced' | 'pending' | 'failed'
}

const RECENT_FILES: FileItem[] = [
  { id: '1', name: 'market_analysis_uae_2026.pdf', type: 'PDF', size: '2.4MB', date: '2 hours ago', status: 'synced' },
  { id: '2', name: 'competitor_prices_feb.xlsx', type: 'XLSX', size: '840KB', date: '5 hours ago', status: 'synced' },
  { id: '3', name: 'seo_keyword_research.csv', type: 'CSV', size: '1.2MB', date: 'Yesterday', status: 'pending' },
  { id: '4', name: 'brand_voice_guide.docx', type: 'DOCX', size: '4.5MB', date: '2 days ago', status: 'synced' },
]

export default function FileOperationsPage() {
  return (
    <div className="p-8 h-screen overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#34D399]/20 flex items-center justify-center">
            <Layers className="w-6 h-6 text-[#34D399]" />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter text-white">
              File <span className="text-[#34D399]">Operations</span>
            </h1>
            <p className="text-xs text-white/40 font-bold uppercase tracking-[0.2em] mt-0.5">
              Multimodal Document Management
            </p>
          </div>
        </div>

        <button className="bg-[#34D399] text-brand-dark px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-emerald-900/20 flex items-center gap-2">
          <FilePlus className="w-4 h-4" /> Upload Files
        </button>
      </div>

      {/* Grid of Stats/Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Storage Used', value: '4.2 GB / 10 GB', icon: Layers, color: 'text-blue-400' },
          { label: 'Files Analyzed', value: '1,284', icon: FileSearch, color: 'text-emerald-400' },
          { label: 'Pending Sync', value: '3 Items', icon: Layers, color: 'text-amber-400' },
        ].map((stat) => (
          <div key={stat.label} className="bg-brand-charcoal border border-white/[0.08] rounded-2xl p-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
              {stat.label}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-black text-white">{stat.value}</span>
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
          </div>
        ))}
      </div>

      {/* File List Table */}
      <div className="bg-brand-charcoal border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-white/[0.06] bg-white/[0.02]">
          <h3 className="text-[11px] font-black uppercase tracking-widest text-white/60">
            Recent Activity
          </h3>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.01]">
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/30">Name</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/30 text-center">Type</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/30 text-center">Size</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/30 text-center">Modified</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/30 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {RECENT_FILES.map((file) => (
              <tr key={file.id} className="group hover:bg-white/[0.03] border-b border-white/[0.04] last:border-0 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 group-hover:text-brand-red/80 transition-colors">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white group-hover:text-[#34D399] transition-colors">{file.name}</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className={cn(
                          "w-1 h-1 rounded-full",
                          file.status === 'synced' ? "bg-emerald-500" : "bg-amber-500"
                        )} />
                        <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">{file.status}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-[9px] font-black px-2 py-0.5 rounded bg-white/5 text-white/40 border border-white/5">
                    {file.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-[10px] font-bold text-white/30">{file.size}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-[10px] font-bold text-white/30">{file.date}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 hover:bg-[#34D399]/10 hover:text-[#34D399] text-white/20 rounded transition-all">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 hover:bg-red-500/10 hover:text-red-500 text-white/20 rounded transition-all">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
