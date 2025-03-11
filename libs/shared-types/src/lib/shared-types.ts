export function sharedTypes(): string {
	return 'shared-types';
}

export type Country = {
	id: number;
	name: string;
	code: string;
	capital: string;
	population: number;
};

export type User = {
	id: number;
	name: string;
	email: string;
	country: string;
	city: string;
	phone: string;
	website: string;
	company?: string;
	companyId: number;
	address: string;
};

export type ReladedUsersResponse = {
	company: string;
	users: User[];
	userCount: number;
};

export type Company = {
	id: number;
	name: string;
	countryCode: string;
	address: string;
	website: string;
	stockCode: string;
};

export type CompanyListResponse = {
	id: number;
	name: string;
};

export type UserListResponse = {
	id: number;
	name: string;
};
