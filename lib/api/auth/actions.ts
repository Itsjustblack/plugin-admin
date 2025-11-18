import { LoginFormValues, SignupFormValues } from "@/lib/validation/userSchema";
import { AxiosError } from "axios";
import apiClient from "../client";

export async function signupUser(payload: SignupFormValues) {
	try {
		const res = await apiClient.post("/auth/admin/signup", payload);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function loginUser(payload: LoginFormValues) {
	try {
		const res = await apiClient.post("/auth/admin/login", payload);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function verifySignupOtp(
	payload: SignupFormValues & { otp: string }
) {
	try {
		const res = await apiClient.post("/auth/admin/signup/verify-otp", payload);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
