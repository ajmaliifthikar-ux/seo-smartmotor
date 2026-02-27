/**
 * useNativeAudio Hook - CLIENT SIDE ONLY
 * Use 'use client' directive in component
 */

'use client'

import { useCallback, useState, useRef, useEffect } from 'react'
import {
  initializeNativeAudioSession,
  type AudioStreamChunk,
  type NativeAudioConfig,
} from '@/lib/gemini-native-audio'
import { AudioProcessor } from '@/lib/audio-processor'
import { AudioPlayer } from '@/lib/audio-player'

export function useNativeAudio(
  conversationId: string = `conv_${Date.now()}`,
  voiceName: string = 'Zephyr'
) {
  const [isStreaming, setIsStreaming] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [transcript, setTranscript] = useState('')

  const sessionRef = useRef<any>(null)
  const audioProcessorRef = useRef<AudioProcessor | null>(null)
  const audioPlayerRef = useRef<AudioPlayer | null>(null)

  const handleChunk = useCallback((chunk: AudioStreamChunk) => {
    switch (chunk.type) {
      case 'text':
        setTranscript((prev) => prev + (chunk.content || ''))
        break
      case 'audio':
        if (chunk.audioData) {
          if (!audioPlayerRef.current) {
            audioPlayerRef.current = new AudioPlayer()
          }
          audioPlayerRef.current.playChunk(chunk.audioData)
        }
        break
      case 'error':
        setError(chunk.error || 'Unknown error')
        break
      case 'turn_complete':
      case 'done':
        setIsStreaming(false)
        break
      case 'metadata':
        if (chunk.content === 'connected') {
          setIsConnected(true)
        }
        break
    }
  }, [])

  // Initialize session on mount
  useEffect(() => {
    let isInitializing = true
    
    const initSession = async () => {
      try {
        // Get API key from fetch to server endpoint (key is never exposed to client)
        const response = await fetch('/api/ai/get-key')
        const { key } = await response.json()

        if (!isInitializing) return // Cleanup if unmounted during fetch

        const config: NativeAudioConfig = {
          userId: `user_${Date.now()}`,
          conversationId,
          voiceName,
          apiKey: key,
        }

        const session = await initializeNativeAudioSession(
          config,
          key,
          handleChunk
        )
        
        if (!isInitializing) {
          session.close()
          return
        }

        sessionRef.current = session
        setIsConnected(session.isConnected())
      } catch (err) {
        if (isInitializing) {
          console.error('Session init error:', err)
          setError(err instanceof Error ? err.message : 'Failed to init session')
        }
      }
    }

    initSession()

    return () => {
      isInitializing = false
      audioProcessorRef.current?.stop()
      audioPlayerRef.current?.stop()
      sessionRef.current?.close()
    }
  }, [conversationId, voiceName, handleChunk])

  const sendAudio = useCallback(async (audioBase64: string, mimeType: string = 'audio/pcm') => {
    if (!sessionRef.current) {
      setError('Session not initialized')
      return
    }

    setIsStreaming(true)
    setError(null)
    setTranscript('')

    try {
      sessionRef.current.sendAudio(audioBase64, mimeType)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Send failed')
      setIsStreaming(false)
    }
  }, [])

  const sendText = useCallback(async (text: string) => {
    if (!sessionRef.current) {
      setError('Session not initialized')
      return
    }

    setIsStreaming(true)
    setError(null)
    setTranscript('')

    try {
      sessionRef.current.sendText(text)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Send failed')
      setIsStreaming(false)
    }
  }, [])

  const startListening = useCallback(async () => {
    if (!sessionRef.current) {
      setError('Session not initialized')
      return
    }

    try {
      if (!audioProcessorRef.current) {
        audioProcessorRef.current = new AudioProcessor()
      }

      setIsStreaming(true)
      setError(null)
      setTranscript('')

      await audioProcessorRef.current.start((base64Data) => {
        if (sessionRef.current && sessionRef.current.isConnected()) {
          sessionRef.current.sendAudio(base64Data, 'audio/pcm;rate=16000')
        }
      })
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Microphone access denied'
      )
      setIsStreaming(false)
    }
  }, [sendAudio])

  const stopListening = useCallback(() => {
    if (audioProcessorRef.current) {
      audioProcessorRef.current.stop()
    }
    setIsStreaming(false)
  }, [])

  const reset = useCallback(() => {
    setIsStreaming(false)
    setError(null)
    setTranscript('')
    audioPlayerRef.current?.stop()
  }, [])

  return {
    isStreaming,
    isConnected,
    error,
    transcript,
    sendAudio,
    sendText,
    startListening,
    stopListening,
    reset,
  }
}
