import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { PlanningCalendar } from '../components/admin/social-media/planning-calendar'

describe('PlanningCalendar', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render the calendar month and year', () => {
    render(<PlanningCalendar />)
    const currentMonth = new Date().toLocaleString('default', { month: 'long' })
    const currentYear = new Date().getFullYear().toString()
    
    expect(screen.getAllByText(new RegExp(currentMonth, 'i'))).toBeDefined()
    expect(screen.getAllByText(new RegExp(currentYear, 'i'))).toBeDefined()
  })

  it('should render all days of the week', () => {
    render(<PlanningCalendar />)
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    days.forEach(day => {
      expect(screen.getByText(day)).toBeDefined()
    })
  })

  it('should open the content detail view when clicking a post', () => {
    render(<PlanningCalendar />)
    
    // Find a mock post (e.g. "Ceramic Coating Showcase")
    const post = screen.getByText(/Ceramic Coating Showcase/i)
    fireEvent.click(post)
    
    // Verify dialog content
    expect(screen.getByText(/Experience the ultimate protection/i)).toBeDefined()
    expect(screen.getByRole('button', { name: /Edit Content/i })).toBeDefined()
  })
})
