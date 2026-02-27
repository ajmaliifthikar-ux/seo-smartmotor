'use client';

import { useState, useEffect } from 'react';
import { Booking } from '@/types/booking'; // We'll define this type next
import { Loader2, Calendar, Car, Wrench, Clock, Hash, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';

export function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch('/api/user/bookings');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data: Booking[] = await response.json();
        setBookings(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBookings();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-10 border border-black/5 shadow-xl flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="h-10 w-10 animate-spin text-brand-red mb-4" />
        <span className="text-xs font-black uppercase tracking-widest text-gray-400">Syncing Bookings...</span>
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
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-black uppercase tracking-tighter italic text-brand-dark">Active Bookings</h2>
        <span className="bg-brand-dark text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
          {bookings.length}
        </span>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-dashed border-gray-200 text-center">
          <Calendar className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">No active service appointments</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookings.map((booking) => (
            <div 
              key={booking.id} 
              className="group relative bg-white rounded-2xl p-6 border border-black/5 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Accents */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-red/10 transition-colors" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center text-white">
                      <Hash size={14} />
                    </div>
                    <span className="font-black text-sm text-brand-dark uppercase tracking-tighter">{booking.bookingRef}</span>
                  </div>
                  <span className={cn(
                    "text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border",
                    booking.status === 'CONFIRMED' ? "bg-green-50 text-green-600 border-green-100" : "bg-brand-red/5 text-brand-red border-brand-red/10"
                  )}>
                    {booking.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-brand-red" />
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Appointment</p>
                      <p className="text-xs font-bold text-brand-dark">{format(parseISO(booking.date), 'PPP')} @ {booking.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Car className="w-4 h-4 text-brand-red" />
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Vehicle</p>
                      <p className="text-xs font-bold text-brand-dark uppercase italic">{booking.vehicle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Wrench className="w-4 h-4 text-brand-red" />
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Services</p>
                      <p className="text-xs font-bold text-brand-dark">{booking.services.join(' • ')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
