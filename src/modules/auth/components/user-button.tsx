"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useSession } from "~/modules/common/hooks/use-session";
import { useLogout } from "../mutations/use-logout";
import IsAdmin from "./is-admin";

interface UserButtonProps {
	className?: string;
}

export default function UserButton({ className }: UserButtonProps) {
	const { data: session } = useSession();
	const logout = useLogout();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className={className}>
					<Avatar>
						<AvatarImage />
						<AvatarFallback>
							{session?.data?.user?.name
								? session.data.user.name
										.split(" ")
										.map((part) => part.charAt(0))
										.join("")
								: ""}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end">
				<DropdownMenuItem asChild>
					<Link href="/settings" className="flex items-center gap-2">
						Settings
					</Link>
				</DropdownMenuItem>
				<IsAdmin>
					<DropdownMenuItem asChild>
						<Link href="/users" className="flex items-center gap-2">
							Users
						</Link>
					</DropdownMenuItem>
				</IsAdmin>
				<DropdownMenuItem
					variant="destructive"
					onClick={() =>
						logout.mutate(undefined, {
							onSuccess: () => {
								window.location.reload();
							},
						})
					}
				>
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
