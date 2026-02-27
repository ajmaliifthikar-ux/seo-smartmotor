/**
 * Audio Player Utility
 * Handles queued playback of raw PCM audio chunks
 * compatible with Gemini Multimodal Live API.
 */

export class AudioPlayer {
  private audioContext: AudioContext | null = null
  private nextStartTime: number = 0
  private sampleRate: number = 24000 // Gemini default output rate

  constructor(sampleRate: number = 24000) {
    this.sampleRate = sampleRate
  }

  /**
   * Play a chunk of base64 encoded PCM audio
   */
  async playChunk(base64Data: string) {
    try {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      }

      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume()
      }

      const binaryString = window.atob(base64Data)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }

      const audioData = new Int16Array(bytes.buffer)
      const audioBuffer = this.audioContext.createBuffer(1, audioData.length, this.sampleRate)
      const channelData = audioBuffer.getChannelData(0)
      
      for (let i = 0; i < audioData.length; i++) {
        channelData[i] = audioData[i] / 32768.0
      }

      const source = this.audioContext.createBufferSource()
      source.buffer = audioBuffer
      source.connect(this.audioContext.destination)

      // Queue playback
      const currentTime = this.audioContext.currentTime
      if (this.nextStartTime < currentTime) {
        this.nextStartTime = currentTime
      }

      source.start(this.nextStartTime)
      this.nextStartTime += audioBuffer.duration
    } catch (error) {
      console.error('Failed to play audio chunk:', error)
    }
  }

  /**
   * Stop all playback and clear queue
   */
  stop() {
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close()
      this.audioContext = null
    }
    this.nextStartTime = 0
  }
}
