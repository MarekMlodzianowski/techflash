import { computed, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

const greetings = [
	'Hello',
	'Hola',
	'こんにちは',
	'안녕하세요',
	'你好',
	'Olá',
	'Привет',
	'مرحبا',
	'Bonjour',
	'Ciao',
	'Hallo',
	'Hej',
	'Aloha',
	'Namaste',
	'Salaam',
	'Konnichiwa',
	'Shalom',
	'Merhaba',
	'Jambo',
] as const;

const getRadomGreeting = () => {
	const randomIndex = Math.floor(Math.random() * greetings.length);
	return greetings[randomIndex];
};

@Injectable({
	providedIn: 'root',
})
export class SandboxService {
	#name = signal('');

	#randomGreeting = computed(() => {
		this.#interval();
		console.log(this.#name());
		return getRadomGreeting();
	});

	#helloWorld = computed(() => `${this.#randomGreeting()} ${this.#name() ?? ''}`);

	#interval = toSignal(interval(6000));

	getName = () => this.#name.asReadonly();
	setName = (value: string) => this.#name.set(value);

	getHelloWorld = () => this.#helloWorld;
}
