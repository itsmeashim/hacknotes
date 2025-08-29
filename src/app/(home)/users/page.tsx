import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import IsAdmin from "~/modules/auth/components/is-admin";
import UsersTemplate from "~/modules/users/template";

type UsersPageProps = {};

export default function UsersPage({}: UsersPageProps) {
	return (
		<IsAdmin redirect="/">
			<div className="container mx-auto">
				<Link href="/">
					<Button variant="outline" icon={<ArrowLeftIcon />} className="mb-2">
						Back
					</Button>
				</Link>
				<UsersTemplate />
			</div>
		</IsAdmin>
	);
}
