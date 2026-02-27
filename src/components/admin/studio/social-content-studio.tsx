'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter,
  Copy,
  Calendar,
  Save,
  Loader2,
  ChevronRight,
  Zap,
  Palette,
  Layout,
  MessageSquare,
  Share2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const SAMPLE_IDEAS = [
  { id: '1', title: 'Before & After Service', prompt: 'Create an engaging Instagram post showcasing a ceramic coating transformation on a luxury SUV. Focus on the high-gloss finish and protection against UAE heat.' },
  { id: '2', title: 'Summer Maintenance Tip', prompt: 'Generate a helpful Facebook post about checking tire pressure and AC efficiency for the summer months in Abu Dhabi.' },
  { id: '3', title: 'Brand Heritage: Porsche', prompt: 'Write a sophisticated LinkedIn post about our expertise in maintaining classic and modern Porsches, highlighting our technical precision.' },
  { id: '4', title: 'Limited Time Offer', prompt: 'Create a promotional post for a weekend flash sale: 20% off on full vehicle diagnostics and engine health check.' },
  { id: '5', title: 'Customer Satisfaction', prompt: 'Draft a warm, community-focused post featuring a testimonial from a satisfied Mercedes owner who visited our workshop.' }
]

const PLATFORMS = [
  { id: 'instagram', icon: Instagram, label: 'Instagram', color: 'text-pink-500' },
  { id: 'facebook', icon: Facebook, label: 'Facebook', color: 'text-blue-600' },
  { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', color: 'text-blue-700' },
  { id: 'twitter', icon: Twitter, label: 'X / Twitter', color: 'text-gray-900' }
]

const TONES = ['Elite', 'Technical', 'Friendly', 'Promotional']

export function SocialContentStudio() {
  const [prompt, setPrompt] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('instagram')
  const [selectedTone, setSelectedTone] = useState('Elite')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedResult, setGeneratedResult] = useState<{ content: string, hashtags: string[] } | null>(null)
  const [history, setHistory] = useState<any[]>([])

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setGeneratedResult(null)

    try {
      const response = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'social',
          prompt,
          platform: selectedPlatform,
          tone: selectedTone
        })
      })

      if (!response.ok) throw new Error('Failed to generate')
      
      const data = await response.json()
      setGeneratedResult(data)
      setHistory(prev => [{ id: Date.now().toString(), title: prompt.slice(0, 30) + '...', date: new Date().toLocaleDateString(), ...data }, ...prev])
      toast.success('Social post generated successfully!')
    } catch (error) {
      console.error('Generation error:', error)
      toast.error('Failed to generate content. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  return (
    <div className="flex h-[calc(100vh-160px)] gap-6 overflow-hidden">
      {/* Sidebar: Sample Ideas & History */}
      <div className="w-[350px] flex flex-col gap-6 bg-white/50 backdrop-blur-xl rounded-[2.5rem] border border-gray-100 p-6 overflow-hidden shadow-sm">
        <div className="space-y-6 flex-1 overflow-y-auto subtle-scrollbar pr-2">
          {/* Sample Ideas */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 px-2">
              Sample Ideas
            </h3>
            <div className="space-y-2">
              {SAMPLE_IDEAS.map((idea) => (
                <button
                  key={idea.id}
                  onClick={() => setPrompt(idea.prompt)}
                  className="w-full text-left p-4 rounded-2xl bg-white hover:bg-gray-50 border border-gray-50 hover:border-brand-red/20 transition-all group"
                >
                  <p className="font-black text-[10px] uppercase tracking-widest text-brand-dark group-hover:text-brand-red transition-colors">
                    {idea.title}
                  </p>
                  <p className="text-[9px] text-gray-400 font-medium truncate mt-1">
                    {idea.prompt}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* History */}
          {history.length > 0 && (
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 px-2">
                Recent Generations
              </h3>
              <div className="space-y-2">
                {history.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setGeneratedResult({ content: item.content, hashtags: item.hashtags })}
                    className="w-full text-left p-4 rounded-2xl bg-white/40 hover:bg-white border border-transparent hover:border-gray-100 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-black text-[9px] uppercase tracking-widest text-gray-600">
                        {item.title}
                      </p>
                      <span className="text-[8px] text-gray-300 font-bold">{item.date}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none" />
        
        <div className="flex-1 overflow-y-auto subtle-scrollbar p-10 space-y-10 relative z-10">
          {/* Configuration Grid */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-1">
                Target Platform
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PLATFORMS.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all text-xs font-bold",
                      selectedPlatform === platform.id
                        ? "bg-brand-dark text-white border-brand-dark shadow-lg"
                        : "bg-gray-50 text-gray-500 border-gray-50 hover:bg-gray-100"
                    )}
                  >
                    <platform.icon size={16} className={cn(selectedPlatform === platform.id ? "text-white" : platform.color)} />
                    {platform.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-1">
                Content Tone
              </label>
              <div className="grid grid-cols-2 gap-2">
                {TONES.map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setSelectedTone(tone)}
                    className={cn(
                      "px-4 py-3 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest",
                      selectedTone === tone
                        ? "bg-brand-red text-white border-brand-red shadow-lg"
                        : "bg-gray-50 text-gray-500 border-gray-50 hover:bg-gray-100"
                    )}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Prompt Area */}
          <div className="space-y-4">
            <div className="flex items-center justify-between ml-1">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                Instructional Prompt
              </label>
              <div className="flex items-center gap-2">
                <Sparkles size={12} className="text-brand-red" />
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-red">AI Enhanced</span>
              </div>
            </div>
            <div className="relative group">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the post you want to generate (e.g., 'A post about our new ceramic coating service for supercars')..."
                className="w-full h-32 bg-gray-50 border-gray-100 border-2 rounded-[2rem] p-6 text-sm font-medium focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red/20 outline-none transition-all resize-none"
              />
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className={cn(
                  "absolute bottom-4 right-4 px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all flex items-center gap-2",
                  prompt.trim() && !isGenerating
                    ? "bg-brand-dark text-white hover:bg-brand-red shadow-xl hover:scale-[1.05] active:scale-[0.95]"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                )}
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap size={14} className="fill-current" />
                    Generate Content
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Result Section */}
          <AnimatePresence mode="wait">
            {generatedResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 pt-6 border-t border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-red ml-1">
                    Generated Intelligence
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => handleCopy(`${generatedResult.content}\n\n${generatedResult.hashtags.join(' ')}`)}
                      className="h-8 rounded-full text-[9px] font-black uppercase tracking-widest"
                    >
                      <Copy size={12} className="mr-1" />
                      Copy Content
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-8 rounded-full text-[9px] font-black uppercase tracking-widest bg-gray-50"
                    >
                      <Calendar size={12} className="mr-1" />
                      Add to Planning
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Text Content */}
                  <div className="bg-brand-dark rounded-[2rem] p-8 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      {(() => {
                        const Icon = PLATFORMS.find(p => p.id === selectedPlatform)?.icon
                        return Icon ? <Icon size={40} /> : null
                      })()}
                    </div>
                    <div className="relative z-10 space-y-4">
                      <p className="text-sm leading-relaxed font-medium whitespace-pre-wrap">
                        {generatedResult.content}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-4">
                        {generatedResult.hashtags.map(tag => (
                          <span key={tag} className="text-[10px] font-bold text-[#A78BFA] hover:underline cursor-pointer">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Preview / Context */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100">
                      <h4 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-4">
                        Strategy Context
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-gray-500 uppercase">Tone Analysis</span>
                          <span className="text-[10px] font-black uppercase text-brand-dark">{selectedTone}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-gray-500 uppercase">Est. Engagement</span>
                          <span className="text-[10px] font-black uppercase text-green-600">High (8.4%)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-gray-500 uppercase">Best Time to Post</span>
                          <span className="text-[10px] font-black uppercase text-brand-dark">Today, 18:45 GST</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full h-16 rounded-[1.5rem] bg-brand-dark text-white font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-brand-red transition-all flex items-center justify-center gap-3">
                      <Save size={18} />
                      Save Draft to Studio
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
