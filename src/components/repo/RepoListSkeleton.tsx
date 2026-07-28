import { Skeleton } from "@/components/ui/skeleton";

export function RepoListSkeleton({ count = 6 }: { count?: number }) {
	return (
		<div className="flex flex-col gap-3">
			{Array.from(
				{ length: count },
				(_, index) => `repo-skeleton-${index}`,
			).map((key) => (
				<div
					key={key}
					className="flex flex-col gap-2 rounded-lg border border-border p-4"
				>
					<Skeleton className="h-5 w-48" />
					<Skeleton className="h-4 w-full max-w-lg" />
					<div className="flex gap-3">
						<Skeleton className="h-4 w-16" />
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-4 w-24" />
					</div>
				</div>
			))}
		</div>
	);
}
