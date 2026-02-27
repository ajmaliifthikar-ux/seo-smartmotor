'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X, Bot, Loader2, Headphones, Volume2, Mic, Sparkles, Check, ChevronRight, FilePlus, Paperclip, Copy, Download, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  attachments?: string[]
}

export function WorkbenchChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Welcome to the Smart Motor Workbench. I'm your multimodal assistant. How can I help you with your operations today? You can upload images or documents for analysis.",
      timestamp: Date.now(),
    },
  ])

  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [attachments, setAttachments] = useState<Array<{ name: string, data: string, mimeType: string, preview?: string }>>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newAttachments = await Promise.all(Array.from(files).map(async (file) => {
      return new Promise<any>((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const base64 = (e.target?.result as string).split(',')[1]
          resolve({
            name: file.name,
            data: base64,
            mimeType: file.type,
            preview: file.type.startsWith('image/') ? e.target?.result as string : undefined
          })
        }
        reader.readAsDataURL(file)
      })
    }))

    setAttachments(prev => [...prev, ...newAttachments])
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const handleSend = async (overrideText?: string) => {
    const text = overrideText || input
    if ((!text.trim() && attachments.length === 0) || isLoading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim() || (attachments.length > 0 ? `Uploaded ${attachments.length} file(s)` : ''),
      timestamp: Date.now(),
      attachments: attachments.map(a => a.name)
    }

    setMessages((prev) => [...prev, userMsg])
    const currentAttachments = [...attachments]
    if (!overrideText) setInput('')
    setAttachments([])
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.content,
          attachments: currentAttachments.map(a => ({ data: a.data, mimeType: a.mimeType })),
          systemInstruction: "You are the Smart Motor Workbench Copilot. You are an expert business analyst and operations manager. You have access to internal documents and market data. Your goal is to assist the admin team with strategic decisions, content creation, and data analysis. Be concise, professional, and data-driven."
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || "I processed your request but received no output.",
        timestamp: Date.now(),
      }
      setMessages((prev) => [...prev, assistantMsg])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I encountered an error connecting to the AI service. Please try again.",
        timestamp: Date.now(),
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] overflow-hidden">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={cn(
            'flex gap-4 group',
            msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
          )}>
            {/* Avatar */}
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg",
              msg.role === 'assistant' ? "bg-[#34D399] text-white" : "bg-white/10 text-white"
            )}>
              {msg.role === 'assistant' ? <Bot size={20} /> : <Users size={20} />}
            </div>

            {/* Content */}
            <div className={cn(
              "flex flex-col max-w-[70%]",
              msg.role === 'user' ? "items-end" : "items-start"
            )}>
              <div className={cn(
                "px-6 py-4 rounded-3xl text-[13px] font-medium leading-relaxed shadow-2xl transition-all relative group/msg",
                msg.role === 'user' 
                    ? "bg-brand-dark border border-white/10 text-white rounded-tr-none group-hover:border-white/20" 
                    : "bg-white/[0.04] border border-white/5 text-white/90 rounded-tl-none group-hover:bg-white/[0.06]"
              )}>
                <p className="break-words whitespace-pre-wrap">{msg.content}</p>
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2 pt-3 border-t border-white/5">
                    {msg.attachments.map(name => (
                      <span key={name} className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-white/40 border border-white/10 flex items-center gap-1.5">
                        <Paperclip size={10} /> {name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions for Assistant Messages */}
                {msg.role === 'assistant' && msg.id !== 'welcome' && (
                  <div className="mt-4 flex items-center gap-2 pt-3 border-t border-white/5 opacity-0 group-hover/msg:opacity-100 transition-opacity">
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(msg.content)
                        toast.success('Copied to clipboard!')
                      }}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all"
                    >
                      <Copy size={10} /> Copy
                    </button>
                    <button 
                      onClick={() => {
                        const blob = new Blob([msg.content], { type: 'text/markdown' })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement('a')
                        a.href = url
                        a.download = `smart-motor-report-${new Date().getTime()}.md`
                        a.click()
                        URL.revokeObjectURL(url)
                        toast.success('Report downloaded!')
                      }}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#34D399]/10 hover:bg-[#34D399]/20 text-[10px] font-black uppercase tracking-widest text-[#34D399] transition-all"
                    >
                      <Download size={10} /> Download .md
                    </button>
                  </div>
                )}
              </div>
              <span className="mt-2 text-[9px] font-bold text-white/20 uppercase tracking-widest px-2">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#34D399]/20 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin text-[#34D399]" />
                </div>
                <div className="px-6 py-4 rounded-3xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#34D399] animate-pulse">Assistant is thinking...</span>
                </div>
            </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-8 border-t border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Attachment Previews */}
          <AnimatePresence>
            {attachments.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-wrap gap-3 pb-2"
              >
                {attachments.map((file, i) => (
                  <div key={i} className="relative group rounded-xl overflow-hidden bg-white/5 border border-white/10 p-2 pr-10 flex items-center gap-3">
                    {file.preview ? (
                      <img src={file.preview} className="w-8 h-8 rounded-md object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center">
                        <Paperclip size={14} className="text-white/40" />
                      </div>
                    )}
                    <span className="text-[10px] font-bold text-white/60 truncate max-w-[150px]">{file.name}</span>
                    <button 
                      onClick={() => removeAttachment(i)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/20 hover:text-red-500 transition-all flex items-center justify-center"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-4 items-center bg-brand-charcoal rounded-2xl p-2 border border-white/[0.08] shadow-2xl focus-within:border-[#34D399]/40 transition-all">
            <input 
              type="file" 
              multiple 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              accept="image/*,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-10 h-10 rounded-xl hover:bg-white/5 text-white/30 hover:text-white transition-all flex items-center justify-center"
            >
              <Paperclip size={20} />
            </button>
            
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend()
              }}
              placeholder="Ask anything, upload files, or perform operations..."
              className="flex-1 bg-transparent border-0 py-3 text-sm text-white placeholder:text-white/20 focus:ring-0"
              disabled={isLoading}
            />
            
            <button
              onClick={() => handleSend()}
              disabled={isLoading || (!input.trim() && attachments.length === 0)}
              className={cn(
                "w-12 h-10 rounded-xl flex items-center justify-center transition-all",
                (input.trim() || attachments.length > 0) && !isLoading
                  ? "bg-[#34D399] text-brand-dark hover:scale-[1.05]" 
                  : "bg-white/5 text-white/10"
              )}
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </div>
        </div>
        <p className="mt-4 text-center text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">
          Smart Motor AI Workbench v2.0 • Multimodal Capable
        </p>
      </div>
    </div>
  )
}

