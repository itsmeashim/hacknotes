import type React from "react";
import { useEffect, useRef, useState } from "react";
import { TableCell, TableRow } from "~/components/ui/table";
import type { WriteupWithRelations } from "~/lib/types";

// Skeleton row component for lazy loading
export const WriteupRowSkeleton: React.FC = () => {
	return (
		<TableRow className="border-gray-200 border-b dark:border-gray-700">
			<TableCell className="p-4">
				<div className="h-4 w-[500px] animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
			</TableCell>
			<TableCell className="p-4">
				<div className="flex gap-1">
					<div className="h-6 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
					<div className="h-6 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
				</div>
			</TableCell>
			<TableCell className="p-4">
				<div className="flex gap-1">
					<div className="h-6 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
				</div>
			</TableCell>
			<TableCell className="p-4">
				<div className="flex gap-1">
					<div className="h-6 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
				</div>
			</TableCell>
			<TableCell className="p-4">
				<div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
			</TableCell>
			<TableCell className="p-4">
				<div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
			</TableCell>
			<TableCell className="p-4">
				<div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
			</TableCell>
		</TableRow>
	);
};

// Generate multiple skeleton rows
export const WriteupTableSkeleton: React.FC<{ count?: number }> = ({
	count = 20,
}) => {
	return (
		<>
			{Array.from({ length: count }).map((_, index) => (
				<WriteupRowSkeleton key={index} />
			))}
		</>
	);
};

// Intersection observer hook for lazy loading
export const useIntersectionObserver = (callback: () => void, options = {}) => {
	const observerRef = useRef<IntersectionObserver | null>(null);
	const targetRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (targetRef.current) {
			observerRef.current = new IntersectionObserver(([entry]) => {
				if (entry?.isIntersecting) {
					callback();
				}
			}, options);

			observerRef.current.observe(targetRef.current);
		}

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, [callback, options]);

	return targetRef;
};

// Lazy loading container component
export const LazyLoadingTrigger: React.FC<{
	onVisible: () => void;
	loading?: boolean;
}> = ({ onVisible, loading = false }) => {
	const triggerRef = useIntersectionObserver(onVisible);

	return (
		<div ref={triggerRef} className="flex h-10 items-center justify-center">
			{loading && (
				<div className="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
			)}
		</div>
	);
};

// Example implementation for lazy loading writeups
export const LazyLoadedWriteupsTable: React.FC = () => {
	const [writeups, setWriteups] = useState<WriteupWithRelations[]>([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	// Simulated fetch function - replace with actual API call
	const fetchWriteups = async (pageNum: number) => {
		setLoading(true);
		try {
			// Replace with actual API call
			// const response = await api.writeups.getWriteups.query({
			//   page: pageNum,
			//   // other params
			// });

			// Simulate API response
			await new Promise((resolve) => setTimeout(resolve, 500));

			// Mock data - replace with actual data
			const newWriteups: WriteupWithRelations[] = [];

			// Check if we have more data
			const hasMoreData = pageNum < 5; // Example condition

			setWriteups((prev) => [...prev, ...newWriteups]);
			setHasMore(hasMoreData);
			setPage(pageNum);
		} catch (error) {
			console.error("Error fetching writeups:", error);
		} finally {
			setLoading(false);
		}
	};

	// Initial load
	useEffect(() => {
		void fetchWriteups(1);
	}, []);

	// Load more function for intersection observer
	const loadMore = () => {
		if (!loading && hasMore) {
			void fetchWriteups(page + 1);
		}
	};

	return (
		<div className="overflow-x-auto">
			<table className="w-full">
				<thead>
					<tr className="bg-gray-100 dark:bg-gray-800">
						<th className="p-4 text-left">Title</th>
						<th className="p-4 text-left">Authors</th>
						<th className="p-4 text-left">Programs</th>
						<th className="p-4 text-left">Bugs</th>
						<th className="p-4 text-left">Bounty</th>
						<th className="p-4 text-left">Published</th>
						<th className="p-4 text-left">Added</th>
					</tr>
				</thead>
				<tbody>
					{writeups.map((writeup) => (
						<tr
							key={writeup.id}
							className="border-gray-200 border-b dark:border-gray-700"
						>
							{/* Replace with actual row content */}
							<td className="p-4">{writeup.title}</td>
							<td className="p-4">{/* Authors badges */}</td>
							<td className="p-4">{/* Programs badges */}</td>
							<td className="p-4">{/* Bugs badges */}</td>
							<td className="p-4">{writeup.bounty}</td>
							<td className="p-4">
								{writeup.publishedAt?.toLocaleDateString()}
							</td>
							<td className="p-4">{writeup.addedAt?.toLocaleDateString()}</td>
						</tr>
					))}

					{/* Show skeleton rows when loading */}
					{loading && <WriteupTableSkeleton count={10} />}

					{/* Lazy loading trigger */}
					{hasMore && (
						<tr>
							<td colSpan={7}>
								<LazyLoadingTrigger onVisible={loadMore} loading={loading} />
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};
