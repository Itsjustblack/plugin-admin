import AddCategoriesForm from "@/components/forms/add-categories-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
	return (
		<div className="max-w-7xl mx-auto">
			{/* Header */}
			<div className="flex items-center mb-8 gap-x-5">
				<div>
					<h1 className="text-3xl font-bold text-foreground mb-2">
						Add New Categories
					</h1>
					<p className="text-muted-foreground">
						Create multiple product categories at once
					</p>
				</div>

				<Link
					href="/"
					className="ml-auto h-fit"
				>
					<Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
						<ArrowLeft className="h-4 w-4" />
						Back to Categories
					</Button>
				</Link>
			</div>

			<AddCategoriesForm />
		</div>
	);
}
