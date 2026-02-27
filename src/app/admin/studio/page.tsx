import { SocialContentStudio } from '@/components/admin/studio/social-content-studio'

export const dynamic = 'force-dynamic'

export default async function StudioPage() {
  let error = false
  // SocialContentStudio doesn't fetch server-side yet, but we'll add the shell for robustness
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-brand-dark uppercase italic">
            Content <span className="text-brand-red">Studio</span>
          </h1>
          <p className="mt-1 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
            Instagram & Social Media Intelligence
          </p>
        </div>
      </div>

      <SocialContentStudio />
    </div>
  )
}
