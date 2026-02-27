import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAudioStreamer } from '../hooks/use-audio-streamer'

// Mock MediaRecorder
class MockMediaRecorder {
  state = 'inactive'
  stream = {
    getTracks: () => [{ stop: vi.fn() }]
  }
  start() { this.state = 'recording' }
  stop() { this.state = 'inactive' }
  ondataavailable = null
}

// Mock AudioContext
class MockAudioContext {
  state = 'running'
  close() { this.state = 'closed' }
  decodeAudioData() { return Promise.resolve({}) }
  createBufferSource() {
    return {
      connect: vi.fn(),
      start: vi.fn(),
      buffer: null
    }
  }
  destination = {}
}

describe('useAudioStreamer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Setup globals
    global.MediaRecorder = MockMediaRecorder as any
    (global.MediaRecorder as any).isTypeSupported = vi.fn().mockReturnValue(true)
    
    global.AudioContext = MockAudioContext as any
    
    // Mock navigator.mediaDevices
    Object.defineProperty(global.navigator, 'mediaDevices', {
      value: {
        getUserMedia: vi.fn().mockResolvedValue({
          getTracks: () => [{ stop: vi.fn() }]
        })
      },
      writable: true
    })
  })

  it('should cleanup resources on unmount', async () => {
    const { result, unmount } = renderHook(() => useAudioStreamer())
    
    // Start streaming to initialize MediaRecorder
    await result.current.startStreaming(() => {})
    
    // Trigger internal lazy init of AudioContext by calling play (or just manually setting it if possible)
    // For this test, we'll just check if the refs are cleaned up if they were active
    
    // We need to access the internal refs, but in a hook test we check behavior
    // Since we mocked the classes, we can check their instances
    
    const stopSpy = vi.spyOn(MockMediaRecorder.prototype, 'stop')
    const closeSpy = vi.spyOn(MockAudioContext.prototype, 'close')
    
    // To trigger AudioContext init
    await result.current.playAudioBuffer('SGVsbG8=') // Base64 for 'Hello'
    
    unmount()
    
    expect(stopSpy).toHaveBeenCalled()
    expect(closeSpy).toHaveBeenCalled()
  })
})
