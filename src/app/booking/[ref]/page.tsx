import { Metadata } from 'next'
import { Navbar } from '@/components/v2/layout/navbar'
import { Footer } from '@/components/v2/layout/footer'
import { getBookingByRef } from '@/lib/db/bookings'
import { notFound } from 'next/navigation'
import { ManageBookingClient } from './client'

export const metadata: Metadata = {
    title: 'Manage Booking | Smart Motor',
}

export default async function ManageBookingPage({ params }: { params: Promise<{ ref: string }> }) {
    const { ref } = await params
    const booking = await getBookingByRef(ref)

    if (!booking) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-brand-dark">
            <Navbar />
            <div className="pb-24 relative overflow-hidden">
                <div className="absolute inset-0 micro-noise opacity-10 pointer-events-none" />
                <div className="max-w-3xl mx-auto px-6 relative z-10">
                    <ManageBookingClient booking={booking} />
                </div>
            </div>
            <Footer />
        </main>
    )
}
