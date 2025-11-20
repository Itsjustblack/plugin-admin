"use client";

import { Button } from "@/components/ui/button";
import {
	deleteCategory,
	activateCategory,
	deactivateCategory,
} from "@/lib/api/category/actions";
import { getAllCategories } from "@/lib/api/category/queries";
import { PAGE_SIZE } from "@/lib/constants";
import { Category } from "@/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2, Power, Eye, MoreVertical } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DataTable } from "../data-table";
import { Badge } from "../ui/badge";
import { formatCurrency } from "@/lib/utils";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

interface CategoryActionsMenuProps {
	categoryId: string;
	isActive: boolean;
	isDeleting: boolean;
	isToggling: boolean;
	onActivate: (categoryId: string) => void;
	onDeactivate: (categoryId: string) => void;
	onDelete: (categoryId: string) => void;
}

function CategoryActionsMenu({
	categoryId,
	isActive,
	isDeleting,
	isToggling,
	onActivate,
	onDeactivate,
	onDelete,
}: CategoryActionsMenuProps) {
	const [open, setOpen] = useState(false);

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="h-8 w-8 p-0"
					disabled={isDeleting || isToggling}
				>
					<MoreVertical className="h-4 w-4" />
					<span className="sr-only">Open menu</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-44 p-1"
				align="end"
			>
				<div className="flex flex-col gap-1">
					<Link href={`/category/${categoryId}`}>
						<button
							className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
							onClick={() => setOpen(false)}
						>
							<Eye className="h-4 w-4" />
							<span>View Details</span>
						</button>
					</Link>

					<button
						className={`flex items-center gap-3 w-full px-3 py-2 text-sm rounded-sm transition-colors ${
							isActive
								? "text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-950"
								: "text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950"
						}`}
						disabled={isToggling || isDeleting}
						onClick={() => {
							if (isActive) onDeactivate(categoryId);
							else onActivate(categoryId);
							setOpen(false);
						}}
					>
						<Power className="h-4 w-4" />
						<span>{isActive ? "Deactivate" : "Activate"}</span>
					</button>

					<button
						className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950 transition-colors"
						disabled={isDeleting || isToggling}
						onClick={() => {
							onDelete(categoryId);
							setOpen(false);
						}}
					>
						<Trash2 className="h-4 w-4" />
						<span>Delete</span>
					</button>
				</div>
			</PopoverContent>
		</Popover>
	);
}

export function CategoriesTable() {
	const [deletingId, setDeletingId] = useState<string | null>(null);
	const [togglingId, setTogglingId] = useState<string | null>(null);

	const [pageParams, setPageParams] = useState({
		pageIndex: 0,
		pageSize: PAGE_SIZE,
	});

	const { data, isPending, refetch } = useQuery({
		queryKey: ["categories"],
		queryFn: () => getAllCategories(),
		// queryFn: () =>
		// 	getAllCategories({
		// 		limit: pageParams.pageSize,
		// 		offset: pageParams.pageIndex * pageParams.pageSize,
		// 	}),
	});

	const { mutate: removeCategory } = useMutation({
		mutationFn: deleteCategory,
		onMutate: (categoryId) => {
			setDeletingId(categoryId);
		},
		onSuccess: () => {
			toast.success("Category Removed");
		},
		onSettled: () => {
			setDeletingId(null);
			refetch();
		},
	});

	const { mutate: toggleActivate } = useMutation({
		mutationFn: activateCategory,
		onMutate: (categoryId) => {
			setTogglingId(categoryId);
		},
		onSuccess: () => {
			toast.success("Category Activated");
		},
		onSettled: () => {
			setTogglingId(null);
			refetch();
		},
	});

	const { mutate: toggleDeactivate } = useMutation({
		mutationFn: deactivateCategory,
		onMutate: (categoryId) => {
			setTogglingId(categoryId);
		},
		onSuccess: () => {
			toast.success("Category Deactivated");
		},
		onSettled: () => {
			setTogglingId(null);
			refetch();
		},
	});

	const categories = data ?? [];

	const columns: ColumnDef<Category>[] = [
		// {
		// 	id: "select",
		// 	header: ({ table }) => (
		// 		<Checkbox
		// 			checked={table.getIsAllPageRowsSelected()}
		// 			onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
		// 			aria-label="Select all"
		// 		/>
		// 	),
		// 	cell: ({ row }) => (
		// 		<Checkbox
		// 			checked={row.getIsSelected()}
		// 			disabled={!row.getCanSelect()}
		// 			onCheckedChange={(value) => row.toggleSelected(!!value)}
		// 			aria-label="Select row"
		// 		/>
		// 	),
		// 	enableSorting: false,
		// 	enableHiding: false,
		// 	size: 40,
		// },
		{
			accessorKey: "name",
			header: "Name",
			cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
		},

		{
			accessorKey: "description",
			header: "Description",
			cell: ({ row }) => (
				<div className="text-sm text-muted-foreground max-w-md">
					{row.original.description || "No description"}
				</div>
			),
		},

		{
			accessorKey: "min_price",
			header: "Min Price",
			cell: ({ row }) => <div>{formatCurrency(row.original.min_price)}</div>,
		},

		{
			accessorKey: "is_active",
			header: "Active",
			cell: ({ row }) => (
				<Badge variant={row.original.is_active ? "default" : "outline"}>
					{row.original.is_active ? "Active" : "Inactive"}
				</Badge>
			),
		},

		{
			id: "actions",
			header: "Actions",
			cell: ({ row }) => {
				const categoryId = String(row.original.id);
				const isDeleting = deletingId === categoryId;
				const isToggling = togglingId === categoryId;
				const isActive = row.original.is_active;

				return (
					<CategoryActionsMenu
						categoryId={categoryId}
						isActive={isActive}
						isDeleting={isDeleting}
						isToggling={isToggling}
						onActivate={toggleActivate}
						onDeactivate={toggleDeactivate}
						onDelete={removeCategory}
					/>
				);
			},
		},
	];

	return (
		<DataTable
			data={categories}
			columns={columns}
			isPending={isPending}
			withPagination={true}
			manualPagination={false}
			pagination={pageParams}
			setPagination={setPageParams}
			getRowId={(row) => row.id.toString()}
		/>
	);
}
