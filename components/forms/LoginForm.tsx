"use client";

import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/lib/api/auth/actions";
import { LoginFormValues, loginUserSchema } from "@/lib/validation/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginUserSchema),
		defaultValues: {
			password: "",
			email: "",
		},
	});

	const router = useRouter();

	const { mutate: startLogin, isPending } = useMutation({
		mutationFn: loginUser,
		onSuccess: () => {
			router.push("/verify-otp");
		},
	});

	function onSubmit(values: LoginFormValues) {
		startLogin(values);
		form.reset();
	}

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className="gap-y-4 flex flex-col mb-3"
		>
			<FieldGroup>
				<Controller
					name="email"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="email">Email</FieldLabel>
							<Input
								{...field}
								id="email"
								aria-invalid={fieldState.invalid}
								placeholder="user@example.com"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="password"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="password">Password</FieldLabel>
							<div className="relative">
								<Input
									type={showPassword ? "text" : "password"}
									placeholder="••••••••"
									{...field}
								/>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
									onClick={togglePasswordVisibility}
									aria-label={showPassword ? "Hide password" : "Show password"}
								>
									{showPassword ? (
										<Eye className="h-4 w-4 text-muted-foreground" />
									) : (
										<EyeOff className="h-4 w-4 text-muted-foreground" />
									)}
									<span className="sr-only">
										{showPassword ? "Hide password" : "Show password"}
									</span>
								</Button>
							</div>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</FieldGroup>
			<Button
				type="submit"
				className="w-full group"
				disabled={isPending}
			>
				{isPending ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Logging In...
					</>
				) : (
					<>
						Login
						<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300 ease-in-out" />
					</>
				)}
			</Button>
			<Link
				href="/forgot-password"
				className="text-xs mx-auto font-semibold hover-underline"
			>
				Forgot Password?
			</Link>
		</form>
	);
}
