import AdminStats from "@/components/admin-stats";
import { VendorsTable } from "@/components/tables/vendor-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Page() {
	return (
		<div className="mx-auto max-w-7xl space-y-8">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-foreground">Categories</h1>
					<p className="mt-2 text-muted-foreground">
						Manage and organize your product categories
					</p>
				</div>
				<Link href="/category/new">
					<Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
						<Plus className="h-4 w-4" />
						Add Category
					</Button>
				</Link>
			</div>

			<AdminStats />
			<VendorsTable />
		</div>
	);
}
