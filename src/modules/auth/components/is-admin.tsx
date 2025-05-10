"use client"

import type { Session, User } from "better-auth"
import { useRouter } from "next/navigation"
import { useSession } from "~/modules/common/hooks/use-session"

interface IsAdminProps {
  children:
    | (({
        session,
      }: {
        session: {
          user: User
          session: Session
        } | null
      }) => React.ReactNode)
    | React.ReactNode

  redirect?: string
}

export default function IsAdmin({ children, redirect }: IsAdminProps) {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session?.data) {
    return null
  }

  if (session.data.user.role !== "admin") {
    if (redirect) {
      router.push(redirect)
    }
    return null
  }

  if (typeof children === "function") {
    return <>{children({ session: session.data })}</>
  }

  return <>{children}</>
}
