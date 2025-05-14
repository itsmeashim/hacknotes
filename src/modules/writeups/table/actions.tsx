import { Check } from "lucide-react"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { type WriteupWithRelations } from "~/lib/types"
import { NoteModal } from "~/modules/writeups/components/note-modal"
import { useReadStatus } from "~/modules/writeups/context/read-status-context"
import { api } from "~/trpc/react"

interface WriteupActionsProps {
  writeup: WriteupWithRelations
}

export function WriteupActions({ writeup }: WriteupActionsProps) {
  const utils = api.useUtils()
  const { readStatus, toggleReadStatus } = useReadStatus()

  // Get the current read status from context
  const isRead = writeup.id !== undefined && readStatus[writeup.id] !== undefined
    ? readStatus[writeup.id]
    : writeup.isRead || false

  const { mutate: toggleRead } = api.writeups.toggleRead.useMutation({
    // Use optimistic updates for immediate UI feedback
    onMutate: () => {
      // Immediately update the read status in context
      if (writeup.id !== undefined) {
        toggleReadStatus(writeup.id)
      }

      // Update the total reads count without reloading the entire list
      void utils.writeups.totalReads.invalidate()

      // Optimistically update the UI without reloading all data
      utils.writeups.getWriteups.setData(
        // We need to match all possible query parameters
        {
          search: "",
          source: "all",
          severity: "all",
          page: 1,
        },
        (oldData) => {
          if (!oldData) return oldData

          return {
            ...oldData,
            items: oldData.items.map((item) => {
              if (item.id === writeup.id) {
                // Toggle the read status locally
                return {
                  ...item,
                  isRead: !item.isRead
                }
              }
              return item
            })
          }
        }
      )

      return { previousIsRead: isRead }
    },
    onSuccess: () => {
      if (!isRead) {
        toast.success("Writeup marked as unread")
      } else {
        toast.success("Writeup marked as read")
      }
    },
  })

  return (
    <div className='flex items-center gap-2'>
      <NoteModal writeupId={writeup.id} initialContent={writeup.note} />
      <Button
        variant='ghost'
        size='icon'
        onClick={() => toggleRead({ writeupId: writeup.id })}
        className={isRead ? "text-green-500" : ""}
      >
        <Check className='h-3 w-3' />
      </Button>
    </div>
  )
}
