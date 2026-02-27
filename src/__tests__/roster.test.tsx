import { describe, it, expect } from 'vitest'

// We'll test the mapping logic that will be refactored into a utility
function mapRoleToDepartment(role: string): string {
    const r = role.toUpperCase()
    if (r.includes('ADMIN')) return 'Management'
    if (r.includes('MARKETING')) return 'Marketing'
    if (r.includes('TECH') || r.includes('MECHANIC')) return 'Workshop'
    if (r.includes('SERVICE')) return 'Service Center'
    return 'General'
}

describe('Roster Mapping Logic', () => {
  it('should map ADMIN roles to Management', () => {
    expect(mapRoleToDepartment('SUPER_ADMIN')).toBe('Management')
    expect(mapRoleToDepartment('admin')).toBe('Management')
  })

  it('should map STAFF roles to appropriate departments', () => {
    expect(mapRoleToDepartment('SENIOR_MECHANIC')).toBe('Workshop')
    expect(mapRoleToDepartment('SERVICE_ADVISOR')).toBe('Service Center')
    expect(mapRoleToDepartment('MARKETING_LEAD')).toBe('Marketing')
  })

  it('should return General for unknown roles', () => {
    expect(mapRoleToDepartment('CUSTOMER')).toBe('General')
    expect(mapRoleToDepartment('')).toBe('General')
  })
})
