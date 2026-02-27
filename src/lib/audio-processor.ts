/**
 * Audio Processor Utility
 * Handles real-time audio downsampling to 16kHz PCM 16-bit Mono
 * compatible with Gemini Multimodal Live API.
 */

export class AudioProcessor {
  private audioContext: AudioContext | null = null
  private scriptProcessor: ScriptProcessorNode | null = null
  private source: MediaStreamAudioSourceNode | null = null
  private stream: MediaStream | null = null
  private isRecording: boolean = false

  /**
   * Start processing microphone input
   * @param onAudioData Callback with base64 encoded 16kHz PCM data
   */
  async start(onAudioData: (base64Data: string) => void) {
    if (this.isRecording) return
    
    try {
      this.isRecording = true
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      // We create the context. We'll check the actual sample rate after creation.
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const nativeSampleRate = this.audioContext.sampleRate
      
      this.source = this.audioContext.createMediaStreamSource(this.stream)
      
      // 4096 buffer size
      this.scriptProcessor = this.audioContext.createScriptProcessor(4096, 1, 1)

      this.scriptProcessor.onaudioprocess = (event) => {
        const inputData = event.inputBuffer.getChannelData(0)
        
        // Resample to 16kHz if necessary
        const resampledData = this.resample(inputData, nativeSampleRate, 16000)
        
        const pcmData = this.floatTo16BitPCM(resampledData)
        const base64Data = this.arrayBufferToBase64(pcmData)
        onAudioData(base64Data)
      }

      this.source.connect(this.scriptProcessor)
      this.scriptProcessor.connect(this.audioContext.destination)
      
      console.log(`🎙️ Audio processing started. Native rate: ${nativeSampleRate}Hz, Target: 16000Hz`)
    } catch (error) {
      console.error('Failed to start audio processing:', error)
      throw error
    }
  }

  /**
   * Simple linear interpolation resampling
   */
  private resample(data: Float32Array, fromRate: number, toRate: number): Float32Array {
    if (fromRate === toRate) return data
    
    const ratio = fromRate / toRate
    const newLength = Math.round(data.length / ratio)
    const result = new Float32Array(newLength)
    
    for (let i = 0; i < newLength; i++) {
      const pos = i * ratio
      const index = Math.floor(pos)
      const frac = pos - index
      
      if (index + 1 < data.length) {
        result[i] = data[index] * (1 - frac) + data[index + 1] * frac
      } else {
        result[i] = data[index]
      }
    }
    
    return result
  }

  /**
   * Stop processing
   */
  stop() {
    this.isRecording = false
    
    if (this.scriptProcessor) {
      this.scriptProcessor.disconnect()
      this.scriptProcessor.onaudioprocess = null
      this.scriptProcessor = null
    }

    if (this.source) {
      this.source.disconnect()
      this.source = null
    }

    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop())
      this.stream = null
    }

    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close()
      this.audioContext = null
    }
    
    console.log('🎙️ Audio processing stopped')
  }

  /**
   * Convert Float32Array to 16-bit PCM ArrayBuffer
   */
  private floatTo16BitPCM(input: Float32Array): ArrayBuffer {
    const buffer = new ArrayBuffer(input.length * 2)
    const view = new DataView(buffer)
    for (let i = 0; i < input.length; i++) {
      const s = Math.max(-1, Math.min(1, input[i]))
      view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true)
    }
    return buffer
  }

  /**
   * Convert ArrayBuffer to Base64
   */
  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    const len = bytes.byteLength
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
  }
}
