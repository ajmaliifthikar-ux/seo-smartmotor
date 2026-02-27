import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/v2/layout/navbar'
import { Footer } from '@/components/v2/layout/footer'
import { BUSINESS } from '@/lib/constants'
import { ChevronRight, MapPin, Phone, Star, ShieldCheck, Clock, Zap, Wrench } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
    return BUSINESS.serviceAreas.map((area) => ({
        slug: area.slug,
    }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const area = BUSINESS.serviceAreas.find((a) => a.slug === slug)
    if (!area) return {}

    return {
        title: `${area.title} | Smart Motor Auto Repair Abu Dhabi`,
        description: area.description,
        keywords: area.keywords.join(', '),
        alternates: { canonical: `https://smartmotor.ae/location/${slug}` },
        openGraph: {
            title: `${area.title} | Smart Motor Abu Dhabi`,
            description: area.description,
            url: `https://smartmotor.ae/location/${slug}`,
        },
    }
}

export default async function LocationPage({ params }: Props) {
    const { slug } = await params
    const area = BUSINESS.serviceAreas.find((a) => a.slug === slug)
    if (!area) notFound()

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'AutomotiveBusiness',
        name: `${BUSINESS.name} - ${area.name} Branch`,
        description: area.description,
        url: `https://smartmotor.ae/location/${slug}`,
        telephone: BUSINESS.phone,
        address: {
            '@type': 'PostalAddress',
            streetAddress: BUSINESS.addressStreet,
            addressLocality: BUSINESS.addressCity,
            addressRegion: 'Abu Dhabi',
            addressCountry: 'AE',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: BUSINESS.geo.latitude,
            longitude: BUSINESS.geo.longitude,
        },
        areaServed: {
            '@type': 'City',
            name: area.name,
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: BUSINESS.stats.rating,
            reviewCount: BUSINESS.stats.reviewCount,
        },
    }

    return (
        <main className="min-h-screen bg-brand-bg">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 overflow-hidden bg-brand-dark text-white">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-red/10 blur-[150px] rounded-full" />
                    <div className="absolute inset-0 micro-noise opacity-10" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">
                            Serving Your Neighborhood
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.9] mb-8">
                            {area.name} <span className="silver-shine">Expert Car Care</span>
                        </h1>
                        <p className="text-xl text-white/70 font-medium leading-relaxed mb-10">
                            {area.description} Smart Motor brings factory-quality European car repair and maintenance to your doorstep in {area.name}.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/#booking"
                                className="inline-flex items-center gap-2 bg-brand-red text-white rounded-full px-10 py-5 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 shadow-2xl"
                            >
                                Book {area.name} Service
                                <ChevronRight size={14} />
                            </Link>
                            <a
                                href={`tel:${BUSINESS.phoneTel}`}
                                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white rounded-full px-10 py-5 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all duration-500"
                            >
                                <Phone size={14} />
                                {BUSINESS.phone}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features/USP Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: Clock, title: 'Quick Turnaround', desc: `Optimized scheduling for ${area.name} residents to ensure your car is back on the road fast.` },
                            { icon: ShieldCheck, title: '12-Month Warranty', desc: 'All parts and labour backed by our comprehensive warranty for your absolute peace of mind.' },
                            { icon: MapPin, title: 'Musaffah Hub', desc: 'Located conveniently at M9, Musaffah — the central hub for professional car service in Abu Dhabi.' },
                        ].map((item, i) => (
                            <div key={i} className="space-y-6">
                                <div className="w-14 h-14 bg-brand-red/10 rounded-2xl flex items-center justify-center text-brand-red">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter italic">{item.title}</h3>
                                <p className="text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Proximity / Maps Section */}
            <section className="py-24 bg-brand-bg relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-1/2">
                        <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Convenient Location</span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-[0.9] text-brand-dark mb-8">
                            Your Local <span className="silver-shine">Performance Center</span>
                        </h2>
                        <p className="text-gray-600 text-lg font-medium leading-relaxed mb-8">
                            Although our main facility is in Musaffah M9, we specialize in serving the {area.name} community. We understand the unique needs of residents in this area and provide streamlined booking and communication.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                <MapPin className="text-brand-red" size={24} />
                                <div>
                                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Facility Address</p>
                                    <p className="text-sm font-bold text-brand-dark">{BUSINESS.address}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                <Clock className="text-brand-red" size={24} />
                                <div>
                                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Service Hours</p>
                                    <p className="text-sm font-bold text-brand-dark">{BUSINESS.hours.displayShort}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="aspect-video bg-gray-200 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3635.421443414231!2d54.50250637610141!3d24.33181196623144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e416666666667%3A0x6666666666666666!2sSmart%20Motor%20Auto%20Repair!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen={true} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Smart Motor Location Map for ${area.name} Residents`}
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="inline-flex gap-1 mb-8">
                        {[...Array(5)].map((_, i) => <Star key={i} size={20} className="fill-[#FFCC00] text-[#FFCC00]" />)}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-brand-dark uppercase tracking-tighter italic mb-12">
                        Trusted by the <span className="text-brand-red">{area.name}</span> Community
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <div className="p-10 bg-brand-bg rounded-[3rem] border border-gray-100 italic font-medium text-gray-600 relative">
                            <span className="absolute top-6 right-8 text-6xl text-brand-red/10 font-black">"</span>
                            "Finding a reliable mechanic in Abu Dhabi was a challenge until I found Smart Motor. They take amazing care of my Audi and the pickup service from {area.name} is a lifesaver."
                            <div className="mt-8 flex items-center gap-3 not-italic">
                                <div className="w-10 h-10 bg-brand-dark rounded-full flex items-center justify-center text-white text-xs font-black">KA</div>
                                <p className="text-xs font-black uppercase tracking-widest text-brand-dark">Khalid Al-Mazrouei</p>
                            </div>
                        </div>
                        <div className="p-10 bg-brand-bg rounded-[3rem] border border-gray-100 italic font-medium text-gray-600 relative">
                            <span className="absolute top-6 right-8 text-6xl text-brand-red/10 font-black">"</span>
                            "Professional, honest, and high-quality work. They are the only garage I trust with my Porsche in {area.name}."
                            <div className="mt-8 flex items-center gap-3 not-italic">
                                <div className="w-10 h-10 bg-brand-dark rounded-full flex items-center justify-center text-white text-xs font-black">SJ</div>
                                <p className="text-xs font-black uppercase tracking-widest text-brand-dark">Sarah Jenkins</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </main>
    )
}
