// libs/shared-ui/src/lib/loading-spinner/loading-spinner.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
	selector: 'tech-loading-spinner',
	standalone: true,
	imports: [CommonModule, MatProgressSpinnerModule],
	template: `
		<div
			class="spinner-container"
			[class.fullscreen]="fullscreen"
		>
			<mat-spinner
				[diameter]="diameter"
				[color]="color"
			></mat-spinner>
			<span
				*ngIf="message"
				class="spinner-message"
			>
				{{ message }}
			</span>
		</div>
	`,
	styles: [
		`
			.spinner-container {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				gap: 16px;
				padding: 16px;
			}

			.fullscreen {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(255, 255, 255, 0.7);
				z-index: 9999;
			}

			.spinner-message {
				margin-top: 8px;
				font-size: 16px;
				color: rgba(0, 0, 0, 0.87);
			}
		`,
	],
})
export class LoadingSpinnerComponent {
	@Input() diameter = 50;
	@Input() color: 'primary' | 'accent' | 'warn' = 'primary';
	@Input() message?: string;
	@Input() fullscreen = false;
}
