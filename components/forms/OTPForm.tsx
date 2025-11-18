"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { verifySignupOtp } from "@/lib/api/auth/actions";
import { otpSchema, SignupFormValues } from "@/lib/validation/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSessionStorage } from "@uidotdev/usehooks";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

interface OTPFormData {
	otp: string;
}

export function OTPForm() {
	const [isVerified, setIsVerified] = useState(false);

	const [signupData, setSignupData] =
		useSessionStorage<SignupFormValues | null>("signup-data", null);

	const form = useForm<OTPFormData>({
		resolver: zodResolver(otpSchema),
		defaultValues: {
			otp: "",
		},
	});

	const { mutate: verifyOTP, isPending } = useMutation({
		mutationFn: verifySignupOtp,
		onSuccess: () => {
			setSignupData(null);
			setIsVerified(true);
		},
	});

	const onSubmit = async (data: OTPFormData) => {
		if (signupData) {
			console.log({ ...signupData, ...data });
			verifyOTP({ ...signupData, ...data });
		}
	};

	if (isVerified) {
		return (
			<div className="text-center space-y-4">
				<div className="flex justify-center">
					<div className="rounded-full bg-green-100 dark:bg-green-950 p-4">
						<CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
					</div>
				</div>
				<h2 className="text-2xl font-bold text-foreground">Verified!</h2>
				<p className="text-muted-foreground">
					Your account has been successfully verified.
				</p>
				<Button className="w-full mt-6">Continue to Dashboard</Button>
			</div>
		);
	}

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className="space-y-6"
		>
			<FieldGroup>
				<Controller
					name="otp"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<InputOTP
								maxLength={6}
								// disabled={isPending}
								{...field}
							>
								<InputOTPGroup className="flex gap-2 justify-center">
									<InputOTPSlot
										index={0}
										className="w-14 h-16 text-2xl"
									/>
									<InputOTPSlot
										index={1}
										className="w-14 h-16 text-2xl"
									/>
									<InputOTPSlot
										index={2}
										className="w-14 h-16 text-2xl"
									/>
									<InputOTPSlot
										index={3}
										className="w-14 h-16 text-2xl"
									/>
									<InputOTPSlot
										index={4}
										className="w-14 h-16 text-2xl"
									/>
									<InputOTPSlot
										index={5}
										className="w-14 h-16 text-2xl"
									/>
								</InputOTPGroup>
							</InputOTP>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</FieldGroup>

			<Button
				type="submit"
				disabled={isPending || form.formState.isValid}
				className="w-full h-12 text-base font-semibold"
			>
				{isPending ? (
					"Verifying..."
				) : (
					<span className="flex items-center justify-center gap-2">
						Verify
						<ArrowRight className="w-4 h-4" />
					</span>
				)}
			</Button>

			<div className="text-center">
				<p className="text-muted-foreground text-sm">
					Didn&apos;t receive a code?{" "}
					<button
						type="button"
						className="text-primary hover:underline font-semibold transition-colors"
					>
						Resend
					</button>
				</p>
			</div>
		</form>
	);
}
