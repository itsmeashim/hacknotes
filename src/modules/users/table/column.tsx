import { type ColumnDef } from "@tanstack/react-table"
import type { UserWithRole } from "better-auth/plugins"
import { DataTableColumnHeader } from "~/components/data-table/data-table-column"
import { Badge } from "~/components/ui/badge"
import { UserActions } from "./actions"

export const columns: ColumnDef<UserWithRole>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => {
      return <div className='font-medium'>{row.getValue("email")}</div>
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Username' />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("username")}</div>
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Role' />
    ),
    cell: ({ row }) => {
      const role = row.getValue("role") as string
      return (
        <Badge variant={role === "admin" ? "destructive" : "secondary"}>
          {role}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <UserActions user={row.original} />,
  },
]
