import Link from 'next/link'
import {
  Wrench,
  FileText,
  Type,
  RefreshCw,
  Image as ImageIcon,
  Calculator,
  QrCode,
  Link as LinkIcon,
  Palette,
  ChevronRight,
} from 'lucide-react'

const tools = [
  {
    title: 'Invoice Generator',
    description: 'Create professional invoices for luxury services',
    icon: FileText,
    href: '/admin/tools/invoice-gen',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    title: 'PDF Builder',
    description: 'Generate high-end PDF documents and reports',
    icon: Wrench,
    href: '/admin/tools/pdf-builder',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    title: 'Brand Palette',
    description: 'Manage and explore brand color systems',
    icon: Palette,
    href: '/admin/tools/color-palette',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    title: 'QR Code Studio',
    description: 'Generate trackable QR codes for marketing',
    icon: QrCode,
    href: '/admin/tools/qr-code',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    title: 'URL Shortener',
    description: 'Create branded short links for analytics',
    icon: LinkIcon,
    href: '/admin/tools/url-shortener',
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
  },
  {
    title: 'Image Resizer',
    description: 'Optimize assets for the website catalog',
    icon: ImageIcon,
    href: '/admin/tools/image-resizer',
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
  },
  {
    title: 'File Converter',
    description: 'Convert between various document formats',
    icon: RefreshCw,
    href: '/admin/tools/file-converter',
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10',
  },
  {
    title: 'Font Explorer',
    description: 'Preview and manage typography assets',
    icon: Type,
    href: '/admin/tools/fonts',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
  {
    title: 'Premium Calculator',
    description: 'Luxury service pricing and estimation tool',
    icon: Calculator,
    href: '/admin/tools/calculator',
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
  },
]

export default function ToolsDirectoryPage() {
  return (
    <div className="p-8 space-y-12 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#34D399]/20 flex items-center justify-center">
          <Wrench className="w-6 h-6 text-[#34D399]" />
        </div>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-brand-dark leading-none italic">
            Tools & <span className="text-[#34D399]">Utilities</span>
          </h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2">
            The Admin Workbench Arsenal
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.title}
            href={tool.href}
            className="group relative bg-white border border-gray-100 rounded-3xl p-8 hover:border-[#34D399]/40 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${tool.bg} blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity`} />
            
            <div className={`w-14 h-14 rounded-2xl ${tool.bg} flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
              <tool.icon className={`w-7 h-7 ${tool.color}`} />
            </div>

            <h2 className="text-xl font-black uppercase tracking-tight text-brand-dark mb-2 flex items-center gap-2">
              {tool.title}
              <ChevronRight className="w-4 h-4 text-gray-200 group-hover:text-[#34D399] transition-colors" />
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              {tool.description}
            </p>

            <div className="mt-8 flex items-center text-[#34D399] text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
              Launch Utility →
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
