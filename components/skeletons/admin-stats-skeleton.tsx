import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function AdminStatsSkeleton() {
	return (
		<div className="grid gap-4 md:grid-cols-3">
			<Card className="bg-card">
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium text-muted-foreground">
						Total Clients
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<div className="h-8 bg-gray-200 rounded animate-pulse"></div>
						<div className="h-3 bg-gray-100 rounded w-20 animate-pulse"></div>
					</div>
					<p className="mt-1 text-xs text-muted-foreground">
						All clients in system
					</p>
				</CardContent>
			</Card>
			<Card className="bg-card">
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium text-muted-foreground">
						Total Vendors
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<div className="h-8 bg-gray-200 rounded animate-pulse"></div>
						<div className="h-3 bg-gray-100 rounded w-20 animate-pulse"></div>
					</div>
					<p className="mt-1 text-xs text-muted-foreground">
						All Vendors in system
					</p>
				</CardContent>
			</Card>
			<Card className="bg-card">
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium text-muted-foreground">
						Active Projects
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<div className="h-8 bg-gray-200 rounded animate-pulse"></div>
						<div className="h-3 bg-gray-100 rounded w-20 animate-pulse"></div>
					</div>
					<p className="mt-1 text-xs text-muted-foreground">
						Active projects in system
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
