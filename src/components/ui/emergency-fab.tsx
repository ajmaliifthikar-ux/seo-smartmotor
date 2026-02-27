'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Sparkles, X, Mic, ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AIChatPanel } from './ai-chat-panel'
import { Tooltip } from '@/components/ui/tooltip'
import Link from 'next/link'

export function EmergencyFAB() {
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [showScrollTop, setShowScrollTop] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleChat = () => setIsChatOpen(!isChatOpen)

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    interface FABItem {
        id: string
        icon: React.ReactNode
        label: string
        color: string
        textColor: string
        borderColor?: string
        onClick?: () => void
        href?: string
        delay: number
        main?: boolean
    }

    // Main 3 FAB Items as requested
    const fabs: FABItem[] = [
        {
            id: 'whatsapp',
            icon: <MessageCircle size={18} />,
            label: 'WhatsApp',
            color: 'bg-[#25D366]',
            textColor: 'text-white',
            onClick: () => {
                // GA4 Tracking
                if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'whatsapp_click', {
                        event_category: 'engagement',
                        event_label: 'whatsapp_chat',
                        value: 1
                    })
                }
                window.open('https://wa.me/971525555443?text=Hi%20Smart%20Motor%2C%20I%20would%20like%20to%20inquire%20about%20car%20service', '_blank')
            },
            delay: 0.1
        },
        {
            id: 'voice',
            icon: <Mic size={18} />,
            label: 'Voice Assistant',
            color: 'bg-brand-red',
            textColor: 'text-white',
            href: '/leyla',
            delay: 0.2
        },
        {
            id: 'chat',
            icon: <Sparkles size={18} />,
            label: 'AI Chat',
            color: 'bg-brand-dark',
            textColor: 'text-[#FFD700]',
            borderColor: 'border-[#FFD700]/20',
            onClick: toggleChat,
            delay: 0.3,
            main: true
        }
    ]

    return (
        <>
            {/* Main Floating Container */}
            <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 items-end pointer-events-none">

                {/* Secondary: Scroll to Top (Separated from main 3) */}
                <AnimatePresence>
                    {showScrollTop && (
                        <motion.button
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                            onClick={scrollToTop}
                            className="pointer-events-auto w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 flex items-center justify-center text-brand-dark shadow-lg hover:bg-brand-dark hover:text-white transition-all"
                        >
                            <ArrowUp size={18} />
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Main 3 Buttons */}
                {fabs.map((fab) => (
                    <motion.div
                        key={fab.id}
                        initial={{ opacity: 0, x: 20, scale: 0.5 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: fab.delay, type: 'spring', stiffness: 300, damping: 20 }}
                        className="pointer-events-auto group relative flex items-center gap-3"
                    >
                        <Tooltip content={fab.label} position="left">
                            {fab.href ? (
                                <Link
                                    href={fab.href}
                                    className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center shadow-2xl ring-2 ring-white/20 transition-all duration-300 hover:scale-110 active:scale-95 relative overflow-hidden",
                                        fab.color,
                                        fab.textColor,
                                        fab.borderColor && `border ${fab.borderColor}`
                                    )}
                                >
                                    <div className="relative z-10">{fab.icon}</div>
                                </Link>
                            ) : (
                                <button
                                    onClick={fab.onClick}
                                    className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center shadow-2xl ring-2 ring-white/20 transition-all duration-300 hover:scale-110 active:scale-95 relative overflow-hidden",
                                        fab.color,
                                        fab.textColor,
                                        fab.borderColor && `border ${fab.borderColor}`,
                                        fab.main && "z-10"
                                    )}
                                >
                                    <div className="relative z-10">
                                        {fab.id === 'chat' && isChatOpen ? <X size={18} /> : fab.icon}
                                    </div>

                                    {/* Shine Effect for main button */}
                                    {fab.main && (
                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}
                                </button>
                            )}
                        </Tooltip>
                    </motion.div>
                ))}
            </div>

            {/* AI Chat Panel */}
            <AIChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} initialVoiceMode={true} />
        </>
    )
}
