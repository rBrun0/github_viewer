import { Skeleton } from "@/components/ui/skeleton";

export function PageSkeleton() {
	return (
		<div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8">
			<Skeleton className="h-10 w-full max-w-md" />
			<div className="flex gap-4">
				<Skeleton className="size-24 rounded-full" />
				<div className="flex flex-1 flex-col gap-3">
					<Skeleton className="h-7 w-48" />
					<Skeleton className="h-16 w-full" />
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-24 w-full" />
				<Skeleton className="h-24 w-full" />
			</div>
		</div>
	);
}
