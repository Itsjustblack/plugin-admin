import { QueryParams, User } from "@/lib/types";
import { AxiosError } from "axios";
import apiClient from "../client";

export async function getAllUsers(queryParams?: QueryParams) {
	try {
		const res = await apiClient.get<User[]>("/admin/clients/", {
			params: queryParams,
		});
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
