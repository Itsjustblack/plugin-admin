import CategoryDetails from "@/components/category-details";
import { VendorList } from "@/components/vendor-list";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return (
		<div className="mx-auto max-w-7xl space-y-8">
			<CategoryDetails categoryId={+id} />
			<VendorList categoryId={+id} />
		</div>
	);
}
