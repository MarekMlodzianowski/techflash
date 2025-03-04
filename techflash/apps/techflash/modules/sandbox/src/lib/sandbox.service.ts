import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, type Resource, type Signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom, map } from 'rxjs';
import { User } from './playground/playground.component';

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
	#http = inject(HttpClient);

	#id = signal(-1);
	#countryCode = signal('');
	#pendingRequests = signal<string[]>([]);

	#isFetching = computed(() => this.#pendingRequests().length > 0);

	#user = computed(() => this.#userById?.value());

	// #region Countries #########################################################

	#countries = rxResource({
		loader: () => this.#http.get<Country[]>(`/api/countries`),
	});

	#countryByCode = rxResource({
		request: () => (this.#countryCode() ? this.#countryCode() : undefined),
		loader: ({ request: countryCode }) =>
			this.#http.get<Country>(`/api/countries/code/${countryCode}`),
	});

	#companyByCountry = rxResource({
		request: () => (this.#countryCode() ? this.#countryCode() : undefined),
		loader: ({ request: countryCode }) =>
			this.#http.get<Company[]>(`/api/companies/byCountry/${countryCode}`),
	});
	//#endregion

	// #region Users #############################################################
	#allUsers = rxResource({
		loader: () => this.#http.get<User[]>(`/api/users/all`),
	});

	#userById = rxResource({
		request: () => (this.#id() !== -1 ? this.#id() : undefined),
		loader: ({ request: name }) => this.#http.get<User>(`/api/users/${name}`),
	});

	#usersByCountry = rxResource({
		request: () => (this.#countryCode() ? this.#countryCode() : undefined),
		loader: ({ request: countryCode }) =>
			this.#http.get<User[]>(`/api/users/byCountry/${countryCode}`),
	});

	#relatedUsers = rxResource({
		request: () => this.#user()?.companyId,
		loader: ({ request: companyId }) =>
			this.#http.get<ReladedUsersResponse>(`/api/users/byCompany/${companyId}`).pipe(
				map((response) => {
					return {
						...response,
						users: response.users.filter((user) => user.id !== this.#user()?.id),
					};
				}),
			),
	});

	//#endregion

	// #region Companies #########################################################

	#companyById = rxResource({
		request: () => (this.#user()?.companyId ? this.#user()?.companyId : undefined),
		loader: ({ request: companyId }) => this.#http.get<Company>(`/api/companies/${companyId}`),
	});

	#companies = rxResource({
		loader: () => this.#http.get<{ id: number; name: string }[]>(`/api/companies/all`),
	});

	//#endregion

	countryResource = toSignal(this.#http.get<Country[]>(`/api/countries`), { initialValue: [] });

	setId = (value: number): void => this.#id.set(value);

	updateUserById = async (user: User): Promise<void> => {
		await firstValueFrom(this.#http.put(`/api/users/${user.id}`, user));

		this.#companyByCountry.reload();
		this.#usersByCountry.reload();
		this.#userById.reload();
		this.#allUsers.reload();
	};

	getUsersByCountry = (): Resource<User[] | undefined> => this.#usersByCountry.asReadonly();
	getAllUsers = (): Resource<User[] | undefined> => this.#allUsers.asReadonly();
	getUserResource = (): Resource<User | undefined> => this.#userById.asReadonly();
	getUserCompany = (): Resource<Company | undefined> => this.#companyById.asReadonly();
	getRelatedUsers = (): Resource<ReladedUsersResponse | undefined> =>
		this.#relatedUsers.asReadonly();

	getCountries = (): Resource<Country[] | undefined> => this.#countries.asReadonly();
	setCountryCode = (value: string): void => this.#countryCode.set(value);
	getCountryByCode = (): Resource<Country | undefined> => this.#countryByCode.asReadonly();

	getCompanies = (): Resource<{ id: number; name: string }[] | undefined> =>
		this.#companies.asReadonly();

	getCompaniesByCountry = (): Resource<Company[] | undefined> =>
		this.#companyByCountry.asReadonly();

	isFetching = (): Signal<boolean> => this.#isFetching;

	setPendingRequest = (request: string, action: 'remove' | 'add' = 'add'): void => {
		if (action === 'remove') {
			setTimeout(() => {
				this.#pendingRequests.set(this.#pendingRequests().filter((r) => r !== request));
			}, 1000);
			return;
		}

		this.#pendingRequests.set([...this.#pendingRequests(), request]);
	};
}
