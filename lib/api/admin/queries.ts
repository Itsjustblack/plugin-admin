import { AxiosError } from "axios";
import apiClient from "../client";

interface AdminMetrics {
	clients: 0;
	vendors: 0;
	refund_total: 0;
	active_projects: 0;
	completed_projects: 0;
	refunded_projects: 0;
}

export async function getAdminMetrics() {
	try {
		const res = await apiClient.get<AdminMetrics>("/admin/dashboard/metrics/");
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
