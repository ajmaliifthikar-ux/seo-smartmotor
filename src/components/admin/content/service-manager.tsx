'use client'

import { useState, useTransition } from "react"
import { createService, updateService } from "@/actions/cms-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Plus, Loader2, Wrench, Edit3, Trash2, Save, X, Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Service {
    id: string
    name: string
    nameAr: string | null
    description: string
    descriptionAr: string | null
    price?: string
    duration?: string
    image?: string
}

export function ServiceManager({ initialServices = [] }: { initialServices: Service[] }) {
    const [services, setServices] = useState<Service[]>(initialServices)
    const [isPending, startTransition] = useTransition()
    const [editingService, setEditingService] = useState<Service | null>(null)
    const [isAdding, setIsAdding] = useState(false)

    const handleSave = async (formData: FormData) => {
        startTransition(async () => {
            const data = {
                name: formData.get("name") as string,
                nameAr: formData.get("nameAr") as string,
                description: formData.get("description") as string,
                descriptionAr: formData.get("descriptionAr") as string,
                price: formData.get("price") as string,
                duration: formData.get("duration") as string,
                image: formData.get("image") as string,
            }

            try {
                if (editingService) {
                    await updateService(editingService.id, data)
                    setServices(services.map(s => s.id === editingService.id ? { ...s, ...data } : s))
                    toast.success("Service updated successfully")
                } else {
                    const result = await createService(data)
                    if (result.success && result.id) {
                        setServices([...services, { id: result.id, ...data } as Service])
                        toast.success("Service created successfully")
                    } else {
                        throw new Error(result.error || "Failed to create service")
                    }
                }
                setEditingService(null)
                setIsAdding(false)
            } catch (err) {
                toast.error("Operation failed")
            }
        })
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-black text-brand-dark tracking-tighter uppercase italic">Service Catalog</h2>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Manage workshop offerings & pricing</p>
                </div>
                {!isAdding && !editingService && (
                    <Button
                        onClick={() => setIsAdding(true)}
                        className="bg-brand-red text-white rounded-2xl h-12 px-6 font-black uppercase tracking-widest text-[10px] shadow-lg hover:shadow-brand-red/20 transition-all"
                    >
                        <Plus size={16} className="mr-2" /> Add Service
                    </Button>
                )}
            </div>

            {(isAdding || editingService) && (
                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 blur-[100px] rounded-full pointer-events-none" />
                    
                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <h3 className="text-sm font-black uppercase tracking-widest text-brand-dark">
                            {editingService ? `Editing: ${editingService.name}` : "Provision New Service"}
                        </h3>
                        <button onClick={() => { setEditingService(null); setIsAdding(false); }} className="text-gray-400 hover:text-brand-dark">
                            <X size={20} />
                        </button>
                    </div>

                    <form action={handleSave} className="space-y-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Service Name (EN)</label>
                                    <Input name="name" defaultValue={editingService?.name} required className="h-14 bg-gray-50 border-none rounded-2xl px-6 font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Description (EN)</label>
                                    <Textarea name="description" defaultValue={editingService?.description} required className="min-h-[100px] bg-gray-50 border-none rounded-2xl p-6 font-bold text-sm resize-none" />
                                </div>
                            </div>

                            <div className="space-y-4" dir="rtl">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">اسم الخدمة (AR)</label>
                                    <Input name="nameAr" defaultValue={editingService?.nameAr || ""} className="h-14 bg-gray-50 border-none rounded-2xl px-6 font-bold text-right font-cairo" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">الوصف (AR)</label>
                                    <Textarea name="descriptionAr" defaultValue={editingService?.descriptionAr || ""} className="min-h-[100px] bg-gray-50 border-none rounded-2xl p-6 font-bold text-sm text-right font-cairo resize-none" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Starting Price (AED)</label>
                                <Input name="price" defaultValue={editingService?.price} placeholder="e.g. 250" className="h-14 bg-gray-50 border-none rounded-2xl px-6 font-bold" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Duration</label>
                                <Input name="duration" defaultValue={editingService?.duration} placeholder="e.g. 2 Hours" className="h-14 bg-gray-50 border-none rounded-2xl px-6 font-bold" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Image URL</label>
                                <Input name="image" defaultValue={editingService?.image} placeholder="https://..." className="h-14 bg-gray-50 border-none rounded-2xl px-6 font-bold" />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full h-14 bg-brand-dark text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-red transition-all shadow-xl"
                        >
                            {isPending ? <Loader2 className="animate-spin w-5 h-5" /> : (
                                <div className="flex items-center gap-2">
                                    <Save size={18} />
                                    {editingService ? "Update Deployment" : "Publish to Catalog"}
                                </div>
                            )}
                        </Button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div key={service.id} className="group bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-brand-red">
                                <Wrench size={24} />
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => setEditingService(service)} className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:text-brand-dark hover:bg-gray-100 transition-all">
                                    <Edit3 size={16} />
                                </button>
                                <button className="p-2 rounded-xl bg-red-50 text-red-400 hover:text-white hover:bg-red-500 transition-all">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-black text-brand-dark tracking-tighter uppercase">{service.name}</h4>
                            <p className="text-xs font-bold text-gray-400 font-cairo mt-1" dir="rtl">{service.nameAr}</p>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{service.description}</p>
                        <div className="pt-4 mt-auto border-t border-gray-50 flex items-center justify-between">
                            <span className="text-sm font-black text-brand-red">AED {service.price || "---"}</span>
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{service.duration || "Standard"}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
