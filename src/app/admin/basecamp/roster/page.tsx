import { Users } from 'lucide-react'
import { RosterClient, Employee } from './roster-client'
import { getAllUsers } from '@/lib/firebase-db'

export default async function RosterPage() {
  // Fetch initial users for SSR
  const users = await getAllUsers()
  
  const initialEmployees: Employee[] = users.map((u: any) => ({
      id: u.id,
      name: u.name || 'Unknown',
      email: u.email || '',
      phone: u.phone || '',
      role: u.role || 'Member',
      department: 'General', // Will be re-mapped in client
      photo: u.image || '',
      status: u.status || 'active'
  }))

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FBBF24]/20 flex items-center justify-center">
            <Users className="w-6 h-6 text-[#FBBF24]" />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter text-white">
              Team <span className="text-[#FBBF24]">Roster</span>
            </h1>
            <p className="text-xs text-white/40 font-bold uppercase tracking-[0.2em] mt-0.5">
              Basecamp Directory & Management
            </p>
          </div>
        </div>

        <button className="bg-[#FBBF24] text-brand-dark px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-amber-900/20">
          Add Member
        </button>
      </div>

      <RosterClient initialEmployees={initialEmployees} />
    </div>
  )
}
