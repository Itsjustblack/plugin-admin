"use client";

import AdminStats from "@/components/admin-stats";
import { VendorsTable } from "@/components/tables/vendor-table";

export default function Page() {
	return (
		<div className="mx-auto max-w-7xl space-y-8">
			<div>
				<h1 className="text-3xl font-bold text-foreground">
					Welcome back, Olamide
				</h1>
				<p className="mt-2 text-muted-foreground">
					Here&apos;s an overview of your platform. Manage categories, monitor
					vendors, and track your business performance.
				</p>
			</div>

			<AdminStats />
			<VendorsTable />
		</div>
	);
}
