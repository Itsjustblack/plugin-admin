"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllLinkedVendors } from "@/lib/api/category/queries";
import { formatCurrency } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MoreVertical, DollarSign } from "lucide-react";
import { VendorCardSkeleton } from "./skeletons/vendor-card-skeleton";
import { unlinkVendorToCategory } from "@/lib/api/vendor/actions";

interface Props {
	categoryId: number;
}

export function VendorList({ categoryId }: Props) {
	const { data, isPending } = useQuery({
		queryKey: ["linked-vendors", categoryId],
		queryFn: () => getAllLinkedVendors(categoryId),
	});

	const { mutate: unlinkVendor, isPending: isUnlinking } = useMutation({
		mutationFn: unlinkVendorToCategory,
	});

	const linkedVendors = data ?? [];

	if (isPending) {
		return (
			<div className="space-y-2">
				{Array.from({ length: 3 }).map((_, index) => (
					<VendorCardSkeleton key={index} />
				))}
			</div>
		);
	}

	if (linkedVendors.length === 0) {
		return (
			<div className="flex items-center justify-center rounded-lg border border-border bg-muted/30 p-8">
				<p className="text-sm text-muted-foreground">
					No linked vendors found for this category
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-2">
			{linkedVendors.map((linkedVendor) => (
				<div
					key={linkedVendor.id}
					className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-3"
				>
					{/* Vendor ID */}
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
								<span className="text-xs font-semibold text-primary">
									#{linkedVendor.vendor_id}
								</span>
							</div>
							<div className="min-w-0">
								<p className="text-sm font-semibold">
									Vendor ID: {linkedVendor.vendor_id}
								</p>
								<p className="text-xs text-muted-foreground">
									Link ID: {linkedVendor.id}
								</p>
							</div>
						</div>
					</div>

					{/* Min Price */}
					<div className="flex items-center gap-2 text-sm">
						<DollarSign className="h-4 w-4 text-muted-foreground" />
						<div>
							<p className="text-xs text-muted-foreground">Min Price</p>
							<p className="font-semibold">
								{formatCurrency(linkedVendor.min_price)}
							</p>
						</div>
					</div>

					{/* Action Menu */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 shrink-0"
							>
								<MoreVertical className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>View Details</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() =>
									unlinkVendor({
										category_id: linkedVendor.category_id,
										vendor_id: linkedVendor.vendor_id,
									})
								}
								disabled={isUnlinking}
								className="text-red-600"
							>
								Unlink Vendor
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			))}
		</div>
	);
}
