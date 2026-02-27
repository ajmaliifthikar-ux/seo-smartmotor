'use client'

import React, { useState, useEffect } from 'react'
import { Bell, AlertTriangle, TrendingUp, Info, ChevronRight, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/admin/notifications')
      if (res.ok) {
        const data = await res.json()
        setNotifications(data)
        setUnreadCount(data.filter((n: any) => !n.read).length)
      }
    } catch (err) {
      console.error('Failed to fetch notifications')
    }
  }

  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 60000) // Polling every minute
    return () => clearInterval(interval)
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case 'TRAFFIC_ANOMALY': return <TrendingUp size={14} className="text-blue-500" />
      case 'CONVERSION_ALERT': return <AlertTriangle size={14} className="text-red-500" />
      case 'MARKET_SHIFT': return <Zap size={14} className="text-amber-500" />
      default: return <Info size={14} className="text-gray-500" />
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all group">
          <Bell size={20} className="group-hover:rotate-12 transition-transform" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-brand-red text-white text-[8px] font-black flex items-center justify-center rounded-full border-2 border-[#0A0A0A] shadow-lg">
              {unreadCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="bg-[#0A0A0A] border-l border-white/10 text-white w-full sm:max-w-md p-0">
        <SheetHeader className="p-8 border-b border-white/5">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-white text-xl font-black uppercase tracking-tighter italic">
              Autonomous <span className="text-brand-red">Alerts</span>
            </SheetTitle>
            <Badge variant="outline" className="border-white/10 text-white/40 font-black text-[8px] uppercase tracking-widest">
              Live Monitoring
            </Badge>
          </div>
        </SheetHeader>

        <div className="overflow-y-auto h-[calc(100vh-120px)] subtle-scrollbar">
          {notifications.length === 0 ? (
            <div className="p-20 text-center space-y-4">
              <Bell size={40} className="mx-auto text-white/5" />
              <p className="text-[10px] font-black uppercase tracking-widest text-white/20">No active alerts</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {notifications.map((n) => (
                <div key={n.id} className={cn(
                  "p-6 hover:bg-white/[0.02] transition-colors group cursor-pointer relative",
                  !n.read && "bg-white/[0.01]"
                )}>
                  {!n.read && (
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-brand-red" />
                  )}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      {getIcon(n.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-black uppercase tracking-widest truncate pr-4">
                          {n.title}
                        </h4>
                        <span className="text-[8px] font-bold text-white/20 uppercase whitespace-nowrap">
                          Just Now
                        </span>
                      </div>
                      <p className="text-[11px] text-white/50 leading-relaxed font-medium">
                        {n.message}
                      </p>
                      <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-[9px] font-black uppercase tracking-widest text-brand-red hover:underline flex items-center gap-1">
                          Investigate <ChevronRight size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
