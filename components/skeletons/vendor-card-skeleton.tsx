import { Skeleton } from "@/components/ui/skeleton";

export function VendorCardSkeleton() {
	return (
		<div className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-3">
			<div className="flex items-center gap-2 shrink-0 w-1/2">
				<Skeleton className="size-8 sm:size-10 rounded-full shrink-0" />
				<div className="w-full space-y-2">
					<Skeleton className="h-5 w-full" />
					<Skeleton className="h-4 w-2/4" />
				</div>
			</div>
		</div>
	);
}
