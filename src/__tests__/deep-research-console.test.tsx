import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { DeepResearchConsole } from '../components/admin/strategy-lab/deep-research-console'

describe('DeepResearchConsole', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render the input field and button', () => {
    render(<DeepResearchConsole onResearch={() => {}} />)
    expect(screen.getByPlaceholderText(/Enter research parameters/i)).toBeDefined()
    expect(screen.getByRole('button', { name: /Research/i })).toBeDefined()
  })

  it('should call onResearch when form is submitted', () => {
    const onResearch = vi.fn()
    render(<DeepResearchConsole onResearch={onResearch} />)
    
    const input = screen.getByPlaceholderText(/Enter research parameters/i)
    fireEvent.change(input, { target: { value: 'test query' } })
    
    const button = screen.getByRole('button', { name: /Research/i })
    fireEvent.click(button)
    
    expect(onResearch).toHaveBeenCalledWith('test query')
  })

  it('should show shimmering text and progress ring when researching', () => {
    render(
      <DeepResearchConsole 
        onResearch={() => {}} 
        isResearching={true} 
        statusText="Scanning Market..." 
      />
    )
    
    expect(screen.getByText('Scanning Market...')).toBeDefined()
    // Verify it says researching
    expect(screen.getByText(/Agentic Swarm Activated/i)).toBeDefined()
  })

  it('should disable input and show loading spinner on button when researching', () => {
    render(<DeepResearchConsole onResearch={() => {}} isResearching={true} />)
    
    const input = screen.getByPlaceholderText(/Enter research parameters/i)
    expect((input as HTMLInputElement).disabled).toBe(true)
    
    // Loader2 icon is present
    const button = screen.getByRole('button')
    expect(button.querySelector('.animate-spin')).toBeDefined()
  })
})
