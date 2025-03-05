import { CommonModule, JsonPipe } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	linkedSignal,
	signal,
} from '@angular/core';

interface Address {
	street: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
}

interface User {
	id: number;
	name: string;
	email: string;
	company: string;
	age: number;
	nationality: string;
	address: Address;
}

const USER: User = {
	id: 1,
	name: 'John Doe',
	email: 'john.doe@example.com',
	company: 'TechFlash Inc.',
	age: 30,
	nationality: 'American',
	address: {
		street: '123 Main St',
		city: 'Anytown',
		state: 'CA',
		postalCode: '12345',
		country: 'USA',
	},
} as const;

@Component({
	imports: [CommonModule, JsonPipe],
	templateUrl: './presentation.component.html',
	styleUrl: './presentation.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex col gap-64',
		style: 'gap:50vh; padding-bottom: 50vh',
	},
})
export class PresentationComponent {
	someProperty = 'someValue';

	signalObject = signal(structuredClone(USER));

	address = computed(() => {
		const { street, city, state, postalCode } = this.signalObject().address;
		return `${street}, ${city}, ${state},${postalCode}`;
	});

	linked = linkedSignal(() => this.signalObject().company);

	// Przypisanie do zmiennej lub wywolanie w konstruktorze
	myEffect = effect(() => {
		console.log('User:', this.signalObject());
		console.log(this.linked());
	});

	resetUser = (): void => this.signalObject.set(structuredClone(USER));
	updateCompany = (): void => this.linked.set('Decerto');
	updateUser = (): void =>
		this.signalObject.update((user) => ({ ...user, name: 'Jane Doe', company: 'ZUS' }));
}
