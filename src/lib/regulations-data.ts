export interface RegulationRule {
    id: string
    title: string
    category: 'tinting' | 'exhaust' | 'rta' | 'aesthetics'
    limit: string
    penalty?: string
    technicalAdvice: string
    officialStandard?: string
    precisionPartLink?: {
        label: string
        href: string
    }
}

export const uaeRegulations: RegulationRule[] = [
    {
        id: 'tinting-vlt',
        title: 'Window Tinting (VLT)',
        category: 'tinting',
        limit: 'Standard: 50% VLT (Visible Light Transmission)',
        penalty: 'AED 1,500 for exceeding limits.',
        technicalAdvice: 'Ensure you use high-quality Nano-Ceramic film. 50% is the legal limit for private vehicles. Higher percentages may require special MOI permits.',
        officialStandard: 'UAE Federal Traffic Law',
        precisionPartLink: {
            label: 'XPEL Ceramic Tinting',
            href: '/precision-parts'
        }
    },
    {
        id: 'exhaust-noise',
        title: 'Exhaust Modification',
        category: 'exhaust',
        limit: '95 Decibels (Max)',
        penalty: 'AED 2,000 + Vehicle Impoundment.',
        technicalAdvice: 'Any aftermarket exhaust must maintain emission standards and decibel limits. High-end systems like Akrapovič often include compliance documentation.',
        officialStandard: 'MOI Compliance Certificate Required',
        precisionPartLink: {
            label: 'Akrapovič Performance Systems',
            href: '/precision-parts'
        }
    },
    {
        id: 'rta-tires',
        title: 'RTA Tire Standards',
        category: 'rta',
        limit: 'Age: < 5 Years | Depth: > 1.6mm',
        penalty: 'Immediate RTA failure.',
        technicalAdvice: 'Tires older than 5 years will fail RTA regardless of tread depth. Inspect for side-wall cracking due to heat soak.',
        officialStandard: 'ESMA Quality Standards',
        precisionPartLink: {
            label: 'Michelin Pilot Sport 4S',
            href: '/precision-parts'
        }
    },
    {
        id: 'color-change',
        title: 'Vehicle Color Change',
        category: 'aesthetics',
        limit: 'Permission Required',
        penalty: 'AED 800 for unapproved changes.',
        technicalAdvice: 'Full wraps or paint changes must be updated on the Mulkiya (Registration Card). You must obtain CID/Police clearance before starting the work.',
        officialStandard: 'MOI/RTA Approval System',
        precisionPartLink: {
            label: 'Certified Body Shop',
            href: '/#booking'
        }
    }
]
