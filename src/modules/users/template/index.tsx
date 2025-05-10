"use client"

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { UsersTable } from "../table/table"

interface UsersTemplateProps {}

export default function UsersTemplate({}: UsersTemplateProps) {
  return (
    <div className='container mx-auto pb-10 pt-4'>
      <div className='flex flex-col md:flex-row justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Users</h1>
          <p className='text-muted-foreground'>
            Manage user accounts and roles
          </p>
        </div>
      </div>

      <Card className='mt-8'>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <UsersTable />
        </CardContent>
      </Card>
    </div>
  )
}
