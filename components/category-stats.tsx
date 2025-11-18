"use client";

import {
	getAverageCategoryPrice,
	getCategoriesCount,
} from "@/lib/api/category/queries";
import { useQueries } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { formatCurrency } from "@/lib/utils";

export default function CategoryStats() {
	const [
		{ data: categoriesCount, isPending: isCategoriesCountPending },
		{ data: activeCategoriesCount, isPending: isActiveCategoriesCountPending },
		{ data: averageCategoryPrice, isPending: isAverageCategoryPricePending },
	] = useQueries({
		queries: [
			{
				queryKey: ["categories", "count"],
				queryFn: () => getCategoriesCount(),
				select: (data: { count: number }) => data.count,
			},
			{
				queryKey: ["categories", "count", { active_only: true }],
				queryFn: () => getCategoriesCount(true),
				select: (data: { count: number }) => data.count,
			},
			{
				queryKey: ["categories", "average-price"],
				queryFn: () => getAverageCategoryPrice(),
				select: (data: { average_min_price: number }) => data.average_min_price,
			},
		],
	});

	return (
		<div className="grid gap-4 md:grid-cols-3">
			<Card className="bg-card">
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium text-muted-foreground">
						Total Categories
					</CardTitle>
				</CardHeader>
				<CardContent>
					{isCategoriesCountPending ? (
						<div className="space-y-2">
							<div className="h-8 bg-gray-200 rounded animate-pulse"></div>
							<div className="h-3 bg-gray-100 rounded w-20 animate-pulse"></div>
						</div>
					) : (
						<div className="text-2xl font-bold text-foreground">
							{categoriesCount}
						</div>
					)}

					<p className="mt-1 text-xs text-muted-foreground">
						All categories in system
					</p>
				</CardContent>
			</Card>
			<Card className="bg-card">
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium text-muted-foreground">
						Active Categories
					</CardTitle>
				</CardHeader>
				<CardContent>
					{isActiveCategoriesCountPending ? (
						<div className="space-y-2">
							<div className="h-8 bg-gray-200 rounded animate-pulse"></div>
							<div className="h-3 bg-gray-100 rounded w-20 animate-pulse"></div>
						</div>
					) : (
						<div className="text-2xl font-bold text-foreground">
							{activeCategoriesCount}
						</div>
					)}

					<p className="mt-1 text-xs text-muted-foreground">
						All categories in system
					</p>
				</CardContent>
			</Card>
			<Card className="bg-card">
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium text-muted-foreground">
						Average Category Price
					</CardTitle>
				</CardHeader>
				<CardContent>
					{isAverageCategoryPricePending ? (
						<div className="space-y-2">
							<div className="h-8 bg-gray-200 rounded animate-pulse"></div>
							<div className="h-3 bg-gray-100 rounded w-20 animate-pulse"></div>
						</div>
					) : (
						<div className="text-2xl font-bold text-foreground">
							{formatCurrency(averageCategoryPrice)}
						</div>
					)}

					<p className="mt-1 text-xs text-muted-foreground">
						Average minimum price across all categories
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
