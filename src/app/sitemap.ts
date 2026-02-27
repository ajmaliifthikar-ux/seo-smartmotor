import { MetadataRoute } from 'next'
import { adminGetAllServices, adminGetAllBrands, adminGetAllPublishedContent } from '@/lib/firebase-admin'

// Force dynamic rendering — prevents Vercel from caching this route as static HTML.
// This is critical for Google Search Console to receive valid XML.
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://smartmotor.ae'

    // Static routes — canonical URLs only
    const staticRoutes = [
        { path: '', priority: 1.0 },
        { path: '/smart-tips', priority: 0.8 },
        { path: '/services', priority: 0.9 },
        { path: '/brands', priority: 0.9 },
        { path: '/about', priority: 0.8 },
        { path: '/contact', priority: 0.8 },
        { path: '/faq', priority: 0.8 },
        { path: '/careers', priority: 0.7 },
        { path: '/privacy', priority: 0.3 },
        { path: '/terms', priority: 0.3 },
    ]

    const staticEntries = staticRoutes.map(({ path, priority }) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority,
    }))

    let services: any[] = []
    let brands: any[] = []
    let posts: any[] = []

    try {
        const results = await Promise.allSettled([
            adminGetAllServices(),
            adminGetAllBrands(),
            adminGetAllPublishedContent('BLOG')
        ])

        if (results[0].status === 'fulfilled') {
            services = results[0].value
        } else {
            console.error('❌ Sitemap: Failed to fetch services:', results[0].reason)
        }

        if (results[1].status === 'fulfilled') {
            brands = results[1].value
        } else {
            console.error('❌ Sitemap: Failed to fetch brands:', results[1].reason)
        }

        if (results[2].status === 'fulfilled') {
            posts = results[2].value
        } else {
            console.error('❌ Sitemap: Failed to fetch content:', results[2].reason)
        }
    } catch (e) {
        console.error("❌ Sitemap: Unexpected error during data fetching:", e)
    }

    const serviceRoutes = services.map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: service.updatedAt?.toDate?.() || new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    const brandRoutes = brands.map((brand) => ({
        url: `${baseUrl}/brand/${brand.slug || brand.id}`,
        lastModified: brand.updatedAt?.toDate?.() || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    // ─── NEW: Cross-Product Routes (Brand + Service) ──────────────────────────
    // Generates: /brand/bmw/engine-repair, /brand/mercedes/ppf, etc.
    const brandServiceRoutes = brands.flatMap((brand) => {
        // If brand has specific services assigned, use those. Otherwise use all services.
        const applicableServices = brand.serviceIds?.length
            ? services.filter(s => brand.serviceIds?.includes(s.slug))
            : services;

        return applicableServices.map(service => ({
            url: `${baseUrl}/brand/${brand.slug || brand.id}/${service.slug}`,
            lastModified: brand.updatedAt?.toDate?.() || new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.85, // High priority for specific intent
        }));
    });

    const blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt?.toDate?.() || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [...staticEntries, ...serviceRoutes, ...brandRoutes, ...brandServiceRoutes, ...blogRoutes]
}
