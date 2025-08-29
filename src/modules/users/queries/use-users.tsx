import { useQuery } from "@tanstack/react-query";
import authClient from "~/lib/auth-client";

export const useUsers = ({
	page,
	limit,
	search,
	role,
}: {
	page: number;
	limit: number;
	search?: string;
	role?: string;
}) => {
	return useQuery({
		queryKey: ["users", page, limit, search, role],
		queryFn: async () => {
			const response = await authClient.admin.listUsers({
				query: {
					limit,
					offset: (page - 1) * limit,
					searchField: "email",
					searchOperator: "contains",
					searchValue: search,
					filterField: role === "all" ? undefined : "role",
					filterOperator: "eq",
					filterValue: role === "all" ? undefined : role,
					sortBy: "createdAt",
					sortDirection: "desc",
				},
			});

			return response;
		},
	});
};
