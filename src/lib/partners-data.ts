export interface PartnerBrand {
    id: string
    name: string
    category: 'protection' | 'fluids' | 'performance' | 'tires'
    logo: string
    description: string
    officialUrl: string
    isGCC?: boolean
}

export const partnerBrands: PartnerBrand[] = [
    // Protection & Gloss
    {
        id: 'xpel',
        name: 'XPEL',
        category: 'protection',
        logo: '/brands/technical/xpel.svg',
        description: 'World leader in self-healing paint protection films and automotive window tint.',
        officialUrl: 'https://www.xpel.ae',
        isGCC: true
    },
    {
        id: 'gtechniq',
        name: 'Gtechniq',
        category: 'protection',
        logo: '/brands/technical/gtechniq.svg',
        description: 'Smart Surface Science — the industry benchmark for ceramic coatings and detailing.',
        officialUrl: 'https://gtechniq.com',
        isGCC: false
    },
    {
        id: '3m',
        name: '3M',
        category: 'protection',
        logo: '/brands/technical/3m.svg',
        description: 'Global pioneer in automotive films, abrasives, and adhesive technologies.',
        officialUrl: 'https://www.3m.com.ae/3M/en_AE/car-care-ae/',
        isGCC: true
    },
    // Fluids & Lubricants
    {
        id: 'mobil1',
        name: 'Mobil 1',
        category: 'fluids',
        logo: '/brands/technical/mobil1.svg',
        description: 'The world\'s leading synthetic motor oil, engineered for ultimate performance.',
        officialUrl: 'https://www.mobil.com/en-ae/passenger-vehicle-lube',
        isGCC: true
    },
    {
        id: 'motul',
        name: 'Motul',
        category: 'fluids',
        logo: '/brands/technical/motul.svg',
        description: 'High-tech synthetic lubricants designed for extreme performance and reliability.',
        officialUrl: 'https://www.motul.com/en-ae',
        isGCC: true
    },
    {
        id: 'shell',
        name: 'Shell Helix',
        category: 'fluids',
        logo: '/brands/technical/shell.svg',
        description: 'Fully synthetic motor oil made from natural gas for cleaner engines.',
        officialUrl: 'https://www.shell.ae/en_ae/motorists/oils-lubricants/helix-for-cars.html',
        isGCC: true
    },
    // Performance & Safety
    {
        id: 'brembo',
        name: 'Brembo',
        category: 'performance',
        logo: '/brands/technical/brembo.svg',
        description: 'The world leader and acknowledged innovator of brake disc technology.',
        officialUrl: 'https://www.brembo.com',
        isGCC: false
    },
    {
        id: 'akrapovic',
        name: 'Akrapovič',
        category: 'performance',
        logo: '/brands/technical/akrapovic.svg',
        description: 'Premium titanium exhaust systems for supercars and high-performance vehicles.',
        officialUrl: 'https://www.akrapovic.com',
        isGCC: false
    },
    {
        id: 'bosch',
        name: 'Bosch',
        category: 'performance',
        logo: '/brands/technical/bosch.svg',
        description: 'Precision German engineering for spark plugs, filters, and electronic systems.',
        officialUrl: 'https://www.bosch.ae',
        isGCC: true
    },
    {
        id: 'mann',
        name: 'MANN-FILTER',
        category: 'performance',
        logo: '/brands/technical/mann.svg',
        description: 'OEM quality air, oil, and fuel filters for European luxury cars.',
        officialUrl: 'https://www.mann-filter.com',
        isGCC: false
    },
    // Tires & Traction
    {
        id: 'michelin',
        name: 'Michelin',
        category: 'tires',
        logo: '/brands/technical/michelin.svg',
        description: 'High-performance tires offering superior grip and longevity in desert climates.',
        officialUrl: 'https://www.michelin.ae',
        isGCC: true
    },
    {
        id: 'pirelli',
        name: 'Pirelli',
        category: 'tires',
        logo: '/brands/technical/pirelli.svg',
        description: 'Italian excellence in high-performance tires for luxury and sport vehicles.',
        officialUrl: 'https://www.pirelli.com/tyres/en-ae/car/homepage',
        isGCC: true
    },
    {
        id: 'continental',
        name: 'Continental',
        category: 'tires',
        logo: '/brands/technical/continental.svg',
        description: 'German precision tires designed for optimal safety and handling.',
        officialUrl: 'https://www.continental-tires.com/ae/en/',
        isGCC: true
    }
]
