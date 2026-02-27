import { getAllBrands, getAllPublishedContent, getAllServices } from "@/lib/firebase-db"
import { Tabs } from "@/components/ui/tabs"
import { GlobalSettings } from "@/components/admin/content/global-settings"
import { BrandManager } from "@/components/admin/content/brand-manager"
import { ContentEditor } from "@/components/admin/content/content-editor"
import { SEODashboard } from "@/components/admin/seo/seo-dashboard"
import { PageManager } from "@/components/admin/content/page-manager"
import { HistoryViewer } from "@/components/admin/content/history-viewer"
import { SectionEditor } from "@/components/admin/content/section-editor"
import { ServiceManager } from "@/components/admin/content/service-manager"

export default async function ContentPage() {
    // 1. Fetch Data
    let contentBlocks: any[] = []
    let brands: any[] = []
    let services: any[] = []

    try {
        const [allContent, allBrands, allServices] = await Promise.all([
            getAllPublishedContent(),
            getAllBrands(),
            getAllServices()
        ])
        contentBlocks = allContent
        brands = allBrands
        services = allServices
    } catch (error) {
        console.error('Failed to fetch content data:', error)
    }

    // 2. Transform Content Blocks for localized editing
    const config = contentBlocks.reduce((acc, block) => {
        acc[block.slug || block.id] = { value: block.content || block.value || '', valueAr: block.contentAr || block.valueAr || null }
        return acc
    }, {} as Record<string, { value: string, valueAr: string | null }>)

    // 2.1 Group Blocks by Page (use type as page grouping)
    const pageBlocks = contentBlocks.reduce((acc, block) => {
        const page = block.type || 'general'
        if (!acc[page]) acc[page] = []
        acc[page].push(block)
        return acc
    }, {} as Record<string, any[]>)

    // Define core sections
    const heroSections = [
        { key: 'hero_title', value: config['hero_title']?.value || '', valueAr: config['hero_title']?.valueAr || '', type: 'hero', label: 'Main Headline' },
        { key: 'hero_subtitle', value: config['hero_subtitle']?.value || '', valueAr: config['hero_subtitle']?.valueAr || '', type: 'hero', label: 'Sub-headline' },
        { key: 'hero_cta', value: config['hero_cta']?.value || '', valueAr: config['hero_cta']?.valueAr || '', type: 'hero', label: 'Call to Action Text' },
    ]

    const aboutSections = [
        { key: 'about_title', value: config['about_title']?.value || '', valueAr: config['about_title']?.valueAr || '', type: 'about', label: 'About Heading' },
        { key: 'about_description', value: config['about_description']?.value || '', valueAr: config['about_description']?.valueAr || '', type: 'about', label: 'Detailed Bio' },
        { key: 'mission_statement', value: config['mission_statement']?.value || '', valueAr: config['mission_statement']?.valueAr || '', type: 'about', label: 'Mission Statement' },
    ]

    // 3. Define Tabs
    const tabs = [
        {
            id: "hero",
            label: "Hero Section",
            content: <SectionEditor sections={heroSections} title="Hero Experience" subtitle="Manage the primary landing surface" />
        },
        {
            id: "about",
            label: "Core Sections",
            content: <SectionEditor sections={aboutSections} title="Heritage & Mission" subtitle="Define the brand story and mission" />
        },
        {
            id: "services",
            label: "Services",
            content: <ServiceManager initialServices={services} />
        },
        {
            id: "brands",
            label: "Car Brands",
            content: <BrandManager brands={brands} />
        },
        {
            id: "pages",
            label: "Modular Layout",
            content: <PageManager initialPages={pageBlocks} />
        },
        {
            id: "history",
            label: "Version History",
            content: <HistoryViewer />
        },
        {
            id: "general",
            label: "Global Settings",
            content: <GlobalSettings initialData={config} />
        },
    ]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-brand-dark">Content Management</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage your website's visual and text content.</p>
                </div>
            </div>

            <Tabs tabs={tabs} />
        </div>
    )
}
