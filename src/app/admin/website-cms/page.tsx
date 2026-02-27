import { 
  adminGetAllServices, 
  adminGetAllBrands 
} from '@/lib/firebase-admin'
import { StudioClient } from '@/components/admin/studio/studio-client'

export const dynamic = 'force-dynamic'

export default async function WebsiteCMSPage() {
  let services: any[] = []
  let brands: any[] = []
  let error = false

  try {
    const data = await Promise.all([
      adminGetAllServices(),
      adminGetAllBrands()
    ])
    services = data[0] || []
    brands = data[1] || []
  } catch (err) {
    console.error('WebsiteCMSPage Data Fetch Error:', err)
    error = true
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-brand-dark uppercase italic">
            Website <span className="text-brand-red">CMS</span>
          </h1>
          <p className="mt-1 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
            Core Catalog & Brand Management
          </p>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-100 px-4 py-2 rounded-xl">
            <p className="text-[10px] font-black uppercase text-red-600 tracking-widest">Connection Warning: Offline Mode</p>
          </div>
        )}
      </div>

      <StudioClient 
        initialServices={services} 
        initialBrands={brands} 
      />
    </div>
  )
}
