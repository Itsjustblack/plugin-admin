"use client";

import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signupUser } from "@/lib/api/auth/actions";
import {
	SignupFormValues,
	signupUserSchema,
} from "@/lib/validation/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSessionStorage } from "@uidotdev/usehooks";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const SignupForm = () => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	const form = useForm<SignupFormValues>({
		resolver: zodResolver(signupUserSchema),
		mode: "onChange",
		defaultValues: {
			email: "",
			password: "",
			phone_number: "",
		},
	});

	const router = useRouter();

	const [, setSignupData] = useSessionStorage<SignupFormValues | null>(
		"signup-data",
		null
	);

	const { mutate: startSignup, isPending } = useMutation({
		mutationFn: signupUser,
		onSuccess: () => {
			router.push("/verify-otp");
		},
	});

	function onSubmit(values: SignupFormValues) {
		setSignupData(values);
		startSignup(values);
		form.reset();
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<FieldGroup className="gap-y-5 flex flex-col mb-3">
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
					name="phone_number"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="phone_number">Phone Number</FieldLabel>
							<Input
								{...field}
								id="phone_number"
								aria-invalid={fieldState.invalid}
								placeholder="+2349012323352"
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
			<Field orientation="horizontal">
				<Button
					type="submit"
					className="w-full group mt-3"
					disabled={isPending}
				>
					{isPending ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Creating account...
						</>
					) : (
						<>
							Create account
							<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300 ease-in-out" />
						</>
					)}
				</Button>
			</Field>
		</form>
	);
};

export default SignupForm;
