import type { Session, User } from "better-auth"
import { useSession } from "~/modules/common/hooks/use-session"

interface SignedInProps {
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
}

export default function SignedIn({ children }: SignedInProps) {
  const { data: session } = useSession()

  if (!session?.data?.user) {
    return null
  }

  if (typeof children === "function") {
    return children({ session: session.data })
  }

  return <>{children}</>
}
