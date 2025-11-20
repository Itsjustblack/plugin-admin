import { AxiosError } from "axios";
import apiClient from "../client";

export async function approveVendor(vendorId: string) {
	try {
		const res = await apiClient.put(`/admin/vendors/${vendorId}/approve`);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function suspendVendor(vendorId: string) {
	try {
		const res = await apiClient.put(`/admin/vendors/${vendorId}/suspend`);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function rejectVendor(vendorId: string) {
	try {
		const res = await apiClient.put(`/admin/vendors/${vendorId}/reject`);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function linkVendorToCategory(payload: {
	vendor_id: number;
	category_id: number;
	min_price: number;
}) {
	try {
		const res = await apiClient.post("/categories/vendor/link", payload);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function unlinkVendorToCategory(payload: {
	vendor_id: number;
	category_id: number;
}) {
	try {
		const res = await apiClient.delete("/categories/vendor/unlink", {
			params: payload,
		});
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
