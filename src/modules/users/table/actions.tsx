import type { UserWithRole } from "better-auth/plugins"
import { ShieldAlert, ShieldCheck } from "lucide-react"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip"
import IsAdmin from "~/modules/auth/components/is-admin"
import { useDemoteUser, useMakeAdmin } from "../mutations/use-set-user-role"

interface UserActionsProps {
  user: UserWithRole
}

export function UserActions({ user }: UserActionsProps) {
  const makeAdminMutation = useMakeAdmin()
  const demoteUserMutation = useDemoteUser()
  return (
    <IsAdmin>
      {({ session }) => (
        <div className='flex items-center gap-2'>
          <Dialog>
            <DialogTrigger asChild>
              {user.id !== session?.user?.id && (
                <Button variant='ghost' size='icon'>
                  {user.role === "admin" ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <ShieldAlert className='h-4 w-4' />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Demote to user</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <ShieldCheck className='h-4 w-4' />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Promote to admin</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </Button>
              )}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Role</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Are you sure you want to change the role of {user.email}?
                {user.role === "admin"
                  ? "Demote to user"
                  : "Promote to admin. Admin will have full access to the system, including fetching new notes and deleting all existing notes."}
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant='outline'>Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    variant='default'
                    onClick={() => {
                      if (user.role === "admin") {
                        demoteUserMutation.mutate({ userId: user.id })
                      } else {
                        makeAdminMutation.mutate({ userId: user.id })
                      }
                    }}
                  >
                    Confirm
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </IsAdmin>
  )
}
