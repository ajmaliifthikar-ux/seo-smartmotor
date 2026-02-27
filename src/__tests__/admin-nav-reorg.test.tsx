import { describe, it, expect } from 'vitest'
import { adminNavigation } from '../lib/admin-nav'

describe('Admin Navigation Reorganization', () => {
  it('should have 5 main departments', () => {
    expect(adminNavigation).toHaveLength(5)
  })

  it('should contain the Marketing & B.I. department', () => {
    const marketing = adminNavigation.find(n => n.id === 'marketing-bi')
    expect(marketing).toBeDefined()
    expect(marketing?.label).toBe('Marketing & B.I.')
  })

  it('should have the correct items under Marketing & B.I.', () => {
    const marketing = adminNavigation.find(n => n.id === 'marketing-bi')
    const itemIds = marketing?.items.map(i => i.id)
    expect(itemIds).toContain('seo-intelligence')
    expect(itemIds).toContain('content-studio')
    expect(itemIds).toContain('blog-manager')
    expect(itemIds).toContain('social-planner')
  })

  it('should group Customer Management correctly', () => {
    const customerMgmt = adminNavigation.find(n => n.id === 'customer-management')
    const itemIds = customerMgmt?.items.map(i => i.id)
    expect(itemIds).toContain('client-database')
    expect(itemIds).toContain('loyalty-program')
  })
})
