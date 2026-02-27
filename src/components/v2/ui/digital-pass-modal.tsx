'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, ShieldCheck, Info } from 'lucide-react'
import QRCode from 'react-qr-code'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

interface DigitalPassModalProps {
    isOpen: boolean
    onClose: () => void
    booking: {
        bookingRef: string
        fullName: string
        vehicle: string
        date: string
        time: string
        services: string[]
    }
}

export function DigitalPassModal({ isOpen, onClose, booking }: DigitalPassModalProps) {
    if (!isOpen) return null

    const [isLoadingGoogle, setIsLoadingGoogle] = useState(false)

    const handleAppleWallet = async () => {
        toast.info('Apple Wallet Integration', {
            description: 'Requires Apple Developer certificates (.p12). The backend scaffolding is ready.',
            duration: 5000,
        })
    }

    const handleGoogleWallet = async () => {
        try {
            setIsLoadingGoogle(true)
            toast.loading('Generating Google Wallet Pass...', { id: 'google-wallet' })
            
            const response = await fetch('/api/wallet/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(booking),
            })

            if (!response.ok) throw new Error('Failed to generate pass')
            
            const data = await response.json()
            toast.success('Pass ready!', { id: 'google-wallet' })
            
            // Open the save link in a new window/tab
            window.open(data.passUrl, '_blank')
        } catch (error) {
            toast.error('Could not generate pass', { id: 'google-wallet' })
            console.error(error)
        } finally {
            setIsLoadingGoogle(false)
        }
    }

    const handleDownloadImage = () => {
        toast.success('Pass downloaded to your device.')
        // In a real scenario, we'd use html-to-image here
    }

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md" 
                />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-[400px] z-10 flex flex-col gap-6"
                >
                    {/* Close Button */}
                    <button 
                        onClick={onClose}
                        className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {/* The Pass Itself (Apple Wallet Style) */}
                    <div className="w-full bg-[#1c1c1e] rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 relative">
                        {/* Header Strip */}
                        <div className="relative h-32 bg-brand-red overflow-hidden flex flex-col justify-between p-6">
                            <div className="absolute inset-0 carbon-fiber opacity-50 mix-blend-multiply" />
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
                            
                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="text-white w-6 h-6" />
                                    <span className="text-white font-black uppercase tracking-widest text-xs">Smart Motor</span>
                                </div>
                                <span className="text-white/80 font-bold text-xs uppercase tracking-wider">Service Pass</span>
                            </div>

                            <div className="relative z-10 flex items-end justify-between mt-auto">
                                <div>
                                    <p className="text-white/80 text-[10px] uppercase tracking-widest font-bold mb-1">Vehicle</p>
                                    <p className="text-white font-black uppercase tracking-wider text-sm">{booking.vehicle}</p>
                                </div>
                            </div>
                        </div>

                        {/* Body Details */}
                        <div className="p-6 space-y-6 bg-gradient-to-b from-[#1c1c1e] to-brand-dark">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-1">Date</p>
                                    <p className="text-white font-bold text-sm">{booking.date}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-1">Time</p>
                                    <p className="text-white font-bold text-sm">{booking.time}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-1">Services Requested</p>
                                <p className="text-white font-bold text-sm leading-snug">
                                    {booking.services.join(' • ')}
                                </p>
                            </div>

                            <div className="pt-6 border-t border-dashed border-white/10 flex flex-col items-center justify-center">
                                <div className="bg-white p-4 rounded-2xl mb-4 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                    <QRCode value={`SMARTMOTOR:${booking.bookingRef}`} size={180} level="H" />
                                </div>
                                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-1">Booking Reference</p>
                                <p className="text-white font-mono font-black text-xl tracking-[0.2em]">{booking.bookingRef}</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                        <button 
                            onClick={handleAppleWallet}
                            aria-label="Add to Apple Wallet"
                            className="w-full h-14 bg-black border border-white/20 hover:border-white/40 rounded-2xl flex items-center justify-center gap-3 transition-all group focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 focus:ring-offset-[#1c1c1e] active:scale-[0.98]"
                        >
                            {/* Simple Apple SVG */}
                            <svg className="w-5 h-5 text-white" viewBox="0 0 384 512" fill="currentColor">
                                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                            </svg>
                            <span className="text-white font-black text-xs uppercase tracking-widest">Add to Apple Wallet</span>
                        </button>
                        
                        <button 
                            onClick={handleGoogleWallet}
                            disabled={isLoadingGoogle}
                            aria-label="Add to Google Wallet"
                            title="Add your booking pass to Google Wallet"
                            className={`w-full h-14 bg-black border border-white/20 hover:border-white/40 rounded-2xl flex items-center justify-center gap-3 transition-all focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 focus:ring-offset-[#1c1c1e] ${isLoadingGoogle ? 'opacity-50 cursor-not-allowed' : 'active:scale-[0.98]'}`}
                        >
                            {isLoadingGoogle ? (
                                <span className="text-white font-black text-xs uppercase tracking-widest">Generating...</span>
                            ) : (
                                <>
                                    {/* Google Wallet Icon */}
                                    <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="white"/>
                                        <path d="M29.5 15.5H10.5V24.5C10.5 25.0523 10.9477 25.5 11.5 25.5H28.5C29.0523 25.5 29.5 25.0523 29.5 24.5V15.5Z" fill="#4285F4"/>
                                        <path d="M29.5 15.5H10.5V13.5C10.5 12.9477 10.9477 12.5 11.5 12.5H28.5C29.0523 12.5 29.5 12.9477 29.5 13.5V15.5Z" fill="#34A853"/>
                                        <path d="M10.5 15.5L20 20.5L29.5 15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span className="text-white font-black text-xs uppercase tracking-widest">Add to Google Wallet</span>
                                </>
                            )}
                        </button>

                        <p className="text-center text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
                            <Info size={12} />
                            Wallet APIs require Developer certificates in production.
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
