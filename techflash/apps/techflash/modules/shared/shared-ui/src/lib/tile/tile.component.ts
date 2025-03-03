import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
	ResourceRef,
	signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../loading/loading.component';
import { MatIconModule } from '@angular/material/icon';

// common http error codes and messages

const ERROR_MESSAGES: { [key: number]: string } = {
	400: 'Błąd żądania',
	401: 'Nieautoryzowany',
	403: 'Zabroniony',
	404: 'Nie znaleziono',
	500: 'Błąd serwera',
};

@Component({
	selector: 'tech-tile',
	imports: [CommonModule, LoadingSpinnerComponent, MatIconModule],
	host: {
		class: 'slide-down',
	},
	templateUrl: './tile.component.html',
	styleUrl: './tile.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileComponent {
	title = input<string>();
	resource = input.required<ResourceRef<unknown>>();

	errorMessage = computed(() => {
		const error = this.resource()?.error() as any;
		const status = error?.status;

		return error ? error?.error?.message ?? ERROR_MESSAGES[status] ?? '🙉 Nieznany błąd ' : null;
	});
}
