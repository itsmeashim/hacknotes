import Link from "next/link";
import RegisterTemplate from "~/modules/auth/templates/register";

export default function RegisterPage() {
	const allowRegistration = process.env.ALLOW_REGISTRATION === "true";
	if (!allowRegistration) {
		return (
			<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
				<div className="flex w-full max-w-sm flex-col items-center gap-4">
					<div className="space-y-2 text-center">
						<h1 className="font-bold text-2xl">Registration Disabled</h1>
						<p className="text-muted-foreground">
							Registration is currently not allowed on this platform.
						</p>
					</div>
					<div className="w-full">
						<Link href="/login" className="w-full">
							<button className="h-10 w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90">
								Go to Login
							</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
			<div className="w-full max-w-sm">
				<RegisterTemplate />
			</div>
		</div>
	);
}
