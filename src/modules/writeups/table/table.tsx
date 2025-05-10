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

  const { data: writeups, isLoading } = api.writeups.getWriteups.useQuery(
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
      suspense: true,
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

  return (
    <DataTableProvider<WriteupWithRelations>
      columns={tableColumns}
      data={writeups?.items ?? []}
      isLoading={isLoading}
      total={writeups?.pageCount ?? 0}
    >
      {({ table, isLoading }) => (
        <div className='space-y-4'>
          <div className='flex justify-between gap-4'>
            <SearchInput
              search={searchParams.search}
              onSearchChange={(value) => setSearchParams({ search: value })}
              authors={searchParams.authors}
              onAuthorAdd={(value) =>
                setSearchParams({ authors: [...searchParams.authors, value] })
              }
              onAuthorRemove={(value) =>
                setSearchParams({
                  authors: searchParams.authors.filter((a) => a !== value),
                })
              }
              programs={searchParams.programs}
              onProgramAdd={(value) =>
                setSearchParams({ programs: [...searchParams.programs, value] })
              }
              onProgramRemove={(value) =>
                setSearchParams({
                  programs: searchParams.programs.filter((p) => p !== value),
                })
              }
              bugs={searchParams.bugs}
              onBugAdd={(value) =>
                setSearchParams({ bugs: [...searchParams.bugs, value] })
              }
              onBugRemove={(value) =>
                setSearchParams({
                  bugs: searchParams.bugs.filter((b) => b !== value),
                })
              }
            />
          </div>
          {!isLoading && (
            <>
              <div className='flex justify-end gap-3'>
                {writeups && writeups.pageCount > 1 && (
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
                      Page {page} of {writeups.pageCount}
                    </div>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        setPage((p) => Math.min(writeups.pageCount, p + 1))
                      }
                      disabled={page === writeups.pageCount}
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
              <DataTable />
            </>
          )}
        </div>
      )}
    </DataTableProvider>
  )
}
