"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { DataTable } from "~/components/data-table/data-table"
import { DataTableViewOptions } from "~/components/data-table/data-table-column-toggle"
import { DataTableProvider } from "~/components/data-table/data-table-context"
import { Button } from "~/components/ui/button"
import { useWriteupsSearch } from "~/hooks/use-writeups-search"
import { type WriteupWithRelations } from "~/lib/types"
import { useSession } from "~/modules/common/hooks/use-session"
import { api } from "~/trpc/react"
import { DownloadNotesButton } from "../components/download-notes-button"
import { SearchInput } from "../components/search-input"
import { authColumns, columns } from "./column"

export function WriteupsTable() {
  const [searchParams, setSearchParams] = useWriteupsSearch()
  const [page, setPage] = useState(1)

  const { data: session } = useSession()

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [
    searchParams.search,
    searchParams.authors,
    searchParams.programs,
    searchParams.bugs,
    searchParams.onlyWithNotes,
    searchParams.onlyRead,
    searchParams.source,
    searchParams.severity,
  ])

  const { data: writeups, isLoading, isFetching } = api.writeups.getWriteups.useQuery(
    {
      search: searchParams.search,
      authors: searchParams.authors,
      programs: searchParams.programs,
      bugs: searchParams.bugs,
      onlyWithNotes: searchParams.onlyWithNotes,
      onlyRead: searchParams.onlyRead,
      source: searchParams.source as "hackerone" | "pentesterland" | "all",
      severity: searchParams.severity as
        | "low"
        | "medium"
        | "high"
        | "critical"
        | "none"
        | "all",
      sortBy: searchParams.sortBy as "publishedAt" | "addedAt",
      sortOrder: searchParams.sortOrder as "asc" | "desc",
      page,
    },
    {
      suspense: false, // Disable suspense to handle loading states manually
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
    }
  )



  const tableColumns = session?.data
    ? authColumns(
        (value) =>
          setSearchParams({ authors: [...searchParams.authors, value] }),
        (value) =>
          setSearchParams({ programs: [...searchParams.programs, value] }),
        (value) => setSearchParams({ bugs: [...searchParams.bugs, value] }),
        (value) => setSearchParams({ source: value }),
        (value) => setSearchParams({ severity: value })
      )
    : columns(
        (value) =>
          setSearchParams({ authors: [...searchParams.authors, value] }),
        (value) =>
          setSearchParams({ programs: [...searchParams.programs, value] }),
        (value) => setSearchParams({ bugs: [...searchParams.bugs, value] }),
        (value) => setSearchParams({ source: value }),
        (value) => setSearchParams({ severity: value })
      )

  // Simplified state management - we don't need to track searching state anymore
  // since we've removed all loading indicators

  return (
    <DataTableProvider<WriteupWithRelations>
      columns={tableColumns}
      data={writeups?.items ?? []}
      isLoading={isLoading || isFetching}
      total={writeups?.pageCount ?? 0}
    >
      {({ table }) => (
        <div className='space-y-4'>
          <div className='flex justify-between gap-4'>
            <SearchInput
              search={searchParams.search}
              onSearchChange={(value) => {
                // Update the search parameter without blocking the UI
                setSearchParams((prev) => ({ ...prev, search: value }))
              }}
              authors={searchParams.authors}
              onAuthorAdd={(value) => {
                setSearchParams((prev) => ({
                  ...prev,
                  authors: [...prev.authors, value]
                }))
              }}
              onAuthorRemove={(value) => {
                setSearchParams((prev) => ({
                  ...prev,
                  authors: prev.authors.filter((a) => a !== value),
                }))
              }}
              programs={searchParams.programs}
              onProgramAdd={(value) => {
                setSearchParams((prev) => ({
                  ...prev,
                  programs: [...prev.programs, value]
                }))
              }}
              onProgramRemove={(value) => {
                setSearchParams((prev) => ({
                  ...prev,
                  programs: prev.programs.filter((p) => p !== value),
                }))
              }}
              bugs={searchParams.bugs}
              onBugAdd={(value) => {
                setSearchParams((prev) => ({
                  ...prev,
                  bugs: [...prev.bugs, value]
                }))
              }}
              onBugRemove={(value) => {
                setSearchParams((prev) => ({
                  ...prev,
                  bugs: prev.bugs.filter((b) => b !== value),
                }))
              }}

            />
          </div>

          {/* Always show the table, but with loading state when needed */}
          <div className='flex justify-between items-center gap-3 mt-4'>
            <div className="text-sm text-muted-foreground">
              {writeups && writeups.total > 0 && (
                <span>Showing {writeups.items.length} of {writeups.total} writeups</span>
              )}
            </div>

            <div className='flex items-center gap-3'>
              {writeups && writeups.pageCount > 1 && (
                <div className='flex items-center justify-end space-x-2 bg-muted/20 p-1 rounded-md border border-muted/30'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => {
                      setPage((p) => Math.max(1, p - 1))
                    }}
                    disabled={page === 1 || isFetching}
                    className="h-8 w-8 p-0 rounded-md"
                  >
                    <ChevronLeft className='h-4 w-4' />
                  </Button>
                  <div className='text-sm font-medium px-2'>
                    {page} / {writeups?.pageCount || 1}
                  </div>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => {
                      setPage((p) => Math.min(writeups?.pageCount || 1, p + 1))
                    }}
                    disabled={page === (writeups?.pageCount || 1) || isFetching}
                    className="h-8 w-8 p-0 rounded-md"
                  >
                    <ChevronRight className='h-4 w-4' />
                  </Button>
                </div>
              )}
              <div>
                <DataTableViewOptions table={table} />
              </div>
              <DownloadNotesButton />
            </div>
          </div>

          {/* Show skeleton loader during initial load */}

            <div>
              <DataTable  />
            </div>
        </div>
      )}
    </DataTableProvider>
  )
}
