import { Skeleton } from "@/components/ui/skeleton";

export function RepoDetailsSkeleton() {
	return (
		<div className="flex flex-col gap-4">
			<Skeleton className="h-4 w-40" />
			<Skeleton className="h-8 w-64" />
			<Skeleton className="h-20 w-full max-w-2xl" />
			<div className="flex gap-3">
				<Skeleton className="h-6 w-20" />
				<Skeleton className="h-6 w-24" />
			</div>
			<Skeleton className="h-9 w-44" />
		</div>
	);
}
