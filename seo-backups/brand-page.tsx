import type { Metadata } from 'next'
import BrandPageClient from './BrandPageClient'

interface Props {
    params: Promise<{ slug: string }>
}

// ─── Brand-specific SEO data ────────────────────────────────────────────────
const brandMeta: Record<string, { name: string; description: string; faq: Array<{ q: string; a: string }> }> = {
    'mercedes-benz': {
        name: 'Mercedes-Benz',
        description: 'Expert Mercedes-Benz service & repair in Musaffah M9, Abu Dhabi. AMG-trained technicians, genuine parts, 6-month warranty. Book today.',
        faq: [
            { q: 'How much does a Mercedes-Benz service cost in Abu Dhabi?', a: 'Mercedes-Benz service at Smart Motor starts from AED 1,200 for a major service. Final pricing depends on the model and service required. Contact us for a free quote.' },
            { q: 'Does servicing my Mercedes at an independent garage void the warranty in UAE?', a: 'No. Under UAE consumer protection law, servicing at a qualified independent workshop using genuine or equivalent parts does not void your Mercedes-Benz warranty.' },
            { q: 'Where is Smart Motor located for Mercedes service in Abu Dhabi?', a: 'Smart Motor is located in Musaffah Industrial Area, M9, Abu Dhabi — the hub for specialist automotive workshops in the emirate.' },
            { q: 'Do you use genuine Mercedes-Benz parts?', a: 'Yes. We use OEM and genuine Mercedes-Benz parts for all servicing and repairs, ensuring your vehicle maintains factory specifications.' },
            { q: 'Can you service AMG and S-Class Mercedes models?', a: 'Absolutely. Our technicians are trained on the full Mercedes-Benz range including AMG performance models and the flagship S-Class and G-Wagon.' },
        ],
    },
    'bmw': {
        name: 'BMW',
        description: 'Specialist BMW service & repair in Musaffah M9, Abu Dhabi. M-Sport diagnostics, genuine parts, 6-month warranty. Book online.',
        faq: [
            { q: 'How much does a BMW service cost in Abu Dhabi?', a: 'BMW service at Smart Motor starts from AED 1,200 for a major service. We provide competitive pricing with genuine parts and certified technicians.' },
            { q: 'Do you service BMW M-Series cars in Abu Dhabi?', a: 'Yes. Our technicians are trained on all BMW models including M3, M5, and M8 Competition with performance-grade calibration.' },
            { q: 'Where can I get my BMW serviced in Musaffah?', a: 'Smart Motor is located in Musaffah Industrial Area, M9, Abu Dhabi. We are a specialist BMW independent workshop serving all Abu Dhabi areas.' },
            { q: 'Is independent BMW service cheaper than the dealer in UAE?', a: 'Independent specialist service typically offers savings of 20–40% compared to main dealer pricing, using the same genuine parts and diagnostic tools.' },
            { q: 'Do you carry out BMW transmission and gearbox repairs?', a: 'Yes. We specialise in BMW ZF automatic gearbox repair, mechatronic unit replacement, and DCT (dual-clutch) service for all BMW models.' },
        ],
    },
    'audi': {
        name: 'Audi',
        description: 'Expert Audi service & repair in Musaffah M9, Abu Dhabi. Quattro & TFSI specialists, genuine parts, 6-month warranty. Book today.',
        faq: [
            { q: 'How much does Audi service cost in Abu Dhabi?', a: 'Audi service at Smart Motor starts from AED 1,200 for a full inspection service. Cost varies by model — contact us for a free quote.' },
            { q: 'Do you service Audi Quattro and RS models?', a: 'Yes. We have specialist knowledge of Audi Quattro all-wheel drive systems, TFSI engines, and RS performance models including the RS6 and R8.' },
            { q: 'Where is your Audi workshop in Abu Dhabi?', a: 'We are located in Musaffah Industrial Area, M9, Abu Dhabi — the centre of specialist automotive care in the emirate.' },
            { q: 'Can independent Audi service void my warranty in UAE?', a: 'No. UAE consumer regulations protect your right to use a qualified independent workshop without voiding your Audi manufacturer warranty.' },
            { q: 'Do you offer Audi DSG gearbox service?', a: 'Yes. We carry out DSG (Direct Shift Gearbox) oil changes, mechatronic repairs, and full DSG rebuilds for all Audi models.' },
        ],
    },
    'porsche': {
        name: 'Porsche',
        description: 'Specialist Porsche service & repair in Musaffah M9, Abu Dhabi. Factory-level diagnostics, genuine parts, 6-month warranty. Book today.',
        faq: [
            { q: 'How much does Porsche service cost in Abu Dhabi?', a: 'Porsche service at Smart Motor starts from AED 1,200. We offer competitive pricing with the same quality as main dealer service. Contact us for a model-specific quote.' },
            { q: 'Do you service Porsche Taycan electric vehicles?', a: 'Yes. We are equipped with Porsche-compatible diagnostic tools for the Taycan EV platform as well as all combustion-engine Porsche models.' },
            { q: 'Where is your Porsche workshop in Abu Dhabi?', a: 'Smart Motor is at Musaffah Industrial Area, M9, Abu Dhabi. We are one of Abu Dhabi\'s leading independent Porsche specialists.' },
            { q: 'Can you repair a Porsche PDK gearbox in Abu Dhabi?', a: 'Yes. We perform Porsche PDK (dual-clutch) gearbox servicing, software calibration, and full rebuild where required.' },
            { q: 'Do independent Porsche workshops use genuine parts?', a: 'Smart Motor uses OEM and genuine Porsche parts to ensure your vehicle maintains factory performance and warranty compliance.' },
        ],
    },
    'land-rover': {
        name: 'Land Rover',
        description: 'Expert Land Rover & Range Rover service in Musaffah M9, Abu Dhabi. Air suspension specialists, genuine parts, 6-month warranty. Book today.',
        faq: [
            { q: 'How much does Range Rover service cost in Abu Dhabi?', a: 'Land Rover and Range Rover service at Smart Motor starts from AED 1,200. Air suspension and Terrain Response repairs are quoted separately. Contact us for a free estimate.' },
            { q: 'Do you repair Land Rover air suspension in Abu Dhabi?', a: 'Yes. Air suspension repair and replacement is one of our core Land Rover specialisms, covering all Range Rover, Defender, and Discovery models.' },
            { q: 'Where is your Land Rover workshop in Abu Dhabi?', a: 'Smart Motor is located in Musaffah Industrial Area, M9, Abu Dhabi — a specialist European and British vehicle workshop serving the whole emirate.' },
            { q: 'Can you service a Range Rover Defender in Musaffah?', a: 'Yes. We service all Land Rover Defender generations (TD5, TDV6, and the new L663 series) alongside Range Rover Sport, Discovery, Velar, and Evoque.' },
            { q: 'Is Smart Motor Land Rover service cheaper than the dealer?', a: 'Independent specialist workshops typically offer 20–40% savings over main dealer pricing for Land Rover and Range Rover service, using equivalent parts and diagnostic technology.' },
        ],
    },
}

// ─── Server-side metadata ────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const brand = brandMeta[slug] ?? {
        name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        description: `Professional ${slug.replace(/-/g, ' ')} service & repair in Abu Dhabi. Certified technicians at Smart Motor Musaffah M9. 6-month warranty.`,
        faq: [],
    }

    return {
        title: `${brand.name} Service & Repair Abu Dhabi | Smart Motor Musaffah`,
        description: brand.description,
        openGraph: {
            title: `${brand.name} Service & Repair Abu Dhabi | Smart Motor Musaffah`,
            description: brand.description,
            url: `https://smartmotor.ae/brand/${slug}`,
            siteName: 'Smart Motor Auto Repair',
            images: [
                {
                    url: `/images/hero/${slug}-banner.webp`,
                    width: 1200,
                    height: 630,
                    alt: `${brand.name} specialist workshop at Smart Motor, Musaffah M9 Abu Dhabi`,
                },
            ],
            locale: 'en_AE',
            type: 'website',
        },
        alternates: {
            canonical: `https://smartmotor.ae/brand/${slug}`,
        },
    }
}

// ─── Page (server component) ─────────────────────────────────────────────────
export default async function BrandPage({ params }: Props) {
    const { slug } = await params
    const brand = brandMeta[slug] ?? {
        name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        description: `Professional ${slug.replace(/-/g, ' ')} service & repair in Abu Dhabi.`,
        faq: [],
    }

    // ── Structured data: AutoRepair (brand-specific) ─────────────────────────
    const autoRepairJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'AutoRepair',
        name: `Smart Motor ${brand.name} Specialist Abu Dhabi`,
        image: 'https://smartmotor.ae/images/hero/store-front.webp',
        url: `https://smartmotor.ae/brand/${slug}`,
        telephone: '+97125555443',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'M9, Musaffah Industrial Area',
            addressLocality: 'Abu Dhabi',
            addressRegion: 'Abu Dhabi',
            addressCountry: 'AE',
        },
        description: `Professional ${brand.name} service, repair and maintenance in Abu Dhabi. Factory-trained technicians, genuine parts and 6-month warranty at Smart Motor Musaffah M9.`,
        priceRange: '$$$',
        openingHours: 'Mo-Sa 08:00-19:00',
    }

    // ── Structured data: FAQPage ─────────────────────────────────────────────
    const faqJsonLd = brand.faq.length > 0
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: brand.faq.map(({ q, a }) => ({
                '@type': 'Question',
                name: q,
                acceptedAnswer: { '@type': 'Answer', text: a },
            })),
        }
        : null

    // ── Structured data: BreadcrumbList ─────────────────────────────────────
    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smartmotor.ae' },
            { '@type': 'ListItem', position: 2, name: `${brand.name} Service Abu Dhabi`, item: `https://smartmotor.ae/brand/${slug}` },
        ],
    }

    return (
        <>
            {/* Server-rendered structured data — reliable for Googlebot */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(autoRepairJsonLd) }}
            />
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            {/* Client component handles all interactive UI */}
            <BrandPageClient slug={slug} />
        </>
    )
}
