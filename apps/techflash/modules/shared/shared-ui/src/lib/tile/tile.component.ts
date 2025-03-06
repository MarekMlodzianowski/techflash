import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, Resource } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DummyDirective } from '../dummy.directive';
import { LoadingSpinnerComponent } from '../loading/loading.component';

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
	imports: [
		CommonModule,
		LoadingSpinnerComponent,
		MatIconModule,
		MatTooltipModule,
	],
	host: {
		class: 'slide-down',
		'[class.hidden]': 'resource().hasValue() === false',
	},
	templateUrl: './tile.component.html',
	styleUrl: './tile.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{
			directive: DummyDirective,
			inputs: [`techDummy`],
		},
	],
})
export class TileComponent {
	title = input<string>();
	resource = input.required<Resource<unknown>>();

	errorMessage = computed(() => {
		const error = this.resource()?.error() as any;
		const status = error?.status;

		return error ? (error?.error?.message ?? ERROR_MESSAGES[status] ?? '🙉 Nieznany błąd ') : null;
	});
}
