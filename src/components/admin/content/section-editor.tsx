'use client'

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { updateContentBlock } from "@/actions/cms-actions"
import { toast } from "sonner"
import { Save, Loader2, Type, Languages, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

interface Section {
    key: string
    value: string
    valueAr: string | null
    type: string
    label?: string
}

interface SectionEditorProps {
    sections: Section[]
    title: string
    subtitle?: string
}

export function SectionEditor({ sections, title, subtitle }: SectionEditorProps) {
    const [isPending, startTransition] = useTransition()

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            let successCount = 0
            let errorCount = 0

            for (const section of sections) {
                const enValue = formData.get(`${section.key}_en`) as string
                const arValue = formData.get(`${section.key}_ar`) as string

                const submission = new FormData()
                submission.append("key", section.key)
                submission.append("value", enValue)
                if (arValue) submission.append("valueAr", arValue)
                submission.append("type", section.type)
                submission.append("status", "PUBLISHED")

                try {
                    const res = await updateContentBlock(submission)
                    if (res.success) successCount++
                    else errorCount++
                } catch (err) {
                    errorCount++
                }
            }

            if (successCount > 0) {
                toast.success(`Successfully updated ${successCount} field(s)`)
            }
            if (errorCount > 0) {
                toast.error(`Failed to update ${errorCount} field(s)`)
            }
        })
    }

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 blur-[100px] rounded-full pointer-events-none" />
                
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-50 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-dark rounded-2xl flex items-center justify-center text-white shadow-lg">
                            <Type size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-brand-dark tracking-tighter uppercase italic">{title}</h2>
                            {subtitle && <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{subtitle}</p>}
                        </div>
                    </div>
                </div>

                <form action={handleSubmit} className="space-y-10 relative z-10">
                    {sections.map((section) => (
                        <div key={section.key} className="space-y-4">
                            <div className="flex items-center gap-2 px-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-red">
                                    {section.label || section.key.split('_').join(' ')}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* English Side */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400 px-2">
                                        <Globe size={10} className="text-blue-500" /> English Content
                                    </div>
                                    <Textarea
                                        name={`${section.key}_en`}
                                        defaultValue={section.value}
                                        className="min-h-[120px] bg-gray-50 border-none rounded-2xl p-6 font-bold text-sm focus:ring-2 focus:ring-brand-dark transition-all resize-none shadow-inner"
                                        placeholder={`Enter ${section.key} in English...`}
                                    />
                                </div>

                                {/* Arabic Side */}
                                <div className="space-y-3" dir="rtl">
                                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400 px-2">
                                        <Languages size={10} className="text-brand-red" /> المحتوى العربي
                                    </div>
                                    <Textarea
                                        name={`${section.key}_ar`}
                                        defaultValue={section.valueAr || ""}
                                        className="min-h-[120px] bg-gray-50 border-none rounded-2xl p-6 font-bold text-sm text-right font-cairo focus:ring-2 focus:ring-brand-dark transition-all resize-none shadow-inner"
                                        placeholder="ادخل النص بالعربية هنا..."
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-end pt-6 mt-6 border-t border-gray-50">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className={cn(
                                "h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all duration-500 flex items-center gap-3 shadow-xl",
                                isPending ? "bg-gray-100 text-gray-400" : "bg-brand-dark text-white hover:bg-brand-red hover:shadow-brand-red/20"
                            )}
                        >
                            {isPending ? <Loader2 className="animate-spin w-4 h-4" /> : <Save size={18} />}
                            Commit Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
