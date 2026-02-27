import type { Metadata } from 'next'
import { PackagesPageClient } from '@/components/v2/pages/packages-page'

export const metadata: Metadata = {
    title: 'Car Protection Packages Abu Dhabi | PPF, Ceramic Coating, Tinting',
    description: 'Elite car protection solutions in Abu Dhabi. Premium PPF installation, 9H ceramic coating, and heat-rejection window tinting with lifetime warranties. Protect your investment today.',
    openGraph: {
        title: 'Premium Car Protection Packages | Smart Motor Abu Dhabi',
        description: 'Military-grade protection and premium tinting solutions with industry-leading warranties in Musaffah, Abu Dhabi.',
        url: 'https://smartmotor.ae/packages',
    },
    alternates: {
        canonical: 'https://smartmotor.ae/packages',
        languages: {
            'en': 'https://smartmotor.ae/packages',
            'ar': 'https://smartmotor.ae/ar/packages',
            'x-default': 'https://smartmotor.ae/packages',
        },
    },
}

export default function PackagesPage() {
    return <PackagesPageClient />
}
