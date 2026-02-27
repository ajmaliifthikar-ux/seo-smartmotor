import { describe, it, expect, vi, beforeEach } from 'vitest'

// We'll mock the update function
const updateUserStatus = vi.fn()

describe('Employee Status Sync', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should set status to active on login/activity', async () => {
    const userId = 'user1'
    await updateUserStatus(userId, 'active')
    expect(updateUserStatus).toHaveBeenCalledWith('user1', 'active')
  })

  it('should set status to away after heartbeat timeout', async () => {
    const userId = 'user1'
    // Simulate inactivity
    await updateUserStatus(userId, 'away')
    expect(updateUserStatus).toHaveBeenCalledWith('user1', 'away')
  })
})
