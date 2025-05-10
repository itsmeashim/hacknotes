"use client"

import type { UserWithRole } from "better-auth/plugins"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { DataTable } from "~/components/data-table/data-table"
import { DataTableViewOptions } from "~/components/data-table/data-table-column-toggle"
import { DataTableProvider } from "~/components/data-table/data-table-context"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { api } from "~/trpc/react"
import { useUsers } from "../queries/use-users"
import { columns } from "./column"

export function UsersTable() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [role, setRole] = useState<string>("all")
  const limit = 10

  const { data: users, isLoading } = useUsers({
    page,
    limit,
    search,
    role,
  })

  const { data: notesCount } = api.writeups.countNotes.useQuery()

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
        <div className='rounded-lg border p-4 shadow-sm'>
          <h3 className='text-lg font-semibold'>Total Users</h3>
          <p className='text-3xl font-bold mt-2'>
            {users?.data?.total || users?.data?.users?.length}
          </p>
        </div>
        <div className='rounded-lg border p-4 shadow-sm'>
          <h3 className='text-lg font-semibold'>Total Notes</h3>
          <p className='text-3xl font-bold mt-2'>{notesCount || 0}</p>
        </div>
      </div>
      <DataTableProvider<UserWithRole>
        columns={columns}
        data={users?.data?.users ?? []}
        isLoading={isLoading}
        total={users?.data?.total ?? 0}
      >
        {({ table }) => (
          <div className='space-y-4'>
            <div className='flex items-center gap-4'>
              <Input
                placeholder='Search users...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='max-w-sm'
              />
              <Select value={role} onValueChange={(value) => setRole(value)}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Filter by role' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All roles</SelectItem>
                  <SelectItem value='user'>User</SelectItem>
                  <SelectItem value='admin'>Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex justify-end gap-3'>
              {users && users.data && users.data?.total > limit && (
                <div className='flex items-center justify-end space-x-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeft className='h-4 w-4' />
                  </Button>
                  <div className='text-sm'>
                    Page {page} of {Math.ceil(users.data.total / limit)}
                  </div>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() =>
                      setPage((p) =>
                        Math.min(Math.ceil(users.data.total / limit), p + 1)
                      )
                    }
                    disabled={page === Math.ceil(users.data.total / limit)}
                  >
                    <ChevronRight className='h-4 w-4' />
                  </Button>
                </div>
              )}
              <div>
                <DataTableViewOptions table={table} />
              </div>
            </div>
            <DataTable />
          </div>
        )}
      </DataTableProvider>
    </div>
  )
}
