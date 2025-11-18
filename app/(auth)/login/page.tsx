import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "../../../components/forms/LoginForm";

export default function LoginPage() {
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-1 items-center justify-center">
				<div className="w-full max-w-sm space-y-4">
					<div className="flex flex-col items-center gap-2 text-center">
						<h1 className="text-2xl font-bold">Login to your account</h1>
						<p className="text-balance text-sm text-muted-foreground">
							Enter your email below to login to your account
						</p>
					</div>
					<LoginForm />
					<div className="text-center text-sm">
						Don&apos;t have an account?{" "}
						<Link
							href="/signup"
							className="text-primary hover-underline font-bold"
						>
							Sign up
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
