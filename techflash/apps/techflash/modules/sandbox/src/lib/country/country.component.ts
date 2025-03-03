import { afterNextRender, Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SandboxService } from '../sandbox.service';
import { TileComponent } from '@techflash/shared-ui';

export type Company = {
	id: number;
	name: string;
	countryCode: string;
	address: string;
	website: string;
	stockCode: string;
};

@Component({
	imports: [CommonModule, TileComponent],
	templateUrl: './country.component.html',
	styleUrl: './country.component.scss',
	host: {
		class: 'flex column gap-24',
	},
})
export class CountryComponent {
	countryCode = input.required<string>();

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
