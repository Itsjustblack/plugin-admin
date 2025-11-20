"use client";

import { getCategoryById } from "@/lib/api/category/queries";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

interface CategoryDetailsProps {
	categoryId: number;
}

export default function CategoryDetails({ categoryId }: CategoryDetailsProps) {
	const { data: category, isPending } = useQuery({
		queryKey: ["categories", categoryId],
		queryFn: () => getCategoryById(categoryId),
	});

	if (isPending) {
		return (
			<div className="space-y-6">
				<div className="space-y-4">
					<div className="flex items-center gap-4">
						<Skeleton className="h-9 w-20" />
						<div className="flex items-start justify-between flex-1">
							<div className="space-y-2 flex-1">
								<Skeleton className="h-10 w-64" />
								<Skeleton className="h-6 w-full max-w-xl" />
							</div>
							<Skeleton className="h-8 w-24 rounded-full" />
						</div>
					</div>

					<div className="grid grid-cols-3 gap-4 pt-4">
						<div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
							<Skeleton className="h-4 w-28" />
							<Skeleton className="h-8 w-24" />
						</div>
						<div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-8 w-16" />
						</div>
						<div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-5 w-32" />
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="space-y-4">
				<div className="flex items-center gap-4">
					<Link href="/">
						<Button
							variant="ghost"
							size="icon"
							className="h-9 w-9"
						>
							<ArrowLeft className="h-5 w-5" />
						</Button>
					</Link>
					<div className="flex items-start justify-between flex-1">
						<div className="space-y-2">
							<h1 className="text-4xl font-bold">{category?.name}</h1>
							<p className="text-lg text-muted-foreground">
								{category?.description}
							</p>
						</div>
						<Badge
							variant={category?.is_active ? "default" : "secondary"}
							className="text-sm px-3 py-1"
						>
							{category?.is_active ? "Active" : "Inactive"}
						</Badge>
					</div>
				</div>

				<div className="grid grid-cols-3 gap-4 pt-4">
					<div className="rounded-lg border border-border bg-muted/30 p-4">
						<p className="text-sm font-medium text-muted-foreground">
							Category ID
						</p>
						<p className="text-2xl font-bold">#{category?.id}</p>
					</div>
					<div className="rounded-lg border border-border bg-muted/30 p-4">
						<p className="text-sm font-medium text-muted-foreground">
							Minimum Price
						</p>
						<p className="text-2xl font-bold">
							{formatCurrency(category?.min_price)}
						</p>
					</div>
					<div className="rounded-lg border border-border bg-muted/30 p-4">
						<p className="text-sm font-medium text-muted-foreground">Created</p>
						<p className="text-xl font-semibold">
							{category?.created_at ? formatDate(category.created_at) : "N/A"}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
