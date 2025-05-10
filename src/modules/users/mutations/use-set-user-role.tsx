import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import authClient from "~/lib/auth-client"

export const useMakeAdmin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { userId: string }) =>
      authClient.admin.setRole({ userId: data.userId, role: "admin" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success(`User role updated successfully`)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export const useDemoteUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { userId: string }) =>
      authClient.admin.setRole({ userId: data.userId, role: "user" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success(`User role updated successfully`)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
