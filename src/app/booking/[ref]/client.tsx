'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Car, Clock, ShieldCheck, User, Wrench, XCircle, AlertCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { updateBookingStatus } from '@/app/actions/manage-booking'
import QRCode from 'react-qr-code'
import { toast } from 'sonner'
import Link from 'next/link'
import { DigitalPassModal } from '@/components/v2/ui/digital-pass-modal'

export function ManageBookingClient({ booking }: { booking: any }) {
    const [isCancelling, setIsCancelling] = useState(false)
    const [status, setStatus] = useState(booking.status)
    const [showPassModal, setShowPassModal] = useState(false)

    const bookingDate = new Date(`${booking.date}T${booking.time}`)
    const now = new Date()
    const hoursDifference = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60)
    const canModify = hoursDifference > 12 && status !== 'CANCELLED'

    const handleCancel = async () => {
        if (!canModify) return
        
        setIsCancelling(true)
        try {
            const result = await updateBookingStatus(booking.bookingRef, 'CANCELLED')
            if (result.success) {
                setStatus('CANCELLED')
                toast.success('Your booking has been cancelled.')
            } else {
                toast.error(result.message || 'Failed to cancel booking.')
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.')
        } finally {
            setIsCancelling(false)
        }
    }

    return (
        <div className="space-y-8">
            <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">
                <ArrowLeft size={16} className="mr-2" /> Back to Home
            </Link>

            <div className="bg-[#1a1a1a] rounded-[2rem] border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden">
                {/* Status Banner */}
                {status === 'CANCELLED' && (
                    <div className="absolute top-0 inset-x-0 bg-red-500/20 text-red-500 py-3 text-center text-xs font-black uppercase tracking-widest border-b border-red-500/30 backdrop-blur-md">
                        This booking has been cancelled
                    </div>
                )}
                
                <div className="text-center mb-12 mt-4">
                    <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Booking Details</span>
                    <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic">
                        {booking.bookingRef}
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* QR Code Section */}
                    <div className="flex flex-col items-center justify-center bg-brand-dark rounded-3xl border border-white/5 p-8">
                        <div className={`p-4 rounded-xl bg-white mb-6 ${status === 'CANCELLED' ? 'opacity-30 grayscale' : ''}`}>
                            <QRCode value={`SMARTMOTOR:${booking.bookingRef}`} size={160} />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 text-center mb-4">
                            Scan this pass upon arrival
                        </p>
                        
                        {status !== 'CANCELLED' && (
                            <Button 
                                onClick={() => setShowPassModal(true)}
                                className="w-full max-w-[200px] h-12 bg-white text-black hover:bg-gray-200 rounded-2xl font-black uppercase tracking-widest text-[10px]"
                            >
                                Add to Wallet
                            </Button>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-white font-black uppercase tracking-widest text-xs border-b border-white/10 pb-2">Client Details</h3>
                            <div className="flex items-start gap-3">
                                <User className="text-brand-red w-5 h-5 mt-0.5" />
                                <div>
                                    <p className="text-white font-bold">{booking.fullName}</p>
                                    <p className="text-sm text-gray-400">{booking.email}</p>
                                    <p className="text-sm text-gray-400">{booking.phone}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-white font-black uppercase tracking-widest text-xs border-b border-white/10 pb-2">Vehicle & Schedule</h3>
                            <div className="flex items-start gap-3">
                                <Car className="text-brand-red w-5 h-5 mt-0.5" />
                                <p className="text-white font-bold uppercase tracking-wider">{booking.year} {booking.brand} {booking.model}</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <Calendar className="text-brand-red w-5 h-5 mt-0.5" />
                                <p className="text-white font-bold">{booking.date}</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock className="text-brand-red w-5 h-5 mt-0.5" />
                                <p className="text-white font-bold">{booking.time}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-white font-black uppercase tracking-widest text-xs border-b border-white/10 pb-2">Requested Services</h3>
                            <ul className="space-y-2">
                                {booking.services.map((service: string) => (
                                    <li key={service} className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Management Actions */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <h3 className="text-white font-black uppercase tracking-widest text-xs mb-6 text-center">Manage Your Booking</h3>
                    
                    {!canModify && status !== 'CANCELLED' ? (
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4">
                            <AlertCircle className="text-yellow-500 w-6 h-6 flex-shrink-0" />
                            <p className="text-sm text-gray-400 leading-relaxed">
                                You are within 12 hours of your scheduled appointment time. To reschedule or cancel this booking, please contact our service center directly at <a href="tel:80076278" className="text-white font-bold hover:text-brand-red">800 76278</a>.
                            </p>
                        </div>
                    ) : status !== 'CANCELLED' ? (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button 
                                variant="outline" 
                                className="bg-transparent border-white/10 text-white hover:bg-white/5 h-14 rounded-2xl px-8 font-black uppercase tracking-widest text-[10px]"
                                onClick={() => window.location.href = `tel:80076278`}
                            >
                                Contact Support to Reschedule
                            </Button>
                            
                            <Button 
                                variant="danger" 
                                className="bg-transparent border-red-500/30 text-red-500 hover:bg-red-500/10 h-14 rounded-2xl px-8 font-black uppercase tracking-widest text-[10px]"
                                onClick={handleCancel}
                                disabled={isCancelling}
                            >
                                {isCancelling ? 'Cancelling...' : 'Cancel Booking'}
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
            
            <DigitalPassModal 
                isOpen={showPassModal} 
                onClose={() => setShowPassModal(false)}
                booking={{
                    bookingRef: booking.bookingRef,
                    fullName: booking.fullName,
                    vehicle: `${booking.year} ${booking.brand} ${booking.model}`,
                    date: booking.date,
                    time: booking.time,
                    services: booking.services
                }}
            />
        </div>
    )
}
