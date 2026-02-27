'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BarChart3, Brain, Zap, Share2, Search, Briefcase, Settings, MoreHorizontal, Cpu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'

// Primary navigation items for mobile bottom nav
const PRIMARY_NAV = [
  { id: 'dashboard', label: 'Dash', href: '/admin/dashboard', icon: Home },
  { id: 'strategy', label: 'Lab', href: '/admin/strategy-lab', icon: Brain },
  { id: 'broadcasting', label: 'Live', href: '/admin/studio', icon: Share2 },
  { id: 'workbench', label: 'Work', href: '/admin/workbench', icon: Cpu },
  { id: 'basecamp', label: 'Base', href: '/admin/basecamp', icon: Briefcase },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const [moreOpen, setMoreOpen] = useState(false)

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/[0.06] safe-area-inset-bottom">
        <div className="flex items-center justify-between h-[60px] px-1">
          {PRIMARY_NAV.map(item => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors rounded-lg mx-px',
                  active
                    ? 'text-brand-red'
                    : 'text-white/40 hover:text-white/70'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[9px] font-semibold leading-none">{item.label}</span>
              </Link>
            )
          })}

          {/* More menu */}
          <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
            <SheetTrigger asChild>
              <button className={cn(
                'flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors rounded-lg mx-px',
                'text-white/40 hover:text-white/70'
              )}>
                <MoreHorizontal className="w-5 h-5" />
                <span className="text-[9px] font-semibold leading-none">More</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[60vh] p-0 rounded-t-3xl bg-[#0A0A0A] border-t border-white/[0.06]">
              <div className="flex flex-col h-full">
                <div className="flex-shrink-0 px-4 py-4 border-b border-white/[0.06]">
                  <h2 className="text-white font-bold">More Tools</h2>
                  <p className="text-white/40 text-sm mt-1">Access all admin features</p>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
                  {[
                    { label: 'SEO', href: '/admin/seo', icon: Search },
                    { label: 'Blog', href: '/admin/blog', icon: Briefcase },
                    { label: 'Bookings', href: '/admin/bookings', icon: BarChart3 },
                    { label: 'Settings', href: '/admin/settings', icon: Settings },
                  ].map(item => {
                    const Icon = item.icon
                    const active = isActive(item.href)

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMoreOpen(false)}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                          active
                            ? 'bg-brand-red/20 text-brand-red'
                            : 'hover:bg-white/[0.05] text-white/70 hover:text-white'
                        )}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Mobile content bottom spacer */}
      <div className="md:hidden h-[60px]" />
    </>
  )
}
