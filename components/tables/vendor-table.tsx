"use client";

import { getAllVendors } from "@/lib/api/vendor/queries";
import { PAGE_SIZE } from "@/lib/constants";
import { Vendor } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "../data-table";
import { Badge } from "../ui/badge";

export function VendorsTable() {
	const [pageParams, setPageParams] = useState({
		pageIndex: 0,
	pageSize: PAGE_SIZE,
	});

	const { data, isPending } = useQuery({
		queryKey: ["vendors"],
		queryFn: () => getAllVendors(),
	});

	const vendors = data ?? [];

	const columns: ColumnDef<Vendor>[] = [
		{
			accessorKey: "full_name",
			header: "Full Name",
			cell: ({ row }) => (
				<div className="font-medium">{row.original.full_name}</div>
			),
		},

		{
			accessorKey: "email",
			header: "Email",
			cell: ({ row }) => (
				<div className="text-sm text-muted-foreground">
					{row.original.email}
				</div>
			),
		},

		{
			accessorKey: "phone_number",
			header: "Phone Number",
			cell: ({ row }) => (
				<div className="text-sm">
					{row.original.country_code} {row.original.phone_number}
				</div>
			),
		},

		{
			accessorKey: "status",
			header: "Status",
			cell: ({ row }) => {
				const status = row.original.status;
				let variant: "default" | "secondary" | "destructive" | "outline" =
					"outline";

				switch (status) {
					case "APPROVED":
						variant = "default";
						break;
					case "UNDER_REVIEW":
						variant = "secondary";
						break;
					case "SUSPENDED":
						variant = "destructive";
						break;
					case "REJECTED":
						variant = "outline";
						break;
				}

				return <Badge variant={variant}>{status}</Badge>;
			},
		},
	];

	return (
		<DataTable
			data={vendors}
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
