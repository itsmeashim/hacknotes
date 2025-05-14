import { type ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { DataTableColumnHeader } from "~/components/data-table/data-table-column"
import { Badge } from "~/components/ui/badge"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "~/components/ui/tooltip"
import { type WriteupWithRelations } from "~/lib/types"
import { WriteupActions } from "./actions"
const titleColumn = (
  onSourceChoose: (value: string) => void,
  onSeverityChoose: (value: string) => void
): ColumnDef<WriteupWithRelations> => ({
  accessorKey: "title",
  enableSorting: false,
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title='Title' />
  ),
  cell: ({ row }) => {
    return (
      <div className='flex items-center justify-between'>
        <Link
          target='_blank'
          className='text-amber-200 block w-[500px] text-wrap'
          href={row.original.link as string}
        >
          {row.original.source === "pentesterland" && (
            <Tooltip>
              <TooltipTrigger>
                <img
                  src='https://pentester.land/favicon.ico'
                  alt='PentesterLand'
                  className='inline-block w-4 h-4 mr-2'
                  onClick={(e) => {
                    e.preventDefault()
                    onSourceChoose("pentesterland")
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>PentesterLand</TooltipContent>
            </Tooltip>
          )}
          {row.original.source === "hackerone" && (
            <Tooltip>
              <TooltipTrigger>
                <div
                  className='inline-flex items-center justify-center w-4 h-4 mr-2 rounded-full bg-green-500'
                  onClick={(e) => {
                    e.preventDefault()
                    onSourceChoose("hackerone")
                  }}
                >
                  <img
                    src='https://hackerone.com/favicon.ico'
                    alt='HackerOne'
                    className='inline-block w-3 h-3'
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>HackerOne</TooltipContent>
            </Tooltip>
          )}
          {row.original.title}
        </Link>
        {row.original.severity && row.original.severity !== "none" && (
          <Badge
            variant={row.original.severity as "critical" | "high" | "medium" | "low"}
            onClick={() => onSeverityChoose(row.original.severity as string)}
          >
            {row.original.severity}
          </Badge>
        )}
      </div>
    )
  },
})

const commonColumns = (
  onAuthorAdd: (value: string) => void,
  onProgramAdd: (value: string) => void,
  onBugAdd: (value: string) => void
): ColumnDef<WriteupWithRelations>[] => [
  {
    accessorKey: "authors",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Authors' />
    ),
    cell: ({ row }) => {
      const authors = row.original.authors
      return (
        <div className='flex flex-wrap gap-1'>
          {authors
            .filter((a: string | null): a is string => a !== null)
            .map((author: string) => (
              <Badge
                onClick={() => onAuthorAdd(author)}
                key={author}
                variant='secondary'
              >
                {author}
              </Badge>
            ))}
        </div>
      )
    },
    size: 150,
  },
  {
    accessorKey: "programs",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Programs' />
    ),
    cell: ({ row }) => {
      const programs = row.original.programs
      return (
        <div className='flex flex-wrap gap-1'>
          {programs
            .filter((p: string | null): p is string => p !== null)
            .map((program: string) => (
              <Badge
                onClick={() => onProgramAdd(program)}
                key={program}
                variant='outline'
              >
                {program}
              </Badge>
            ))}
        </div>
      )
    },
    size: 150,
  },
  {
    accessorKey: "bugs",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Bugs' />
    ),
    cell: ({ row }) => {
      const bugs = row.original.bugs
      return (
        <div className='flex flex-wrap gap-1'>
          {bugs
            .filter((b: string | null): b is string => b !== null)
            .map((bug: string) => (
              <Badge
                onClick={() => onBugAdd(bug)}
                key={bug}
                variant='destructive'
              >
                {bug}
              </Badge>
            ))}
        </div>
      )
    },
    size: 150,
  },

  {
    accessorKey: "bounty",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Bounty' />
    ),
    size: 100,
  },
  {
    accessorKey: "publishedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Published' />
    ),
    cell: ({ row }) => {
      const date = row.getValue("publishedAt") as Date | null
      return date ? date.toLocaleDateString() : null
    },
    size: 120,
  },
  {
    accessorKey: "addedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Added' />
    ),
    cell: ({ row }) => {
      const date = row.getValue("addedAt") as Date | null
      return date ? date.toLocaleDateString() : null
    },
    size: 120,
  },
]

export const columns = (
  onAuthorAdd: (value: string) => void,
  onProgramAdd: (value: string) => void,
  onBugAdd: (value: string) => void,
  onSourceChoose: (value: string) => void,
  onSeverityChoose: (value: string) => void
): ColumnDef<WriteupWithRelations>[] => [
  titleColumn(onSourceChoose, onSeverityChoose),
  ...commonColumns(onAuthorAdd, onProgramAdd, onBugAdd),
]

export const authColumns = (
  onAuthorAdd: (value: string) => void,
  onProgramAdd: (value: string) => void,
  onBugAdd: (value: string) => void,
  onSourceChoose: (value: string) => void,
  onSeverityChoose: (value: string) => void
): ColumnDef<WriteupWithRelations>[] => [
  titleColumn(onSourceChoose, onSeverityChoose),
  {
    id: "actions",
    header: "Actions",
    size: 100,
    cell: ({ row }) => <WriteupActions writeup={row.original} />,
  },
  ...commonColumns(onAuthorAdd, onProgramAdd, onBugAdd),
]
