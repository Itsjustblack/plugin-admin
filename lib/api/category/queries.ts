import { Category, LinkedVendor, QueryParams } from "@/lib/types";
import { AxiosError } from "axios";
import apiClient from "../client";

export async function getAllCategories(queryParams?: QueryParams) {
	try {
		const res = await apiClient.get<Category[]>("/categories/", {
			params: queryParams,
		});
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function getCategoriesCount(active: boolean = false) {
	try {
		const res = await apiClient.get<{ count: number }>("/categories/count/", {
			params: { active_only: active },
		});
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function getAverageCategoryPrice() {
	try {
		const res = await apiClient.get<{
			average_min_price: number;
		}>("/categories/analytics/average-price");
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function getCategoryById(categoryId: number) {
	try {
		const res = await apiClient.get<Category>(`/categories/${categoryId}`);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function getAllLinkedVendors(categoryId: number) {
	try {
		const res = await apiClient.get<LinkedVendor[]>(
			`/categories/${categoryId}/vendors`
		);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
