import { ChangeDetectionStrategy, Component, computed, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
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

const LINKS = [
	{ label: 'Home', route: '/', icon: 'dashboard' },
	{ label: 'Sandbox', route: '/sandbox', icon: 'sports_esports' },
] as const;

const delay = 3000;
const animDuration = 1000;

@Component({
	selector: 'tech-main-menu',
	imports: [CommonModule, RouterLink, MatIconModule],
	host: {
		class: `tile glass shadow border-radius--${16}`,
	},
	template: `
		<nav class="flex a-center space-between gap-8">
			<ul class="flex gap-8">
				@for (item of links; track item) {
				<li>
					<a
						[routerLink]="[item.route]"
						class="flex gap-4 a-center"
					>
						@if(item.icon){
						<mat-icon [fontIcon]="item.icon" />
						}
						{{ item.label }}
					</a>
				</li>
				}
			</ul>

			<div class="hello-wrapper slide-down flex gap-4">
				@if(hello()){
				<span
					class="anim"
					[ngClass]="[isHelloHidden() ? 'show-out' : 'show-in']"
					>{{ hello() }}</span
				>
				}
				<span> world!</span>
			</div>
		</nav>
	`,
	styles: `
    :host {
      display: block;
      .mat-icon {
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .hello-wrapper {
        height: 20px;
        overflow: hidden;
      }

      .anim {
        // transition:3000ms cubic-bezier(0.05, 1.78, 0.41, 1);
        transition: ${animDuration}ms ease;
       }

      .show {
        &-out{
            opacity:0;
            transform:scale(0.7);
          filter: blur(10px);
        }
        &-in{
            opacity:1;
            transform:scale(1);
          filter: blur(0);
        }


      }
    }
  `,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMenuComponent {
	links = LINKS;

	intervalSignal = toSignal(interval(delay));

	isHelloHidden = signal(false);

	hello = computed(() => {
		this.intervalSignal();

		untracked(() => {
			this.isHelloHidden.set(false);

			setTimeout(() => {
				this.isHelloHidden.set(true);
			}, delay - animDuration);
		});

		return getRadomGreeting();
	});
}
