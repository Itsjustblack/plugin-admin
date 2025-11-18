import { AddCategoriesFormValues } from "@/lib/validation/categorySchema";
import { AxiosError } from "axios";
import apiClient from "../client";

export async function addNewCategory(payload: AddCategoriesFormValues) {
	try {
		const res = await apiClient.post("/categories/bulk", payload.categories);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function deleteCategory(categoryId: string) {
	try {
		const res = await apiClient.delete(`/categories/${categoryId}`);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function activateCategory(categoryId: string) {
	try {
		const res = await apiClient.put(`/categories/${categoryId}/activate`);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function deactivateCategory(categoryId: string) {
	try {
		const res = await apiClient.put(`/categories/${categoryId}/deactivate`);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
