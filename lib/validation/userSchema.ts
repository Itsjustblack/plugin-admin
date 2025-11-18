import { z } from "zod";

export const loginUserSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signupUserSchema = z.object({
	email: z.string().email(),
	phone_number: z
		.string()
		.optional()
		.refine((val) => !val || val.length >= 10, {
			message: "Phone number must be at least 10 digits",
		}),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export const otpSchema = z.object({
	otp: z.string().min(6, {
		message: "Your one-time password must be 6 characters.",
	}),
});

export type LoginFormValues = z.infer<typeof loginUserSchema>;
export type SignupFormValues = z.infer<typeof signupUserSchema>;
export type OTPFormValues = z.infer<typeof otpSchema>;
