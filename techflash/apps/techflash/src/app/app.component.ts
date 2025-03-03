import { Component, inject, linkedSignal } from '@angular/core';
import { RouterModule, Router, EventType } from '@angular/router';
import { LoadingSpinnerComponent, MainMenuComponent } from '@techflash/shared-ui';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, tap } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SandboxService } from '@techflash/sandbox';

@Component({
	imports: [
		RouterModule,
		MainMenuComponent,
		LoadingSpinnerComponent,
		CommonModule,
		MatProgressBarModule,
	],
	selector: 'app-root',
	host: {
		class: 'flex column gap-24',
	},
	template: `
		@if(fetching()){
		<mat-progress-bar mode="query"></mat-progress-bar>
		}

		<main class="page-container flex column gap-24">
			<tech-main-menu />
			<router-outlet></router-outlet>
		</main>

		@if(navigationPending()){
		<tech-loading-spinner
			[fullscreen]="true"
			message="Loading..."
		/>
		}
	`,
	styles: [
		`
			:host {
				mat-progress-bar {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
				}

				padding-top: 16px;
				align-items: center;
				.page-container {
					max-width: 800px;
				}
			}
		`,
	],
})
export class AppComponent {
	service = inject(SandboxService);
	router = inject(Router);

	// fetching =inject(SandboxService).isFetching();
	fetching = this.service.isFetching();

	title = 'techflash';

	routerEvents = toSignal(
		this.router.events.pipe(
			tap((event) => {
				if (event.type === EventType.NavigationStart) this.navigationPending.set(true);
			}),
			debounceTime(300),
		),
	);

	navigationPending = linkedSignal(() =>
		[EventType.NavigationStart, EventType.NavigationCancel, EventType.NavigationError].includes(
			this.routerEvents()?.type ?? 0,
		),
	);
}
