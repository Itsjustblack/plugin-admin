import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(value: number = 0, currency: string = "NGN") {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: currency,
		maximumFractionDigits: 0,
	}).format(value);
}

export function formatDate(date: string) {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
