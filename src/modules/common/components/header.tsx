import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import SignedIn from "~/modules/auth/components/signed-in";
import SignedOut from "~/modules/auth/components/signed-out";
import UserButton from "~/modules/auth/components/user-button";
import { BuyMeACoffeeButton } from "~/components/ui/buy-me-a-coffee";

type HeaderProps = {};

export default function Header({}: HeaderProps) {
	return (
		<header className="container mx-auto mt-5 flex justify-end items-center gap-4 py-2">
			<BuyMeACoffeeButton username="4vian" />
			<SignedIn>
				<UserButton />
			</SignedIn>
			<SignedOut>
				<div className="flex gap-2">
					<Link
						href="/login"
						className={buttonVariants({ variant: "outline" })}
					>
						Login
					</Link>
					<Link
						href="/register"
						className={buttonVariants({ variant: "default" })}
					>
						Register
					</Link>
				</div>
			</SignedOut>
		</header>
	);
}
