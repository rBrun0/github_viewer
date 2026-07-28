import { Skeleton } from "@/components/ui/skeleton";

export function UserProfileSkeleton() {
	return (
		<section className="flex flex-col gap-4 sm:flex-row sm:items-start">
			<Skeleton className="size-24 shrink-0 rounded-full" />
			<div className="flex min-w-0 flex-1 flex-col gap-3">
				<Skeleton className="h-7 w-48" />
				<Skeleton className="h-4 w-32" />
				<Skeleton className="h-16 w-full max-w-xl" />
				<div className="flex gap-4">
					<Skeleton className="h-4 w-28" />
					<Skeleton className="h-4 w-28" />
				</div>
				<Skeleton className="h-4 w-56" />
			</div>
		</section>
	);
}
