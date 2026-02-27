'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval 
} from 'date-fns'
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter,
  Image as ImageIcon,
  MoreVertical,
  Clock,
  CheckCircle2,
  Calendar as CalendarIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ScheduledPost {
  id: string
  title: string
  content: string
  platform: 'instagram' | 'facebook' | 'linkedin' | 'twitter'
  status: 'scheduled' | 'published' | 'draft'
  date: Date
  image?: string
}

const MOCK_POSTS: ScheduledPost[] = [
  {
    id: '1',
    title: 'Ceramic Coating Showcase',
    content: 'Experience the ultimate protection for your luxury vehicle. Our ceramic coating services in Abu Dhabi provide unmatched gloss and heat resistance. 🚗✨',
    platform: 'instagram',
    status: 'scheduled',
    date: addDays(new Date(), 2),
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Summer AC Service Promo',
    content: `Don't let the heat get to you! Get a full AC system check for just AED 199. Limited time offer! ❄️`,
    platform: 'facebook',
    status: 'scheduled',
    date: addDays(new Date(), 4),
    image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Technical Precision: Porsche Brakes',
    content: 'Detailed look at our technical approach to maintaining high-performance braking systems for modern Porsches.',
    platform: 'linkedin',
    status: 'published',
    date: subMonths(new Date(), 0),
  }
]

export function PlanningCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null)

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate
  })

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

  const getPostsForDay = (day: Date) => {
    return MOCK_POSTS.filter(post => isSameDay(post.date, day))
  }

  const PLATFORM_ICONS = {
    instagram: Instagram,
    facebook: Facebook,
    linkedin: Linkedin,
    twitter: Twitter
  }

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-200px)]">
      {/* Header */}
      <div className="p-8 border-b border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-black uppercase tracking-tighter italic">
            {format(currentDate, 'MMMM')} <span className="text-brand-red text-sm not-italic ml-2">{format(currentDate, 'yyyy')}</span>
          </h2>
          <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
            <Button variant="ghost" onClick={prevMonth} className="h-8 w-8 p-0 rounded-lg hover:bg-white hover:shadow-sm">
              <ChevronLeft size={16} />
            </Button>
            <Button variant="ghost" onClick={() => setCurrentDate(new Date())} className="text-[10px] font-black uppercase px-3 h-8 rounded-lg hover:bg-white hover:shadow-sm">
              Today
            </Button>
            <Button variant="ghost" onClick={nextMonth} className="h-8 w-8 p-0 rounded-lg hover:bg-white hover:shadow-sm">
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>

        <Button className="rounded-full bg-brand-dark text-white text-[10px] font-black uppercase tracking-widest px-8 hover:bg-brand-red shadow-xl hover:scale-105 active:scale-95 transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] active:scale-95 transition-all">
          <Plus size={14} className="mr-2" />
          Schedule Post
        </Button>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 border-b border-gray-50">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="py-4 text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{day}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 grid grid-cols-7 auto-rows-fr overflow-y-auto subtle-scrollbar">
        {calendarDays.map((day, idx) => {
          const posts = getPostsForDay(day)
          const isCurrentMonth = isSameMonth(day, monthStart)
          const isToday = isSameDay(day, new Date())

          return (
            <div 
              key={day.toString()}
              onClick={() => setSelectedDay(day)}
              className={cn(
                "min-h-[140px] border-r border-b border-gray-50 p-3 transition-all cursor-pointer group hover:bg-gray-50/50",
                !isCurrentMonth && "bg-gray-50/30",
                idx % 7 === 6 && "border-r-0"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={cn(
                  "text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full transition-all",
                  isToday ? "bg-brand-red text-white shadow-lg" : "text-gray-400 group-hover:text-gray-900",
                  !isCurrentMonth && "opacity-30"
                )}>
                  {format(day, 'd')}
                </span>
                {posts.length > 0 && (
                  <div className="flex -space-x-1">
                    {posts.map(post => {
                      const Icon = PLATFORM_ICONS[post.platform]
                      return <Icon key={post.id} size={10} className="text-gray-300" />
                    })}
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                {posts.map(post => (
                  <div 
                    key={post.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedPost(post)
                    }}
                    className={cn(
                      "p-1.5 rounded-lg border text-[8px] font-bold uppercase tracking-tight flex items-center gap-2 truncate transition-all hover:scale-[1.02] hover:shadow-md",
                      post.status === 'published' 
                        ? "bg-green-50 text-green-700 border-green-100" 
                        : "bg-blue-50 text-blue-700 border-blue-100"
                    )}
                  >
                    <div className="w-1 h-1 rounded-full bg-current" />
                    {post.title}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="max-w-2xl rounded-[3rem] p-0 border-none bg-transparent shadow-none">
          <AnimatePresence>
            {selectedPost && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100"
              >
                <div className="relative h-64 bg-gray-900">
                  {selectedPost.image ? (
                    <img 
                      src={selectedPost.image} 
                      alt={selectedPost.title} 
                      className="w-full h-full object-cover opacity-80"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                      <ImageIcon className="text-white/10 w-20 h-20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                  
                  <div className="absolute top-6 left-6 flex items-center gap-3">
                    <Badge className={cn(
                      "rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-widest border-none",
                      selectedPost.status === 'published' ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                    )}>
                      {selectedPost.status}
                    </Badge>
                    <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                      {React.createElement(PLATFORM_ICONS[selectedPost.platform], { size: 12, className: "text-white" })}
                      <span className="text-[9px] font-black uppercase text-white tracking-widest">
                        {selectedPost.platform}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-10 space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black uppercase tracking-tight italic">
                        {selectedPost.title}
                      </h3>
                      <div className="flex items-center gap-4 text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <CalendarIcon size={12} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{format(selectedPost.date, 'MMMM d, yyyy')}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">18:45 GST</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" className="h-10 w-10 p-0 rounded-full hover:bg-gray-50">
                      <MoreVertical size={18} />
                    </Button>
                  </div>

                  <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100">
                    <p className="text-sm leading-relaxed font-medium text-gray-600 italic">
                      "{selectedPost.content}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <Button className="flex-1 h-14 rounded-2xl bg-brand-dark text-white text-[10px] font-black uppercase tracking-widest hover:bg-brand-red transition-all">
                      Edit Content
                    </Button>
                    <Button variant="outline" className="flex-1 h-14 rounded-2xl border-gray-200 text-brand-dark text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
                      Reschedule
                    </Button>
                    <Button variant="ghost" className="h-14 w-14 rounded-2xl bg-green-50 text-green-600 hover:bg-green-100 transition-all flex items-center justify-center">
                      <CheckCircle2 size={24} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  )
}
