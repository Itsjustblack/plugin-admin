import { QueryParams, Vendor } from "@/lib/types";
import { AxiosError } from "axios";
import apiClient from "../client";

export async function getAllVendors(queryParams?: QueryParams) {
	try {
		const res = await apiClient.get<Vendor[]>("/admin/vendors", {
			params: queryParams,
		});
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
