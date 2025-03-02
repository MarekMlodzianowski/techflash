import { Component, effect, inject, linkedSignal } from '@angular/core';
import { RouterModule, Router, EventType } from '@angular/router';
import { LoadingSpinnerComponent, MainMenuComponent } from '@techflash/shared-ui';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, tap } from 'rxjs';

@Component({
	imports: [RouterModule, MainMenuComponent, LoadingSpinnerComponent, CommonModule],
	selector: 'app-root',
	host: {
		class: 'flex column gap-24',
	},
	template: `
		<main class="page-container flex column gap-24">
			<tech-main-menu />
			<router-outlet></router-outlet>
		</main>

		@if(loading()){
		<tech-loading-spinner
			[fullscreen]="true"
			message="Loading..."
		/>
		}
	`,
	styles: [
		`
			:host {
				align-items: center;
				.page-container {
					max-width: 800px;
				}
			}
		`,
	],
})
export class AppComponent {
	// inputs
	// outputs
	// injectors
	// properties
	// signal properties (computed / linked / effect)
	// methods
	// ooks

	router = inject(Router);

	title = 'techflash';

	routerEvents = toSignal(
		this.router.events.pipe(
			tap((event) => {
				if (event.type === EventType.NavigationStart) this.loading.set(true);
			}),
			debounceTime(300),
		),
	);

	loading = linkedSignal(() =>
		[EventType.NavigationStart, EventType.NavigationCancel, EventType.NavigationError].includes(
			this.routerEvents()?.type ?? 0,
		),
	);

	routerEffect = effect(() => console.log(this.routerEvents()));

	// constructor(private router: Router) {
	// 	this.router.events.subscribe((event) => {
	// 		if (event instanceof NavigationStart) {
	// 			this.loading.set(true);
	// 		} else if (
	// 			event instanceof NavigationEnd ||
	// 			event instanceof NavigationCancel ||
	// 			event instanceof NavigationError
	// 		) {
	// 			setTimeout(() => {
	// 				this.loading.set(false);
	// 			}, 2300); // Small delay to prevent flickering for fast loads
	// 		}
	// 	});
	// }
}
