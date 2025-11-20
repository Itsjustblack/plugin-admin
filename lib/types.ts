export interface QueryParams {
	limit: number;
	offset: number;
}

export interface Category {
	id: number;
	name: string;
	description: string;
	min_price: number;
	is_active: boolean;
	created_at: string;
}

export interface Vendor {
	id: number;
	email: string;
	full_name: string;
	phone_number: string;
	country_code: string;
	status: string;
	rating: number;
	acc_number: string;
	bank_code: string;
	mobile_money: string;
	created_at: string;
	updated_at: string;
}

export interface LinkedVendor {
	id: number;
	vendor_id: number;
	category_id: number;
	min_price: number;
}

export interface User {
	id: number;
	full_name: string;
	email: string;
	phone_number: string;
	whatsapp_id: string;
	country_code: string;
	referral_code: string;
	is_active: boolean;
	created_at: string;
	updated_at: string;
}
