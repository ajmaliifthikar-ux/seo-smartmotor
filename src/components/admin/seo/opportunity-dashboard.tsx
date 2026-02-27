'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Zap, Check, X, Loader2, ArrowUpRight, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface Opportunity {
  id: string
  title: string
  description: string
  impact: 'High' | 'Medium' | 'Low'
  type: 'Technical' | 'Content' | 'Meta'
  action: string
  status: 'pending' | 'executing' | 'completed'
}

export function OpportunityDashboard() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: 'opt-1',
      title: 'Optimize Hero Meta Tags',
      description: 'The current meta description for the home page is missing core keywords: "Abu Dhabi", "Luxury Car Repair".',
      impact: 'High',
      type: 'Meta',
      action: 'Update home page meta tags',
      status: 'pending'
    },
    {
      id: 'opt-2',
      title: 'Fix 404 Redirects',
      description: 'Detected 3 broken internal links pointing to old service pages.',
      impact: 'Medium',
      type: 'Technical',
      action: 'Apply 301 redirects to /services',
      status: 'pending'
    }
  ])

  const handleApprove = async (id: string) => {
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, status: 'executing' } : o))
    
    // Simulate execution logic
    setTimeout(() => {
      setOpportunities(prev => prev.map(o => o.id === id ? { ...o, status: 'completed' } : o))
      toast.success('Optimization deployed successfully', {
        description: 'Changes have been committed to Firestore.'
      })
    }, 2000)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-brand-dark tracking-tighter uppercase italic flex items-center gap-3">
            <Zap className="text-brand-red" fill="#E62329" size={20} />
            Autonomous <span className="silver-shine">Opportunities</span>
          </h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">One-click deployment of AI-generated site optimizations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {opportunities.map((opt) => (
          <Card key={opt.id} className={cn(
            "p-8 rounded-[2.5rem] border border-gray-100 shadow-sm transition-all duration-500 overflow-hidden relative",
            opt.status === 'completed' && "bg-gray-50/50 opacity-80"
          )}>
            <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
              <ShieldCheck size={120} />
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border",
                    opt.impact === 'High' ? "bg-red-50 text-red-600 border-red-100" : "bg-blue-50 text-blue-600 border-blue-100"
                  )}>
                    {opt.impact} Impact
                  </span>
                  <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">
                    Type: {opt.type}
                  </span>
                </div>
                <h3 className="text-lg font-black text-brand-dark uppercase tracking-tighter">{opt.title}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-2xl">{opt.description}</p>
              </div>

              <div className="flex items-center gap-4">
                {opt.status === 'pending' ? (
                  <>
                    <Button variant="ghost" className="h-14 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Dismiss
                    </Button>
                    <Button 
                      onClick={() => handleApprove(opt.id)}
                      className="h-14 px-10 bg-brand-dark text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-red transition-all shadow-xl flex items-center gap-3"
                    >
                      Approve & Execute
                      <ArrowUpRight size={14} />
                    </Button>
                  </>
                ) : opt.status === 'executing' ? (
                  <div className="flex items-center gap-3 text-brand-red font-black text-[10px] uppercase tracking-widest px-8">
                    <Loader2 className="animate-spin" size={16} />
                    Deploying...
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-emerald-600 font-black text-[10px] uppercase tracking-widest px-8">
                    <Check size={16} />
                    Active on Site
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
