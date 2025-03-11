import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, type Resource, type Signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import type { Company, Country, ReladedUsersResponse, User } from '@shared/types';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SandboxService {
	//Inject zastępuje deklaracje z konstruktora
	#http = inject(HttpClient);
	// Mozna tez uzyc bezposrednio funkcji zwracanej z takiego modulu np: fibonnachi = inject(Utils).fibonnachi

	// "#" oznacza prywatne pola i jest natywnym rozwiazaniem JS (zastępuje private)
	#id = signal(-1);
	#countryCode = signal('');
	#pendingRequests = signal<string[]>([]);

	#isFetching = computed(() => this.#pendingRequests().length > 0);

	//EXPERIMENTAL, ale daje dobry poglad w ktora strone zmierza angular
	//https://angular.dev/api/core/rxjs-interop/rxResource

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
	#user = computed(() => this.#userById?.value());

	#allUsers = rxResource({
		loader: () => this.#http.get<User[]>(`/api/users/all`),
	});

	// Zapytanie wykona sie tylko gdy request zwróci wartość inną niż undefined
	#userById = rxResource({
		request: () => (this.#id() !== -1 ? this.#id() : undefined),
		loader: ({ request: name }) => this.#http.get<User>(`/api/users/${name}`),
	});

	#usersByCountry = rxResource({
		request: () => (this.#countryCode() ? this.#countryCode() : undefined),
		loader: ({ request: countryCode }) =>
			this.#http.get<User[]>(`/api/users/byCountry/${countryCode}`),
	});

	// Przykład z mapowaniem na poziomie strumienia rxjs, poprawna alternatywa bylby strzał + computed
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

	//^-- alternatywa
	// #relatedUsers = computed((): ReladedUsersResponse => {
	// 	const company = this.#relatedUsers.value()?.company ?? '---';
	// 	const users = (this.#relatedUsers.value()?.users ?? []).filter(
	// 		(user) => user.id !== this.#user()?.id,
	// 	);
	// 	return {
	// 		company,
	// 		users,
	// 		userCount: users.length,
	// 	};
	// });

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
		const updatedUser = await firstValueFrom(this.#http.put<User>(`/api/users/${user.id}`, user));

		// A
		// Ręczne odświeżenie danych po zakończeniu update, przydatne gdy aktualizowany zasób nie ma bezpośredniego powiazania z innymi.

		// this.#companyByCountry.reload();
		// this.#usersByCountry.reload();
		// this.#userById.reload();
		// this.#allUsers.reload();

		// B
		// vs refresh głównego resource, aby wymusić odświeżenie wszystkich zależnych
		this.#userById.update((value) => {
			return updatedUser ? { ...updatedUser } : value;
		});
	};

	// asReadonly jest dodatkowym zabezpieczeniem aby wymusić mutacje tylko przez metody w serwisie. Computed domyślnie są readonly, stad brak annotacji w isFetching

	isFetching = (): Signal<boolean> => this.#isFetching;

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

	setPendingRequest = (request: string, action: 'remove' | 'add' = 'add'): void => {
		if (action === 'remove') {
			setTimeout(() => {
				this.#pendingRequests.set(this.#pendingRequests().filter((r) => r !== request));
			}, 1000);
			return;
		}

		this.#pendingRequests.set([...this.#pendingRequests(), request]);
		// vs alternatywnie
		// this.#pendingRequests.update((value) => [...value, request]);
	};
}
