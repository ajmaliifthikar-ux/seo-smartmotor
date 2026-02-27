'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader, AlertCircle, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  metadata?: Record<string, any>
}

export interface AgenticChatProps {
  title: string
  description: string
  placeholder?: string
  agentEndpoint: string
  icon?: React.ReactNode
  onMessageSent?: (message: string) => void
  initialMessage?: string
}

export function AgenticChat({
  title,
  description,
  placeholder = 'Ask me anything...',
  agentEndpoint,
  icon,
  onMessageSent,
  initialMessage
}: AgenticChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (initialMessage) {
      handleSendMessage(initialMessage)
    }
  }, [initialMessage])

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || input.trim()
    if (!text) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setError(null)
    onMessageSent?.(text)

    try {
      const response = await fetch(agentEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messages }),
      })

      if (!response.ok) {
        throw new Error(`Failed to get response: ${response.statusText}`)
      }

      const data = await response.json()

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || data.message || 'No response',
        timestamp: new Date(),
        metadata: data.metadata,
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-white/[0.06] bg-white/[0.02] backdrop-blur-xl">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3 mb-2">
            {icon && <div className="text-[#A78BFA]">{icon}</div>}
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">{title}</h1>
          </div>
          <p className="text-xs text-white/40 font-bold uppercase tracking-[0.2em]">{description}</p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-4 shadow-2xl">
              <Sparkles className="w-8 h-8 text-[#A78BFA]" />
            </div>
            <p className="text-white/20 text-center max-w-sm text-xs font-bold uppercase tracking-widest leading-relaxed">
              Start a conversation to get AI-powered insights and recommendations.
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  'flex gap-3 group',
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-[#A78BFA]/20 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                    <Sparkles className="w-4 h-4 text-[#A78BFA]" />
                  </div>
                )}

                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-5 py-4 text-xs font-medium leading-relaxed shadow-xl relative overflow-hidden',
                    msg.role === 'user'
                      ? 'bg-brand-dark border border-white/10 text-white rounded-tr-none'
                      : 'bg-white/[0.03] border border-white/5 text-white/90 rounded-tl-none'
                  )}
                >
                  {msg.role === 'assistant' && <div className="absolute top-0 left-0 w-0.5 h-full bg-[#A78BFA]" />}
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  {msg.metadata && (
                    <div className="mt-3 pt-3 border-t border-white/5 text-[9px] font-black uppercase tracking-widest text-white/20">
                      {Object.entries(msg.metadata).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span>{key}:</span> 
                          <span className="text-white/40">{JSON.stringify(value)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center shadow-lg">
                  <Loader className="w-4 h-4 text-[#A78BFA] animate-spin" />
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl px-5 py-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#A78BFA] animate-pulse">Thinking...</p>
                </div>
              </div>
            )}
            {error && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 shadow-lg">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                </div>
                <div className="bg-red-500/5 text-red-400 border border-red-500/10 rounded-2xl px-5 py-4 text-xs">
                  <p className="font-bold">{error}</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 border-t border-white/[0.06] bg-white/[0.01] backdrop-blur-3xl p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex gap-4 max-w-4xl mx-auto"
        >
          <div className="flex-1 relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              disabled={loading}
              className="w-full px-5 py-3.5 rounded-2xl border border-white/[0.08] bg-brand-charcoal text-white placeholder:text-white/20 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/20 transition-all shadow-2xl"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className={cn(
              'px-8 py-3.5 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 transition-all shadow-2xl',
              loading || !input.trim()
                ? 'bg-white/5 text-white/10 cursor-not-allowed'
                : 'bg-[#A78BFA] text-brand-dark hover:scale-[1.05] active:scale-[0.95]'
            )}
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
