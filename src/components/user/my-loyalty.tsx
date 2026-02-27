'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/user';
import { Loader2, Award, Gem, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function MyLoyalty() {
  const [loyaltyData, setLoyaltyData] = useState<{ points: number; tier: UserProfile['tier'] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLoyaltyData() {
      try {
        const response = await fetch('/api/user/loyalty');
        if (!response.ok) {
          throw new Error('Failed to fetch loyalty data');
        }
        const data = await response.json();
        setLoyaltyData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLoyaltyData();
  }, []);

  const getTierColor = (tier: UserProfile['tier']) => {
    switch (tier) {
      case 'bronze': return 'text-amber-700';
      case 'silver': return 'text-slate-400';
      case 'gold': return 'text-yellow-500';
      case 'platinum': return 'text-blue-400';
      default: return 'text-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-10 border border-black/5 shadow-xl flex flex-col items-center justify-center min-h-[200px]">
        <Loader2 className="h-10 w-10 animate-spin text-brand-red mb-4" />
        <span className="text-xs font-black uppercase tracking-widest text-gray-400">Loading Status...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-3xl p-10 border border-brand-red/20 shadow-xl text-center">
        <p className="text-brand-red font-bold uppercase text-xs tracking-widest mb-2">Sync Error</p>
        <p className="text-gray-600 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div 
      className="group relative bg-brand-dark carbon-fiber rounded-3xl p-8 border border-white/10 shadow-2xl overflow-hidden min-h-[300px] flex flex-col justify-between"
    >
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-brand-red/20 transition-colors duration-700" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -ml-24 -mb-24" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-brand-red font-black text-[8px] uppercase tracking-[0.4em] mb-1">Membership</p>
            <h2 className="text-white font-black text-xl uppercase tracking-tighter italic">Elite Rewards</h2>
          </div>
          <Award className="w-8 h-8 text-brand-red animate-pulse" />
        </div>

        {loyaltyData ? (
          <div className="space-y-6">
            <div>
              <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Available Points</p>
              <p className="text-5xl font-black text-white tracking-tighter italic">
                {loyaltyData.points} <span className="text-xs text-brand-red uppercase tracking-widest not-italic ml-1">Pts</span>
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                <Gem className={cn("w-6 h-6", getTierColor(loyaltyData.tier))} />
              </div>
              <div>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Current Tier</p>
                <p className={cn("text-xl font-black uppercase italic tracking-tight", getTierColor(loyaltyData.tier))}>
                  {loyaltyData.tier} Status
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-10 text-center">
            <p className="text-white/40 font-bold uppercase text-xs tracking-widest">No membership data available</p>
          </div>
        )}
      </div>

      <div className="relative z-10 mt-8">
        <p className="text-white/30 text-[9px] font-medium leading-relaxed max-w-[200px]">
          Points are earned on every service and can be redeemed for premium upgrades.
        </p>
      </div>
    </div>
  );
}
