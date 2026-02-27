import { getAllUsers } from '@/lib/firebase-db'
import { UserTable } from '@/components/admin/users/user-table'
import { CreateUserModal } from '@/components/admin/users/create-user-modal'
import { SearchInput } from '@/components/ui/search-input'

export default async function UsersPage({
    searchParams,
}: {
    searchParams: Promise<{ query?: string }>
}) {
    const { query = '' } = await searchParams

    let users: any[] = []
    try {
        const allUsers = await getAllUsers()
        
        // Filter out deleted users
        let filteredUsers = allUsers.filter((u: any) => !u.deletedAt)
        
        // Search if query provided
        if (query) {
            const lowerQuery = query.toLowerCase()
            filteredUsers = filteredUsers.filter((u: any) => 
                (u.name?.toLowerCase().includes(lowerQuery)) ||
                (u.email?.toLowerCase().includes(lowerQuery))
            )
        }
        
        // Sort by createdAt descending
        users = filteredUsers.sort((a: any, b: any) => {
            const timeA = a.createdAt?.toDate?.()?.getTime() || 0
            const timeB = b.createdAt?.toDate?.()?.getTime() || 0
            return timeB - timeA
        })
    } catch (error) {
        console.error('Failed to fetch users:', error)
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-brand-dark">User Management</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage platform users, roles, and permissions.</p>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <SearchInput placeholder="Search users..." />
                    <CreateUserModal />
                </div>
            </div>

            <UserTable users={users} />
        </div>
    )
}
