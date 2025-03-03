import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';
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

	#isFetching = computed(() => {
		return (
			this.#allUsers.isLoading() ||
			this.#userById.isLoading() ||
			this.#userCompany.isLoading() ||
			this.#relatedUsers.isLoading()
		);
	});

	#allUsers = rxResource({
		loader: () => this.http.get<User[]>(`/api/users/all`),
	});

	#userById = rxResource({
		request: () => (this.#id() !== -1 ? this.#id() : undefined),
		loader: ({ request: name }) => this.http.get<User>(`/api/users/${name}`),
	});

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

	setId = (value: number) => this.#id.set(value);

	allUsers = () => this.#allUsers;

	getUserResource = () => this.#userById;

	getUserCountry = () => this.#userCompany;

	getRelatedUsers = () => this.#relatedUsers;

	isFetching = () => this.#isFetching;
}
