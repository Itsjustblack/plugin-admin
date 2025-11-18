"use client";

import dynamic from "next/dynamic";

const OTPForm = dynamic(() => import("@/components/forms/OTPForm").then(mod => ({ default: mod.OTPForm })), {
	ssr: false,
});

export default function Page() {
	return (
		<main className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted p-4">
			<div className="w-full max-w-md">
				<div className="space-y-8">
					<div className="space-y-2">
						<h1 className="text-3xl font-bold text-foreground">
							Enter verification code
						</h1>
						<p className="text-muted-foreground">
							We&apos;ve sent a 6-digit code to your email
						</p>
					</div>
					<OTPForm />
				</div>
			</div>
		</main>
	);
}
