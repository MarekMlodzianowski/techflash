import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom, interval, map } from 'rxjs';
import { User } from './playground/playground.component';
import { HttpClient } from '@angular/common/http';

type Country = {
	id: number;
	name: string;
	code: string;
	capital: string;
	population: number;
};

type ReladedUsersResponse = {
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

@Injectable({
	providedIn: 'root',
})
export class SandboxService {
	http = inject(HttpClient);

	#id = signal(-1);

	#user = computed(() => this.#userById?.value());

	#pendingRequests = signal<string[]>([]);

	#isFetching = computed(() => this.#pendingRequests().length > 0);

	// Countries #######################

	#countryCode = signal('');

	#countryByCode = rxResource({
		request: () => (this.#countryCode() ? this.#countryCode() : undefined),
		loader: ({ request: countryCode }) =>
			this.http.get<Country>(`/api/countries/code/${countryCode}`),
	});

	#companyByCountry = rxResource({
		request: () => (this.#countryCode() ? this.#countryCode() : undefined),
		loader: ({ request: countryCode }) =>
			this.http.get<Company[]>(`/api/companies/byCountry/${countryCode}`),
	});

	#usersByCountry = rxResource({
		request: () => (this.#countryCode() ? this.#countryCode() : undefined),
		loader: ({ request: countryCode }) =>
			this.http.get<User[]>(`/api/users/byCountry/${countryCode}`),
	});

	setCountryCode = (value: string) => this.#countryCode.set(value);

	getCountryByCode = () => this.#countryByCode.asReadonly();
	getCompaniesByCountry = () => this.#companyByCountry.asReadonly();

	// USERS ###########################

	#allUsers = rxResource({
		loader: () => this.http.get<User[]>(`/api/users/all`),
	});

	#userById = rxResource({
		request: () => (this.#id() !== -1 ? this.#id() : undefined),
		loader: ({ request: name }) => this.http.get<User>(`/api/users/${name}`),
	});

	updateUserById = async (user: User): Promise<void> => {
		await firstValueFrom(this.http.put(`/api/users/${user.id}`, user));

		this.#userById.reload();
	};

	#userCompany = rxResource({
		request: () => (this.#user()?.companyId ? this.#user()?.companyId : undefined),
		loader: ({ request: companyId }) => this.http.get<Company>(`/api/companies/${companyId}`),
	});

	#relatedUsers = rxResource({
		request: () => this.#user()?.companyId,
		loader: ({ request: companyId }) =>
			this.http.get<ReladedUsersResponse>(`/api/users/byCompany/${companyId}`).pipe(
				map((response) => {
					return {
						...response,
						users: response.users.filter((user) => user.id !== this.#user()?.id),
					};
				}),
			),
	});

	countryResource = toSignal(this.http.get<Country[]>(`/api/countries`), { initialValue: [] });

	getUsersByCountry = () => this.#usersByCountry.asReadonly();

	setId = (value: number) => this.#id.set(value);

	getAllUsers = () => this.#allUsers.asReadonly();

	getUserResource = () => this.#userById.asReadonly();

	getUserCOmpany = () => this.#userCompany.asReadonly();

	getRelatedUsers = () => this.#relatedUsers.asReadonly();

	isFetching = () => this.#isFetching;

	setPendingRequest = (request: string, action: 'remove' | 'add' = 'add') => {
		if (action === 'remove') {
			setTimeout(() => {
				this.#pendingRequests.set(this.#pendingRequests().filter((r) => r !== request));
			}, 1000);
			return;
		}

		this.#pendingRequests.set([...this.#pendingRequests(), request]);
	};
}
