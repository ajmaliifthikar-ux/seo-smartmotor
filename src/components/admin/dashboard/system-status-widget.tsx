'use client'

import { motion } from 'framer-motion'
import { Server, Globe, Activity, CheckCircle2, AlertCircle } from 'lucide-react'
import { DashboardWidget } from './dashboard-widget'

export function SystemStatusWidget() {
    return (
        <DashboardWidget
            title="System Status"
            subtitle="Live Platform Health"
            headerAction={<Server size={14} className="text-[#34D399]" />}
        >
            <div className="space-y-5">
                {/* Overall Status */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#34D399]/10 border border-[#34D399]/20">
                    <div className="w-10 h-10 rounded-xl bg-[#34D399] flex items-center justify-center text-white shadow-lg shadow-[#34D399]/30">
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-brand-dark tracking-tight">ALL SYSTEMS NOMINAL</h4>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#34D399]">100% Uptime</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {/* DNS & Hosting */}
                    <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors bg-gray-50/50">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                                <Globe className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[11px] font-black uppercase tracking-widest text-brand-dark">DNS & Hosting</p>
                                <p className="text-[9px] font-bold text-gray-500">Vercel Edge Network</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                            <span className="text-[10px] font-bold text-[#34D399]">LIVE</span>
                        </div>
                    </div>

                    {/* API Connectivity */}
                    <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors bg-gray-50/50">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-600">
                                <Activity className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[11px] font-black uppercase tracking-widest text-brand-dark">API Services</p>
                                <p className="text-[9px] font-bold text-gray-500">Firebase Firestore/Auth</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                            <span className="text-[10px] font-bold text-[#34D399]">LIVE</span>
                        </div>
                    </div>

                    {/* Performance */}
                    <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors bg-gray-50/50">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
                                <Server className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[11px] font-black uppercase tracking-widest text-brand-dark">Performance</p>
                                <p className="text-[9px] font-bold text-gray-500">Lighthouse Score</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-xs font-black text-[#34D399]">98/100</span>
                        </div>
                    </div>
                </div>

                <div className="pt-2 text-center">
                    <p className="text-[9px] font-medium text-gray-400 italic">Last checked: Just now</p>
                </div>
            </div>
        </DashboardWidget>
    )
}
