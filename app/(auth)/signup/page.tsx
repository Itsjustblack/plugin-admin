"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const SignupForm = dynamic(() => import("../../../components/forms/SignupForm"), {
	ssr: false,
});

export default function LoginPage() {
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-1 items-center justify-center">
				<div className="w-full max-w-sm space-y-4">
					<div className="flex flex-col items-center gap-2 text-center">
						<h1 className="text-xl sm:text-2xl font-bold">
							Create your account
						</h1>
						<p className="text-balance text-sm text-muted-foreground">
							Enter your information below to create your account
						</p>
					</div>
					<SignupForm />
					<div className="text-sm text-muted-foreground text-center">
						By creating an account, you agree to our{" "}
						<Link
							href="#"
							className="underline underline-offset-4 hover:text-primary"
						>
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link
							href="#"
							className="underline underline-offset-4 hover:text-primary"
						>
							Privacy Policy
						</Link>
						.
					</div>
					<div className="text-center text-sm">
						Already have an account?{" "}
						<Link
							href="/login"
							className="text-primary hover-underline font-bold"
						>
							Sign in
						</Link>
					</div>
				</div>
			</div>
			<div className="relative hidden bg-muted lg:block">
				<Image
					fill
					src="/assets/images/login-bg.jpg"
					alt="login image"
					className="absolute inset-0 h-full w-full object-cover object-center dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	);
}
