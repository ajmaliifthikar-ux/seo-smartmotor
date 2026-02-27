import { RecentActivityLive } from '@/components/admin/recent-activity-live'
import { formatPrice, cn } from '@/lib/utils'
import { getHeatmapData, getTrafficTrends, getBookingIntelligence } from '@/lib/analytics'
import { getCustomerCount, getActiveBookingCount } from '@/lib/firebase-db'
import { UAEHeatmap } from '@/components/admin/analytics/uae-heatmap'
import { GoogleBusinessWidget } from '@/components/admin/analytics/google-business-widget'
import { DashboardWidget } from '@/components/admin/dashboard/dashboard-widget'
import { StatCard } from '@/components/admin/dashboard/stat-card'
import { SystemStatusWidget } from '@/components/admin/dashboard/system-status-widget'
import { Search, TrendingUp, Palette, Calendar, MessageSquare, Users, Target, Activity } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
    // 1. Fetch Stats in parallel (Optimized)
    let userCount = 0
    let activeBookingsCount = 0
    let heatmapData: any[] = []
    let trafficTrends: any[] = []
    let intelligence: any = null
    let fetchError = false

    try {
        const [uCount, abCount, hmd, tt, intel] = await Promise.all([
            getCustomerCount(),
            getActiveBookingCount(),
            getHeatmapData(),
            getTrafficTrends(),
            getBookingIntelligence()
        ])
        
        userCount = uCount
        activeBookingsCount = abCount
        heatmapData = hmd || []
        trafficTrends = tt || []
        intelligence = intel
    } catch (error) {
        console.error('Failed to fetch dashboard stats:', error)
        fetchError = true
    }

    return (
        <div className="space-y-10 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-brand-dark uppercase italic">
                        Command <span className="text-brand-red">Center</span>
                    </h1>
                    <p className="mt-1 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                        Real-time Platform Intelligence
                    </p>
                </div>
                {fetchError && (
                    <div className="bg-amber-50 border border-amber-100 px-4 py-2 rounded-xl">
                        <p className="text-[10px] font-black uppercase text-amber-600 tracking-widest">Live Sync Restricted</p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Active Revenue"
                    value={formatPrice(intelligence?.totalRevenue || 0)}
                    trend="+23%"
                    trendUp
                    delay={0.1}
                />
                <StatCard
                    label="Active Bookings"
                    value={activeBookingsCount.toLocaleString()}
                    trend="+5%"
                    trendUp
                    delay={0.2}
                />
                <StatCard
                    label="Conv. Rate"
                    value={`${intelligence?.conversionRate || 0}%`}
                    trend="+1.2%"
                    trendUp
                    delay={0.3}
                />
                <StatCard
                    label="Customer Base"
                    value={userCount.toLocaleString()}
                    trend="+8%"
                    trendUp
                    delay={0.4}
                />
            </div>

            {/* ── Quick Actions ────────────────────────────────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                    { label: 'Market Research', icon: Search, href: '/admin/strategy-lab/market', color: 'bg-violet-500' },
                    { label: 'SEO Audit', icon: TrendingUp, href: '/admin/strategy-lab/seo', color: 'bg-sky-500' },
                    { label: 'Create Post', icon: Palette, href: '/admin/studio', color: 'bg-pink-500' },
                    { label: 'Schedule', icon: Calendar, href: '/admin/social-media/calendar-view', color: 'bg-amber-500' },
                    { label: 'AI Chat', icon: MessageSquare, href: '/admin/workbench', color: 'bg-emerald-500' },
                    { label: 'Team Roster', icon: Users, href: '/admin/basecamp/roster', color: 'bg-blue-500' },
                ].map((action, i) => (
                    <Link
                        key={action.label}
                        href={action.href}
                        className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-red/20 transition-all duration-300"
                    >
                        <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-white transition-transform group-hover:scale-110",
                            action.color
                        )}>
                            <action.icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-brand-dark transition-colors text-center">
                            {action.label}
                        </span>
                    </Link>
                ))}
            </div>

            {/* ── Intelligence Grid ────────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DashboardWidget 
                            title="Booking Funnel" 
                            subtitle="Success rate analysis"
                            headerAction={<Target size={14} className="text-brand-red" />}
                        >
                            <div className="space-y-4 pt-2">
                                {[
                                    { label: 'Confirmed', count: intelligence?.distribution.CONFIRMED || 0, color: 'bg-green-500' },
                                    { label: 'Completed', count: intelligence?.distribution.COMPLETED || 0, color: 'bg-blue-500' },
                                    { label: 'Pending', count: intelligence?.distribution.PENDING || 0, color: 'bg-amber-500' },
                                    { label: 'Cancelled', count: intelligence?.distribution.CANCELLED || 0, color: 'bg-red-500' }
                                ].map((item) => (
                                    <div key={item.label} className="space-y-1.5">
                                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                            <span className="text-gray-400">{item.label}</span>
                                            <span className="text-brand-dark">{item.count}</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden">
                                            <div 
                                                className={cn("h-full rounded-full transition-all duration-1000", item.color)}
                                                style={{ width: `${(item.count / (intelligence?.totalBookings || 1)) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </DashboardWidget>

                        <DashboardWidget 
                            title="Platform Load" 
                            subtitle="Staff & Resource Allocation"
                            headerAction={<Activity size={14} className="text-[#34D399]" />}
                        >
                            <div className="flex flex-col items-center justify-center py-4 space-y-4">
                                <div className="relative">
                                    <svg className="w-24 h-24 transform -rotate-90">
                                        <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-50" />
                                        <circle 
                                            cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="8" fill="transparent" 
                                            className="text-[#34D399]" 
                                            strokeDasharray={276}
                                            strokeDashoffset={276 * (1 - 0.65)}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-xl font-black text-brand-dark">65%</span>
                                        <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest">Optimized</span>
                                    </div>
                                </div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">Current Capacity Usage</p>
                            </div>
                        </DashboardWidget>
                    </div>

                    <DashboardWidget 
                        title="Traffic Projection" 
                        subtitle="User Engagement Trends"
                        delay={0.4}
                    >
                        <div className="h-64 flex items-end gap-3 px-4 pb-4">
                            {trafficTrends.map((trend, i) => (
                                <div key={trend.date} className="flex-1 flex flex-col items-center gap-2 group">
                                    <div
                                        className="w-full bg-brand-dark rounded-t-xl transition-all duration-700 group-hover:bg-brand-red group-hover:scale-y-[1.02] origin-bottom shadow-sm"
                                        style={{ 
                                            height: `${(trend.count / Math.max(...trafficTrends.map((t: { count: number }) => t.count), 1)) * 100}%`,
                                            transitionDelay: `${i * 50}ms`
                                        }}
                                    />
                                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">{trend.date.split('-')[2]}</span>
                                </div>
                            ))}
                            {trafficTrends.length === 0 && (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium italic text-sm">
                                    Initializing Tracking Data...
                                </div>
                            )}
                        </div>
                    </DashboardWidget>

                    <DashboardWidget 
                        title="Live Operations" 
                        subtitle="Geographic Distribution"
                        delay={0.5}
                        className="p-0"
                    >
                        <UAEHeatmap data={heatmapData} />
                    </DashboardWidget>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <SystemStatusWidget />
                    <GoogleBusinessWidget />
                </div>
            </div>

            <DashboardWidget 
                title="Recent Activity" 
                subtitle="Live Booking Stream"
                delay={0.6}
            >
                <RecentActivityLive />
            </DashboardWidget>
        </div>
    )
}
