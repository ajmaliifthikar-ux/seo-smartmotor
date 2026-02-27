import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UAE Driver Hub | Smart Motor Abu Dhabi',
  description: 'The definitive intelligence portal for UAE drivers. Traffic fines, automotive regulations, and luxury car maintenance guides.',
}

export default function HubLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Decorative Hub Gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-brand-red/3 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-dark/3 blur-[100px] rounded-full" />
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
