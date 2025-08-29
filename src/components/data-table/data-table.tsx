"use client";

import { flexRender } from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { useReadStatus } from "~/modules/writeups/context/read-status-context";
import { WriteupTableSkeleton } from "~/modules/writeups/lazy-loading-skeleton";
import { useDataTable } from "./data-table-context";

export function DataTable() {
	const { table, columns, data, total, isLoading } = useDataTable();
	const { readStatus, setInitialReadStatus } = useReadStatus();

	return (
		<div>
			{/* <DataTableViewOptions table={table} /> */}
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<WriteupTableSkeleton />
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => {
								// Initialize read status from the original data
								if (row.original.id !== undefined) {
									setInitialReadStatus(
										row.original.id,
										row.original.isRead || false,
									);
								}

								// Use the context's read status if available, otherwise fall back to the original
								const isRowRead =
									row.original.id !== undefined
										? readStatus[row.original.id] !== undefined
											? readStatus[row.original.id]
											: row.original.isRead
										: false;

								return (
									<TableRow
										key={row.id}
										data-read={isRowRead ? "true" : "false"}
										data-state={row.getIsSelected() && "selected"}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								);
							})
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
