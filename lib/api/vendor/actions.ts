import { AxiosError } from "axios";
import apiClient from "../client";

export async function approveVendor(vendorId: string) {
	try {
		const res = await apiClient.put(`admin/vendors/${vendorId}/approve`);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function suspendVendor(vendorId: string) {
	try {
		const res = await apiClient.put(`admin/vendors/${vendorId}/suspend`);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function rejectVendor(vendorId: string) {
	try {
		const res = await apiClient.put(`admin/vendors/${vendorId}/reject`);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
