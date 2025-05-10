import Link from "next/link"
import { buttonVariants } from "~/components/ui/button"
import SignedIn from "~/modules/auth/components/signed-in"
import SignedOut from "~/modules/auth/components/signed-out"
import UserButton from "~/modules/auth/components/user-button"

interface HeaderProps {}

export default function Header({}: HeaderProps) {
  return (
    <header className='container flex justify-end py-2 mt-5 mx-auto'>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <div className='flex gap-2'>
          <Link
            href='/login'
            className={buttonVariants({ variant: "outline" })}
          >
            Login
          </Link>
          <Link
            href='/register'
            className={buttonVariants({ variant: "default" })}
          >
            Register
          </Link>
        </div>
      </SignedOut>
    </header>
  )
}
