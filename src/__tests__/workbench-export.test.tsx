import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { WorkbenchChat } from '../components/admin/workbench/workbench-chat'

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

describe('WorkbenchChat Export System', () => {
  afterEach(() => {
    cleanup()
  })

  beforeEach(() => {
    // Mock window.URL.createObjectURL and revokeObjectURL
    window.URL.createObjectURL = vi.fn(() => 'blob:mock-url')
    window.URL.revokeObjectURL = vi.fn()
    
    // Mock anchor tag properties
    const originalCreateElement = document.createElement.bind(document)
    vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      const element = originalCreateElement(tagName)
      if (tagName === 'a') {
        // @ts-ignore
        element.click = vi.fn()
      }
      return element
    })
  })

  it('should render copy and download buttons for assistant messages', async () => {
    // We need to trigger an assistant message first, or mock the state
    // For simplicity in this test, I'll just check if they are rendered after handleSend
    // But since it's an async process, I'll mock the fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ response: 'Test AI response' })
    })

    render(<WorkbenchChat />)
    
    const input = screen.getByPlaceholderText(/Ask anything/i)
    fireEvent.change(input, { target: { value: 'Hello' } })
    
    // The send button is the one with the lucide-send icon or just the last button in the input area
    const buttons = screen.getAllByRole('button')
    const sendButton = buttons[buttons.length - 1]
    fireEvent.click(sendButton)

    // Wait for AI response
    const assistantMsg = await screen.findByText('Test AI response')
    expect(assistantMsg).toBeDefined()

    // Check if buttons exist (they are inside the message group)
    // They might be hidden by opacity-0 but still in DOM
    expect(screen.getByText(/Download .md/i)).toBeDefined()
    expect(screen.getByText(/Copy/i)).toBeDefined()
  })
})
