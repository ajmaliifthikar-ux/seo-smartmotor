'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { GoogleGenAI, LiveServerMessage, Modality, MediaResolution, Session, Tool } from '@google/genai'
import { toast } from 'sonner'
import { parseMimeType, createWavHeader } from '@/lib/wav-utils'
import { LAYLA_TOOLS, GET_SYSTEM_INSTRUCTION } from '@/lib/ai/layla-config'
import { getBrandsWithModels, getServices, getAvailableSlots, searchCustomer } from '@/app/actions'
import { AudioPlayer } from '@/lib/audio-player'
import { AudioProcessor } from '@/lib/audio-processor'

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''
const MODEL = 'models/gemini-2.0-flash-exp' // Reverting to stable live model for maximum compatibility

export function useGeminiLive(onWidgetRequest?: (msg: any) => void) {
  const [isConnected, setIsConnected] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const sessionRef = useRef<any>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const audioPlayerRef = useRef<AudioPlayer | null>(null)
  const audioProcessorRef = useRef<AudioProcessor | null>(null)
  const workletNodeRef = useRef<AudioWorkletNode | null>(null)
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null)
  
  const disconnect = useCallback(() => {
    console.log('🔌 Disconnecting Layla...')
    if (sessionRef.current) {
      sessionRef.current.close()
      sessionRef.current = null
    }
    if (sourceNodeRef.current) {
      sourceNodeRef.current.disconnect()
      sourceNodeRef.current = null
    }
    if (workletNodeRef.current) {
      workletNodeRef.current.disconnect()
      workletNodeRef.current = null
    }
    if (audioProcessorRef.current) {
      audioProcessorRef.current.stop()
    }
    if (audioPlayerRef.current) {
      audioPlayerRef.current.stop()
    }
    setIsConnected(false)
    setIsSpeaking(false)
  }, [])

  // Auto-cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [disconnect])

  const playAudioChunk = async (inlineData: { mimeType: string, data: string }) => {
    if (!audioPlayerRef.current) {
      audioPlayerRef.current = new AudioPlayer(24000)
    }
    await audioPlayerRef.current.playChunk(inlineData.data)
  }

  const connect = useCallback(async () => {
    let isMounted = true
    
    try {
      // Get API key from secure server endpoint
      const keyResponse = await fetch('/api/ai/get-key')
      const { key } = await keyResponse.json()

      if (!isMounted) return

      if (!key) {
        toast.error('AI Configuration Missing')
        return
      }

      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 })
      }

      const [brands, services, geo] = await Promise.all([
        getBrandsWithModels().catch(() => []),
        getServices().catch(() => []),
        fetch('https://ipapi.co/json/').then(res => res.json()).catch(() => ({}))
      ])

      const systemInstruction = GET_SYSTEM_INSTRUCTION({
        currentTime: new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai', dateStyle: 'full', timeStyle: 'short' }),
        userLocation: `${geo.city || 'Unknown'}, ${geo.country_name || 'UAE'}`,
        brands: brands.map(b => b.name).join(', '),
        services: services.map(s => `${s.name} (ID: ${s.id})`).join(', ')
      })

      const ai = new GoogleGenAI({ apiKey: key })
      
      const session: any = await ai.live.connect({
        model: MODEL,
        systemInstruction: { parts: [{ text: systemInstruction }] },
        tools: LAYLA_TOOLS,
        responseModalities: [Modality.AUDIO],
        speechConfig: { 
          voiceConfig: { 
            prebuiltVoiceConfig: { 
              voiceName: 'Zephyr' 
            } 
          } 
        },
        callbacks: {
          onopen: () => {
            setIsConnected(true)
            toast.success('Layla connected')
            session.send({ 
              parts: [{ text: "Hello! I am Layla. How can I assist you today?" }] 
            })
          },
          onmessage: async (msg: LiveServerMessage) => {
            if (msg.serverContent?.modelTurn?.parts?.[0]?.inlineData) {
              const inlineData = msg.serverContent.modelTurn.parts[0].inlineData
              if (inlineData.data) {
                  setIsSpeaking(true)
                  await playAudioChunk({
                      mimeType: inlineData.mimeType || 'audio/pcm;rate=24000',
                      data: inlineData.data
                  })
              }
            }
            if (msg.serverContent?.turnComplete) {
              setIsSpeaking(false)
            }

            if (msg.toolCall) {
                const functionCalls = msg.toolCall.functionCalls || []
                const toolResponses = []

                for (const call of functionCalls) {
                    try {
                        let result: any = { success: false }
                        
                        if (call.name === 'create_booking') {
                            const response = await fetch('/api/bookings', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(call.args)
                            })
                            const json = await response.json()
                            result = { success: json.success, id: json.bookingId }
                        } 
                        else if (call.name === 'check_availability') {
                            const slots = await getAvailableSlots((call.args as any).date, (call.args as any).serviceId || 'mechanical')
                            result = { slots }
                        }
                        else if (call.name === 'search_customer') {
                            const history = await searchCustomer((call.args as any).query)
                            result = { history }
                        }
                        else if (call.name === 'request_user_input') {
                            if (onWidgetRequest) {
                                onWidgetRequest({
                                    content: (call.args as any).prompt,
                                    widget: { type: (call.args as any).type }
                                })
                            }
                            result = { status: 'displayed' }
                        }

                        toolResponses.push({
                            id: call.id,
                            name: call.name,
                            response: { result }
                        })
                    } catch (e: any) {
                        toolResponses.push({ id: call.id, name: call.name, response: { error: e.message } })
                    }
                }
                session.send({
                  functionResponses: toolResponses
                })
            }
          },
          onerror: (err: any) => {
            console.error('❌ WebSocket Error:', err)
            disconnect()
          },
          onclose: () => {
            setIsConnected(false)
          }
        }
      } as any)

      sessionRef.current = session
      // Start Microphone with robust resampling
      if (!audioProcessorRef.current) {
        audioProcessorRef.current = new AudioProcessor()
      }

      await audioProcessorRef.current.start((base64Data) => {
        if (sessionRef.current && isConnected) {
          sessionRef.current.send({
            parts: [{ inlineData: { mimeType: 'audio/pcm;rate=16000', data: base64Data } }]
          })
        }
      })

    } catch (err: any) {
      console.error('❌ Connection Failed:', err)
      toast.error('Failed to wake up Layla.')
    }
  }, [onWidgetRequest, disconnect])

  return { connect, disconnect, isConnected, isSpeaking, error }
}

// Helper functions removed as they are now in AudioProcessor
