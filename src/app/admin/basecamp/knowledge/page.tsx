import { Home, FileText, BookOpen, Shield, HelpCircle, ChevronRight, Download } from 'lucide-react'
import Link from 'next/link'

const categories = [
  {
    title: 'Standard Operating Procedures',
    description: 'Master guides for luxury vehicle handling and service protocols.',
    icon: FileText,
    items: ['Oil Change Workflow', 'Brake System Inspection', 'Detailing Excellence'],
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    title: 'Brand Guidelines',
    description: 'Visual identity, tone of voice, and asset usage rules.',
    icon: Shield,
    items: ['Brand Voice v2.0', 'Logo Usage Specs', 'Typography System'],
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    title: 'Employee Handbook',
    description: 'Internal policies, benefits, and workplace standards.',
    icon: BookOpen,
    items: ['Code of Conduct', 'Benefits Guide 2026', 'Holiday Calendar'],
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    title: 'Technical Documentation',
    description: 'Platform architecture, API specs, and system maintenance.',
    icon: HelpCircle,
    items: ['Firebase Security Rules', 'CMS Schema Guide', 'Agentic OS Protocol'],
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
]

export default function KnowledgeBasePage() {
  return (
    <div className="p-8 space-y-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
            <Home className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter text-brand-dark leading-none">
              Office <span className="text-blue-500">HQ</span>
            </h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2">
              Internal Knowledge & Resource Center
            </p>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-3">
           <div className="text-right">
             <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Last Update</p>
             <p className="text-[11px] font-bold text-brand-dark">Feb 20, 2026</p>
           </div>
        </div>
      </div>

      {/* Search Bar Placeholder */}
      <div className="max-w-2xl bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
         <div className="flex items-center gap-3 text-gray-400">
           <BookOpen className="w-4 h-4" />
           <span className="text-sm font-medium">Search knowledge base...</span>
           <span className="ml-auto text-[10px] font-black uppercase tracking-widest bg-gray-50 px-2 py-1 rounded">⌘K</span>
         </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="bg-white border border-gray-100 rounded-3xl p-8 hover:border-blue-500/20 transition-all shadow-sm"
          >
            <div className={`w-14 h-14 rounded-2xl ${cat.bg} flex items-center justify-center mb-6`}>
              <cat.icon className={`w-7 h-7 ${cat.color}`} />
            </div>

            <h2 className="text-xl font-black uppercase tracking-tight text-brand-dark mb-2">
              {cat.title}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              {cat.description}
            </p>

            <div className="space-y-3">
              {cat.items.map(item => (
                <div key={item} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer">
                  <span className="text-xs font-bold text-gray-700">{item}</span>
                  <div className="flex items-center gap-3">
                    <Download className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
