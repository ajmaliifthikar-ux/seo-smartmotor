'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

/**
 * Hook to manage audio streaming (recording and playback).
 * Uses MediaRecorder API for capture and Web Audio API for playback.
 */
export function useAudioStreamer() {
    const [isRecording, setIsRecording] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const mediaRecorder = useRef<MediaRecorder | null>(null)
    const audioContext = useRef<AudioContext | null>(null)

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
                mediaRecorder.current.stop()
                mediaRecorder.current.stream.getTracks().forEach(track => track.stop())
            }
            if (audioContext.current && audioContext.current.state !== 'closed') {
                audioContext.current.close()
            }
        }
    }, [])

    /**
     * Starts streaming audio from the microphone.
     * @param onData - Callback for when audio data chunks are available.
     */
    const startStreaming = useCallback(async (onData: (data: Blob) => void) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            
            // Check for supported mime types
            const mimeType = MediaRecorder.isTypeSupported('audio/webm') 
                ? 'audio/webm' 
                : 'audio/ogg'

            const recorder = new MediaRecorder(stream, { mimeType })
            
            recorder.ondataavailable = (e: BlobEvent) => {
                if (e.data.size > 0) onData(e.data)
            }

            recorder.start(500) // 500ms chunks for "real-time" feel
            mediaRecorder.current = recorder
            setIsRecording(true)
            setError(null)
        } catch (err: unknown) {
            const error = err as Error
            console.error('Audio capture error:', error)
            setError('Microphone access denied or not found.')
        }
    }, [])

    /**
     * Stops the current audio stream.
     */
    const stopStreaming = useCallback(() => {
        if (mediaRecorder.current) {
            mediaRecorder.current.stop()
            mediaRecorder.current.stream.getTracks().forEach(track => track.stop())
            mediaRecorder.current = null
        }
        setIsRecording(false)
    }, [])

    /**
     * Plays back a base64 encoded audio buffer.
     * @param base64Audio - The audio data in base64 format.
     */
    const playAudioBuffer = useCallback(async (base64Audio: string) => {
        if (!audioContext.current) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
            audioContext.current = new AudioContextClass()
        }

        try {
            const binaryString = window.atob(base64Audio)
            const bytes = new Uint8Array(binaryString.length)
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i)
            }
            
            const buffer = await audioContext.current.decodeAudioData(bytes.buffer)
            const source = audioContext.current.createBufferSource()
            source.buffer = buffer
            source.connect(audioContext.current.destination)
            source.start()
        } catch (err: unknown) {
            const error = err as Error
            console.error('Playback error:', error)
        }
    }, [])

    return {
        isRecording,
        error,
        startStreaming,
        stopStreaming,
        playAudioBuffer
    }
}

