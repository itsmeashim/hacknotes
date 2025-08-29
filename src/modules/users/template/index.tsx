"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { UsersTable } from "../table/table";

type UsersTemplateProps = {};

export default function UsersTemplate({}: UsersTemplateProps) {
	return (
		<div className="container mx-auto pt-4 pb-10">
			<div className="flex flex-col justify-between gap-4 md:flex-row">
				<div>
					<h1 className="font-bold text-3xl tracking-tight">Users</h1>
					<p className="text-muted-foreground">
						Manage user accounts and roles
					</p>
				</div>
			</div>

			<Card className="mt-8">
				<CardHeader>
					<CardTitle>All Users</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<UsersTable />
				</CardContent>
			</Card>
		</div>
	);
}
