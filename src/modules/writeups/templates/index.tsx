"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

import IsAdmin from "~/modules/auth/components/is-admin"
import { api } from "~/trpc/react"
import { DeleteAllModal } from "../components/delete-all-modal"
import { WriteupsTableWrapper } from "../table/table-wrapper"

export default function WriteupsTemplate() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const utils = api.useUtils()

  const fetchMutation = api.writeups.fetchAndCreateFromJson.useMutation({
    onSuccess: (result) => {
      if (result.count > 0) {
        toast.success(
          `${result.count} writeups fetched and created successfully`
        )
        void utils.writeups.getWriteups.invalidate()
      } else {
        toast.error("No new writeups found")
      }
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const fetchHackerankMutation =
    api.writeups.fetchAndCreateFromJsonForHackerank.useMutation({
      onSuccess: (result) => {
        if (result.count > 0) {
          toast.success(
            `${result.count} writeups fetched and created successfully`
          )
          void utils.writeups.getWriteups.invalidate()
        } else {
          toast.error("No new writeups found")
        }
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })

  return (
    <div className='container mx-auto pb-10  pt-4'>
      <div className='flex md:items-center gap-4 flex-col md:flex-row justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Writeups</h1>
          <p className='text-muted-foreground'>
            A collection of writeups from various bug bounty programs
          </p>
        </div>
        <div className='gap-2 flex items-center'>
          {/* <Button
            variant='destructive'
            onClick={() => setDeleteModalOpen(true)}
          >
            Delete All
          </Button> */}
          <IsAdmin>
            <Button
              variant='outline'
              loading={fetchMutation.isPending}
              onClick={() => fetchMutation.mutate()}
            >
              Fetch From Site
            </Button>
            <Button
              variant='outline'
              loading={fetchHackerankMutation.isPending}
              onClick={() => fetchHackerankMutation.mutate()}
            >
              Fetch From Hackerank
            </Button>
          </IsAdmin>
        </div>
      </div>

      <Card className='mt-8'>
        <CardHeader>
          <CardTitle>All Writeups</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <WriteupsTableWrapper />
        </CardContent>
      </Card>

      <DeleteAllModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
      />
    </div>
  )
}
