import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { AIChatPanel } from '../components/ui/ai-chat-panel'

// Mock dependencies
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

vi.mock('@/hooks/use-gemini-live', () => ({
  useGeminiLive: () => ({
    connect: vi.fn(),
    disconnect: vi.fn(),
    isConnected: false,
    isSpeaking: false
  })
}))

describe('AIChatPanel Error Handling', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should display a specific error message for 401 Unauthorized', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401
    })

    render(<AIChatPanel isOpen={true} onClose={() => {}} />)
    
    const input = screen.getByPlaceholderText(/Ask anything/i)
    fireEvent.change(input, { target: { value: 'Hello' } })
    
    // Find the button that contains the Send icon (last button in the input area)
    const buttons = screen.getAllByRole('button')
    const sendButton = buttons[buttons.length - 1]
    fireEvent.click(sendButton)

    // Check for error message in the chat
    await waitFor(() => {
      expect(screen.getByText(/⚠️ ERROR: Session expired/i)).toBeDefined()
    }, { timeout: 2000 })
  })

  it('should display a specific error message for 500 Server Error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500
    })

    render(<AIChatPanel isOpen={true} onClose={() => {}} />)
    
    const input = screen.getByPlaceholderText(/Ask anything/i)
    fireEvent.change(input, { target: { value: 'Hello' } })
    
    const buttons = screen.getAllByRole('button')
    const sendButton = buttons[buttons.length - 1]
    fireEvent.click(sendButton)

    await waitFor(() => {
      expect(screen.getByText(/⚠️ ERROR: AI service temporarily unavailable/i)).toBeDefined()
    }, { timeout: 2000 })
  })
})
