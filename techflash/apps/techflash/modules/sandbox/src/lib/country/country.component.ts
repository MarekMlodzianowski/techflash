import { CommonModule } from '@angular/common';
import { afterNextRender, Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TileComponent } from '@techflash/shared-ui';
import { SandboxService } from '../sandbox.service';

export type Company = {
	id: number;
	name: string;
	countryCode: string;
	address: string;
	website: string;
	stockCode: string;
};

@Component({
	imports: [
		CommonModule,
		TileComponent,
		RouterLink,
	],
	templateUrl: './country.component.html',
	styleUrl: './country.component.scss',
	host: {
		class: 'flex column gap-24',
	},
})
export class CountryComponent {
	countryCode = input.required<string>();

	queryParams = toSignal(inject(ActivatedRoute).queryParams);
	routeParams = toSignal(inject(ActivatedRoute).params);

	params = computed(() => {
		return {
			...this.queryParams(),
			...this.routeParams(),
		};
	});

	service = inject(SandboxService);

	country = this.service.getCountryByCode();
	companies = this.service.getCompaniesByCountry();
	users = this.service.getUsersByCountry();

	constructor() {
		afterNextRender(() => {
			console.log('CountryComponent rendered');
			this.service.setCountryCode(this.countryCode());
		});
	}
}
