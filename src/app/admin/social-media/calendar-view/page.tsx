import { PlanningCalendar } from '@/components/admin/social-media/planning-calendar'

export const dynamic = 'force-dynamic'

export default async function CalendarViewPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-brand-dark uppercase italic">
            Broadcasting <span className="text-brand-red">Calendar</span>
          </h1>
          <p className="mt-1 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
            Omnichannel Scheduling & Content Distribution
          </p>
        </div>
      </div>

      <PlanningCalendar />
    </div>
  )
}
